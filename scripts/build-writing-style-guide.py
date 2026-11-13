#!/usr/bin/env python3
"""Render the public Markdown guide to the website's downloadable PDF.

Requires reportlab. Run from any directory with Python 3.10 or newer.
The PDF is committed; the Gatsby deployment does not need Python.
"""

from html import escape
from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/resources/fix-ai-writing.md"
OUTPUT = ROOT / "static/downloads/fix-ai-writing.pdf"
SITE = "https://travnikov.dev/"
INK = colors.HexColor("#29323A")
MUTED = colors.HexColor("#586770")
ACCENT = colors.HexColor("#365F66")
RULE = colors.HexColor("#D9DEDE")
PAGE_W, PAGE_H = A4
MARGIN = 52
CONTENT_W = PAGE_W - 2 * MARGIN


def inline(text):
    """The guide uses plain text and Markdown links, with no executable markup."""
    pieces, start = [], 0
    for match in re.finditer(r"\[([^\]]+)\]\((https://[^)]+)\)", text):
        pieces.append(escape(text[start:match.start()]))
        pieces.append(
            f'<link href="{escape(match[2], quote=True)}" color="#365F66">'
            f'{escape(match[1])}</link>'
        )
        start = match.end()
    pieces.append(escape(text[start:]))
    return "".join(pieces)


styles = {
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=29,
                            leading=33, textColor=INK, spaceAfter=13),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=16,
                         leading=20, textColor=INK, spaceBefore=16, spaceAfter=8,
                         keepWithNext=True),
    "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11.5,
                         leading=15, textColor=INK, spaceBefore=12, spaceAfter=6,
                         keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.7,
                           leading=14.3, textColor=INK, spaceAfter=8,
                           allowWidows=0, allowOrphans=0),
    "byline": ParagraphStyle("byline", fontName="Helvetica", fontSize=10,
                             leading=15, textColor=MUTED, spaceAfter=8),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.7,
                             leading=14.3, textColor=INK, leftIndent=11,
                             firstLineIndent=0, bulletIndent=0, spaceAfter=8,
                             allowWidows=0, allowOrphans=0),
    "table": ParagraphStyle("table", fontName="Helvetica", fontSize=9,
                            leading=13, textColor=INK, alignment=TA_LEFT),
    "tablehead": ParagraphStyle("tablehead", fontName="Helvetica-Bold",
                                fontSize=9, leading=13, textColor=INK),
}


def furniture(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(ACCENT)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(MARGIN, PAGE_H - 33, "TRAVNIKOV.DEV")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 33, "Fix AI Writing")
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 47, PAGE_W - MARGIN, 47)
    credit = "Created by Roman Travnikov | travnikov.dev"
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ACCENT)
    canvas.drawString(MARGIN, 31, credit)
    width = canvas.stringWidth(credit, "Helvetica", 8)
    canvas.linkURL(SITE, (MARGIN, 28, MARGIN + width, 42), relative=0, thickness=0)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - MARGIN, 31, str(doc.page))
    canvas.restoreState()


class GuideDocument(BaseDocTemplate):
    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "h2":
            title = flowable.getPlainText()
            key = "section-" + re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title, key, level=0, closed=False)


def build():
    text = SOURCE.read_text(encoding="utf-8")
    blocks = re.split(r"\n\s*\n", text.strip())
    flow = []
    for block in blocks:
        lines = block.splitlines()
        if block.startswith("# "):
            flow.append(Paragraph(inline(block[2:]), styles["title"]))
        elif block.startswith("### "):
            flow.append(Paragraph(inline(block[4:]), styles["h3"]))
        elif block.startswith("## "):
            flow.append(Paragraph(inline(block[3:]), styles["h2"]))
        elif block.startswith("| "):
            rows = []
            for row in lines:
                cells = [x.strip() for x in row.strip().strip("|").split("|")]
                if all(re.fullmatch(r":?-+:?", cell) for cell in cells):
                    continue
                style = styles["tablehead" if not rows else "table"]
                rows.append([Paragraph(inline(cell), style) for cell in cells])
            table = Table(rows, colWidths=[CONTENT_W * .29, CONTENT_W * .71],
                          repeatRows=1, hAlign="LEFT")
            table.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#EEF2F2")),
                ("LINEBELOW", (0, 0), (-1, 0), .6, RULE),
                ("LINEBELOW", (0, 1), (-1, -1), .3, RULE),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]))
            flow.extend([table, Spacer(1, 10)])
        elif block.startswith("* "):
            for line in lines:
                assert line.startswith("* "), f"Unexpected list continuation: {line}"
                paragraph = Paragraph(inline(line[2:]), styles["bullet"], bulletText="-")
                flow.append(KeepTogether([paragraph]))
        else:
            style = styles["byline"] if block.startswith(("By [", "Public edition |")) else styles["body"]
            flow.append(Paragraph(inline(" ".join(lines)), style))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document = GuideDocument(
        str(OUTPUT), pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=61, bottomMargin=65, title="Fix AI Writing",
        author="Roman Travnikov", subject="A guide to editing AI-generated text",
        creator="Roman Travnikov | travnikov.dev",
        keywords="fix AI writing, editing AI-generated text, writing rules, factual accuracy, Roman Travnikov",
        pageCompression=1,
    )
    document.addPageTemplates(PageTemplate(
        id="guide", frames=[Frame(MARGIN, 65, CONTENT_W, PAGE_H - 126,
                                  leftPadding=0, rightPadding=0,
                                  topPadding=0, bottomPadding=0)],
        onPage=furniture,
    ))
    # Keep a heading with its first paragraph, including paragraphs wrapped in
    # KeepTogether for list rules. A heading's keepWithNext alone does not keep
    # that nested container together when the page is nearly full.
    grouped, index = [], 0
    while index < len(flow):
        item = flow[index]
        if (isinstance(item, Paragraph) and item.style.name in {"h2", "h3"}
                and index + 1 < len(flow)):
            following = flow[index + 1]
            content = following._content if isinstance(following, KeepTogether) else [following]
            grouped.append(KeepTogether([item, *content]))
            index += 2
        else:
            grouped.append(item)
            index += 1
    document.build(grouped)
    print(f"Created {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    build()
