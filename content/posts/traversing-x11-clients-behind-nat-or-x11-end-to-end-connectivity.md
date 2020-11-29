---
date: 2008-03-21 20:29:33+00:00
draft: false
title: Traversing X11 clients behind NAT (or X11 end-to-end connectivity)
categories:
- Computing
tags:
- firewall
- nat
- p2p
- traversing
- x11
- xorg
---

I was thinking how we could make remotely X clients totally connective with the server when **both** are behind a NAT/firewall.

We can imagine one big motivation to do this: a scenario where someone using his thin and poor machine wants to use the resources of some "fat" machines which he simply doesn't know where they are seated. Those fat machines could be arranged through a P2P network of "X11 pool of resources" and the list of machines displayed to the user select his desired one (e.g. with minor lag/load). Someone more capitalist than me could go further and imagine a provider selling X11 resources to mobile devices. Or just open your home machine's web browser in any place of the world. Well, the field of applications would be huge.

Maybe this would be a kick in the a** of the so called web-based applications. Now you have to learn how to program in html, php, ajax or another boring language to build something in this kind of environment. Instead, we could see this P2P network also as a web-based environment letting people to program apps in their preferred toolkit (and yes, I'm betting that the data transfer rates in the various networks will increase significantly in the next years).

- How?

There's a technique to create TCP connections between machines behind NAT/firewall called "hole punching' [0, 1]. With the help of a server (called rendezvous) two machines behind NAT/firewall open a 'hole' in their NAT/firewall to establish a connection. A similar technique -- using UDP -- is what Skype and others are relaying today.

Someone already mentioned [2] to wrap X11 protocol with jabber (or other protocol). It would be also an idea. But I don't know how much the latency would increase in this case.

Certainly there are others techniques to achieve the X11 end-to-end transparency among machines that I'm missing.

- Why ssh -X and xfwp is not the way?

Simply because it doesn't let end-to-end connectivity.

I didn't thought what would be the impact in both client and server side. Probably all this will touch some aspects of authentication and
security. I don't know.

So I would like to hear from you what do you think about this all (and eventually find a mentor to apply this in GSoC  ;)  )

Cheers,

[0]
http://www.usenix.org/event/imc05/tech/full_papers/guha/guha_html/index.html
[1] http://www.bford.info/pub/net/p2pnat/
[2] http://butterfeet.org/?p=23
