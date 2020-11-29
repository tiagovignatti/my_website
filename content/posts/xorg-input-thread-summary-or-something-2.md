---
date: 2007-07-18 02:14:13+00:00
draft: false
title: 'Xorg input thread - summary or something #2'
categories:
- Computing
- Soc2007
---





In the last week, I did some cool experiments to see the effects of the D state acting on the X server process when I start it with and without the input thread and always mlock'ing it.

First I set the grub to start my machine with only 170 mb of physical memory. Then I put a 'mlockall(MCL_CURRENT)' just before the call of Dispatch() function, on the main.c. So then I started the server. Well, I called a memory hog to eat all my physical memory and played with the mouse which never gets lagged using or not the separate thread. So the great notice comes when I started an X client (gnome-session) which turns the X process to the D state. The X server without the separate thread lags the cursor because it's using SIGIO to wake up the device. OTOH, the X with the input thread has a smooth movement anyway.

Got it? In summary, I locked to memory all functions until Dispatch is called and when the X server is in the D state the cursor lags when some clients connected to X are using blocks which aren't locked. And if we're using the input thread (consequently not SIGIO) it doesn't lags!

Here the experiments. When I mlockall(MCL_CURRENT) at that point before Dispatch, the X starts with:
- 7412 kb of resident memory, without the input thread.
- 7412 kb of resident memory, with the input thread, using clone syscall to create the child process.
- 15 mb of resident memory, with the input thread, using pthread to create te child process (yeah, pthread really bloats it).

Of course all these 3 values of resident memory above never decreases. OTHO, without mlock and with, or without, the thread the X starts with
about 4080 kb of resident memory which decreases until about 304 kb.

Now I'm trying to figure out how exactly put all the data and functions inside a section of the ELF file. For this I'm using the asm inline code to get the start and the end of the section which is responsible for the mouse and then locking it with mlock().

It's very hard to 'automatically' examine all data and text code [1] that deals with the mouse movements using -finstrument-functions just like Keith said (just to have an idea, until arriving in the Dispatch() we have about 240000 function calls!). What remains is try to examine the code 'statically', which IMHO is hard. Hard because even if we minutely trace the code, we'll forget some global data and simple functions (like xfree, for instance). Well, my attempt to do this statically failed. So yesterday I spent some time trying to figure out a better way to deal with this issue.

I thought that a userspace tool that prints something when a page fault occurs is good enough. Google tells me that 'truss' with '-m fltpage' arg does exactly what we need [2, 3]. But the problem is that it doesn't exists a port for Linux. Neither strace has the 'fltpage' similar truss's option. Then I dig a little more and found Ulrich Drepper's pagein tool [4]. My simple tests here demonstrates that this tool does not print a page that isn't hit a twice in memory (I already mailed him to obtain more infos about it).

So, you guys understand where we are? I really want to avoid the kernel traps which tells when a page fault occurs. Also, maybe someone here could point me mailing lists or someone to give tips about this kind of problem. And please, post your comments.
