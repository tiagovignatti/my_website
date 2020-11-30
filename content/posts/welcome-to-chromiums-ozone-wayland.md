---
date: 2013-09-18 13:34:24+00:00
draft: false
title: Welcome to Chromium's Ozone-Wayland
featuredImage: https://vignatti.files.wordpress.com/2013/09/screenshot_2013-09-17.png
categories:
- Computing
tags:
- Blink
- Browser
- Chrome
- Chromium
- HTML5
- Ozone-Wayland
- wayland
- weston
---

The following message was sent out this morning -- I'm copying it here and attaching a cute screenshot of my desktop :)

---

Ozone is a set of C++ classes in Chromium for abstracting different window systems on Linux. It provides abstraction for the construction of accelerated surfaces underlying Aura UI framework, input devices assignment and event handling.

[http://www.chromium.org/developers/design-documents/ozone](http://www.chromium.org/developers/design-documents/ozone)

Today we are launching publicly Ozone-Wayland, which is the implementation of Chromium's Ozone for supporting Wayland graphics system. Different projects based on Chromium/Blink like the Chrome browser, ChromeOS, among others can be enabled now using Wayland.

[https://github.com/otcshare/ozone-wayland](https://github.com/otcshare/ozone-wayland)

In particular, we have Chrome Browser and Content Shell enabled and running on Wayland. All the projects are under active development (therefore unstable) but we are hoping to cope with fixes together with the open source community.

We'll be posting updates in the following weeks detailing the solution and our ideas. Enjoy!
