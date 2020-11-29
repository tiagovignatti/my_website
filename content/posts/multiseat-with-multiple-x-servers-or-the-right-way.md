---
date: 2009-07-24 13:56:33+00:00
draft: false
title: multiseat with multiple X servers (or "the right way")
categories:
- Computing
tags:
- multiseat
- multiterminal
- rac
- vga
- x11
- xorg
- xserver
---

So last week I [posted](http://lkml.org/lkml/2009/7/16/243) on lkml an old patch that we were carrying for a long time in the Linux community. It basically brings the multiple (old) video cards functionally again on Linux and X server (and this time doing on the right and beauty way). For the people that was following multiseat implementations, this is a HUGE step: we will finally be able to discard the old and ugly hack (a mix of Xorg, several Xephyr servers + evdev) and and go to a clean way, starting multiple X servers in parallel. Cool! Well, not that much, because it might take some time to be in your beloved distribution :)

It's too early and I don't know if it's recommended to say this, but if you want to give a try basically you have to get all X components, this [X server patches](http://people.freedesktop.org/~vignatti/vgaarb/), my [libpciaccess](http://cgit.freedesktop.org/~vignatti/libpciaccess/) and Dave's [kernel patchset](http://people.freedesktop.org/~airlied/vgaarb/). Again: it's a **very** unstable work!

If you're concerned with the technical explanations then you can follow the [nice memo](http://airlied.livejournal.com/67628.html) that Dave wrote about this.
