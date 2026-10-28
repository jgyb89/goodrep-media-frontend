import os
import subprocess
from fontTools.ttLib import TTFont

FONT_SOURCE = "node_modules/material-symbols/material-symbols-outlined.woff2"
FONT_TARGET = "public/fonts/material-symbols-outlined-subset.woff2"

font = TTFont(FONT_SOURCE)
gsub = font["GSUB"].table

target_words = [
    "accessibility_new", "account_tree", "add_link", "ads_click", "alt_route",
    "analytics", "apps", "arrow_back", "arrow_forward", "arrow_upward",
    "article", "aspect_ratio", "auto_awesome", "autorenew", "bolt", "brush",
    "cached", "calendar_month", "calendar_today", "call", "campaign",
    "celebration", "chat", "check_circle", "chevron_left", "chevron_right",
    "cleaning_services", "close", "code", "contact_support", "content_cut",
    "dashboard_customize", "data_object", "design_services", "devices", "done",
    "edit_note", "expand_more", "fact_check", "filter_alt", "find_in_page",
    "flight_takeoff", "folder_special", "forum", "graphic_eq", "grid_view",
    "group", "groups", "handshake", "home", "inventory_2", "keyboard_arrow_up",
    "link", "link_off", "location_on", "mail", "manage_search", "mark_email_read",
    "menu", "menu_book", "monitoring", "movie", "movie_creation", "newspaper",
    "palette", "payments", "perm_media", "photo_camera", "pie_chart", "pin_drop",
    "print", "public", "query_stats", "request_quote", "reviews", "schedule",
    "schema", "search", "share", "shield", "shopping_bag", "shopping_cart",
    "shopping_cart_checkout", "smart_display", "smartphone", "sms", "spa",
    "speed", "star", "storefront", "support_agent", "sync_saved_locally",
    "thumb_up", "trending_down", "trending_up", "troubleshoot", "tune",
    "verified", "verified_user", "videocam", "visibility", "web", "yard"
]

needed_glyphs = set([".notdef", "space"])
char_to_glyph = font.getBestCmap()

# Include ASCII letters, digits, and punctuation used in icon names
for char in "abcdefghijklmnopqrstuvwxyz0123456789_":
    gname = char_to_glyph.get(ord(char))
    if gname:
        needed_glyphs.add(gname)

# Also explicitly include special character glyphs if any
for special in ["underscore", "digit_two", "two", "one", "zero"]:
    if special in font.getGlyphOrder():
        needed_glyphs.add(special)

def normalize_comp(p):
    p_low = p.lower()
    if "underscore" in p_low: return "_"
    if "digit_two" in p_low or p_low == "two": return "2"
    if "digit_one" in p_low or p_low == "one": return "1"
    if "digit_zero" in p_low or p_low == "zero": return "0"
    if "space" in p_low: return " "
    return p_low

for lookup in gsub.LookupList.Lookup:
    for st in lookup.SubTable:
        subtables = [st.ExtSubTable] if hasattr(st, "ExtSubTable") else [st]
        for sub in subtables:
            if hasattr(sub, "ligatures"):
                for first, lig_list in sub.ligatures.items():
                    for lig in lig_list:
                        parts = [first] + list(lig.Component)
                        chars = [normalize_comp(p) for p in parts]
                        word = "".join(chars)
                        if word in target_words:
                            needed_glyphs.add(lig.LigGlyph)
                            for p in parts:
                                needed_glyphs.add(p)
                        if lig.LigGlyph in target_words:
                            needed_glyphs.add(lig.LigGlyph)
                            for p in parts:
                                needed_glyphs.add(p)

for tw in target_words:
    if tw in font.getGlyphOrder():
        needed_glyphs.add(tw)

print(f"Total glyphs to keep in subset: {len(needed_glyphs)}")

cmd = [
    "/tmp/font-venv/bin/pyftsubset",
    FONT_SOURCE,
    f"--glyphs={','.join(needed_glyphs)}",
    "--no-layout-closure",
    "--flavor=woff2",
    "--layout-features=*",
    f"--output-file={FONT_TARGET}"
]

subprocess.run(cmd, check=True)

size_orig = os.path.getsize(FONT_SOURCE)
size_sub = os.path.getsize(FONT_TARGET)
print(f"Subsetting complete!")
print(f"Original size: {size_orig / 1024:.1f} KiB ({size_orig / (1024*1024):.2f} MB)")
print(f"Subset size:   {size_sub / 1024:.1f} KiB")
print(f"Savings:       {(size_orig - size_sub) / 1024:.1f} KiB ({((size_orig - size_sub) / size_orig) * 100:.1f}%)")
