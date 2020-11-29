---
date: 2010-12-29 19:46:07+00:00
draft: false
title: 'late Christmas gift: freedesktop''s Xorg for MeeGo'
categories:
- Computing
tags:
- freedesktop
- maemo
- meego
- nokia
- vignatti
- x
- xorg
---

Moikka.

If you follow [here](http://gitorious.org/meego-w40) [0] you will see a set of Debian packages that Graphics team at Nokia are continuously working to deploy a X11 implementation for [MeeGo-Harmattan](http://wiki.meego.com/Glossary#M), where we target embedded systems only. Feel free to use it!

---
At this point, we are very proud of ourselves because 99% of the content on these repositories are based on the ones at X main-stream of development. IWO we are directly fetching the X code-base from freedesktop.org. More important, we are shaping freedesktop implementation for embedded devices. So at this moment, we are pretty much aligned with X version 1.9.2, plus a few of other commits from master branch; the rest of components, like client side libraries, are mostly what we have on freedesktop master also.

We are quite happy because it follows exactly what we've planned some time ago when we strategically decided to contribute to X at freedesktop community, centralizing the development there and not ignoring it. So, no-no for kdrive, no-no for massively code-drop on the top of freedesktop's, no-no for a proprietary X implementation, no-no for major hacks or anything like that. Aside from the video driver stack, everything was dumped at freedesktop.

Next, the plan pretty much fits with MeeGo-MeeGo cause we just needs to get the work we've been doing straight from freedesktop, avoiding any cross fetching between down-streams of development. Hyvää!

[0] yeah, the name of the repository is not trivial at all - and probably we will change it in a near future. So poke me if you need this later on.
