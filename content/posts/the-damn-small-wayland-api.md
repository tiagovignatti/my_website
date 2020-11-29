---
date: 2012-10-17 13:15:38+00:00
draft: false
title: the damn small Wayland API
categories:
- Computing
tags:
- computer
- core graphics system
- libwayland
- software
- technology
- wayland
- x11
- xcb
---

[Wayland 1.0 release is knocking the door](http://lists.freedesktop.org/archives/wayland-devel/2012-October/005878.html) and people keep asking "why Wayland if we got X already", or things like performance, memory consumption, power savings and other kind of advantages on having Wayland instead X. Those are very important points to consider, of course, but for one individual actually programming the graphics system the answer should be straightforward: Wayland API is damn small.

_1. But who's going to program Wayland or X?_

Short answer is: very likely you won't :) A more elaborated answer requires the understanding of what is the graphics system "shell" and its components, or in other words what is the system layer that fits on top of a core graphics system.

While the graphics system comprises of an hardware abstraction, the shell could be thought as an abstraction for such graphics system in a way that application developers would feel more comfortable on writing their applications there - it would be the application software glue therefore, offering convenience for an ordinary developer. Examples of shell components are widget library "toolkits", game engines, window and decoration managers, Web runtime, video processing libraries and so forth. Developers of these kind of components are the only ones that need to understand the graphics system API, in principle.


_2. And what **is** the X API?_

libxcb is the implementation of X11 protocol. libxcb needs 19 functions to deal with IPC related stuff. The core protocol implementation and libxcb protocol helpers export 195 functions all together. All extensions, developed over the 25 years of X existence, sum up 26 in total with 1064 functions for clients. Therefore the **X11 client API has approximately a total of 1278 entry points**.

Raw data and how I collected it is [here](http://people.freedesktop.org/~vignatti/wayland/libxcb_and_X11R7_7-client-API.txt).

When we talk about a graphics system, we like to think about the drawing APIs only. It's a big mistake. The API is more broad, encompassing for instance input methods, input devices, output devices, a bunch of graphics related configuration aspects, testing and so on. In fact, X has basically two drawing APIs (the core protocol and Xrender) and some systems building very modern interfaces are not even using them anymore, bypassing via OpenGLES and friends.

[I've reported about one year](http://vignatti.wordpress.com/2011/04/20/x-characterization-for-meego/) ago that some new systems don't use the core X protocol and just use a few extensions instead. One would claim that this is alright cause the API would be smaller, but my opinion is if things carry on expanding outwards like they have been, we're going get to a point where the graphics systems becomes unmaintainable. Moreover, it takes too long for the shell developer learn that just a small set of the API is needed. The X protocol flexibility feature in which developers can add many new extension as desired and the lack of a proper API deprecation mechanism is definitely a problem to consider here.


_3. So what is the Wayland API then?_

**Wayland API has approximately a total of 135 entry points**, in its 0.99 version. libwayland solely exports 19 functions, where most are related with IPC, dispatching of events and etc which are the main responsibility of the library. The 14 interfaces consists of 102 functions and usually a client application will require some platform specific routines as well, such as the EGL abstraction and some for the DRM driver model; these add 14 more functions currently.

Raw data [here](http://people.freedesktop.org/~vignatti/wayland/libwayland_and_wayland-0_99-client-API.txt).

We have something we call "private protocols", that describes more high-level interactions and a few special clients. Examples are the XWayland infrastructure, desktop shell workspace and its panel bar, input methods where special care for device grab is needed and etc. One might consider adding those APIs as well but anyhow, Wayland has a small API after all.

---

Although X and Wayland's intention are both to sit between the applications and the kernel graphics layers, a direct comparison of those two systems is not fair on most of the cases; while X encompasses Wayland in numerous of features, Wayland has a few other advantages. In special, in this post I wanted to call the attention for the big advantage the shell programmer has when creating components that aid modern interfaces, where only a small set of functions are actually needed using Wayland.

**X API is approximately 15 times bigger than the Wayland one**. Here, I've only counted the amount of exported functions for clients. I understand that there could be different and more precise ways to tell how big is a graphics system API (e.g counting events received by clients, or Wayland amount of interface listeners, or the window properties of X).
