---
date: 2008-06-17 23:39:53+00:00
draft: false
title: to thread the X server (?)
categories:
- Computing
- SoC2008
tags:
- gdb
- multi-thread
- server
- thread
- x11
- xorg
---

I really don't like to read large blog posts. Anyway...

What I did so far is a separated thread that takes care only the injection stage on the X server queue. Who is interested with the results, please read some past posts in my blog. It is currently in a very good shape (synced with post-mpx merge, all input devices are inside the thread and etc). The implementation looks like this:
`
thread #1 deals with
    - injection of input events from devices
thread #2 deals with
    - processing of input events to clients
    - requests from known clients (rendering things)
    - new client that tries to connect (pretty easy to do)
`

Now I am pondering the following:
Model one:
`
thread #1 deals with
    - injection and processing of input events
thread #2 deals with
    - requests from known clients
    - new client that tries to connect
`

It would be very very nice to let both threads totally independents. But we cannot. The event delivery depends on the window structure and the first thread must always wake up the second. Also, sometimes the processing of events take a while and the injection of events stays stucked in this model. So I came with this another:

Model two:
`
thread #1 deals with
    - injection of input events from devices
thread #2 deals with
    - processing of input events to clients
thread #3 deals with
    - requests from known clients
    - new client that tries to connect
`

With this way the first and the second thread become not so tied and given that I'm using non blocking fds to wake up each thread (through a pipe), the server "enjoys" the effect of threads. For instance, under heavy drawing primitives only thread #3 would wake up.

Well, I had implemented both models here and it workish (occasionally seeing some segfaults probably due of some critical regions I forgot to lock -- now the only mutex that exists is inside the server queue of events).

It's hard to imagine other models mainly because the way X deals with clients are very tied in every piece of the server and it would require a lot of mutexes. But I'd love to hear anyone disagreeing with this and proposing something here!


=== What make things so hard ===

Debug a multi-thread program is really tedious, consequentially work in this kind of environment as well. And that could be a great argument to not accept an X server multi-threaded in upstream some day.

The thing that most pissing me off is how gdb sucks to debug the server. I'm using the last version of gdb (6.8 version and from [ today's snapshot](ftp://sourceware.org/pub/gdb/snapshots/current/gdb-weekly-6.8.50.20080617.tar.bz2)) and it often hard lock my machine (I'm sure I had to reboot my machine a least 20 times today...sigh.) Sometimes it consumes 99% of CPU and sometimes it completely hangs my machine. Yes, this is really boring. Anyone knows some magic parameters in gdb to avoid this hard lock up? Anyway, the goal for long term is to let an option -- at compilation time -- to not use the input thread.

Comments?
