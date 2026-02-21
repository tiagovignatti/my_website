---
title: "Acessibilidade e arquivos PDF"
summary: ""
featuredImagePreview: /images/accessibility-pdfs-cover-preview.jpg
date: 2026-02-20T10:00:00-03:00
draft: true
toc: false
---

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

## Acessibilidade

Quando pensamos em acessibilidade, tendemos a imaginá-la como algo projetado para uma pequena minoria. A realidade é muito mais ampla: **16% da população mundial — 1,3 bilhão de pessoas — vivem com algum tipo de deficiência significativa**[¹](https://www.who.int/news-room/fact-sheets/detail/disability-and-health). Só no **Brasil**, cerca de **14,4 milhões de pessoas relatam alguma forma de deficiência**[²](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/43477-censo-2022-brasil-tem-14-4-milhoes-de-pessoas-com-deficiencia).

E esses números capturam apenas deficiências permanentes. Se incluirmos o envelhecimento, gravidez, lesões, dores crônicas, fadiga, ou mesmo pais empurrando carrinhos de bebê por calçadas esburacadas, **a acessibilidade se torna uma experiência humana universal**. A vida urbana gera constantemente barreiras cognitivas e físicas — escadas, portas estreitas, placas ilegíveis, fontes minúsculas, calçamentos irregulares, mares de carros.

{{< /style >}}

{{< figure src="/images/accessibility-pdfs-cover.png" alt="Calçada alagada em um bairro litorâneo brasileiro" caption="Rua alagada na Praia da Bacia da Vovó." >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

Na maioria das cidades brasileiras, se você vai de bicicleta ao trabalho ou à praia, já lidou com os obstáculos de sempre: buracos, meio-fio, carros estacionados ilegalmente. Agora imagine fazer isso aos 70 anos.
## Acessibilidade Digital: arquivos em PDF

Acessibilidade não é apenas rampas, calçadas e barreiras físicas. Espaços digitais funcionam da mesma maneira. Um exemplo: **arquivos em PDF**.

A maioria dos PDFs são essencialmente imagens de texto. Podem parecer bem na tela, mas tecnologias assistivas — leitores de tela, por exemplo — não conseguem interpretá-los. Eles excluem pessoas da educação, governo, ciência, finanças.

A alternativa é **um PDF "tagueado", ou seja, um que contenha estrutura como títulos, parágrafos, listas, tabelas, ordem de leitura**. Para usuários cegos, disléxicos ou que usam leitores de tela, um PDF tagueado é a diferença entre ler e não ler.

## Contribuições da Igalia para PDFs Tagueados

Recentemente, o **visualizador de PDF integrado do Chrome** tem feito grandes melhorias. Ele cada vez mais **reconhece tags de acessibilidade**, **expõe a estrutura da página para leitores de tela** e **respeita a ordem semântica** em vez do layout visual.

Este é o tipo de engenharia invisível que multiplica direitos humanos — e é exatamente **o trabalho que temos contribuído na Igalia** [nos últimos meses](https://chromium-review.googlesource.com/q/hashtag:%22export-tagged-pdfs%22+OR+hashtag:%22tagged-pdfs%22+(status:open+OR+status:merged)).

{{< /style >}}

{{< youtube ES7TgUB3oq8 >}}

{{< spacer "0.75em" >}}

{{< youtube cwpO5_w3kEo >}}

{{< spacer "0.75em" >}}

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

No segundo vídeo, vemos resultados promissores ao executar o Chrome com PDFs Tagueados habilitados (`--enable-features=PdfTags`). Graças às melhorias da Igalia, o Chrome agora se baseia na estrutura de acessibilidade do documento sempre que um PDF a fornece. Como mostrado, o ChromeVox detecta todos os quatro títulos, e as imagens mantêm sua ordem pretendida, conforme definido pela árvore de estrutura.

{{< /style >}}

{{< callout >}}
A beleza da infraestrutura de acessibilidade digital é que ela funciona como calçadas ou ciclovias, mas implantada uma vez, alcança todo mundo.
{{< /callout >}}
