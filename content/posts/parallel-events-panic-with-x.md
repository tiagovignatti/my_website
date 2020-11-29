---
date: 2008-08-18 22:02:16+00:00
draft: false
title: Parallel events (panic) with X
categories:
- Computing
- SoC2008
tags:
- event
- gdb sucks
- input
- thread
- x11
- xorg
---

Unfortunately that model which I [described some weeks ago](http://vignatti.wordpress.com/2008/08/07/keep-it-going/) to put the input event delivery of the X server in a separate thread wouldn't be an advantage. I precipitated myself thinking that it could be feasible. Sorry :(

I started to implement all this but it showed a very boring task to grab all the globals variables which both threads touch and to lock it. So I decided to stop going in this way. It's hard to program thinking in parallel. It's even harder to debug a program with severals flows. More, the tools don't help you (if you have lucky, gdb will work).

But the main reason I can argue to stop with this model is that the "main" event flow of execution (i.e. basically all the functions in {Swapped,}ProcVector) and the input delivery flow (ProcessInputEvents()) are very very tied. Both deal a lot with clients and we'd need to lock several globals, thus spending a lot of time in the management of the threads. It's easy to see this acting: just put a breakpoint in TryClientEvents(). Every single request to deliver a given event to a given client involves this function. And both input and main event flow will call TryClientEvents(). So you will see a zillion of times this function being called. The contention of the eventual processing and main threads would be even greater if the client choose to receive MotionNotify event.

So yeah, it's far from be clear how to put processing of input events inside another thread.

== Next ==

In the next days I'll be traveling to [CESol](http://www.cesol.ufc.br/), Fortaleza here in Brazil. I was invited to talk about my work in X land. Latin America has a lot of promising countries concerning FOSS development however for some reason no one actively participate and contribute for the X development (why?). I'll try to motivate people there somehow :)

In the next week I'll put the generation thread in a shape good enough to eventually push this to upstream. Also I'll try to write a good sumary of all my work given that GSoC is in the end.
