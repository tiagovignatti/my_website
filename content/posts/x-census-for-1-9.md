---
date: 2010-09-02 13:41:11+00:00
draft: false
title: X Census (for 1.9)
categories:
- Computing
tags:
- '1.9'
- development
- nokia
- x
- xorg
---

Topic's name is a funny (and friendly) devotion to [GNOME Census](http://blogs.gnome.org/bolsh/2010/07/28/gnome-census/). So let's take a look at some numbers from the time [Xorg 1.9 was in development](http://wiki.x.org/wiki/Server19Branch) - raw data is [here](http://people.freedesktop.org/~vignatti/xdevelopment/).

Would be unfair to measure only the work that happened e.g. in X server or in the drivers being developed and come up with the statistics about "who developed X". X and X development community are quite extensive and don't concern only "graphics" related, i.e., pixel information that appears on your display screen. This is a very common mistake.

---
_X does input device event processing, device keys mapping (e.g. keyboard), pixel rasterization, output and input devices hotplug and configuration, devices and user session pairing, (different) 2D/3D graphics implementation, frame-buffer content management, X application and session security, application memory resources testing, analysis and debugging and etc. So it's far from just pixel showing up on screen._
---

X is a generic graphical system. I prefer to see X as an implementation that doesn't handle (or should not) system-level resources like memory or frame-buffer content. [Other people](http://who-t.blogspot.com/2009/10/x11r75-released-but-what-is-it.html) see a bit differently. Given so, I divided all X development in the following groups, that you'll see below as **bold**. Statistics were generated from the time people were working on 1.9 Xorg (02 Apr to 20 Aug):

The [proto](http://cgit.freedesktop.org/xorg/proto) set of repositories represents the X11 core protocol description together with its  extensions. The implementation of X11 and extensions to be used by clients are inside [lib](http://cgit.freedesktop.org/xorg/lib) and [xcb](http://cgit.freedesktop.org/xcb). lib also contains some few libraries to be used within xserver. [xserver](http://cgit.freedesktop.org/xorg/xserver) contains the server implementation of X. So here are the numbers for **X implementation** (xserver, proto, lib and xcb repositories):

Processed 874 csets from 74 developers
59 employers found
A total of 291730 lines added, 155222 removed (delta 136508)

Developers with the most changesets
Alan Coopersmith           134 (15.3%)
Jamey Sharp                106 (12.1%)
Gaetan Nadon                84 (9.6%)
Keith Packard               66 (7.6%)
Tiago Vignatti              55 (6.3%)
Peter Hutterer              54 (6.2%)
Mikhail Gusarov             41 (4.7%)
Jeremy Huddleston           38 (4.3%)
Matt Dew                    21 (2.4%)
Fernando Carrijo            19 (2.2%)

Developers with the most changed lines
Matt Dew                  172273 (53.2%)
Alan Coopersmith          75739 (23.4%)
Gaetan Nadon              13199 (4.1%)
Mikhail Gusarov           8979 (2.8%)
Keith Packard             6438 (2.0%)
Jeremy Huddleston         5750 (1.8%)
Jamey Sharp               5535 (1.7%)
Tiago Vignatti            5227 (1.6%)
Marko Myllynen            5154 (1.6%)
Yaakov Selkowitz          3614 (1.1%)

Developers with the most lines removed
Marko Myllynen            4729 (3.0%)
Tiago Vignatti            3922 (2.5%)
Mikhail Gusarov           3670 (2.4%)
Yaakov Selkowitz          3523 (2.3%)
Josh Triplett             3141 (2.0%)
Adam Jackson              2521 (1.6%)
Jamey Sharp               2036 (1.3%)
Daniel Stone               312 (0.2%)
Fernando Carrijo           221 (0.1%)
Pierre-Loup A. Griffais     91 (0.1%)

Developers with the most signoffs (total 1007)
Keith Packard              184 (18.3%)
Alan Coopersmith           155 (15.4%)
Gaetan Nadon               105 (10.4%)
Jamey Sharp                103 (10.2%)
Peter Hutterer              88 (8.7%)
Tiago Vignatti              56 (5.6%)
Mikhail Gusarov             42 (4.2%)
Jeremy Huddleston           39 (3.9%)
Fernando Carrijo            19 (1.9%)
Adam Jackson                18 (1.8%)

Developers with the most reviews (total 530)
Keith Packard               74 (14.0%)
Peter Hutterer              63 (11.9%)
Jamey Sharp                 62 (11.7%)
Alan Coopersmith            46 (8.7%)
Adam Jackson                44 (8.3%)
Julien Cristau              34 (6.4%)
Dan Nicholson               30 (5.7%)
Daniel Stone                23 (4.3%)
Alex Deucher                21 (4.0%)
Tiago Vignatti              18 (3.4%)

Developers with the most test credits (total 42)
Gaetan Nadon                11 (26.2%)
Tiago Vignatti               8 (19.0%)
Jeremy Huddleston            2 (4.8%)
Colin Harrison               2 (4.8%)
Richard Barnette             2 (4.8%)
Eric Anholt                  2 (4.8%)
Keith Packard                1 (2.4%)
Peter Hutterer               1 (2.4%)
Dan Nicholson                1 (2.4%)
Dave Airlie                  1 (2.4%)

Developers who gave the most tested-by credits (total 42)
Jamey Sharp                 11 (26.2%)
Alan Coopersmith             9 (21.4%)
Keith Packard                8 (19.0%)
Tiago Vignatti               2 (4.8%)
Yaakov Selkowitz             2 (4.8%)
Kristian Høgsberg           2 (4.8%)
Jon TURNEY                   2 (4.8%)
Peter Hutterer               1 (2.4%)
Mikhail Gusarov              1 (2.4%)
Pierre-Loup A. Griffais      1 (2.4%)

Developers with the most report credits (total 13)
Richard Barnette             2 (15.4%)
Jamey Sharp                  1 (7.7%)
Dave Airlie                  1 (7.7%)
Robert Hooker                1 (7.7%)
Fabio Pedretti               1 (7.7%)
Julien Cristau               1 (7.7%)
Matt Turner                  1 (7.7%)
Kalle Olavi Niemitalo        1 (7.7%)
Chris Ball                   1 (7.7%)
邓逸昕                    1 (7.7%)

Developers who gave the most report credits (total 13)
Julien Cristau               3 (23.1%)
Tiago Vignatti               2 (15.4%)
Peter Hutterer               2 (15.4%)
Jamey Sharp                  1 (7.7%)
Dave Airlie                  1 (7.7%)
Alan Coopersmith             1 (7.7%)
Chris Wilson                 1 (7.7%)
Michel Dänzer               1 (7.7%)
Pauli Nieminen               1 (7.7%)

Top changeset contributors by employer
Oracle                     135 (15.4%)
jamey@minilop.net          106 (12.1%)
Intel                       89 (10.2%)
Red Hat                     87 (10.0%)
memsize@videotron.ca        84 (9.6%)
Nokia                       75 (8.6%)
dottedmag@dottedmag.net     41 (4.7%)
Apple                       38 (4.3%)
matt@osource.org            21 (2.4%)
fcarrijo@yahoo.com.br       19 (2.2%)

Top lines changed by employer
matt@osource.org          172273 (53.2%)
Oracle                    77967 (24.1%)
memsize@videotron.ca      15840 (4.9%)
Red Hat                   9684 (3.0%)
dottedmag@dottedmag.net   9029 (2.8%)
Intel                     7898 (2.4%)
Apple                     6162 (1.9%)
jamey@minilop.net         5986 (1.8%)
Nokia                     5548 (1.7%)
yselkowitz@users.sourceforge.net 3652 (1.1%)

Employers with the most signoffs (total 1007)
Intel                      207 (20.6%)
Oracle                     155 (15.4%)
Red Hat                    119 (11.8%)
memsize@videotron.ca       105 (10.4%)
jamey@minilop.net          103 (10.2%)
Nokia                       78 (7.7%)
dottedmag@dottedmag.net     42 (4.2%)
Apple                       39 (3.9%)
fcarrijo@yahoo.com.br       19 (1.9%)
yselkowitz@users.sourceforge.net   17 (1.7%)


X drivers, although [decreasing in functionality](http://who-t.blogspot.com/2010/07/input-event-processing-in-x.html) with the time, they still touching kernel and system-level tasks. And that's why I prefer see those separated from the rest of X implementation. The numbers of development of **X input drivers and input event processing tools** ([xf86-input-](http://cgit.freedesktop.org/xorg/driver)*, [xkbcomp](http://cgit.freedesktop.org/xorg/app/xkbcomp/), [xkeyboard-config](http://cgit.freedesktop.org/xkeyboard-config/) repositories):

Processed 285 csets from 28 developers
24 employers found
A total of 20679 lines added, 17716 removed (delta 2963)

Developers with the most changesets
Gaetan Nadon               115 (40.4%)
Peter Hutterer              62 (21.8%)
Sergey V. Udaltsov          45 (15.8%)
Chris Bagwell                7 (2.5%)
Daniel Stone                 7 (2.5%)
Stephan Hilb                 5 (1.8%)
Simon Thum                   4 (1.4%)
Adam Jackson                 3 (1.1%)
Julien Cristau               3 (1.1%)
Oliver McFadden              3 (1.1%)

Developers with the most changed lines
Sergey V. Udaltsov        17613 (74.3%)
Gaetan Nadon              3096 (13.1%)
Peter Hutterer            1024 (4.3%)
Stephan Hilb               479 (2.0%)
Daniel Knittl-Frank        272 (1.1%)
Simon Thum                 189 (0.8%)
Daniel Stone               152 (0.6%)
Chris Bagwell               81 (0.3%)
Michel Dänzer              66 (0.3%)
Patrick Curran              46 (0.2%)

Developers with the most lines removed
Gaetan Nadon              2244 (12.7%)
Peter Hutterer             206 (1.2%)
Fernando Carrijo            10 (0.1%)
Alan Coopersmith             7 (0.0%)
Julien Cristau               2 (0.0%)
Paulo Ricardo Zanoni         1 (0.0%)

Developers with the most signoffs (total 238)
Gaetan Nadon               115 (48.3%)
Peter Hutterer              79 (33.2%)
Daniel Stone                 9 (3.8%)
Chris Bagwell                7 (2.9%)
Alan Coopersmith             6 (2.5%)
Fernando Carrijo             3 (1.3%)
Oliver McFadden              3 (1.3%)
Bartosz Brachaczek           2 (0.8%)
Adam Jackson                 2 (0.8%)
Ævar Arnfjörð Bjarmason    2 (0.8%)

Developers with the most reviews (total 52)
Rémi Cardona               14 (26.9%)
Fernando Carrijo             9 (17.3%)
Jamey Sharp                  9 (17.3%)
Peter Hutterer               8 (15.4%)
Alan Coopersmith             4 (7.7%)
Dan Nicholson                3 (5.8%)
Gaetan Nadon                 1 (1.9%)
Simon Thum                   1 (1.9%)
Julien Cristau               1 (1.9%)
Magnus Kessler               1 (1.9%)

Developers with the most test credits (total 5)
Peter Hutterer               2 (40.0%)
Bartek Iwaniec               2 (40.0%)
Magnus Kessler               1 (20.0%)

Developers who gave the most tested-by credits (total 5)
Bartosz Brachaczek           2 (40.0%)
Peter Hutterer               1 (20.0%)
Chris Bagwell                1 (20.0%)
Patrick Curran               1 (20.0%)

Developers with the most report credits (total 3)
Peter Hutterer               1 (33.3%)
Julien Cristau               1 (33.3%)
Gabor Z. Papp                1 (33.3%)

Developers who gave the most report credits (total 3)
Gaetan Nadon                 2 (66.7%)
Gabor Z. Papp                1 (33.3%)

Top changeset contributors by employer
memsize@videotron.ca       115 (40.4%)
Red Hat                     65 (22.8%)
svu@gnome.org               45 (15.8%)
daniel@fooishbar.org         7 (2.5%)
chris@cnpbagwell.com         7 (2.5%)
Oracle                       5 (1.8%)
stephan@ecshi.net            5 (1.8%)
simon.thum@gmx.de            4 (1.4%)
VMWare                       4 (1.4%)
Nokia                        3 (1.1%)

Top lines changed by employer
svu@gnome.org             17683 (74.6%)
memsize@videotron.ca      3304 (13.9%)
Red Hat                   1273 (5.4%)
stephan@ecshi.net          479 (2.0%)
knittl89+git@googlemail.com  272 (1.1%)
simon.thum@gmx.de          189 (0.8%)
daniel@fooishbar.org       181 (0.8%)
chris@cnpbagwell.com        81 (0.3%)
VMWare                      67 (0.3%)
pjcurran@wisc.edu           46 (0.2%)

Employers with the most signoffs (total 238)
memsize@videotron.ca       115 (48.3%)
Red Hat                     81 (34.0%)
daniel@fooishbar.org         9 (3.8%)
chris@cnpbagwell.com         7 (2.9%)
Oracle                       6 (2.5%)
Nokia                        3 (1.3%)
fcarrijo@yahoo.com.br        3 (1.3%)
simon.thum@gmx.de            2 (0.8%)
avarab@gmail.com             2 (0.8%)
b.brachaczek@gmail.com       2 (0.8%)


for **userspace video drivers** ([libdrm](http://cgit.freedesktop.org/mesa/drm), [mesa](http://cgit.freedesktop.org/mesa/mesa) and all [xf86-video-*](http://cgit.freedesktop.org/xorg/driver)):



Processed 5608 csets from 107 developers
84 employers found
A total of 528511 lines added, 1345893 removed (delta -817382)

Developers with the most changesets
Brian Paul                 599 (10.7%)
Eric Anholt                597 (10.6%)
Gaetan Nadon               431 (7.7%)
Vinson Lee                 426 (7.6%)
Marek Olšák              415 (7.4%)
José Fonseca              357 (6.4%)
Kenneth Graunke            326 (5.8%)
Ian Romanick               321 (5.7%)
Carl Worth                 233 (4.2%)
Chris Wilson               208 (3.7%)

Developers with the most changed lines
Eric Anholt               957175 (56.3%)
Jeremy Huddleston         146459 (8.6%)
Kenneth Graunke           58744 (3.5%)
Jakob Bornecrantz         46941 (2.8%)
xgi0007                   37147 (2.2%)
Brian Paul                36067 (2.1%)
Carl Worth                25201 (1.5%)
Jerome Glisse             22808 (1.3%)
Kristian Høgsberg        20469 (1.2%)
José Fonseca             18998 (1.1%)

Developers with the most lines removed
Eric Anholt               930476 (69.1%)
Jakob Bornecrantz         37952 (2.8%)
Kristian Høgsberg        6935 (0.5%)
Keith Whitwell            3829 (0.3%)
Gaetan Nadon              3113 (0.2%)
Daniel Vetter              956 (0.1%)
Chia-I Wu                  451 (0.0%)
George Sapountzis          269 (0.0%)
Owain Ainsworth             58 (0.0%)
Joakim Sindholt             26 (0.0%)

Developers with the most signoffs (total 926)
Gaetan Nadon               363 (39.2%)
Chris Wilson               186 (20.1%)
Jerome Glisse               50 (5.4%)
Dave Airlie                 42 (4.5%)
Daniel Vetter               37 (4.0%)
Brian Paul                  27 (2.9%)
Alex Deucher                22 (2.4%)
Jeremy Huddleston           18 (1.9%)
Adam Jackson                16 (1.7%)
José Fonseca               14 (1.5%)

Developers with the most reviews (total 24)
Alan Coopersmith             6 (25.0%)
Rémi Cardona                4 (16.7%)
Ian Romanick                 2 (8.3%)
Eric Anholt                  2 (8.3%)
Corbin Simpson               2 (8.3%)
George Sapountzis            2 (8.3%)
Gaetan Nadon                 1 (4.2%)
Chris Wilson                 1 (4.2%)
Adam Jackson                 1 (4.2%)
José Fonseca                1 (4.2%)

Developers with the most test credits (total 11)
Nick Bowler                  2 (18.2%)
Calvin Walton                2 (18.2%)
Aaron Plattner               1 (9.1%)
Marek Olšák                1 (9.1%)
Tom Fogal                    1 (9.1%)
Brian Rogers                 1 (9.1%)
Arkadiusz Miśkiewicz        1 (9.1%)
Krzysztof Halasa             1 (9.1%)
Sven Arvidsson               1 (9.1%)

Developers who gave the most tested-by credits (total 11)
Daniel Vetter                5 (45.5%)
Chris Wilson                 2 (18.2%)
Dan Nicholson                1 (9.1%)
Marcin Slusarz               1 (9.1%)
Francisco Jerez              1 (9.1%)
Tom Stellard                 1 (9.1%)

Developers with the most report credits (total 17)
Aaron Plattner               1 (5.9%)
Brian Rogers                 1 (5.9%)
Arkadiusz Miśkiewicz        1 (5.9%)
Julien Cristau               1 (5.9%)
Kenneth Graunke              1 (5.9%)
Thomas Bächler              1 (5.9%)
Niels Ole Salscheider        1 (5.9%)
Roy Spliet                   1 (5.9%)
Gianluca Anzolin             1 (5.9%)
Sergey Samokhin              1 (5.9%)

Developers who gave the most report credits (total 17)
Chris Wilson                11 (64.7%)
Marek Olšák                2 (11.8%)
Julien Cristau               1 (5.9%)
Ian Romanick                 1 (5.9%)
Gaetan Nadon                 1 (5.9%)
Maarten Maathuis             1 (5.9%)

Top changeset contributors by employer
VMWare                    1870 (33.3%)
Intel                     1552 (27.7%)
memsize@videotron.ca       431 (7.7%)
maraeo@gmail.com           415 (7.4%)
kenneth@whitecape.org      326 (5.8%)
LunarG                     195 (3.5%)
Red Hat                    183 (3.3%)
luca@luca-barbieri.com     127 (2.3%)
mostawesomedude@gmail.com   72 (1.3%)
AMD                         64 (1.1%)

Top lines changed by employer
Intel                     1057613 (62.3%)
Apple                     238512 (14.0%)
VMWare                    173210 (10.2%)
kenneth@whitecape.org     67387 (4.0%)
Red Hat                   47856 (2.8%)
xgi0007@linux.site        37148 (2.2%)
LunarG                    29790 (1.8%)
maraeo@gmail.com          15014 (0.9%)
memsize@videotron.ca      9531 (0.6%)
luca@luca-barbieri.com    6345 (0.4%)

Employers with the most signoffs (total 926)
memsize@videotron.ca       363 (39.2%)
Intel                      210 (22.7%)
Red Hat                    110 (11.9%)
VMWare                      58 (6.3%)
daniel.vetter@ffwll.ch      36 (3.9%)
AMD                         22 (2.4%)
Apple                       18 (1.9%)
Oracle                      12 (1.3%)
maraeo@gmail.com            11 (1.2%)
NVidia                      11 (1.2%)


**Pixman** library ([pixman](http://cgit.freedesktop.org/pixman)) is a special one because can be used inside X and for other components on the system like cairo. It's used for pixel manipulation, e.g. fast path to get advantages of CPU features: 

Processed 78 csets from 8 developers
8 employers found
A total of 3088 lines added, 1270 removed (delta 1818)

Developers with the most changesets
Søren Sandmann Pedersen    54 (69.2%)
Siarhei Siamashka            9 (11.5%)
M Joonas Pihlaja             6 (7.7%)
Jeff Muizelaar               3 (3.8%)
Andrea Canciani              2 (2.6%)
Brad Smith                   1 (1.3%)
Marek Vasut                  1 (1.3%)
Siddharth Agarwal            1 (1.3%)

Developers with the most changed lines
Søren Sandmann Pedersen  2207 (64.7%)
Siarhei Siamashka          462 (13.6%)
M Joonas Pihlaja           185 (5.4%)
Andrea Canciani            119 (3.5%)
Marek Vasut                 69 (2.0%)
Brad Smith                  24 (0.7%)
Jeff Muizelaar              20 (0.6%)
Siddharth Agarwal            2 (0.1%)

Developers with the most lines removed

Developers with the most signoffs (total 5)
Egor Starkov                 1 (20.0%)
Rami Ylimaki                 1 (20.0%)
Jeff Muizelaar               1 (20.0%)
Marek Vasut                  1 (20.0%)
Siarhei Siamashka            1 (20.0%)

Developers with the most reviews (total 0)

Developers with the most test credits (total 0)

Developers who gave the most tested-by credits (total 0)

Developers with the most report credits (total 0)

Developers who gave the most report credits (total 0)

Top changeset contributors by employer
Red Hat                     54 (69.2%)
Nokia                        9 (11.5%)
jpihlaja@cc.helsinki.fi      6 (7.7%)
jmuizelaar@mozilla.com       3 (3.8%)
ranma42@gmail.com            2 (2.6%)
brad@comstyle.com            1 (1.3%)
sid.bugzilla@gmail.com       1 (1.3%)
marek.vasut@gmail.com        1 (1.3%)

Top lines changed by employer
Red Hat                   2320 (68.1%)
Nokia                      666 (19.5%)
jpihlaja@cc.helsinki.fi    185 (5.4%)
ranma42@gmail.com          123 (3.6%)
marek.vasut@gmail.com       69 (2.0%)
brad@comstyle.com           24 (0.7%)
jmuizelaar@mozilla.com      20 (0.6%)
sid.bugzilla@gmail.com       2 (0.1%)

Employers with the most signoffs (total 5)
Nokia                        3 (60.0%)
marek.vasut@gmail.com        1 (20.0%)
jmuizelaar@mozilla.com       1 (20.0%)


A very important work for **X11 comformance testing** is [XTS](http://cgit.freedesktop.org/xorg/test/xts/), that was broken for while and now is working again:

Processed 41 csets from 4 developers
4 employers found
A total of 2244 lines added, 4078 removed (delta -1834)

Developers with the most changesets
Peter Hutterer              17 (41.5%)
Aaron Plattner              12 (29.3%)
Dan Nicholson                9 (22.0%)
Jon TURNEY                   2 (4.9%)

Developers with the most changed lines
Aaron Plattner            3854 (74.1%)
Peter Hutterer             245 (4.7%)
Dan Nicholson              141 (2.7%)
Jon TURNEY                   5 (0.1%)

Developers with the most lines removed
Aaron Plattner            2000 (49.0%)
Dan Nicholson                1 (0.0%)

Developers with the most signoffs (total 42)
Peter Hutterer              19 (45.2%)
Aaron Plattner              12 (28.6%)
Dan Nicholson                9 (21.4%)
Jon TURNEY                   2 (4.8%)

Developers with the most reviews (total 10)
Dan Nicholson                7 (70.0%)
Peter Hutterer               3 (30.0%)

Developers with the most test credits (total 0)

Developers who gave the most tested-by credits (total 0)

Developers with the most report credits (total 0)

Developers who gave the most report credits (total 0)

Top changeset contributors by employer
Red Hat                     17 (41.5%)
NVidia                      12 (29.3%)
dbn.lists@gmail.com          9 (22.0%)
jon.turney@dronecode.org.uk    2 (4.9%)

Top lines changed by employer
NVidia                    4726 (90.9%)
Red Hat                    245 (4.7%)
dbn.lists@gmail.com        225 (4.3%)
jon.turney@dronecode.org.uk    5 (0.1%)

Employers with the most signoffs (total 42)
Red Hat                     19 (45.2%)
NVidia                      12 (28.6%)
dbn.lists@gmail.com          9 (21.4%)
jon.turney@dronecode.org.uk    2 (4.8%)


**X documentation** ([doc](http://cgit.freedesktop.org/xorg/doc) repository):

Processed 22 csets from 6 developers
6 employers found
A total of 315 lines added, 45930 removed (delta -45615)

Developers with the most changesets
Alan Coopersmith            12 (54.5%)
Gaetan Nadon                 3 (13.6%)
Thomas Hellstrom             2 (9.1%)
Julien Cristau               2 (9.1%)
Yaakov Selkowitz             2 (9.1%)
Dirk Wallenstein             1 (4.5%)

Developers with the most changed lines
Alan Coopersmith          45843 (99.3%)
Julien Cristau              52 (0.1%)
Gaetan Nadon                36 (0.1%)
Yaakov Selkowitz            23 (0.0%)
Thomas Hellstrom             4 (0.0%)
Dirk Wallenstein             2 (0.0%)

Developers with the most lines removed
Alan Coopersmith          45627 (99.3%)
Gaetan Nadon                18 (0.0%)

Developers with the most signoffs (total 23)
Alan Coopersmith            13 (56.5%)
Gaetan Nadon                 3 (13.0%)
Thomas Hellstrom             2 (8.7%)
Julien Cristau               2 (8.7%)
Yaakov Selkowitz             2 (8.7%)
Dirk Wallenstein             1 (4.3%)

Developers with the most reviews (total 4)
Alan Coopersmith             2 (50.0%)
Gaetan Nadon                 1 (25.0%)
Dan Nicholson                1 (25.0%)

Developers with the most test credits (total 0)

Developers who gave the most tested-by credits (total 0)

Developers with the most report credits (total 0)

Developers who gave the most report credits (total 0)

Top changeset contributors by employer
Oracle                      12 (54.5%)
memsize@videotron.ca         3 (13.6%)
yselkowitz@users.sourceforge.net    2 (9.1%)
jcristau@debian.org          2 (9.1%)
VMWare                       2 (9.1%)
halsmit@t-online.de          1 (4.5%)

Top lines changed by employer
Oracle                    46053 (99.7%)
jcristau@debian.org         52 (0.1%)
memsize@videotron.ca        36 (0.1%)
yselkowitz@users.sourceforge.net   23 (0.0%)
VMWare                       4 (0.0%)
halsmit@t-online.de          2 (0.0%)

Employers with the most signoffs (total 23)
Oracle                      13 (56.5%)
memsize@videotron.ca         3 (13.0%)
jcristau@debian.org          2 (8.7%)
yselkowitz@users.sourceforge.net    2 (8.7%)
VMWare                       2 (8.7%)
halsmit@t-online.de          1 (4.3%)


Nothing or close to nothing was done in the old font scheme ([font](http://cgit.freedesktop.org/xorg/font) repo), bitmap and cursor [data](http://cgit.freedesktop.org/xorg/data). Also, from the total of 85 X traditional applications ([apps](http://cgit.freedesktop.org/xorg/app)), only 180 changesets were made and mostly concerning autoconf clean up.

---

Of course lines of code and changeset are far from being a good metric to see actually how the development happened. But still, it does represents something. For sure, there's also a lot of other inaccurate information that I'm missing from this all. For instance, companies like Collabora does X development but sometimes get the merits for Nokia. Is that fair? I don't know. And I don't want to discuss this either :)



##### 
PS: Canonical, where are you here? [Hint](http://people.freedesktop.org/~vignatti/xdevelopment/xorg_19_xserver-SHOWING-WHEREIS-CANONICAL.txt) [hint](http://www.omgubuntu.co.uk/2010/07/gnome-census-is-out-reveals-canonical.html) [hint](http://people.freedesktop.org/~vignatti/xdevelopment/xorg_19_xserver-SHOWING-WHEREIS-CANONICAL.txt).




