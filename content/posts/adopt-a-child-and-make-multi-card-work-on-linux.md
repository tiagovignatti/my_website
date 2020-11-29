---
date: 2010-06-23 15:12:11+00:00
draft: false
title: adopt a child and make multi-card work on Linux
categories:
- Computing
tags:
- linux
- multicard
- multiseat
- x11
- xorg
---

_Previously, the [message was for toolkit](http://vignatti.wordpress.com/2010/06/15/toolkit-please-xlib-xcb/), now it targets new upcoming developers... okay, if I'd be offensive I could say it targets vendor distributions which care for desktop on Linux :)_

---

I have started hacking on X due the [laboratory at my university](http://www.c3sl.ufpr.br/) I was working was running an [amazing project](http://pt.wikipedia.org/wiki/Paran%C3%A1_Digital) to employ computer labs in all high-schools of the state I was living, in Brazil. It was a successful and all 2.100 schools used the [multiseat computing model](http://en.wikipedia.org/wiki/Multiseat_configuration).

The beginning of my work in this project happened back in 2006 [0], and on that time I was trying to understand the situation that Linux using multiple graphics cards was living - that is only part of the needed work for making multiseat. The work proceeded but I never could actually push the patches to the mainline. Afterwards, and now at Nokia, I took this work again targeting some clean-up on X server code. It mostly went upstream (see [VGA arbiter](http://www.linuxhq.com/kernel/v2.6/32/Documentation/vgaarbiter.txt), libpciaccess and current xserver code). But [the code is buggy](http://lists.x.org/archives/xorg-devel/2010-June/009906.html) and lot of work still needs to make it work properly. 

---

Seems that I have a son now, but he (or should be she?) is a rebel baby and generates lot of trouble. Rather, I'm mean and want to give he away!

---

I don't care about multi-card development nowadays and for an unknown reason no one also cares. But people use a lot: try to mix old graphics cards with new cards.... boom! Try to use multi-card with decent hw acceleration... boom! Try to hotplug graphics devices... no way! Hotswitch... [hardly](http://airlied.livejournal.com/71734.html)! Perform close to a single-card system... only in your dream! Some guys are kindly contributing [sending patches](http://lists.x.org/archives/xorg-devel/2010-June/009906.html) for a while and unfortunately our open-source community are lacking man-power to make it get reviewed properly and eventually land at upstream.  So here's your big chance:

**ADOPT IT!**



[0] BTW, I found the [first patch I sent for X](https://bugs.freedesktop.org/show_bug.cgi?id=6489). It dates back in April 2006 and was against Xgl, GLX backend. Very funny :)
