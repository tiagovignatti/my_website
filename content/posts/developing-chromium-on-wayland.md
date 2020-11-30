---
date: 2013-10-07 14:42:17+00:00
draft: false
title: developing Chromium on Wayland
featuredImage: https://upload.wikimedia.org/wikipedia/commons/5/53/Chromium_78_running_on_GNOME_Shell_and_Ubuntu_Linux.png
categories:
- Computing
tags:
- Browser
- Chrome
- Chromium
- Content Shell
- open-source
- Ozone
- Ozone-Wayland
- wayland
- Web
---

A [few weeks ago](http://vignatti.com/2013/09/18/welcome-to-chromiums-ozone-wayland/) we released Ozone-Wayland and now we'd like to detail for you the development process and strategy behind it... ah, and the title is not developing Chromium, the browser; it's developing Chromium,** the project**! You will understand why next.

**communities**

There are three main projects involved in here: _Chromium_, _Wayland_ and _Ozone-Wayland_. In Chromium, there is a very big and geek community that mainly produces Chrome browser and Chrome-OS. Very near to that one there's Blink engine's community, which interacts (and overlaps) a lot with the Chromium's; I can't tell exactly in numbers but there's huge number of people, vendors and commercial involved in Chromium and, more important to us, there's a lot of quality code being cooked in there for leveraging Web technologies in general.

In the other side, we have Wayland, the project that hosts the development of a Linux graphics system. Its goal is to give to applications the best graphics performance that can be extracted from the hardware. The community in there mainly produces the Wayland client/server libraries and Weston, the window server to hosts applications.

Now, somewhere in between Wayland's and Chromium's, the Ozone-Wayland community will start to grow. Ozone, the Chromium's meta-platform for supporting different windowing systems, has given the possibility of building the whole Wayland support _outside_ the Chromium and Wayland code-bases -- basically each project then has its own code base. It may take a second of reflexion, but it's an wonderful way of organizing the development because a community doesn't need to step on the other. And that's the main point because, grossly speaking, Web developers don't want know core graphics and hardware details, while the window system's don't want to know about Web technologies. Using this kind of organization, Ozone-Wayland therefore hosts the tough task of bridging Wayland graphics for Chromium, and on doing so also diminishes the burden of the two other big communities having to interact directly with each other.

**products cheat-sheet.**

It's good to remember what each of these three projects are building. A quick guide follows:

- Chromium: Blink Web engine, Content Shell (used for runtime's, browsers, etc), Chrome browser, Ash UI, Chrome-OS, among others.

- Wayland: libwayland-server, libwayland-client, Weston window compositor, Desktop Shell (a "toy" shell UI, for testing purposes).

- Ozone-Wayland: libozone-wayland, that relying on libwayland-client and linking with _all_ Chromium based products. So Ozone-Wayland basically leverage any of those products that the Chromium project develops.

**web page and how-to.**

A few people came asking me how to setup Ozone-Wayland and etc. I'm not sure you guys noticed, but we're hosting there in Github [something that we call our "Web page"](https://github.com/01org/ozone-wayland#introduction), detailing a bit more how Chromium code-base plays together with the Wayland specific bits. In particular, there's a how-to for people that wants to give a try and check out the development. There's a [small wiki](https://github.com/01org/ozone-wayland/wiki) as well.

**Github infrastructure.**

We're coordinating the development via [Github's tracking issue system](https://github.com/01org/ozone-wayland/issues?state=open) and trying to avoid mailing list so far -- Welcome to the 21st century... let's see how long we can stay in there and avoid going back to the 20th again :)

So you can ["star"](https://github.com/01org/ozone-wayland/stargazers) and ["watch"](https://github.com/01org/ozone-wayland/watchers) Ozone-Wayland, as a subscription mechanism to get notifications of all sort of updates. Do it now!

**IRC.**

we hang out in freenode.net, #ozone-wayland channel; everyday and in the timezone you wish :)
