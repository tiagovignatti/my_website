---
date: 2008-08-07 23:33:57+00:00
draft: false
title: Priorities and scheduling hints for X server threads
categories:
- Computing
tags:
- input
- policy
- priority
- scheduler
- SoC2008
- thread
- vignatti
- x11
- xorg
- xserver
---

Input events routed through another thread/process can have bad effects on latency because we can't guarantee that it will get scheduled at the right moment. Although this is hard to see happening with the current X server threaded implementation, we must design something to avoid it. One way to improve the responsiveness is to give a high priority to the input thread and also adjust the CPU scheduling. (Note that this will not avoid problems related with [page faults](http://vignatti.wordpress.com/2007/08/10/mlocking-adventure/) which usually happen in the X input flow.)

Linux uses 1:1 thread model and the scheduler handles every thread as a process. For now I don't care about others systems. Both input generation and processing threads was designed to sleep after a relatively short CPU run. So we can give a priority to processes that are trusted to not hog the CPU. And given they are special time-critical applications I have no doubt in what policy to use: I set both input threads to use the real-time FIFO policy and to get the maximum priority (sched_get_priority_max()).

---

I'm sure that someone will complain telling that this would decrease a bit the main thread when used together with both input threads. In GUI we're talking about better user experience. Latency variability must be avoided whenever possible in interactive situations. What the user **_see_** is what matters. For non-interactive processes (server scheduling workloads) the situation is totally different.

Xorg's philosophy is to be portable so we have to take care when setting this kind of parameters. It is a complex issue and different systems do it in wildly different ways. I was using my Linux box (2.6.24) to design it all.
