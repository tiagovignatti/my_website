---
date: 2007-06-16 19:12:23+00:00
draft: false
title: Moving the mouse handling code into a separate thread
categories:
- Computing
- Soc2007
---

(In a puny attempt to write my SoC project progress to my mentor, I
decided to expand it and share my thoughts with you)

Today, we have two methods to register the pointer devices on **Xorg
server**: (1) under SIGIO and (2) put they fd on EnableDevices set.
There is also the silken mouse concept, which means updates fired during
sigio handler (in the case of hw cursor).

We always try to prioritize silken - i.e. when the device emits a move
event, it will be "painted" on the screen and the WaitFor loop still
continue sleeping on select() - But the problem with SIGIO is that it
can blocks if the main thread is wedged doing kernel stuff (like
paging). It can't interrupt a program in D state.

So, the basically idea is to do a separate thread which takes care the
mouse handling code without using SIGIO. I did an approach and some
questions were raised up:

(1) With (silken/hw cursor) or without the input thread  seems to be
equal in perfomance (tested with three video cards: ATI Rage XL, GeForce
FX 5500 and GeForce2 MX/MX 400). I'd tested with a gnome-session started
and ran 'x11perf -putimagexy500'. The cursor never lag the mouse in both
situations. At least no performance regressions  :)  Fine.

(2) But I think that (1) is not the exactly problem which we're trying
to solve. Daniel Stone said once to me that having a tiny footprint that
needs to be kept in memory, it wouldn't need to wait to be paged into
the active set all the time. Here Daniel's transcription: "Currently it
works _almost_ like this, but SIGIO is in the same process, with a very
large memory footprint.  So if any part of the X server is waiting to be
paged in to memory, then you'll be completely blocked on disk I/O.  This
is the problem we have today: under heavy disk and memory loads, we end
up blocked on I/O. OTOH, the input thread won't get paged out, because
its active set will be extremely small". But how to keep this resident?
Is it inner to the thread?

(3) Another thing that is breaking my head is to not have such a
mechanism to do a real performance test. How to know if the thread has
advanced or not the overall performance? Maybe using the 'time' tool?
Maybe something with xtest? I don't know.

(4) So far I'm not facing any problem concerning the thread safety.
Yesterday, on the IRC, Mercury and Clee tell me to test the input
thread on SMP machines to really do it parallelized. I haven't done it
yet. Some another tips here?

The input thread (using clone syscall) is on my Linux machine. The patch
applies with the last git evdev and xserver. You can see it here:

http://web.inf.ufpr.br/vignatti/tmp/xorg-input-thread.diff

I'll really appreciate comments.
