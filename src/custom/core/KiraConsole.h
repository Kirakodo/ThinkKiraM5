// ThinkKira – Textbefehle über USB-Seriell ("kira help")
// Bekommt alle Bytes, die nicht zu einem Meshtastic-Protobuf-Frame gehören.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#ifdef THINKKIRA
#include <stdint.h>

namespace ThinkKira
{
void consoleFeed(uint8_t c);
}
#endif
