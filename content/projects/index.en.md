---
title: "Projects"
draft: false
toc:
  auto: false
showDate: false
showReadingTime: false
---

Below are some of the projects I've worked on throughout my career. Some are full-fledged products, and some are just libraries and small systems. Some I'm the primary developer and some I've just contributed to.

Listed (more less) in reverse chronological order:

<!--

## Content authoring tool and auth tracking mechanism

Content authoring tool for 3D objects and 360-degree videos. Mesh compression using Draco on client-side for 3D models. Authentication mechanism for content sharing. License system for tracking.
Technology: Vue.js. Vuetify. Node.js, MongoDB, Elastic Search.
-->

---

## 3D viewer for the Web

{{< figure src="https://desafiosdaeducacao.grupoa.com.br/wp-content/uploads/2021/03/GIF-corpo-humano.gif" class="float-right" >}}

We've built a viewer of 3D educational models for the Web (.glTF / .glb). Most of frontend was done using JavaScript using `<model-viewer>` web component, Vue.js and Vuetify; GraphQL and Apollo in the backend. In the beginning of **2021** we were streaming about 1000 of these 3D models to over 1M students accessing and able to interact with it using the desktop, mobile and augmented reality devices.

---

## 360-degree video infra for the Web

{{< figure src="/images/2021-05-22_18-14b.webp" class="float-left" >}}

In **2019** I've designed an innovative video infrastructure for video playback. Frontend was using A-Frame for handling user interaction (through Gamepad Web API) and also spherical rendering (with Three.js) the video content. Shaka-Player was used as the foundation for playing, UI controls, network buffering and streaming 360-degree media (but also 2d "plane" media) with high quality. Google Closure Compiler was used for putting things together. Most of backend was built on Node.js, served via Google App Engine. The streamed data was hosted and handled by Vimeo and Akamai CDN. Millions of users could watch and interact with 360-degree videos using desktop, Android, iOS (this one was rather important!) or in virtual reality devices.

---

## Itaipu VR App

{{< figure src="/images/11162707_643090662565064_8268919639556227072_n.webp" class="float-left" >}}

Built on Unity, coded with C#, using spatial audio, photogrammetry and other hyper-realism digital techniques to run on Samsung Gear VR, [Itaipu VR](https://www.youtube.com/watch?v=xG9od30Lwmg) has been recognized worldwide. Facebook [opened their keynote](https://youtu.be/6WuzK1xKMR8) at F8 **2018** highlighting this work.

---

## Various custom projects on Unreal Engine 4

{{< figure src="/images/Unreal_Engine_Logo.webp" class="float-right" >}}

During **2017 - 2020**, I've directed teams of audiovisual editors, 3D artists, educational content creators and engineers. I have lead the development of Virtual Reality and Augmented Reality content such as games, training and specially a [complete learning platform for high-school students](https://youtu.be/d8NU1rbFoII). Most of the projects were based on Unreal Engine 4 and C++.

---

## Sharing CPU and GPU buffers on Linux

