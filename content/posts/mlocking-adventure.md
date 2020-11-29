---
date: 2007-08-10 22:30:07+00:00
draft: false
title: mlock()'ing adventure
categories:
- Computing
- Soc2007
---

It's being a great adventure to lock the X input thread on the memory. I'm touching a lot of things that I'd never imagined before :)

To trace the pages that are faulting when I move the device pointer I'm using my own [ultra mega super kernel's page fault notifier](http://web.inf.ufpr.br/vignatti/code/page_fault_notifier.c). It's very simple, but as the things are not always perfect, it needs a little [patch](http://lkml.org/lkml/diff/2007/7/26/512/1) in the kernel.

The page fault notifier does (almost) all that I need to trace exactly which piece of code inside X is causing the page faults. So, as I said [here](http://vignatti.wordpress.com/2007/07/27/page-fault-notifier/), I compare the notifier's output with the symbol table of X binary disassembled. Believe me, it works!

So I spent a lot of time seeing which address is faulty, searching it on the X code and locking it on the memory. When the variable is global I move it to other ELF section called 'input_data'. When the fault occurs on the text I move it to a ELF section called 'input_code'. Then I lock this two sections on the phisycal memory using mlock(). Unfortunately the cursor still lags when the system is swaping to death (I used a simple memory hog to get this state). I'll show you why.

As expected, the page fault notifier still accusing faults comming from the X process, but the address which these faults occur it's not shown on the objdump's output, leading me to not lock it (duhh) . Let me explain what I'm doing to test it.

I start the X with the brand new input thread, I run the memory hog and wait for some seconds until it consumes a lot of memory. So then I stop the hog and register the notifier. All the page fault now will be displayed on /var/log/messages. So I move the mouse -- **attention:** this is the exacly moment where a non-locked X process will search for pages and, as the pages are not in memory, will generate a page fault --.  When the input code (and datas) is locked it prints [this](http://web.inf.ufpr.br/vignatti/code/xorg-with-lockmanager.txt) and all the addresses that you see there doesn't belong to what objdump shows. So what I should lock?! I don't know... It shouldn't prints anything if all the code/text were locked correctly (indeed, when I run the test using mlockall() it doesnt't prints anything). Also, the same test but without locking anything shows [this](http://web.inf.ufpr.br/vignatti/code/xorg-without-lockmanager.txt).

So on, I'm not seeing any differences on the cursor's movement with or without mlock'ing (but yes when I use mlockall() and also when I use the input thread. Don't make confusion!)

Comments?
