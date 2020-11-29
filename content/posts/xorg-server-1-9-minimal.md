---
date: 2010-08-18 15:22:26+00:00
draft: false
title: Xorg server 1.9 minimal
categories:
- Computing
tags:
- kdrive
- meego
- minimal
- server
- tiny X
- x11
- xorg
---

That's what I'm using for MeeGo now. Autoconf parameters, theeere we go:


--disable-static --disable-aiglx --disable-config-dbus --disable-config-hal --disable-dbe --disable-dga --disable-dpms --disable-dri --disable-glx --disable-glx-tls --disable-int10-module --disable-ipv6 --disable-screensaver --disable-secure-rpc --disable-tcp-transport --disable-vbe --disable-vgahw --disable-xdm-auth-1 --disable-xinerama --disable-xwin --disable-xaa --disable-xace --disable-xdmcp --disable-xf86vidmode --disable-xfree86-utils --disable-xnest --disable-xvmc --disable-libdrm --enable-config-udev --enable-dri2 --enable-null-root-cursor --enable-record --enable-unit-tests --enable-visibility --enable-xorg --with-sha1=libsha1


PS: stop use kdrive hardware servers (Xfbdev and variants). They are dead!
