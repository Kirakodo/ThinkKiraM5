// ThinkKira – meldet die eigenen Module über den Optional-Module-Mechanismus von Meshtastic an
// (bin/optional-modules.py), damit Modules.cpp nicht geändert werden muss.
// SPDX-License-Identifier: GPL-3.0-only
#pragma once

#ifdef THINKKIRA
#include "custom/core/KiraModule.h"
inline void setupThinkKira()
{
    ThinkKira::setupModule();
}
#else
inline void setupThinkKira() {}
#endif
