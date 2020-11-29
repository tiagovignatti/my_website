---
date: 2007-12-20 01:18:39+00:00
draft: false
title: 'VGA arbiter: removing RAC'
categories:
- Computing
tags:
- rac
- vga arbiter
- x11
- xorg
- xserver
---

The Resource Access Control inside Xorg is the guy responsible to take  care of the various resources of memory and to share them in a wise  manner when two or more graphics devices are active (think multi-head).  As an alternative from RAC we can rely on [VGA arbiter](http://vignatti.wordpress.com/2007/11/23/the-vga-arbiter/). So me and Paulo  Zanoni spent the last days implementing "the glue" of Xorg to use the  arbiter code with this purpose.

Now we're trying to do some experiments to see what's the performance difference using the RAC and the arbiter. We thought in two tests: (a) a multi-head X with RAC and other with the arbiter. And (b), test a  single-head X using the arbiter and other not using. In the (a), we can  evaluate if the usage of the arbiter overloads the X server and (b) if  there's some difference in use RAC or arbiter in a multi-head  environment. So we ran the x11perf tool and reported a very tiny  worthless gap in both tests (used with -comppixwin500, -move and  -rect500 options). All the experiments you can see here:
[http://people.freedesktop.org/~vignatti/logs-between-rac-arb_19Dez2007.tar.gz](http://people.freedesktop.org/%7Evignatti/logs-between-rac-arb_19Dez2007.tar.gz)

Am I missing something about how I did these results or everything seems  fine?

(I made the mistake to test this things using CFLAGS='-g3 -O0'. Anyone  knows if this will result in different conclusions between the two test  cases? I'm using the git upstream code of server-1.4-branch and nv driver)

Anyway, we will keep our working and the next challenge will be to think  about DRI, xv and GL.
