---
date: 2011-04-20 13:35:44+00:00
draft: false
title: X characterization for MeeGo
categories:
- Computing
tags:
- dri2
- GUI
- meego
- xorg
- xres
---

Actually this is not a big news but it's nice to see on practice X being used on the advanced age :) Here I've played with some UI configuration settings, browsed for while, toyed with facebook, opened some photos in the viewer and etc, all for about 5 minutes:

[![](http://vignatti.files.wordpress.com/2011/04/x-meego-apr20111.png?w=300)
](http://vignatti.files.wordpress.com/2011/04/x-meego-apr20111.png)
[x-meego-Apr2011](http://vignatti.files.wordpress.com/2011/04/x-meego-apr2011.pdf)

and zooming in the X11 core slice we have:

[![](http://vignatti.files.wordpress.com/2011/04/x-meego-x11only-apr2011.png?w=1024)
](http://vignatti.files.wordpress.com/2011/04/x-meego-x11only-apr2011.png)
[x-meego-x11only-Apr2011](http://vignatti.files.wordpress.com/2011/04/x-meego-x11only-apr2011.pdf)


Moral of the story: as showed on the last figure, most of the traffic from the core protocol is related with window management, window state changes and notifications of positioning for clients. Actual drawing doesn't happen on the core X11 at all. Everything goes through GL, GLES and similar APIs where DRI2 manages in some way them. And well, XRender is something to be deprecated soon on modern UIs. Its big slice part there is due a bug on Qt for not proper disabling glyphs for font rendering still. Another interesting fact (not on those figures) is that compositor manager is taking ~15% of the total interaction with X server - so then again, not big news for us.

---
This doesn't necessarily need to use the recent Erkki and Rami's XRes additions for doing [client tracking in the server side](https://gitorious.org/meego-w40/x11proto-resource/commit/54de841a628c67197b232e27c1695118a30d3607), but for who likes to hack on the server side, it's quite easy to do. The hack I've done with Pauli's help and using XRes version 1.2 is on [this branch](http://cgit.freedesktop.org/~vignatti/xserver/log/?h=client-logging).
