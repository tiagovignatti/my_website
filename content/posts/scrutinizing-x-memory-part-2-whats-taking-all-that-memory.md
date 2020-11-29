---
date: 2010-03-25 18:01:10+00:00
draft: false
title: 'Scrutinizing X memory, part 2: what''s taking all that memory?'
categories:
- Computing
tags:
- embedded
- footprint
- memory
- n900
- x
- x11
- xorg
---

So here goes some statistics of the Xorg process running. All the informations were fetch from /proc/`pidof Xorg`/{smaps, status}. I used also a [script](http://wingolog.org/pub/mem_usage.py) found on the [Web](http://wingolog.org/archives/2007/11/27/reducing-the-footprint-of-python-applications) to parse and organize these informations; Mikhail Gusarov has [extended](http://github.com/dottedmag/mem-usage) this script to show a very useful [output](http://people.freedesktop.org/~vignatti/scrutinizing-x-mem/x-standalone-memory-per-libraries.txt).



### Xorg per se



Running just one standalone `Xorg -retro`. In my system it represents:
VmRSS:      5440 kB
VmSize:    13620 kB


from those 5440 kB of RSS:
3404 kB (63 %) come from code
1628 kB (30 %) come from malloc/mmap in anonymous memory (heap)
228 kB  (4 %) come from other data mapped in memory
180 kB  (3 %) come from rodata


from those same 5440 kB of RSS:
1628 kB (30 %) come from malloc/mmap in anonymous memory (heap) somewhere*
1200 kB (22 %) come from Xorg
628 kB (12 %) come from libc
316 kB  (6 %) come from libcrypto
164 kB  (3 %) come from libint10
136 kB (2.5%) come from libXfont
128 kB come from libxaa
120 kB come from libpixman
116 kB come from nv_drv
112 kB come from ld
102 kB come from libglx
100 kB come from swrast_dri
88 kB come from libfb
60 kB come from libpthread
48 kB come from evdev
xxx kB come from other libraries**



##### * just looking into /proc/, there's no way to determine if the allocations came either from the binary itself or some DSO. I'll definitely analyse carefully this in a near future using [another approach](http://people.freedesktop.org/~vignatti/scrutinizing-x-mem/0001-dix-add-memory-allocation-wrapping-functions-for-pro.patch).

** it's missing from these numbers the input hotplug layer, which mostly systems are using today. In another data collected, I've seen dbus + hal taking 268 kB against amazingly 64 kB from libudev.


These measurements are not perfect; they are a snapshot of the memory when the server just started. The same footprint brought to memory at Xorg's initialization time will differs a lot from the regular usage of the rest of Xorg's life, which would deals with clients and users interacting. For instance, libint10 is mapping 164 kB and it's likely that will never be swapped back to the memory again. Likewise, the heap portion will increase when clients starts to allocate pixmaps on the server.

Even though, we can see some nice facts. From the first chart, we see that almost 2/3 in RSS is used by instructions. Is it a normal behaviour of a graphics server? I don't know. In the other chart, we see a huge footprint of libcrypto. In such library, when not counting shared mappings (e.g. used by openssl), it's using 88 kB of RSS for private mappings only - sigh. We probably can replace it by other SHA1 implementation (in fact, we have already others inside the server) or [use our built-in](http://people.freedesktop.org/~vignatti/scrutinizing-x-mem/0001-Revert-Revert-Render-Use-built-in-SHA1-library.patch). We have also libpthread, used in GLX, which is being built even on systems that are not using it (e.g. Maemo on N900). libXfont shows up as a surprise to me either, taking a considerable amount of memory. We're probably able to [tweak it](http://people.freedesktop.org/~vignatti/scrutinizing-x-mem/0001-configure-introduce-enable-disable-fontserver.patch) a bit though.



### the code being started



Another way to analyse Xorg, is getting informations per code and modules being started. So I first set a breakpoint in InitOutput() function. Until InitOutput() be called:
VmRSS:      1728 kB
VmSize:     8788 kB


from 1728 kB in RSS:
1336 kB (77.3 %) come from code
132 kB  (7.6 %) come from malloc/mmap in anonymous memory (heap)
144 kB  (8.3 %) come from other data mapped in memory
116 kB  (6.7 %) come from rodata

from 1728 kB in RSS:
436 kB (25.2 %) come from libc
328 kB (19  %) come from Xorg
316 kB (18.3 %) come from libcrypto


A breakpoint in InitOutput() means the very first steps of Xorg initialization: command line processing, OS layer being started and other basic routines. At this point, naturally it wasn't executed much code inside Xorg yet, neither any drivers were loaded. Therefore, almost half memory usage of the process (44 %) came from basic libraries start up such as libc, libcrypto, etc.

The next chart, when setting a break point at InitInput(), shows the moment that the output is mostly done. I.e., internal loader initialized, configuration and its parsing done and output drivers already loaded. Until InitInput() be called:
VmRSS:      4436 kB
VmSize:    13724 kB

from 4436 kB in RSS:
3352 kB (75.6 %) come from code
676 kB (15.2 %) come from malloc/mmap in anonymous memory (heap)
228 kB  (5.1 %) come from other data mapped in memory
180 kB  (4 %) come from rodata


We see the the server's RSS has jumped 2708 kB from the previous chart. In other words, it represents 2708 kB, or 50%, just being used to output's initialization, and that 1004 kB (18.4 %) will be used for input initialization routines.

---

Well, I'm already happy with these preliminary statistics. I guess we have already work to do just looking into. Now, I plan to investigate a bit further X's heap creation and how efficiently X clients are using pixmaps.

As always, I appreciate any corrections, suggestions and improvements.


##### * this text was kindly reviewed by Mikhail Gusarov.
