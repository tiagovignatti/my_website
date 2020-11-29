---
date: 2007-07-27 05:24:05+00:00
draft: false
title: Page fault notifier
categories:
- Computing
- Soc2007
---

This week I tried to lock in the physical memory the Xorg's input code using mlock(). To do this I traced the code minutely and locked all the text and data related to input. I didn't get success. The mouse still lags when the system is paging (you might remember that with mlockall() all worked wonderful *except* that it eats much memory). So what might be happening is that something is not locked yet. To guarantee it I searched for a user-space tool that traces page fault. I only found the 'truss' command on Solaris. Linux (my OS) doesn't provide no one ('strace' don't do this).

So I surrendered to the kernel space tools putting some 'print' in the kernel code (before I tried a little systemtap and kprobe without success). Then I made a kernel module [0] using the notifier scheme which already exists inside the kernel. The problem is that the page fault notifier doesn't show the address which happened the fault. So I made a patch to increment this functionality [1].

Using 'objdump -t -d Xorg' shows all the symbols and addresses I want. Now I must compare the module's output with the dump and be happy :)

[0] http://web.inf.ufpr.br/vignatti/code/page_fault_notifier.c

[1] http://lkml.org/lkml/2007/7/27/8, consider that the first time that I hacked the kernel code was this week. So if something sounds weird...
