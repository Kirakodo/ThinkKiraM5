// ThinkKira – Statusseite: Version, GPS-Hardware, Akku, Speicher
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#if defined(THINKKIRA) && defined(MESHTASTIC_INCLUDE_INKHUD)

#include "concurrency/OSThread.h"
#include "graphics/niche/InkHUD/Applet.h"

namespace ThinkKira
{

class StatusApplet : public NicheGraphics::InkHUD::Applet, private concurrency::OSThread
{
  public:
    StatusApplet();
    void onForeground() override;
    void onBackground() override;
    void onRender(bool full) override;

  private:
    int32_t runOnce() override;
    static constexpr uint32_t REFRESH_MS = 30 * 1000; // E-Ink schonen: höchstens alle 30 s
    uint8_t renderedPercent = 255;
    bool renderedLock = false;
    uint32_t renderedNodes = 0;
};

} // namespace ThinkKira

#endif
