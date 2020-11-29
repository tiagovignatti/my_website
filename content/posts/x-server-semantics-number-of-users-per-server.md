---
date: 2007-03-29 03:26:39+00:00
draft: false
title: X server semantics - number of users per server
categories:
- Computing
---

Here is mail that I sent to xorg list a week ago. No one replied it :(

On IRC I talked with some developers and asked why they didn't said nothing about my comments and the answer summarized was that no one is really interested on multiseat (well, at least on first world countries). Strangely, it really give me a good perspective and motivation to keep the work :) 

-- cut here --

AFAIK, since MPX was introduced, the X server's semantic was changed regarding the number of users on the same X server instance. Before it was only one user associated with one display and now can be more than one. This semantic modification has a great interest with multiseat where we have some users, each associated with one display.

Today if we initialize one instance of the Xorg with two (or more) graphical cards, the RAC will do some HACK to play with it. On the other hand, two or more instances of Xorg initialized on the same VT (multiseat) will stall the system with things concerning the legacy VGA interface. Besides it, on the multiseat environment, the VGA arbitration should route the VGA to its right PCI buses. But the arbiter is not yet implemented.

I hacked a lot trying to understand how it all works and IMHO this things are really tough to deal, so here comes my idea: translate the X clients events to their associated display *inside* the X server. Well, XAT [1] already do this externally to X server (like a proxy) and can be thought like proof-of-concept. The semantics will modify a lot cause we are adding more than one display per server's instance.

So what I want to know is the best approach to achieve a multiseat. Should we learn more about how VGA routes its information? Should we try to do some external X server's RAC which could coordinate the severals X servers? Should we advance with this new semantic added by the MPX (one server, lot of users) + XAT? Or what?

I know that a lot of people here had discussed it, so please, your comments here will be very welcome and useful. My real motivations in do this are that nvidia proprietary driver knows how to deal with multiseat, mga too and a lot of companies around the world are sealing multiseat systems. Here in Brazil (and others third world countries) there are a lot of projects which are using multiseat.

-- cut here --
