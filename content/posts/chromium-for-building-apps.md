---
title: "Using Chromium for Building Apps (2025)"
summary: "Beyond the browser."
featuredImagePreview: /images/dall-e-chromium-preview.webp
date: 2024-12-04T10:36:37-03:00
draft: false
toc: false
---

{{< style "text-align:justify; strong{color:#00b1ff;}" >}}

_Instead of using Chromium for browsing the Web, let's explore how to use it for building applications._

[Chromium](https://www.chromium.org/Home/) is open-source and its codebase is organized in components which can be used for many different purposes. For example, Chromium is used for building browsers other than **Chrome** like **Edge**, **Brave**, **Vivaldi**, among others. You may also be familiarized with [V8](https://v8.dev/), the Chromium JavaScript engine that may be used to power scripting on server-side, like **Node.js** and **Deno**.

But in other non-browser scenarios, a powerful approach is leveraging Chromium to build application software. Using Chromium for apps is giving a different perspective for the Chromium project and is being used on products serving millions of users.

Let’s delve together to understand this idea further\!

![DALL·E - A futuristic illustration with the Chromium, symbolizing its innovative applications beyond web\ browser](/images/dall-e-chromium.webp)

An outstanding feature of the Web is the "write once, run everywhere" concept. It means that developers usually want to use a single language & framework to build an application that will run on a variety of platforms.

For example, if a developer needs to build a traditional App to reach the widest range of users, they would have to develop it with Kotlin for Android, Swift for iPhone, .NET for Windows, and so forth—essentially, a separate app for each platform. The Web solves that because the App can be built using a common set of languages instead, like HTML, CSS, and JavaScript, and the App content would just run beautifully on each platform's Web browser.

Beautifully, usually, but not always complete.

Sometimes it is not possible to bring native functionalities to the Web. For example, copying an image content from a Web app into another Web app was only possible recently. Sharing an image with a native client also was recently implemented. In terms of performance, getting parity with the native application is difficult too.

It is quite common to encounter applications seeking deeper modifications to the underlying platform to unlock features that Web technology APIs either don't offer or are not yet supported by browsers. 

> It is important to highlight the [Fugu Project](https://developer.chrome.com/docs/capabilities), a hard-working group of developers who are influencing upstream Chromium with specs, standards and the Progressive Web Applications (PWAs) initiative to close this gap between native and Web apps. Their journey is not simple though, as we can see in the list of capabilities on the [Fugu API Tracker](https://issues.chromium.org/issues?q=customfield1223031:proj-fugu%20-customfield1223031:proj-fugu-efforts%20-is:obsolete).

Creating true web applications that mimic native behavior and function seamlessly across platforms is no easy task therefore. This is where **cross-platform application frameworks built using Chromium** come into play. These frameworks offer tools to embed Web technologies into applications and simplify the use of Chromium through higher-level APIs.

Here is a curated list of these projects and frameworks:

|  | Language bindings | Mobile platform | Desktop platform | Chromium Extensions | Maintainability |
| :---- | ----- | ----- | ----- | ----- | ----- |
| WebView-based frameworks | ❌ | ✅ | ✅ | ❌ | ✅ |
| Electron | ❌ | ❌ | ✅ | ❌ | ✅ |
| CEF | ✅ | ❌ | ✅ | ❌ | ✅ |
| Chromium’s Content | ❌ | ✅ | ✅ | ✅ | ❌ |
| Chromium’s WebLayer | ❌ | ✅ | ✅ | ❌ | ❌ |


**\- WebView** is a component that allows developers to display Web content within a native app. WebView is particularly useful in hybrid applications, for example, when certain parts of the app—such as login screens, documentation, or user guides—are created using Web technologies but need to be presented within the native environment. There is a growing list of frameworks here relying on WebView e.g. Tauri and Ionic allowing the developers to deploy the application across a variety of platforms.

However, using WebView comes with well-known challenges, such as the inconsistency across implementations, where behavior can vary between platforms (e.g., Android’s WebView versus iOS’s WKWebView versus Windows’ WebView2). Additionally, there is limited native integration, making it more complex to work with device-specific APIs like AR, advanced sensors, or system-level interactions. 

\- **Electron** is a framework that has Chromium and Node.s combined into one runtime and is used for building well known apps like Slack, VS Code, Discord’s desktop client and others. A developer needs to write in JavaScript to use it and it's meant for desktop only. Once the Electron version is updated, the app gets it “for free” usually without much maintenance intervention. There are [known issues with security](https://www.electronjs.org/docs/latest/tutorial/security) when, say, a remote Web app can have full access to Node and potentially it could do anything with the system.

\- **CEF**, the Chromium Embedded Framework, is widely used for building desktop applications like Spotify, Valve's Steam, and the Epic Games Launcher. CEF is highly versatile, offering bindings for several programming languages such as C++, Python, and Java, making it accessible for a variety of development environments. Like Electron, CEF excels in terms of maintainability because it provides a consistent, cross-platform framework that simplifies updating and managing the browser engine.

\- **Chromium Content** is the [de facto Chromium API for the Web platform](https://chromium.googlesource.com/chromium/src/+/HEAD/content/README.md) and is used for browser-like apps: Vivaldi, Brave and other full-fledged Web browsers use it. It's essentially used for those who want to do a Chromium fork. An application using it has to deal with the downstream related issues, which can be a real challenge for maintaining.

\- And, just for completeness, we list here [**WebLayer**](https://source.chromium.org/chromium/chromium/src/+/refs/tags/118.0.5993.96:weblayer/public/README.md), which is a deprecated but very interesting abstraction layer in Chromium. It's also meant for building full-fledged Web browsers.

![Igalia - Chromium team](/images/20230403_165217.jpg)

Instead of using Chromium for browsing we understand now that developers are relying on the project for building applications. This technical post has also reviewed some of the existent cross-platform application frameworks built using Chromium. 

A developer wanting to build a cross-platform app will need to fully understand its requirements to only then embrace the solution. There is no one-size-fits-all here, unfortunately. **[Igalia](https://www.igalia.com)** is always happy to assist you here\!  


{{< /style >}}
