---
date: 2007-07-06 03:13:09+00:00
draft: false
title: Xorg input thread - summary or something
categories:
- Computing
- Soc2007
---

This mail that I've sent to xorg mailing list tells the current state of my project.

- cut here -

Hi guys.

As you might noted here [1], my GSoC's project is to do a separate mouse  thread for the X server. Now, I'm really stucked with it and I need some  good ideas from you before go to the next steps.

Today the cursor lags in two situations on Xorg:

1) lot of rendering on the server (CPU usage)

This lags the cursor only if the rendering is done by sw. So, if we're  worried only with hw cursor then CPU is definitely not our problem.  Should we take care with the sw cursor for now? And the MPX case which  only do sw cursor?

Q: How to reproduce 1)? A: "x11perf -putimagexy500"

2) heavy memory loads

Under heavy memory usage we've got two problems: the X server process in  the uninterruptible sleep ('D' state)  and some parts of the server  getting paged to the disk (which leads to the first). These two problems  happens when all the physical memory has ended up.

The good news: since my approach of implementation is not using signals  (SIGIO) in the input thread, the D state problem is the first which is  over. The bad news here is that I didn't note any performance difference  on the cursor movement with heavy memory loads  :( 

Also, different from what was expected, the input thread is paging to  disk. I tried the Jesse Barnes suggestion [2] to mlock the thread with  no real success (with or without the input thread when I mlock some mice  functions I obtained an unbelievable smooth movement. But I know that  this isn't an elegant solution).

Q: How to reproduce 2)? A: a malloc hog.

The small conclusion of 2): if the real focus of the input thread is to  stop with the cursor's lag then we must provide other ways to keep the  cursor's footprint in the physical memory. (Should I consider the  Jesse's suggestion to put this all inside DRM? I really don't know how  difficult this can be. Jesse, please?)

Also, if we're running to achieve the 2) solution, the real interest  will be systems with few memory (embedded and so on)? On this mobile  systems people active the swap all the time (the OLPC's laptop not,  right?)? This leads to other question: would really advantageous to do  the input thread only having in mind tiny systems?

So far, we're not requiring any thread lock mechanism. (Yes, I already  tested it on a SMP machine)

To end with a pessimist quote from Jim Gettys [3]:
"And I don't want all input events routed through a secondary input  process, as that has bad effects on latency (we can't guarantee that  such a helper process gets scheduled at the right moment, and latency  variability drives people nuts in interactive situations).  So through  such a module, the X server would call all the way down to the input  device or socket (depending on input type), and not be subject to such  variability."

Well, the last patch you can see here (it's tiny! Go ahead and tell me  something about it!):
[http://web.inf.ufpr.br/vignatti/xorg/xorg-input-thread_03Jul.diff](http://web.inf.ufpr.br/vignatti/xorg/xorg-input-thread_03Jul.diff)

I'll be really appreciating any comments on this mail, please.

Thanks!

[1] [http://lists.freedesktop.org/archives/xorg/2007-June/025610.html](http://lists.freedesktop.org/archives/xorg/2007-June/025610.html)

[2] [http://lists.freedesktop.org/archives/xorg/2007-June/025612.html](http://lists.freedesktop.org/archives/xorg/2007-June/025612.html)

[3] [http://lists.freedesktop.org/archives/xorg/2005-August/009626.html](http://lists.freedesktop.org/archives/xorg/2005-August/009626.html)
