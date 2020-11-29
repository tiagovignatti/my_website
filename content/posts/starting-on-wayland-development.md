---
date: 2012-01-18 13:53:43+00:00
draft: false
title: starting on Wayland development
categories:
- Computing
tags:
- compositor
- developer
- development
- Intel
- open source project
- wayland
---

Do you wanna contribute to a funky open-source project? Are you tired of your nerdy and boring community of developers? Are you the one that wants to get rid of X because it's a giant, old and fat dinosaur in your system? :) Cool, I have a project to solve your problems!

---

While there's still lot of churn in the protocol, and yet our goal is soon to wrap up all we've been doing to a steady and settle-on-the-stone one description, there's a lot on the implementation side that needs love. And that mainly concern Weston compositor, which is becoming the de facto compositor on several systems targeting Wayland.

In past months I was accumulating a TODO list for Weston and libraries that I think wouldn't require any exceptional knowledge on core graphics or Wayland internals. These are good items for people that want start hack or just do some contribution on Wayland:

**1. log facility (easy)**

Back in July, I had already [warmed up a discussion](http://lists.freedesktop.org/archives/wayland-devel/2011-July/001225.html) how we could log on Wayland. So now we spit everything to stdout but we want to do it similarly as Xorg, i.e. redirecting to its own file. It turned out that we might want only on Weston compositor and implement our own way of logging for sake of simplicity. Ideally it has to be very simple, without verbosity levels probably, etc. This task should be quite easy to finish.

**2. launcher for Weston (medium)**

Weston is meant to run as a normal user. Now we have to set manually input devices, DRM and tty with root permissions, so Weston can happily be started. Ideally we should have a setuid helper script doing all this tricky, and in fact [I started something here](http://cgit.freedesktop.org/~vignatti/wayland-demos/commit/?h=launcher-2&id=f3149479119ce7337da33a58c234877dc0f95a1b). For a real system though, we need to enhance a bit this program with the policykit, specially for dealing with hotplugs. Probably zero understanding on Wayland internals is needed but an overall knowledge of OS is required.

**3. libxkbcommon X merge (medium)**

Actually that's not much Wayland work, but it most definitely would help its development. xkbcommon is the library that exposes the keyboard mapping logic to clients, converting keycodes in keysyms. Weston clients are using for evdev convertion. The library is an adaptation of a bunch of X11 modules to fit in a non-X11 world and as such, it still requires xproto, kbproto and libX11. One task would be to untie such dependencies with X and the other to proper merge libxkbcommon with Xorg. I'd classify as medium-size task due the involvement with the community and the hairy understanding of XKB in general, although Daniel, Kristian and other guys already [made a nice progress there](http://lists.x.org/archives/xorg-devel/2010-October/014412.html).

**4. xwayland on X (hard)**

xwayland is the implementation on Xorg to make it run as a Wayland client. [That works well](http://lists.freedesktop.org/archives/wayland-devel/2011-June/001163.html) on Intel chipsets and might work as well with other drivers through the shm X driver. In principle, basic X11 applications work with some WM control lacking, input grab as well and things like Xrandr don't. One would also forward port [xwayland](http://cgit.freedesktop.org/~krh/xserver/log/?h=xwayland-1.10) and driver to upstream, once the work is shaped up. I bet WM developers would have an ecstasy and delight themselves hacking around.

---

Hopefully you get excited with some of the items. I definitely can give a hand with any, so just poke me on #wayland at freenode.
