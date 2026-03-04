---
title: "Acessibilidade e arquivos PDF"
summary: ""
featuredImagePreview: /images/accessibility-pdfs-cover-preview.jpg
date: 2026-03-04T10:00:00-03:00
draft: false
toc: false
---

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Acessibilidade

Quando pensamos sobre **acessibilidade**, imaginamos como algo projetado para uma pequena minoria. A realidade é muito mais ampla: **16% da população mundial — 1,3 bilhão de pessoas — vivem com algum tipo de deficiência significativa**[¹](https://www.who.int/news-room/fact-sheets/detail/disability-and-health). Só no **Brasil**, onde eu moro, isso significa cerca de **14,4 milhões de pessoas que relatam alguma forma de deficiência**[²](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/43477-censo-2022-brasil-tem-14-4-milhoes-de-pessoas-com-deficiencia). E esses números capturam apenas deficiências permanentes.

Se incluirmos envelhecimento, gravidez, lesões, dores crônicas, fadiga, ou mesmo pais empurrando carrinhos de bebê por calçadas esburacadas, **a acessibilidade se torna uma experiência humana universal**. Ou seja, a vida urbana gera constantemente barreiras cognitivas e físicas — escadas, portas estreitas, placas ilegíveis, fontes minúsculas, calçamentos irregulares, mares de carros.

{{< /style >}}

{{< figure src="/images/accessibility-pdfs-cover.png" alt="Rua alagada em uma praia brasileira" caption="Rua alagada na Praia da Bacia da Vovó." >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Acessibilidade Digital: arquivos PDF

Acessibilidade não é apenas sobre rampas, calçadas e barreiras físicas. O mundo digital também precisam ser acessível. Um exemplo: **arquivos PDF**.

A maioria dos PDFs não são criados com acessibilidade em mente. Podem parecer bem na tela, mas tecnologias assistivas — leitores de tela, por exemplo — não conseguem interpretá-los. A alternativa é um **PDF tagueado**, ou seja, um que contenha uma estrutura oculta como títulos, parágrafos, listas, tabelas, ordem de leitura. Para usuários cegos, disléxicos ou que usam leitores de tela, um PDF tagueado é a diferença entre ler e não ler.

## Contribuições da Igalia para PDFs Tagueados

Recentemente, o **visualizador de PDFs integrado ao Chrome** tem tido grandes melhorias. Ele cada vez mais **reconhece tags de acessibilidade**, **expõe a estrutura da página para leitores de tela** e **respeita a ordem semântica** em vez do layout visual.

Este é o tipo de engenharia que torna a web mais legível para mais pessoas — e é um trabalho ao qual a **[Igalia](https://www.igalia.com)** tem contribuído [nos últimos meses](https://chromium-review.googlesource.com/q/hashtag:%22export-tagged-pdfs%22+OR+hashtag:%22tagged-pdfs%22+(status:open+OR+status:merged)).

{{< /style >}}

{{< youtube ES7TgUB3oq8 >}}

{{< spacer "0.75em" >}}

{{< youtube cwpO5_w3kEo >}}

{{< spacer "0.75em" >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

Os dois vídeos acima mostram o Chrome antes e depois das nossas mudanças. No segundo, com PDFs Tagueados habilitado (`--enable-features=PdfTags`), o Chrome lê a estrutura de acessibilidade do documento em vez de ignorá-la. O ChromeVox, a ferramenta de leitor de tela, detecta todos os quatro *headers*, e as imagens aparecem na ordem definida pela estrutura.

{{< /style >}}

{{< callout >}}
Ao contrário das melhorias no mundo físico, a infraestrutura de acessibilidade digital, uma vez implantada, alcança o mundo todo, com o Chrome chegando a bilhões de pessoas.
{{< /callout >}}
