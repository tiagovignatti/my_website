---
date: 2010-01-23 17:20:25+00:00
draft: false
title: Customization and true modularization of Xorg
categories:
- Computing
tags:
- customization
- modularization
- n900
- nokia
- x11
- xorg
---

For the first time in life, Xorg is being used in [a single platform](http://maemo.org/) and for [a given device](http://maemo.nokia.com/n900/) only (other devices have used an X11 implementation but using other non-canonical servers, such kdrive's based - Tiny-X).

Previously Xorg was being packed to run in a huge amount of OSes - mostly Linux and Unix-like distributions - with the characteristic of be architecture portable and able to run on a huge set of video and input devices. In terms of software, this means an extensive amount of code able to cover all of this mentioned. But this is far from the needs of a small and single platform device.

---

Some days ago, at #xorg-devel, [Alan](http://blogs.sun.com/alanc/) mentioned the following:


06:59 < alanc> vignatti: the whole point of Xorg is to drive video output - where else would you possibly sanely put that code?
07:00 < alanc> I think you're going overboard in the drive to remove all code from Xorg


Alan was referring about my previous comment to remove some code of _video memory mapping_ from server... I understand (and respect a lot) his concerns but lemme put this right here: it's not about removal of code; I don't even care if the code is in xserver or not; what I do care is about the _customization_ - or more fancy, the _true modularization_ [0] - of Xorg.

---

As [discussed](http://www.inf.ufpr.br/vignatti/talks/xdc2009-nokia.pdf) on the last X conference, we're aiming to _optionalize_ [1] lot of components inside Xorg: distros would build all components, satisfying all supported devices and drivers, whereas constrained environments (such as maemo + n900) would use a restrict set only.

So recently I've been confusing people's mind trying to in fact optionalize several components of the server. There are some straightforward modifications on the code like turn off [libdrm](http://lists.x.org/archives/xorg-devel/2010-January/005138.html), [vgahw](http://cgit.freedesktop.org/xorg/xserver/commit/?id=53d64930513fecaa417bb5a922966b45c9ff8679) or libxdmcp, but there's also other more challenger like all the [old-school mechanism](http://lists.x.org/archives/xorg-devel/2010-January/004853.html) to initialise cards, to [remove cursor support](http://lists.x.org/archives/xorg-devel/2009-August/001801.html) or even to choose if [we want or not all bus subsystem](http://lists.x.org/archives/xorg-devel/2009-September/001969.html). Sometimes we'll have to be careful to not [run out of the protocol](http://lists.x.org/archives/xorg-devel/2009-October/003065.html). But the truth is: the currently the code is _very_ tied all over the server. It's not trivial to "get there".

IMHO the plan traced at XDC looks perfectly clear and while other display systems seems not suitable enough for us yet, I'll be keep digging on this direction.

[0] the modularization that happened in the version 1.0 was related with drivers going outside the server.

[1] what would be a good word here?
