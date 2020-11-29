---
date: 2008-07-30 01:09:31+00:00
draft: false
title: Improving input latency
categories:
- Computing
- SoC2008
tags:
- evdev
- GUI
- input
- kernel
- latency
- linux
- mouse
- thread
- vignatti
- x
- x11
- xorg
---

GSoC summary #1 - July 29

The current implementation of X Window System relies in a signal scheme  to manage the input event coming from hardware devices. This scheme  frequently get blocked when lot of IO is occurring (for instance, when  the process is swapping in/out). Get blocked means for instance a  jumping cursor on the screen and in GUI is always desirable to  prioritize the system responsiveness for end users. The human/computer  interface should be smooth and this is the most user visible aspect of a  system.

Besides the need for improvement in system responsiveness, the current  design of the event stream has some oddities, probably due historical  reasons, such as the cursor update done in user-space or the huge path  that takes to draw the cursor instead just connect the mouse hardware  directly with the cursor position update in-kernel. Moreover there is no  fundamental reason to input drivers be dependent of DDX part of the X  server. Therefore a design of the input subsystem must be carefully  redone to improve such issues.

Our project try to solve all this problems. In summary the goal is: to  get a path from hardware input event to client delivery that cannot be  blocked by rendering or IO operations, meaning we always have very low  latency on input events. Moreover, a redesign of such event stream could  improve the overall X graphics stack, which must be considered as well.

So far three strategies were explored to achieve the goal:

1. put X input generation stage in a separate thread

2. put X input generation and processing stages others threads

3. shortcut the kernel input layer with drm to decrease the cursor  update latency

Basically 1. and 2. tries to solve the issue of blocking signals and 3.  would be a completely redesign in input infrastructure. Anyway, the 3.  strategy would impact in 1. and 2. but these could be implemented in  parallel with the third strategy. The following sections details each  strategy.

== strategy #1 ==

Strategy 1 does not uses a signal handler anymore to wake up the event generation code. It simply poll for device's socket and giving that this  code is under a separate thread this is a win for the CPUs.

With the separate thread taking care only the input code, it was  expected that the cursor footprint always lived on resident memory when  the mouse stills in movement. Unfortunately this was not true. For some  reason it swaps back to disk. Maybe some scheduler adjusts would help  here. A memory lock scheme was tried to do lock the cursor footprint  always in physical memory without success.

This strategy is basically what we've been done is the first GSoC. This  is pretty much implemented. It would not require much trouble to push it  to X server from upstream. The code is here:
[http://cgit.freedesktop.org/~vignatti/xserver/](http://cgit.freedesktop.org/%7Evignatti/xserver/)

== strategy #2 ==

This strategy can be thought as an improvement of #1. It can be  separated in two models of implementation:

Model one:

thread #1 deals with
- injection and processing of input events
thread #2 deals with
- requests from known clients
- new client that tries to connect

It would be very very nice to let both threads totally independents. But  we cannot. The event delivery depends on window structure and the first  thread must always wake up the second. Also, sometimes the processing of  events take a while and the injection of events stays stucked in this  model. So we came with this another:

Model two:

thread #1 deals with
- injection of input events from devices
thread #2 deals with
- processing of input events to clients
thread #3 deals with
- requests from known clients
- new client that tries to connect

With this model the first and the second thread become not so tied and  given that we're using non blocking fds to wake up each thread (through  a pipe), CPU "enjoys" the effect of threads. For instance, under heavy  drawing primitives only thread #3 would wake up.

We had a proof-of-concept of this last model and it workish  (occasionally seeing some segfaults probably due of some critical  regions we forgot to lock - now the only mutex that exists is inside the  server queue of events).

It's hard to imagine other threaded models mainly because the way X  deals with clients are very tied in every piece of the server and it  would require a lot of mutexes.

== strategy #3 ==

For sure this strategy is the most shocking one :) The idea is to  connect the mouse hardware directly to the cursor position update  function, all inside kernel. We'd then rewrite the event stream from the  pointer device to an absolute position. Transform the relative mouse  motion into an absolute screen position seems to be not that  complicated, but this strategy would involve acceleration and cursor  limits inside kernel as well (the current implementation of accel deals  with floats, so we would have to adapt it to live in kernel).

It is a _very_ _large_ amount of codification. It would require changes  to the X server, DDX driver and its corresponding kernel DRM drivers,  drm library and kernel input drivers. A mini-input driver ***inside*** drm  is also needed. We would add complexities of the connection between  input device and output device to the kernel (in my proof-of-concept  implementation evdev is dependent of drm. Yeah, really weird world).  Moreover, we would have to avoid somehow two differents sets of the  exact same code in different contexts in the case of sw cursors (think  MPX). It's a completely redesign. Things would have to go incrementally.

But why this strategy? Well, this would solve all the current issues  with input latency. For instance with the current design of the kernel  modesetting - which seems the future - the cursor is jumping a lot, much  more than with current implementation. Try to call a xrandr instance and  move the mouse with kernel modesetting. xrandr will do DDC communication  which will blocked X in the kernel. So with the handling and update of  the cursor inside the kernel all would work fine (and my  proof-of-concept already showed this).

Moreover, I believe the current implementation remained until now due historical reasons. Ultrix systems placed the entire input subsystem in  the kernel. What is the problem to do this in Linux (and others) as well (besides massive codification)?

and non-dri drivers? Should we forget them?

EOF
