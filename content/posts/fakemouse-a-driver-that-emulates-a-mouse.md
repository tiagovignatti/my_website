---
date: 2008-05-28 02:36:09+00:00
draft: false
title: fakemouse -- a driver that emulates a mouse
categories:
- Computing
- SoC2008
tags:
- device
- event
- fake
- input
- kernel
- linux
- mouse
- vignatti
- xorg
---

For my SoC [project](http://vignatti.wordpress.com/2008/04/29/google-summer-of-code-2008/) I need some mechanism to evaluate the improvement of the input thread inside X. So I wrote a simple kernel driver that emulates the mouse device moving and emitting bits of a simple pattern. I don't know if something like this already exists or if there are other ways to do it, but the fact is that the solution I thought took me only few hours between the moment that I imagined, collected some ideas on the Web and implemented it.

Why emulate a device? I need stress the X server always with same routines and things like XWarpPointer() and XTestFake*MotionEvent() is not close to a real user usage because they do not pass through all the paths of the event creation stage inside X. So now I can run fakemouse module together with some x11perf test and collect the results comparing the X with and without input thread. Cool :)

---

For those who are interested in the driver can do the following:
# wget http://web.inf.ufpr.br/vignatti/code/fakemouse-0.01.tar.gz
# tar xzvf fakemouse-0.01.tar.gz
# cd fakemouse-0.01
# make
# insmod fakemouse.ko
# echo 1 > /sys/module/fakemouse/parameters/mouseon

and be happy seeing what happens in some event node create by fakemouse (/dev/input/event*).
