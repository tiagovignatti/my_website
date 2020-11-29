---
date: 2007-06-02 04:34:00+00:00
draft: false
title: multiseat input hotplug
categories:
- Computing
---

This week I spent a good time trying to understand the new input hotplug of devices on X and liked a lot. With this new subsystem the multiseat's life will becomes easier. I'll briefly explain here to you.

Before the hotplug sweetness, to add a new mouse/keyboad on X was only possibly on initialization time. Both of Xorg drivers, "evdev" and "mouse", made a hack to try initializations "on the run". This all was a mess and difficult a lot the configuration of the multiseats. But this world has changed.

Now what people are doing is starting the X server **without any input device configured**. The X server provides an API which listen all that happen on HAL. The HAL is notified when some device is plugged/unplugged and, trough an D-Bus external application it exchange messages with X. This all give to us a commodity to plug devices in a security and free way.

So well. An other problem with the kdrive (i.e. Xephyr, the X server used on nowadays multiseat) infrastructure is that it still not exists an interface that take care the hotplug. And it was exactly what I did on these last days. I implemented it and sent to the X people my patch waiting for a review.

Therefore, soon I'll post some scripts showing how to use this new wonderful subsystem.
