---
title: "Accessibility and PDF documents"
summary: ""
featuredImagePreview: /images/accessibility-pdfs-cover-preview.jpg
date: 2026-02-20T10:00:00-03:00
draft: true
toc: false
---

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Accessibility

When we think of accessibility, we tend to picture it as something designed for a small minority. The reality is much broader: **16% of the world's population — 1.3 billion people — live with a significant disability**[¹](https://www.who.int/news-room/fact-sheets/detail/disability-and-health). In Brazil alone, around **14.4 million people report some form of disability**[²](https://agenciadenoticias.ibge.gov.br/en/agencia-news/2184-news-agency/news/43477-2022-census-brazil-has-14-4-million-persons-with-disabilities).

And those numbers capture only permanent disabilities. If you include aging, pregnancy, injuries, chronic pain, fatigue, or even parents pushing strollers over broken sidewalks, **accessibility becomes a universal human experience**. Urban life constantly generates cognitive and physical barriers — stairs, narrow doors, unreadable signs, tiny fonts, irregular paving, seas of cars.

In most Brazilian cities, if you ride a bike to work or to the beach, you've already dealt with the usual obstacles: potholes, curbs, cars parked illegally. Now imagine doing that at the age of 70.
{{< /style >}}

{{< figure src="/images/accessibility-pdfs-cover.png" alt="Flooded sidewalk in a Brazilian coastal neighborhood" caption="Flooded sidewalk in Praia da Bacia da Vovó neighborhood." >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Digital Accessibility: PDF documents

Accessibility is not only ramps, sidewalks and physical barriers. Digital spaces work the same way. One example: **PDF documents**.

Most PDFs are essentially pictures of text. They may look fine on screen, but assistive technologies — screen readers, for instance — can't interpret them. They shut people out of education, government, science, finance.

The alternative is **a "tagged" PDF i.e. one that contains structure like headings, paragraphs, lists, tables, reading order**. For blind, dyslexic or screen-reader users, a tagged PDF is the difference between reading and not reading.

## Igalia Contributions to Tagged PDFs

Recently, the **built-in Chrome PDF viewer** has been making major improvements. It increasingly **recognizes accessibility tags**, **exposes page structure to screen readers**, and **respects semantic order** rather than visual layout.

This is the kind of invisible engineering that multiplies human rights — and it's exactly **the work we've been contributing to at Igalia** [over the past few months](https://chromium-review.googlesource.com/q/hashtag:%22export-tagged-pdfs%22+OR+hashtag:%22tagged-pdfs%22+(status:open+OR+status:merged)).

{{< /style >}}

{{< youtube ES7TgUB3oq8 >}}

{{< youtube cwpO5_w3kEo >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}


In the second video, we see promising results from running Chrome with Tagged PDFs enabled (`--enable-features=PdfTags`). Thanks to Igalia's improvements, Chrome now relies on the document's accessibility structure whenever a PDF provides one. As shown, ChromeVox detects all four headings, and the images maintain their intended order, as defined by the structure tree.

{{< /style >}}

{{< callout >}}
The beauty of **digital accessibility infrastructure** is that it works like sidewalks or bike lanes, but **deployed once, it reaches everyone**.
{{< /callout >}}
