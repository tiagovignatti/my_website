---
date: 2007-02-23 03:50:18+00:00
draft: false
title: Multiseat state on Linux
categories:
- Computing
---

For some reason [multiseat](http://en.wikipedia.org/wiki/Multiseat) doesn't call much attention in countries that are not of the third world. I can be radical, but in my humble opinion there is no reason to not apply this model of computation in certain types of environment (I'm talking about kiosks, Internet cafe, office, schools, etc). The **money saved** is enormous, and this is only one of the advantages that I am enumerating here.

There are a lot of solutions of multiseat and I like to separate it on two groups: (a) the **hardware dependent** and (b) **hardware independent**. The solutions of group (a) is the "backstreet ruby", "evdev" and "faketty". All of these starts severals instances of xservers and have a well known problem concerning the routing on VGA interface. There were efforts to implement [VGA arbitration](http://lists.freedesktop.org/archives/xorg/2005-March/006663.html) in the kernel before, but because of lack of community support, it never got in. Therefore, the solutions of group (a) works with a very limited graphics card vendors.

On the other hand we have the (b) group. Nested xservers like Xnest, Xephyr and Xglx can be used to deploy a multiseat. The problem is that this is a hack. It's not the right way to get it done. The overhead imposed by the nested servers and the lack of some extensions that only the Xorg server has make this group of solutions be just temporarily. I call this group hardware independent because it works with all graphics cards which Xorg supports being a "normal" server (not multiseat).

Me and the [C3SL](http://www.c3sl.ufpr.br) team have followed and contributed for about four years the multiseat progress. Tomorrow, or after tomorrow, C3SL will be announcing to the world a new kind of multiseat that fits on group (b) but possibly to (a) group too. I'll write the announces here. Just keep tuned! :)
