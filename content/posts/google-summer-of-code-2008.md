---
date: 2008-04-29 21:31:27+00:00
draft: false
title: Google Summer of Code 2008
categories:
- Computing
- SoC2008
tags:
- '2008'
- google
- gsoc
- input
- summer of code
- thread
- vignatti
- x
- xorg
---

I'm very happy to say that I was selected **again** to work on Google Summer of Code with X.Org Foundation. [Daniel](http://www.fooishbar.org/blog) will be my mentor again. Thanks Google. Thanks X.Org!

In the last year we did a nice work separating the input event generation code of the X server into a different thread. We saw some performance improvement there specially because the implementation is not using signals anymore to wake up the server when some device emits an event. The reason why is that when a process is in the uninterruptible sleep (D state) signals are delayed and the mouse cursor lags.

The idea now is to continue the work and put the event processing stage in the separate thread as well. This will result in a lot of structures locks and will be very challenger. I'll be posting all my advances here.
