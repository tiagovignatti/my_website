---
date: 2009-01-14 22:48:44+00:00
draft: false
title: Cursor's update inside kernel only
categories:
- Computing
---

One thing that I learned with open communities is when you send a proposal idea and no one replies. This seems to be odd at first but it _isn't_. If you did something strange or wrong then at least someone will reply. OTOH if you did something that can be promiser _and_ no one objects, then great! 99% that you did something interesting :)

Given that I'll not work towards this cursor's shortcut idea soon, I'm posting a mail that I [recently sent](http://www.mail-archive.com/dri-devel@lists.sourceforge.net/msg37437.html) to dri list and didn't see much excitement there. So the bits are preserved here for future references.

---

Under KMS, we can build a feature to update the cursor directly to screen without the continuous intervention of the userspace application (X server, wayland, etc). It's a fastpath for DRM based cursors obtained by short-circuit the kernel input layer and DRM module. This would solve [all cursor's latency issues](http://vignatti.wordpress.com/2008/07/29/improving-input-latency/) that we have in our current model.

This series of patches implement such feature using Xorg as the application. Through an ioctl, Xorg tells which devices are responsible for cursors' updates and the kernel evdev driver will spit the events to DRM. DRM will take care about the event informations and also screen limits, and then will draw the cursor on screen. Very intuitive.

Right now a thing that is annoying me is how others cursors, sw rendered, could be implemented. I want to avoid two different sets of the same code in different contexts. IMHO conceptually all these cursor update things must be in-kernel. Painting a cursor image seems to be quite hard as we have to save/restore areas under the cursor. I remember that anholt had an idea concerning this, but I do not remember details.

Well, the patches are far from ready to go upstream, but it deploys a system working on this way. So, for now, this mail has two goals:
- to people comment on and see in what kind of world we can move.
- get a feedback how we can proceed in the case of sw cursors.

Please, comment on. The patches can be found [here](http://people.freedesktop.org/~vignatti/code/drmcursor/).
