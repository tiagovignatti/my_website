---
date: 2013-03-05 15:00:00+00:00
draft: false
title: UI customization on Wayland
categories:
- Computing
tags:
- canonical
- customize
- mir
- protocol
- shell
- ubuntu
- user interface
- wayland
---

Let's forget for a second about video drivers, whether it has acceleration or not, and all the related issues with hardware support on Wayland. This is [all solved](http://ppaalanen.blogspot.com/2012/11/on-supporting-wayland-gl-clients-and.html). Let's talk about the user interface (UI) and ways to customize it all over the computing continuum -- from phones, tablets and TV box to desktop PCs, Invehicle Infotainment (IVI), aeroplane systems, among others.

[![wayland-ui-customization](http://vignatti.files.wordpress.com/2013/03/wayland-ui-customization.png?w=450)
](http://vignatti.files.wordpress.com/2013/03/wayland-ui-customization.png)

(I've made a [cheat sheet here](http://vignatti.files.wordpress.com/2013/03/wayland-ui-customization-cheat-sheet.png) also -- Creative Commons Legal Code Attribution 2.0. for both figures)

On customization, the **shell plugin** comes first: changes in there will impact directly which UI paradigm will be used. Specifically, one implementing the plugin protocol will be defining whether the UI is meant for phones, IVI, desktops, etc.

Probably the most important characteristic of the shell plugin is to give "roles" for surfaces, i.e. define where and how they will be mapped on the screen. For example, if a client wants its surface mapped as a top-level window, or say to resize the dimensions of it, then it's up to the shell to expose these different surfaces roles, all according the UI paradigm the shell itself is providing.

Worth to note that the shell plugin doesn't need to rely on any drawing library or graphics toolkit because it doesn't tackle directly drawing aspects. Also, conceptually it's mandatory to give roles for surfaces and therefore a shell plugin is a must (or at least a simple implementation of surface::configure).

An special **shell client** through an special "private" protocol can be used for setting up basic UI elements that require special treatment. For example in the desktop UI, widget elements such as panel, dock, lockscreen and cursors will need special treatments for their positioning, grabbing semantics and so forth.

On customization, different shell clients, exposing different UI elements can be implemented using *the* *same* shell plugin. Some architectures will rather be using one overlay simple client that will take care of spawning and controlling other UI basics applications also.

The special client will probably want to rely on graphics toolkits.

**Wayland clients** use the Wayland core protocol and the protocol that shell plugin has defined. The corollary is that one client will always know the UI paradigm (due shell plugin) and will *not* work across different paradigms. Though, that doesn't mean applications will need to know their paradigm necessarily but only the middleware software is connecting to Wayland (like the graphics toolkits).


### A footnote about Canonical's Mir


Canonical announced their [new display manager](https://wiki.ubuntu.com/MirSpec) yesterday. There's a section "Why Not Wayland / Weston?" where they claim:

_"we consider the shell integration parts of the protocol as privileged and we'd rather avoid having any sort of shell behavior defined in the client facing protocol."_

and something similar was [written here](http://samohtv.wordpress.com/2013/03/04/mir-an-outpost-envisioned-as-a-new-home/) also:

_" Wayland .. exposes privileged sections like the shell integration that we planned to handle differently, both for security reasons and as we wanted to decouple the way the shell works on top of the display server from the application-facing protocol"_

so they would rather have:

_"An outer-shell together with a frontend-firewall that allow us to port our display server to arbitrary graphics stacks and bind it to multiple protocols."_

First of all, there's nothing privileged about the shell protocol Wayland is exposing. wl_shell and wl_shell_surface (the "shell protocols") are part of the Wayland core protocol, yes, but as I've explained on this post, it's all customizable for whatever UI needs. Nevertheless, their usage is completely optional and anyone can build a different shell and stack with the rest of Wayland, just like tablet-shell protocol for instance does. Still, this will be Wayland and use the shiny libwayland for IPC.

Therefore I don't think Canonical should justify their new project because Wayland _"does not fulfill .. requirements completely"_. There are no technical reasons Ubuntu cannot use Wayland in principle. What they wrote there is a very very mean excuse instead.
