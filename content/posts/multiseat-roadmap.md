---
date: 2008-09-23 04:52:08+00:00
draft: false
title: multiseat - roadmap
categories:
- Computing
tags:
- linux
- multiseat
- roadmap
- x
- xorg
---

This week our laboratory at university [released](http://lists.freedesktop.org/archives/xorg/2008-September/038674.html) the [MDM](http://cgit.freedesktop.org/xorg/app/mdm/) utility to ease the process of installation and configuration of a multiseat box. The idea is that the end-user should not use some boring and hard howtos anymore to deploy it. Just installing a distro package must be enough now. Try it, use it, report the bugs and send the patches! :)

But I would like to call attention here because we're still relying on the [ugly Xephyr solution](http://www.c3sl.ufpr.br/multiterminal/howtos/howto-xephyr-en.htm) to build the multiseat on a simple PC machine (there are people selling this solution. Sigh). A lot of cool stuffs arriving in the linux graphics stack are lacking with this solution. So lets try trace the roadmap here that we can follow in the short/medium-term to build a good one solution:

**- Vga Arbiter**
We should as fast as we can forget the Xephyr hack. Definitely several instances of Xorg - one for each user session - is what we want. If someone wants to use several graphics cards to deploy a multiseat, then (s)he would probably face the problem of the vga legacy address. The [vga arbitration](http://wiki.x.org/wiki/VgaArbiter) is the solution.

Jesse [seems that will work](http://virtuousgeek.org/blog/index.php/jbarnes/2008/09/17/too_much_travel) towards this in 2.6.28. There's also a "minor" problem here that the X server still not posting secondary cards (after pci-rework).

**- xrandr 1.3**
To deploy a multiseat with one video card/multi-crtc, the randr extension is enough to cover the hotplug of output devices. For a multi-card configuration, xrandr must be GPU aware. So we must done some work here as well to do the automagically configuration of output devices.

**- input hotplug**
So far MDM is not using the last input features of X to plug or re-plug a device in the machine. It is using its own ugly method to poll for devices. Some work here is needed.

**- ConsoleKit integration**
Device ownership (e.g. audio, pen drive, cameras, usb toys, output and input devices) when multiple users are in the same machine could be a mess. Moreover, the security problems implied by this could be harmful. [ConsoleKit](http://fedoraproject.org/wiki/Desktop/FastUserSwitching) seems to solve this all. It is able to keep track of all the users currently logged in.

Honestly I never took a closer look at ConsoleKit. I'm not sure if it's prepared enough to support multiseat. So we need to take care of this as well eventually putting some hook inside MDM to work with it.

**- DRI + modesetting**
Support DRI in multiple X servers in parallel is not ready yet. Some [redesign](http://dri.freedesktop.org/wiki/DRMRedesign) must be done to achieve this.

**- tools for auto configuration**
After all this work, some easy tools and very user-friendly would be awesome to setup on-the-fly the multiseat in the desktop environments.
