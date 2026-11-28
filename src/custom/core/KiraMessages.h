// ThinkKira – die letzten Textnachrichten für die eigene Oberfläche + Senden von Vorlagen.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once
#include "mesh/SinglePortModule.h"
#include <stdint.h>

namespace ThinkKira
{

struct KiraMessage {
    uint32_t from = 0;   // Absender (eigene Nummer bei gesendeten)
    uint32_t to = 0;     // Empfänger (Broadcast oder Knoten)
    uint8_t channel = 0;
    uint32_t rxTime = 0; // Unix-Zeit, 0 = unbekannt
    uint32_t atMs = 0;
    bool outgoing = false;
    char text[120] = {0};
};

constexpr int MSG_MAX = 12;

class KiraMessageModule : public SinglePortModule
{
  public:
    KiraMessageModule();
    int count() const { return n; }
    const KiraMessage &get(int i) const; // 0 = neueste
    int unread() const { return unreadCount; }
    void markRead() { unreadCount = 0; }
    void clear();
    // Sendet Text an einen Knoten (oder an alle: NODENUM_BROADCAST) auf Kanal channel
    bool send(const char *text, uint32_t to, uint8_t channel = 0);

  protected:
    ProcessMessage handleReceived(const meshtastic_MeshPacket &mp) override;

  private:
    void add(const KiraMessage &m);
    KiraMessage ring[MSG_MAX];
    int head = 0, n = 0, unreadCount = 0;
};

extern KiraMessageModule *kiraMessages;

// Feste Schnellantworten (später im Konfigurator einstellbar)
extern const char *const QUICK_REPLIES[];
extern const int QUICK_REPLY_COUNT;

} // namespace ThinkKira
