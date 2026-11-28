// SPDX-License-Identifier: GPL-3.0-only
#ifdef THINKKIRA
#include "KiraMessages.h"
#include "KiraSettings.h"
#include "MeshService.h"
#include "NodeDB.h"
#include "RTC.h"
#include "configuration.h"
#include "main.h"
#include <string.h>

namespace ThinkKira
{

KiraMessageModule *kiraMessages = nullptr;

const char *const QUICK_REPLIES[] = {"OK", "Ja", "Nein", "Bin unterwegs", "Komme gleich", "Alles gut", "Wo bist du?", "Brauche Hilfe"};
const int QUICK_REPLY_COUNT = sizeof(QUICK_REPLIES) / sizeof(QUICK_REPLIES[0]);

KiraMessageModule::KiraMessageModule() : SinglePortModule("kiramsg", meshtastic_PortNum_TEXT_MESSAGE_APP)
{
    isPromiscuous = false;
}

const KiraMessage &KiraMessageModule::get(int i) const
{
    return ring[(head - 1 - i + MSG_MAX * 2) % MSG_MAX];
}

void KiraMessageModule::add(const KiraMessage &m)
{
    ring[head] = m;
    head = (head + 1) % MSG_MAX;
    if (n < MSG_MAX)
        n++;
}

void KiraMessageModule::clear()
{
    head = n = unreadCount = 0;
}

ProcessMessage KiraMessageModule::handleReceived(const meshtastic_MeshPacket &mp)
{
    if (isFromUs(&mp))
        return ProcessMessage::CONTINUE;
    KiraMessage m;
    m.from = mp.from;
    m.to = mp.to;
    m.channel = mp.channel;
    m.rxTime = mp.rx_time ? mp.rx_time : getValidTime(RTCQualityDevice);
    m.atMs = millis();
    size_t len = mp.decoded.payload.size < sizeof(m.text) - 1 ? mp.decoded.payload.size : sizeof(m.text) - 1;
    memcpy(m.text, mp.decoded.payload.bytes, len);
    m.text[len] = 0;
    add(m);
    unreadCount++;
#ifdef HAS_PCA9557
    if (settings().leds) { // kurzes blaues Blinken
        io.digitalWrite(PCA_LED_ENABLE, HIGH);
        io.digitalWrite(PCA_LED_NOTIFICATION, HIGH);
        delay(60);
        io.digitalWrite(PCA_LED_NOTIFICATION, LOW);
    }
#endif
    return ProcessMessage::CONTINUE; // andere Module (Meshtastic, App) bekommen die Nachricht auch
}

bool KiraMessageModule::send(const char *text, uint32_t to, uint8_t channel)
{
    meshtastic_MeshPacket *p = allocDataPacket();
    if (!p)
        return false;
    p->to = to;
    p->channel = channel;
    p->want_ack = to != NODENUM_BROADCAST;
    size_t len = strlen(text);
    if (len > sizeof(p->decoded.payload.bytes))
        len = sizeof(p->decoded.payload.bytes);
    memcpy(p->decoded.payload.bytes, text, len);
    p->decoded.payload.size = len;
    service->sendToMesh(p, RX_SRC_LOCAL, true); // auch an die App
    KiraMessage m;
    m.from = nodeDB->getNodeNum();
    m.to = to;
    m.channel = channel;
    m.rxTime = getValidTime(RTCQualityDevice);
    m.atMs = millis();
    m.outgoing = true;
    strncpy(m.text, text, sizeof(m.text) - 1);
    add(m);
    return true;
}

} // namespace ThinkKira
#endif