{{< figure src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/203px-Tux.svg.png" class="float-left" >}}

I've designed [an architecture for systems with shared physical memory to exploit the advantages of heterogeneous computing](https://software.intel.com/content/www/us/en/develop/blogs/sharing-cpu-and-gpu-buffers-on-linux.html), saving memory and boosting performance on graphics libraries. As of **2016**, this innovative architecture and code are fully-upstreamed on Linux and also in Chrome OS, and being largely shipped within Chromebooks and other products.

---

## Zero-Copy Texture Uploads in Chrome OS

{{< figure src="https://software.intel.com/content/dam/develop/external/us/en/images/zero-copy-texture-uploads-in-chrome-os-fig1-599269.png" class="float-right" >}}

In **2015**, I've worked on optimizing Chromium graphics rendering pipeline for Web applications running on Chrome OS. It used the parallelism between the CPU and GPU under Intel architecture by using a technique called [zero-copy texture upload](https://web.archive.org/web/20210616140223/https://01.org/chromium/blogs/zero-copy-texture-uploads-chrome-os). Web content could be loaded 38% faster, using 65% lower memory, extending battery life and therefore the user perceiving a smoother, less jank experience.

---

## Chromium Ozone-GBM

{{< figure src="https://software.intel.com/content/dam/develop/external/us/en/images/ozone-architecture-overview-534299.png" class="float-right" >}}

My work on Ozone architecture and Ozone-Wayland implementation influenced Google to switch Chrome for Ozone, through Ozone-GBM, as well in **2014**. [Chromium Ozone-GBM](https://software.intel.com/content/www/us/en/develop/blogs/chromium-ozone-gbm-explained.html) is the native platform, fullscreen-only, that delegates the composition tasks of the root window to a new platform based on KMS/DRM. It uses EGL/GLES2 for accelerated rendering and has an internal implementation of the Linux evdev subsystem.

---

## Chromium Ozone-Wayland

When I've ported Chrome to run on Wayland in **2013**, it became obvious that a new abstraction for hosting different window systems in Chromium was needed. Together with Google [I have developed Ozone and implemented its first backend, Ozone-Wayland](https://news.slashdot.org/story/13/10/07/2212245/chromium-to-support-wayland). Commercial products have been using it, including a smart TVs' multi-billion corporation and a Digital Signage for a fast food chain installed in more than 6,500 stores.

---

## XWayland

R&D: In 2012 after released the first version of Wayland, I was involved XWayland, a transitional module for running X11 apps atop Wayland As of 2016, the adoption of Wayland scales up to many millions of users and range from mobile, IVI / automotive, set top box / smart TV to Linux distributions.

---

## Wayland protocol and Weston compositor

R&D: In 2012 we released the first version of Wayland. This event was much expected by the Linux community because it replaced the de facto X11, a protocol that existed for 25 years and contained several limitations when used in modern devices. I was involved on designing Wayland protocol and the architecture of Weston compositor: development of backlight display control, input devices hotplug, multi-touch support, client APIs ("tablet shell"). As of 2016, the adoption of Wayland scales up to many millions of users and range from mobile, IVI / automotive, set top box / smart TV to Linux distributions.

---

## Nokia N9's graphics stack

Around 2010, I have made contributions throughout the graphics stack of N9: the X Window System implementation (Xorg), the PowerVR SGX driver, the OpenGL ES 2D/3D open-source driver and the Qt-based compositor manager. The architecture platform was OMAP / ARM. I have also developed and helped to build Wayland protocol and its reference compositor Weston, making sure that this (back then) innovative graphics system could run on different platform vendors.

---

## Xorg for embedded devices

Productization: Working in the Maemo operating system for building N900, the first Nokia smartphone running on Linux. Also, developing MeeGo for N9, the N900 successor and critically-acclaimed Linux smartphone.

---

## FLOSS, X.Org Foundation and freedesktop communities

Starting in 2007, I was pretty involved with a bunch of Open-Source communities. I've literally travelled to all regions of Brazil to talk in conferences about "Software Livre" and been also in many internacional events.

---

## Linux kernel VGA Arbiter

I have authored the [VGA arbiter](https://www.kernel.org/doc/html/latest/gpu/vgaarbiter.html), deployed in the Linux kernel and a bunch of other operating systems as well.

---

## Multiseat software

Back then I was responsible for the maintainership of the graphics stack and packages, such as the X server, Mesa (OpenGL implementation), video and input drivers. On the development side, we have worked on multiseat software and also other FOSS products that were largely deployed to over 2000 schools in Brazil.

---

## Xorg Input-Thread

Google Summer of Code project to [separate the mouse thread on the X Window System reference implementation, the X server](https://www.phoronix.com/scan.php?page=news_item&px=ODU0MQ).

---

## vignatti.com

The [current website you're visiting](https://vignatti.com). This website is using Hugo framework (static website generator written in Go), with posts migrated [from WP](https://vignatti.wordpress.com/), and Google Analytics up. This website has been redone several times before but only the last couple sites were [open source](https://github.com/tiagovignatti/my_website).

---

## Long-term digital archiving system

P2P and Distributed Systems. Distributed Hash Table. This work was presented at the 2009 IEEE International Conference on Peer-to-Peer Computing, as "[Long-term digital archiving based on selection of repositories over P2P networks](https://ieeexplore.ieee.org/document/5284519/)"

---
<!--
## Zero-knowledge proof

---
-->