---
date: 2008-07-10 07:03:49+00:00
draft: false
title: cursor handling and updates inside DRM
categories:
- Computing
- SoC2008
tags:
- cursor
- drm
- handling
- kernel
- mouse
- update
- x server
- x11
---

The current DRM kernel modesetting tree is already taking care to update the cursor registers and paint it to the screen. Very cool [0].

What I've done today is a shortcut between the kernel input layer and DRM to update the cursor directly on screen without the X server be notified always. Of course, a lot of issues raised up together. So let's try to delegates the tasks again.

**userspace app (X server):**
- starts all this mechanism telling which is the device responsible for the cursor (input ddx drv)
- responsible for loading new cursor images and push to the DRM (video ddx drv)

**kernel input layer (evdev driver):**
- notify and send its relative coordinates events to DRM

**DRM:**
- transform relative motion into absolute
- takes care the cursor limits
- responsible for the acceleration computation
- responsible for the input transformation as well?
- touch the gfx registers.

Seems that a reasonable amount of code in ddx input drv (mainly ReadInput) and dix (mainly GetPointerEvents) would be "swallowed" by the DRM. The "event generation stage" of the server would deal with the event itself + xkb + Xi things (which eventually could be done in a dedicated thread) and will let to DRM the responsibility of paint the cursor on screen.

The communication between kernel input drv can be directly, calling a DRM function; the DRM and userspace can communicate basically using ioctls. Complains?

This would only works with DRM supporting OSes. What about the others?

[0]  Not so much. Seems this method to update the cursor is sending _a lot of_ ioctls and sometimes doing cursor jumps. But I have to double check to see if the problem is for sure with context switches.
