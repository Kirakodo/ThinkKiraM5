// ThinkKira – Funkseite: Modus, Zähler, zuletzt gehörte Pakete (RSSI/SNR), Reichweitentest
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#if defined(THINKKIRA) && defined(MESHTASTIC_INCLUDE_INKHUD)

#include "concurrency/OSThread.h"
#include "graphics/niche/InkHUD/Applet.h"

namespace ThinkKira
{

class RadioApplet : public NicheGraphics::InkHUD::Applet, private concurrency::OSThread
{
  public:
    RadioApplet();
    void onForeground() override;
    void onBackground() override;
    void onRender(bool full) override;

  private:
    int32_t runOnce() override;
    static constexpr uint32_t REFRESH_MS = 30 * 1000; // E-Ink schonen: höchstens alle 30 s
    uint32_t renderedRx = UINT32_MAX;
    uint32_t renderedPongs = UINT32_MAX;
};

} // namespace ThinkKira

#endif
