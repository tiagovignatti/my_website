---
date: 2007-08-28 02:32:41+00:00
draft: false
title: 'Xorg input thread - summary or something #3'
categories:
- Computing
- Soc2007
---

Not so much, but here are the news:



	  * For the final evaluation period on the Summer of Code, Daniel suggest me to start my [own X server tree](http://gitweb.freedesktop.org/?p=users/vignatti/xserver.git;a=summary). So I'm maintaining this one with the last bits of the X server input thread implementation and always trying to keep all the things up to date with the upstream tree. Everyone is very welcome to test it and report me the few - I expect - bugs.
	  * The last new regarding the thread implementation is that we're unfortunately dealing with **critical sections** inside the X event queue (mi/mieq.c), so mutex is needed there (just to note: currently, mutex is only implemented using pthread (X11/Xthreads.h), so we also need implement something that is pthread-independent). Probably can exist other pieces of code that might be in an unpredictable way resulting some race conditions (didn't note anything strange yet!).
	  * I finally managed how to implement the page fault notifier without any patch inside the kernel. The read_cr2() can be called directly since the page fault notifier runs with interrupts disabled. The implementation can be found [here](http://web.inf.ufpr.br/vignatti/code/page_fault_notifier.c).

