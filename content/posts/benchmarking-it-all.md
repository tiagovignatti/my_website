---
date: 2008-02-21 23:53:39+00:00
draft: false
title: Benchmarking it all
categories:
- Computing
tags:
- arbiter
- fun
- hack
- linux
- multiseat
- pci
- ugly
- vga
- xorg
---

After a long journey I come back in this... So I did a set of benchmarks to evaluate the VGA arbitration versus the RAC usage. My goal is to evaluate the performance difference of a multi-head/multi-card environment, i.e., an Xorg using the RAC to another using the arbitration.

The experiments consisted of two applications running at the same time in each Xorg server, one at each screen. This is interesting because it stress the semaphore task of the arbiter inside kernel, creating race conditions between the screens. The experiments were performed ten times and the average result was picked.

In the first experiment a common operation to fill solid rectangles (x11perf -rect500) was started in each screen simultaneously. The X server using RAC obtained 3395 rectangles per second on screen one and 3400 on screen two. OTOH, the VGA arbiter obtained 3385 and 3400 rectangles respectively.

The second experiment showed a "close to real" usage of the VGA interface arbitration with Kobo Deluxe game :) The X server using RAC shows an average of 162.86 FPS on screen one against 163.91 FPS using the arbiter. On screen two, RAC shows 172.27 FPS and VGA arbiter 172.96 FPS.

This two experiments leads to the conclusion that the performance overhead of the arbiter is comparable of the RAC. Cool!

One thing that we must keep in mind is that the arbitration also adds the functionality to use various clients of the arbiter at the same time, for instance to deploy a multiseat starting several instances of Xorg (which is my big goal).

UPDATE:

21:53 < airlied> vignatti: you should also mention that  the arbiter lets GPUs
completely opt out of VGA life if they can disable their VGA
decoding resources..
21:53 < airlied> vignatti: which means you end up with no arbitration for those
cards so no overhead.

Thanks for remember airlied :)

---

I'll do another post entry concerning how to give a try of it all. For now I'm spending all my hacking time trying to solve others -- not so related -- things such as why the Xorg using the pciaccess rework doesn't work with multiple cards. So sad :(
