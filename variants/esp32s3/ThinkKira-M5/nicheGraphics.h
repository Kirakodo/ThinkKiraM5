// ThinkKira: Kopie von variants/esp32s3/ELECROW-ThinkNode-M5/nicheGraphics.h mit eigenen Applets.
// Wird über die Include-Reihenfolge in der Env thinknode_m5_custom statt der Meshtastic-Datei benutzt.
#pragma once

#include "configuration.h"

#ifdef MESHTASTIC_INCLUDE_NICHE_GRAPHICS

// InkHUD-specific components
// ---------------------------
#include "graphics/niche/InkHUD/InkHUD.h"

// ThinkKira: eigene Oberfläche statt der InkHUD-Standard-Applets
#include "custom/core/KiraSystem.h"
#include "custom/features.h"
#include "custom/ui/KiraShell.h"

// Shared NicheGraphics components
// --------------------------------
#include "graphics/niche/Drivers/EInk/GDEY0154D67.h"
#include "graphics/niche/Inputs/TwoButton.h"

// Button feedback
#include "buzz.h"

void setupNicheGraphics()
{
    using namespace NicheGraphics;

    // SPI
    // -----------------------------

    // Panel is on HSPI
    SPIClass *hspi = new SPIClass(HSPI);
    hspi->begin(PIN_EINK_SCLK, -1, PIN_EINK_MOSI, PIN_EINK_CS);

    // E-Ink Driver
    // -----------------------------

    Drivers::EInk *driver = new Drivers::GDEY0154D67;
    driver->begin(hspi, PIN_EINK_DC, PIN_EINK_CS, PIN_EINK_BUSY, PIN_EINK_RES);

    // InkHUD
    // ----------------------------

    InkHUD::InkHUD *inkhud = InkHUD::InkHUD::getInstance();

    // Set the E-Ink driver
    inkhud->setDriver(driver);

    // Set how many FAST updates per FULL update
    // Set how unhealthy additional FAST updates beyond this number are
    // Currently set to the values given by Elecrow for EInkDynamicDisplay.
    inkhud->setDisplayResilience(10, 1.5);

    // Select fonts
    InkHUD::Applet::fontLarge = FREESANS_12PT_WIN1252;
    InkHUD::Applet::fontMedium = FREESANS_9PT_WIN1252;
    InkHUD::Applet::fontSmall = FREESANS_6PT_WIN1252;

    // Customize default settings
    inkhud->persistence->settings.userTiles.maxCount = 1;                // ThinkKira: eine Oberfläche, ganzer Bildschirm
    inkhud->persistence->settings.optionalFeatures.batteryIcon = false;  // Akku zeigt die Oberfläche selbst
    inkhud->persistence->settings.optionalFeatures.notifications = false; // Nachrichten zeigt die Oberfläche selbst
    inkhud->persistence->settings.tips.firstBoot = false;                 // kein InkHUD-Tutorial

    // Setup backlight controller
    // LatchingBacklight not used due to backlight being on GPIO expander
    // Note: button is attached further down
    auto backlight = [](bool on) { io.digitalWrite(PCA_PIN_EINK_EN, on ? HIGH : LOW); };
    backlight(false); // start dark

    // ThinkKira-Oberfläche als einziges Applet
    ThinkKira::Shell *shell = new ThinkKira::Shell(Inputs::TwoButton::getUserButtonPin(), PIN_BUTTON2, backlight);
    inkhud->addApplet("ThinkKira", shell, true, false, 0);

    // ThinkKira: Hardware-Bericht ins Boot-Log
    ThinkKira::startBootReport();

    // Start running InkHUD
    inkhud->begin();

    // Buttons
    // --------------------------

    Inputs::TwoButton *buttons = Inputs::TwoButton::getInstance(); // Shared NicheGraphics component

    // Elecrow diagram: https://www.elecrow.com/download/product/ILM13205D/ThinkNode_M5_User_Manual.pdf

    // #0: Haupttaste (unten): kurz = weiter, lang = Menü/Auswahl, 4 s = Ausschalten (misst die Oberfläche)
    buttons->setWiring(0, Inputs::TwoButton::getUserButtonPin(), true);
    buttons->setTiming(0, 50, 500);
    buttons->setHandlerDown(0, [shell]() { shell->keyDown(); });
    buttons->setHandlerShortPress(0, [inkhud]() { inkhud->shortpress(); });
    buttons->setHandlerLongPress(0, [inkhud]() { inkhud->longpress(); });

    // #1: Zweittaste (oben): kurz = zurück, lang = Startseite, 3 s = SOS (misst die Oberfläche)
    buttons->setWiring(1, PIN_BUTTON2, true);
    buttons->setTiming(1, 50, 500);
    buttons->setHandlerDown(1, [shell]() { shell->keyDown(); });
    buttons->setHandlerShortPress(1, [shell]() { shell->auxShort(); });
    buttons->setHandlerLongPress(1, [shell]() { shell->auxLong(); });

    // Begin handling button events
    buttons->start();
}

#endif
