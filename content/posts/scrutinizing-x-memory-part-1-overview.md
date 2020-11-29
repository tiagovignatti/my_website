---
date: 2010-03-25 17:58:47+00:00
draft: false
title: 'Scrutinizing X Memory, part 1: overview'
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

This series of documents explore how the memory is used by the Xorg server. They aim to eventually shrinks the memory footprint of the server and its related components, like X clients, modules being loaded and drivers. Embedded devices with constrained resources are the main focus here. All texts are mostly based on x86 and ARM architectures, under Linux 2.6.33 with Xorg from upstream.



### Overview



One way to analyse aspects of memory usage of a given program is to scrutinize its object data. Object data contains executable code and static data. Both are of little interest from the process memory management point of view given their layout is determined by the compiler and does not change during process execution. However, we can deduce some nice informations about the object. For instance, from Xorg object we are able to get some statistics about the code, identify its structure and point out architectural mistakes just looking into.

Besides the object itself, also important is to see it in execution and how the dynamic allocations are performed on the stack and heap. So an analysis of the file object running is valuable as well.



### X file object



Consider the following sections of Xorg:

**.text**: contains the instructions executed by the CPU and all constant data - literals. While the program is being executed, pages are loaded into physical memory carrying instructions and literals.

The number of lines in X code is [huge](http://people.freedesktop.org/~vignatti/scrutinizing-x-mem/x-lines-of-code.txt), which in some way impacts in a huge .text segment size. In my environment .text is 1833738 bytes (1.74 MB) when the compiler is performing third degree of optimization (-O3). In a very gross view, removal of code means less instructions to execute, consequently less text and less memory footprint. For instance, just a single inclusion of fprintf will cost ~40 bytes of text in your object. Of course it's not straightforward to cut off code all over the server, but for a given device/environment we can [customize](http://vignatti.wordpress.com/2010/01/23/xorg-customization-and-true-modularization/) it, as already discussed.

Besides code elimination, optimize the code using compiler's size optimization (-Os) helps a lot either: 260 kB of RSS saved here, only optimizing X server. So we might considered this and also apply the same idea in DSOs. For instance, the size of pixman library mapped on the server shrinks 30% when compiled with size optimization. Good job, compiler!

**.data and .bss**: static or global variables allocated at program startup.

If the variables allocated in compilation time are not initialized, then BSS (Block Started by Symbol) increases; increase BSS means also increase VM (Virtual Memory), but not necessarily RSS. The VM size is quite meaningless when measuring real memory usage.  So I wouldn't bother to analyse BSS, given the RSS occupied by X is what I really care.

On the other hand, .data section increases when some data object is initialized for permanent variables. And if these variables is being accessed, it increases directly the physical memory. A good habit here is to declare constant variables whenever is possible, so then they go to .text segment and the compiler might be able to perform optimizations.



### X dynamic allocations (stack, heap and friends)



Probably this is where there's more room for optimizations. The **heap** grows in response the program needs: a program like "ls" will not make a lot of demands on the heap (one hopes), while the heap of a running Xorg can grow in a truly amazing way. It shouldn't be hard to profile all allocations done inside the server. Probably valgrind's massif with a bunch of arguments give this for us.

X clients are able to request the server to allocate pixmaps in its own memory. Such feature is one of the main reasons of the growing-shrinking in the server's memory footprint. Because of that, it's very usual to see people getting confused thinking there's a leak on the server while actually it's on client side.

Besides heap allocations there's also the **stack**, used to hold automatic variables and functions data. I don't think there's much to track in stack memory or ways to save overall process memory. But a good rule to follow is that typically allocation here is much faster than for dynamic storage (heap or free store), because a memory allocation in the stack involves only pointer increment rather than more complex management.

---

The ideas above were just an overview where we can start to work on. I don't believe there's an unique and certain point that we can go and _fix_ X memory usage. We should analyse the code and attack all sides.

Next, I'll analyse in depth each of these dynamic and static allocation ways discussed in this document, starting doing some statistics where X _sucks_ more... memory :-P I'll appreciate any kind of corrections/suggestions on these documents.



##### * this text was kindly reviewed by Ander Conselvan and Mikhail Gusarov.
