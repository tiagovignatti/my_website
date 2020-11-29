---
date: 2007-11-23 15:26:39+00:00
draft: false
title: The VGA arbiter
categories:
- Computing
tags:
- vga, arbiter, xorg, xserver, x11
---

So we finally have a working code to do the arbitration of the VGA legacy instructions. The code is separated in three pieces: vgaarb module [0], which is the arbiter itself inside Linux; the libvgaaccess [1], a set of user space functions to access the arbiter; and xf86VGAarbiter [2], the implementation of the library inside Xorg.

Basically we wrapped all the functions of the Xorg which deals with VGA (those wrapped by the RAC and few others) using the lock/unlock functions of the libvgaaccess. Really ugly.

The code was not extensively tested, but we're able to start more than one instance of the Xorg at the same time without having the usual errors (yay, multiseat!). It's a proof-of-concept. We need to discuss and define what would be the best way to integrate the Xorg with the libvgaaccess.

There's an urgent todo which is the lack of DRI support. Currently, the arbitration will probably not work with DRI because it's not guaranteed that the registers will keep a sane state in the case of interruptions. The not so urgent todo is to remove the RAC code [3] from inside the Xorg.

As suggested by benh, at this moment we want to stress mainly the kernel implementation to see if all the requirements were completely achieved, so we can post this to lkml for a complete review. So please, comment this out. We also started a "Theory of Operation" document here [4].

[0] git-clone [http://www.inf.ufpr.br/ribas/repos/vga-module.git](http://www.inf.ufpr.br/ribas/repos/vga-module.git)

[1] git-clone [http://www.inf.ufpr.br/ribas/repos/libvgaaccess.git](http://www.inf.ufpr.br/ribas/repos/libvgaaccess.git)

[2] patch applicable to Xorg 1.4 branch

(99dd8b9414d1eb7aabc682be0b9cfd7a27eb2a6b):

[http://people.freedesktop.org/~vignatti/xf86VGAArbiter-22Nov.diff](http://people.freedesktop.org/%7Evignatti/xf86VGAArbiter-22Nov.diff)

or git-clone [http://www.inf.ufpr.br/ribas/repos/xserver.git](http://www.inf.ufpr.br/ribas/repos/xserver.git)

[3] This must be discussed more because RAC lets different OSes be multi-head wise due all of this is only inside the X server. ITOH, the VGA arbiter relies in a piece inside the kernel. So different OSes would implement different kernel VGA arbiters.

[4] [http://people.freedesktop.org/~vignatti/VGA.Notes](http://people.freedesktop.org/%7Evignatti/VGA.Notes)
