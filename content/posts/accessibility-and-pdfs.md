---
title: "Accessibility and PDF documents"
summary: ""
featuredImagePreview: /images/accessibility-pdfs-cover-preview.jpg
date: 2026-03-04T10:00:00-03:00
draft: tfalsee
toc: false
---

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Accessibility

When we think of **accessibility**, we tend to picture it as something designed for a small minority. The reality is much broader: **16% of the world's population — 1.3 billion people — live with a significant disability**[¹](https://www.who.int/news-room/fact-sheets/detail/disability-and-health). In **Brazil** alone, where I live, that means around **14.4 million people report some form of disability**[²](https://agenciadenoticias.ibge.gov.br/en/agencia-news/2184-news-agency/news/43477-2022-census-brazil-has-14-4-million-persons-with-disabilities). And those numbers capture only permanent disabilities.

If you include aging, pregnancy, injuries, chronic pain, fatigue, or even parents pushing strollers over broken sidewalks, **accessibility becomes a universal human experience**. Urban life constantly generates cognitive and physical barriers — stairs, narrow doors, unreadable signs, tiny fonts, irregular paving, seas of cars.

{{< /style >}}

{{< figure src="/images/accessibility-pdfs-cover.png" alt="Flooded street in a Brazilian coastal neighborhood" caption="Flooded street in Praia da Bacia da Vovó." >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Digital Accessibility: PDF documents

Accessibility is not only ramps, sidewalks and physical barriers. Digital spaces also need to be accessible. One example: **PDF documents**.

Most PDFs are not built with accessibility in mind. They may look fine on screen, but assistive technologies — screen readers, for instance — can't interpret them. The alternative is a **tagged PDF** i.e. one that contains a hidden structure like headings, paragraphs, lists, tables, reading order. For blind, dyslexic or screen-reader users, a tagged PDF is the difference between reading and not reading.

## Igalia Contributions to Tagged PDFs

Recently, the **built-in Chrome PDF viewer** has been making major improvements. It increasingly **recognizes accessibility tags**, **exposes page structure to screen readers**, and **respects semantic order** rather than visual layout.

This is the kind of engineering that makes the web more legible to more people — and it's work **[Igalia](https://www.igalia.com)** has been contributing [over the past few months](https://chromium-review.googlesource.com/q/hashtag:%22export-tagged-pdfs%22+OR+hashtag:%22tagged-pdfs%22+(status:open+OR+status:merged)).

{{< /style >}}

{{< youtube ES7TgUB3oq8 >}}

{{< spacer "0.75em" >}}

{{< youtube cwpO5_w3kEo >}}

{{< spacer "0.75em" >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

The two videos above show Chrome before and after our changes. In the second, with Tagged PDFs enabled (`--enable-features=PdfTags`), Chrome reads the document's accessibility structure rather than ignoring it. ChromeVox, the screen reader tool, detects all four headings, and the images appear in the order defined by the structure tree.

{{< /style >}}

{{< callout >}}
Unlike physical improvements, digital accessibility infrastructure, once deployed, reaches the entire world, with Chrome reaching billions of people.
{{< /callout >}}
