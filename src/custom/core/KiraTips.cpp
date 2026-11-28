// SPDX-License-Identifier: GPL-3.0-only
#include "KiraTips.h"
#include "FSCommon.h"
#include "SPILock.h"
#include "configuration.h"

namespace ThinkKira
{

static const char *PATH = "/kira/tips.txt";
static std::vector<Tip> list;
static bool loaded = false;

bool parseTips(const std::string &text, std::vector<Tip> &out, std::string &error)
{
    out.clear();
    size_t pos = 0, lineNo = 0;
    while (pos < text.size()) {
        size_t nl = text.find('\n', pos);
        if (nl == std::string::npos)
            nl = text.size();
        std::string line = text.substr(pos, nl - pos);
        pos = nl + 1;
        lineNo++;
        if (!line.empty() && line.back() == '\r')
            line.pop_back();
        if (line.empty())
            continue;
        if (line[0] == 'T') {
            if (out.size() >= TIPS_MAX_COUNT) {
                error = "höchstens " + std::to_string(TIPS_MAX_COUNT) + " Tipps";
                return false;
            }
            out.push_back({line.substr(1), ""});
        } else if (line[0] == 'L' && !out.empty()) {
            if (!out.back().text.empty())
                out.back().text += '\n';
            out.back().text += line.substr(1);
        } else {
            error = "Zeile " + std::to_string(lineNo) + ": ungültig";
            return false;
        }
    }
    return true;
}

static void load()
{
    loaded = true;
    std::string text, err;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    File f = FSCom.open(PATH, FILE_O_READ);
    if (f) {
        while (f.available() && text.size() < TIPS_MAX_TEXT)
            text += (char)f.read();
        f.close();
    }
#endif
    if (!parseTips(text, list, err))
        list.clear();
}

const std::vector<Tip> &tips()
{
    if (!loaded)
        load();
    return list;
}

std::string tipsText()
{
    std::string t;
    for (const Tip &tip : tips()) {
        t += "T" + tip.title + "\n";
        size_t p = 0;
        while (p <= tip.text.size() && !tip.text.empty()) {
            size_t nl = tip.text.find('\n', p);
            if (nl == std::string::npos)
                nl = tip.text.size();
            t += "L" + tip.text.substr(p, nl - p) + "\n";
            p = nl + 1;
        }
    }
    return t;
}

bool setTipsText(const std::string &text, std::string &error)
{
    if (text.size() > TIPS_MAX_TEXT) {
        error = "Tipps zu lang";
        return false;
    }
    std::vector<Tip> parsed;
    if (!parseTips(text, parsed, error))
        return false;
#ifdef FSCom
    concurrency::LockGuard g(spiLock);
    if (parsed.empty()) {
        FSCom.remove(PATH);
    } else {
        FSCom.mkdir("/kira");
        File f = FSCom.open(PATH, FILE_O_WRITE);
        if (!f) {
            error = "Tipps konnten nicht gespeichert werden";
            return false;
        }
        f.write((const uint8_t *)text.data(), text.size());
        f.close();
    }
#endif
    list = parsed;
    loaded = true;
    return true;
}

} // namespace ThinkKira
