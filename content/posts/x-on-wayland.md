---
date: 2012-06-13 14:01:32+00:00
draft: false
title: X on Wayland
categories:
- Computing
tags:
- wayland
- weston
- x11
- xorg
- xwayland
---

A rather cool feature on Weston compositor is xwayland, to support X11 native applications on Wayland. It's a quite important feature because gives the compatibility with the "old" windowing system, so say you have an application written on Motif/Xt or even something more "fancy" like a Web browser all tied with GTK2 and whatever dependency, then you better not bother yourself re-writing it to native Wayland or porting to a modern toolkit -- it should just work seamlessly on it. Hence, X on Wayland fits pretty well with our overall transition plan.

The architecture behind and the mechanisms are a little tricky though, let's take a look.

---

[![](http://vignatti.files.wordpress.com/2012/06/xwayland.png)
](http://vignatti.files.wordpress.com/2012/06/xwayland.png)


Once Weston is started, it launches the **xwayland module** which creates an X socket, adds it to the main Weston loop and waits for X clients to be connected into. When the first client gets connected, it triggers Weston to fork and exec one X server. Weston continues its normal execution but unregister itself that socket.

The X server, with the **Wayland backend** on it (xwayland), keeps listening Weston via a special **Wayland protocol interface**. Weston binds such interface and announces back the socket that X clients will be connecting to (`xserver_send_listen_socket event`) and the first X client that was just connected (`xserver_send_client event`). The idea is to give now to X the responsibility of clients trying to be connected, naturally. Worth to mention that this lazy initialization method was intentionally designed in order to avoid extra lags at Weston start up and memory overhead when X11 applications are not being used. So the X server is started on demand, only when actually needed.

At this point now, Weston also starts its **own X Window Manager**. In short, the main task of it is to proxy X applications built based on those old WM standards, such as EWMH and the jurassic ICCCM, and plumb them into the shiny Wayland desktop shell interface. In other words, the idea is to map different type of X windows on Wayland surfaces (`xserver_set_window_id request`), and specially give some meaningful user-interface policies on X Windows to the desktop shell, for instance making a surface to get maximized, or say to resize/move it around.

Other tasks the Weston X window manager performs are embed a pretty decoration frame around windows and also make sure the client-to-client communication such as copy and paste (selection) and eventually drag and drop work nicely. Remark that the X protocol doesn't define policy but the WMs, and this is a challenge for Wayland, that does define. So the Weston X WM has to come up with the right amount of salt to fit perfectly the policies that were already straighten up by Wayland's desktop shell... hmm way too philosophical.

All X windows created from now on will be redirected to offscreen pixmap and stored on a DRM buffer (via the **xwayland video driver**); that's how compositing works on Wayland. The idea is that a X client will behave very likely as a regular Wayland client. Therefore, there's no protocol calls or any major task involved on xwayland and all happens seamlessly, with the protocol "conversion" penalty close to nil.

The architecture for input handling looks good already as well. At X init time, it's created fake devices, the keyboard and the pointer, and the concept goes the other way around of window creation: it gives the input devices capabilities from Weston to Xorg. We're still shaping the cursor settings, the complex logic of client and surface grabbing, among other features, but the basics are most definitely in place already.

http://www.youtube.com/watch?v=FLhMINYf3iE

So the video is there for demoing what we've got until now. You can see in practice all these rather cool building blocks I mentioned. It's rather cool.. specially for developers; one has to have the know-how on X11 and Wayland protocols, Xorg and Weston internals, X Window Manager standards, etc. Lot of fun!!!
