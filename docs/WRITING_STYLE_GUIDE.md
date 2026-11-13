# Fix AI Writing

The public Markdown source is [resources/fix-ai-writing.md](resources/fix-ai-writing.md).
The original private file in the author's Work directory is not modified.
The public edition removes internal task-contract references and the private QC anecdote.
Every PDF page has a linked credit: `Created by Roman Travnikov | travnikov.dev`.

Public routes:

- Guide landing page: `https://travnikov.dev/fix-ai-writing/`
- PDF: `https://travnikov.dev/downloads/fix-ai-writing.pdf`
- Automatic download page: `https://travnikov.dev/downloads/fix-ai-writing/`

The download page attempts one same-origin download using the HTML download
attribute. Browser settings can still require confirmation or block automatic
downloads. The visible download link works without JavaScript. Opening the raw
PDF URL may use the browser's PDF viewer. No attachment response header is
configured by this change.

The landing page explains the guide with an example edit and a real PDF preview.
The homepage promotes it immediately after the hero. Insights links to it above
the article list, and the shared footer includes it under Resources. The landing
page has its own SEO metadata; all three public routes appear in the sitemap.
The earlier provisional filenames were never deployed and are not published as
duplicate copies.

To regenerate the PDF, use Python 3.10 or newer with `reportlab` installed:

```sh
python3 scripts/build-writing-style-guide.py
```

The PDF is committed under `static/downloads/`; Gatsby copies it unchanged.
The production build does not install Python or regenerate the PDF. PDF review
renders and extraction caches belong in gitignored local working directories.
