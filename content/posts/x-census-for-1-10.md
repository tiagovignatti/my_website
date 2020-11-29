---
date: 2011-02-28 20:31:05+00:00
draft: false
title: X Census (for 1.10)
categories:
- Computing
tags:
- '1.10'
- meego
- microsoft
- nokia
- x11
- xorg
- xserver
---

Following is the census of 1.10 window for all X infrastructure - raw numbers [here](http://people.freedesktop.org/~vignatti/xdevelopment/). I did it in a similar way as the [previous version](http://vignatti.wordpress.com/2010/09/02/x-census-for-1-9/). Worth to mention that there's almost no relation between the cycles of development from each of the components listed below, which can lead to some misunderstanding. Anyway, still a nice indicative to see and evaluate how the free desktop community behaved.

Numbers for **X implementation** (xserver, proto, lib and xcb repositories):

Processed 1258 csets from 93 developers
70 employers found
A total of 139275 lines added, 58982 removed (delta 80293)

Developers with the most changesets
Alan Coopersmith           243 (19.3%)
Gaetan Nadon               193 (15.3%)
Peter Hutterer             121 (9.6%)
Adam Jackson                94 (7.5%)
Jon TURNEY                  43 (3.4%)
Keith Packard               37 (2.9%)
Jeremy Huddleston           36 (2.9%)
Jesse Adkins                34 (2.7%)
Pauli Nieminen              29 (2.3%)
Jamey Sharp                 28 (2.2%)

Developers with the most changed lines
Matt Dew                  57959 (35.7%)
Jeremy Huddleston         25002 (15.4%)
Fernando Carrijo          16739 (10.3%)
Gaetan Nadon              15750 (9.7%)
Alan Coopersmith          11850 (7.3%)
Adam Jackson              4273 (2.6%)
Keith Packard             2754 (1.7%)
Jesse Adkins              2516 (1.5%)
Peter Hutterer            2083 (1.3%)
James Jones               1876 (1.2%)

Developers with the most lines removed
Jeremy Huddleston         3726 (6.3%)
Adam Jackson              3617 (6.1%)
Jesse Adkins              2489 (4.2%)
Jamey Sharp               1497 (2.5%)
Søren Sandmann Pedersen   757 (1.3%)
James Cloos                187 (0.3%)
Adrian Bunk                184 (0.3%)
Tiago Vignatti             118 (0.2%)
Jon TURNEY                 116 (0.2%)
Chris Wilson                72 (0.1%)

Developers with the most signoffs (total 1429)
Alan Coopersmith           315 (22.0%)
Peter Hutterer             191 (13.4%)
Gaetan Nadon               174 (12.2%)
Keith Packard              133 (9.3%)
Adam Jackson                96 (6.7%)
Jon TURNEY                  52 (3.6%)
Jeremy Huddleston           36 (2.5%)
Jesse Adkins                34 (2.4%)
Pauli Nieminen              30 (2.1%)
Jamey Sharp                 29 (2.0%)

Developers with the most reviews (total 882)
Alan Coopersmith            83 (9.4%)
Daniel Stone                78 (8.8%)
Peter Hutterer              76 (8.6%)
Julien Cristau              73 (8.3%)
Keith Packard               61 (6.9%)
Adam Jackson                49 (5.6%)
Mikhail Gusarov             41 (4.6%)
Jeremy Huddleston           38 (4.3%)
Colin Harrison              38 (4.3%)
Chase Douglas               35 (4.0%)

Developers with the most test credits (total 48)
Colin Harrison              16 (33.3%)
Gaetan Nadon                 6 (12.5%)
Cyril Brulebois              5 (10.4%)
Alan Coopersmith             3 (6.2%)
Jeremy Huddleston            2 (4.2%)
Julien Cristau               1 (2.1%)
Aaron Plattner               1 (2.1%)
Luc Verhaegen                1 (2.1%)
Dirk Wallenstein             1 (2.1%)
Simon Thum                   1 (2.1%)

Developers who gave the most tested-by credits (total 48)
Jon TURNEY                  16 (33.3%)
Peter Hutterer               8 (16.7%)
Alan Coopersmith             7 (14.6%)
Dan Nicholson                4 (8.3%)
Michel Dänzer               2 (4.2%)
Gaetan Nadon                 1 (2.1%)
Jeremy Huddleston            1 (2.1%)
Julien Cristau               1 (2.1%)
Aaron Plattner               1 (2.1%)
Luc Verhaegen                1 (2.1%)

Developers with the most report credits (total 21)
Julien Cristau               2 (9.5%)
Justin Mattock               2 (9.5%)
Peter Hutterer               1 (4.8%)
Aaron Plattner               1 (4.8%)
Cyril Brulebois              1 (4.8%)
Simon Thum                   1 (4.8%)
Thierry Vignaud              1 (4.8%)
meng                         1 (4.8%)
Sebastian Glita              1 (4.8%)
Bartosz Brachaczek           1 (4.8%)

Developers who gave the most report credits (total 21)
Peter Hutterer               7 (33.3%)
Julien Cristau               3 (14.3%)
Jamey Sharp                  3 (14.3%)
Alan Coopersmith             2 (9.5%)
Eamon Walsh                  2 (9.5%)
Michel Dänzer               1 (4.8%)
Gaetan Nadon                 1 (4.8%)
Kristian Høgsberg           1 (4.8%)
Jesse Barnes                 1 (4.8%)

Top changeset contributors by employer
Oracle                     244 (19.4%)
Red Hat                    225 (17.9%)
memsize@videotron.ca       193 (15.3%)
Nokia                      122 (9.7%)
Intel                       46 (3.7%)
jon.turney@dronecode.org.uk   43 (3.4%)
Apple                       36 (2.9%)
jesserayadkins@gmail.com    34 (2.7%)
NVidia                      30 (2.4%)
jamey@minilop.net           28 (2.2%)

Top lines changed by employer
matt@osource.org          57958 (35.7%)
Apple                     27540 (17.0%)
fcarrijo.lists@gmail.com  16729 (10.3%)
memsize@videotron.ca      16611 (10.2%)
Oracle                    14567 (9.0%)
Red Hat                   8089 (5.0%)
Intel                     4574 (2.8%)
Nokia                     3153 (1.9%)
jesserayadkins@gmail.com  2528 (1.6%)
jon.turney@dronecode.org.uk 2110 (1.3%)

Employers with the most signoffs (total 1429)
Oracle                     315 (22.0%)
Red Hat                    293 (20.5%)
memsize@videotron.ca       174 (12.2%)
Intel                      144 (10.1%)
Nokia                      127 (8.9%)
jon.turney@dronecode.org.uk   52 (3.6%)
Apple                       36 (2.5%)
jesserayadkins@gmail.com    34 (2.4%)
NVidia                      29 (2.0%)
jamey@minilop.net           29 (2.0%)

Employers with the most hackers (total 96)
Red Hat                      8 (8.3%)
Nokia                        8 (8.3%)
Intel                        7 (7.3%)
Canonical                    3 (3.1%)
VMWare                       3 (3.1%)
Oracle                       2 (2.1%)
NVidia                       2 (2.1%)
memsize@videotron.ca         1 (1.0%)
jon.turney@dronecode.org.uk    1 (1.0%)
Apple                        1 (1.0%)


Development of **X input drivers and input event processing tools** (xf86-input-*, xkbcomp, xkeyboard-config repositories):

Processed 293 csets from 33 developers
29 employers found
A total of 34645 lines added, 26556 removed (delta 8089)

Developers with the most changesets
Peter Hutterer             152 (51.9%)
Sergey V. Udaltsov          32 (10.9%)
Alexandr Shadchin           21 (7.2%)
Alan Coopersmith            17 (5.8%)
Gaetan Nadon                12 (4.1%)
Trevor Woerner               6 (2.0%)
Nikolai Kondrashov           5 (1.7%)
Chase Douglas                4 (1.4%)
Simon Thum                   4 (1.4%)
Joe Shaw                     3 (1.0%)

Developers with the most changed lines
Sergey V. Udaltsov        30425 (79.0%)
Peter Hutterer            3377 (8.8%)
Alexandr Shadchin         1263 (3.3%)
Alan Coopersmith           806 (2.1%)
Chase Douglas              572 (1.5%)
Denis 'GNUtoo' Carikli     180 (0.5%)
Simon Thum                 133 (0.3%)
Gaetan Nadon               110 (0.3%)
Bryce Harrington            99 (0.3%)
Nikolai Kondrashov          81 (0.2%)

Developers with the most lines removed
Alexandr Shadchin         1239 (4.7%)
Alan Coopersmith           739 (2.8%)
Chase Douglas              418 (1.6%)
Peter Hutterer             183 (0.7%)
Gaetan Nadon                61 (0.2%)
Peter Korsgaard             51 (0.2%)
Nikolai Kondrashov          35 (0.1%)
Jesse Adkins                16 (0.1%)
Javier Acosta                6 (0.0%)
Adam Jackson                 6 (0.0%)

Developers with the most signoffs (total 304)
Peter Hutterer             197 (64.8%)
Alan Coopersmith            25 (8.2%)
Alexandr Shadchin           21 (6.9%)
Gaetan Nadon                11 (3.6%)
Trevor Woerner               6 (2.0%)
Nikolai Kondrashov           5 (1.6%)
Thomas Hellstrom             5 (1.6%)
Chase Douglas                4 (1.3%)
Simon Thum                   4 (1.3%)
Joe Shaw                     3 (1.0%)

Developers with the most reviews (total 126)
Trevor Woerner              37 (29.4%)
Alan Coopersmith            25 (19.8%)
Benjamin Tissoires          11 (8.7%)
Chris Bagwell                9 (7.1%)
Daniel Stone                 9 (7.1%)
Chase Douglas                8 (6.3%)
Adam Jackson                 7 (5.6%)
Cyril Brulebois              6 (4.8%)
Matt Turner                  5 (4.0%)
Peter Hutterer               3 (2.4%)

Developers with the most test credits (total 25)
Alan Coopersmith            23 (92.0%)
Benjamin Tissoires           1 (4.0%)
Abdoulaye Walsimou Gaye      1 (4.0%)

Developers who gave the most tested-by credits (total 25)
Peter Hutterer              24 (96.0%)
Gaetan Nadon                 1 (4.0%)

Developers with the most report credits (total 2)
Dave Airlie                  2 (100.0%)

Developers who gave the most report credits (total 2)
Peter Hutterer               2 (100.0%)

Top changeset contributors by employer
Red Hat                    155 (52.9%)
svu@gnome.org               32 (10.9%)
alexandr.shadchin@gmail.com   21 (7.2%)
Oracle                      18 (6.1%)
memsize@videotron.ca        12 (4.1%)
twoerner@gmail.com           6 (2.0%)
Canonical                    6 (2.0%)
spbnick@gmail.com            5 (1.7%)
simon.thum@gmx.de            4 (1.4%)
VMWare                       3 (1.0%)

Top lines changed by employer
svu@gnome.org             30437 (79.1%)
Red Hat                   4428 (11.5%)
alexandr.shadchin@gmail.com 1263 (3.3%)
Oracle                     825 (2.1%)
Canonical                  713 (1.9%)
gnutoo@no-log.org          180 (0.5%)
simon.thum@gmx.de          133 (0.3%)
memsize@videotron.ca       113 (0.3%)
spbnick@gmail.com           93 (0.2%)
jacmet@sunsite.dk           59 (0.2%)

Employers with the most signoffs (total 304)
Red Hat                    199 (65.5%)
Oracle                      26 (8.6%)
alexandr.shadchin@gmail.com   21 (6.9%)
memsize@videotron.ca        11 (3.6%)
Canonical                    6 (2.0%)
twoerner@gmail.com           6 (2.0%)
spbnick@gmail.com            5 (1.6%)
VMWare                       5 (1.6%)
simon.thum@gmx.de            4 (1.3%)
joe@joeshaw.org              3 (1.0%)

Employers with the most hackers (total 33)
Red Hat                      3 (9.1%)
Oracle                       2 (6.1%)
Canonical                    2 (6.1%)
alexandr.shadchin@gmail.com    1 (3.0%)
memsize@videotron.ca         1 (3.0%)
twoerner@gmail.com           1 (3.0%)
spbnick@gmail.com            1 (3.0%)
VMWare                       1 (3.0%)
simon.thum@gmx.de            1 (3.0%)
joe@joeshaw.org              1 (3.0%)


for **userspace video drivers** (libdrm, mesa and all xf86-video-*):

Processed 5223 csets from 131 developers
100 employers found
A total of 452414 lines added, 289531 removed (delta 162883)

Developers with the most changesets
Brian Paul                 579 (11.1%)
Eric Anholt                512 (9.8%)
Vinson Lee                 432 (8.3%)
Dave Airlie                357 (6.8%)
Marek Olšák              324 (6.2%)
Chia-I Wu                  252 (4.8%)
José Fonseca              247 (4.7%)
Kenneth Graunke            210 (4.0%)
Luca Barbieri              210 (4.0%)
Ian Romanick               190 (3.6%)

Developers with the most changed lines
Brian Paul                70178 (13.0%)
Luca Barbieri             58946 (10.9%)
Kenneth Graunke           35433 (6.5%)
Chia-I Wu                 34790 (6.4%)
Ian Romanick              30961 (5.7%)
Jerome Glisse             28641 (5.3%)
Eric Anholt               27906 (5.2%)
Christoph Bumiller        22352 (4.1%)
Dave Airlie               21625 (4.0%)
Alex Deucher              19210 (3.5%)

Developers with the most lines removed
Kenneth Graunke           19727 (6.8%)
Matt Turner               3052 (1.1%)
Henri Verbeet             1398 (0.5%)
Kristian Høgsberg         832 (0.3%)
Adam Jackson               248 (0.1%)
Jesse Adkins               161 (0.1%)
Nicolas Kaiser              43 (0.0%)
Andre Maasikas              34 (0.0%)
Pierre Allegraud            17 (0.0%)
Patrice Mandin              17 (0.0%)

Developers with the most signoffs (total 930)
Chris Wilson               181 (19.5%)
Jerome Glisse               99 (10.6%)
Brian Paul                  82 (8.8%)
Dave Airlie                 81 (8.7%)
Alex Deucher                59 (6.3%)
Tilman Sauerbeck            44 (4.7%)
Thomas Hellstrom            40 (4.3%)
Alan Coopersmith            30 (3.2%)
Jakob Bornecrantz           29 (3.1%)
Daniel Vetter               28 (3.0%)

Developers with the most reviews (total 69)
Jakob Bornecrantz           23 (33.3%)
Ian Romanick                10 (14.5%)
Eric Anholt                  9 (13.0%)
Julien Cristau               6 (8.7%)
Mikhail Gusarov              4 (5.8%)
Brian Paul                   2 (2.9%)
Alex Deucher                 2 (2.9%)
Matt Turner                  2 (2.9%)
José Fonseca                2 (2.9%)
Michel Dänzer               2 (2.9%)

Developers with the most test credits (total 6)
Guillermo S. Romero          1 (16.7%)
Michel Hermier               1 (16.7%)
Sitsofe Wheeler              1 (16.7%)
Bjørn Mork                  1 (16.7%)
Michal Marek                 1 (16.7%)
Manoj Iyer                   1 (16.7%)

Developers who gave the most tested-by credits (total 6)
Chris Wilson                 2 (33.3%)
Guillermo S. Romero          1 (16.7%)
Xiang, Haihao                1 (16.7%)
Xavier Chantry               1 (16.7%)
Jesse Barnes                 1 (16.7%)

Developers with the most report credits (total 23)
Julien Cristau               2 (8.7%)
Matthias Hopf                2 (8.7%)
Jeff Chua                    2 (8.7%)
Sitsofe Wheeler              1 (4.3%)
Bjørn Mork                  1 (4.3%)
Michal Marek                 1 (4.3%)
José Fonseca                1 (4.3%)
Daniel Vetter                1 (4.3%)
Cyril Brulebois              1 (4.3%)
Peter Clifton                1 (4.3%)

Developers who gave the most report credits (total 23)
Chris Wilson                19 (82.6%)
Xiang, Haihao                2 (8.7%)
Ian Romanick                 1 (4.3%)
Kenneth Graunke              1 (4.3%)

Top changeset contributors by employer
VMWare                    1582 (30.3%)
Intel                     1292 (24.7%)
Red Hat                    546 (10.5%)
maraeo@gmail.com           324 (6.2%)
LunarG                     252 (4.8%)
luca@luca-barbieri.com     210 (4.0%)
e0425955@student.tuwien.ac.at  158 (3.0%)
AMD                        156 (3.0%)
hverbeet@gmail.com          65 (1.2%)
currojerez@riseup.net       60 (1.1%)

Top lines changed by employer
Intel                     132677 (24.5%)
VMWare                    105087 (19.4%)
Red Hat                   87373 (16.1%)
luca@luca-barbieri.com    67407 (12.5%)
LunarG                    38973 (7.2%)
e0425955@student.tuwien.ac.at 22548 (4.2%)
AMD                       19690 (3.6%)
maraeo@gmail.com          14329 (2.6%)
richard@richard-desktop3.(none) 12426 (2.3%)
noviktor@seznam.cz        11676 (2.2%)

Employers with the most signoffs (total 930)
Intel                      235 (25.3%)
Red Hat                    215 (23.1%)
VMWare                     159 (17.1%)
AMD                         59 (6.3%)
tilman@code-monkey.de       44 (4.7%)
Oracle                      30 (3.2%)
daniel.vetter@ffwll.ch      28 (3.0%)
jesserayadkins@gmail.com    24 (2.6%)
currojerez@riseup.net       18 (1.9%)
mattst88@gmail.com          12 (1.3%)

Employers with the most hackers (total 138)
Intel                       17 (12.3%)
VMWare                      13 (9.4%)
Red Hat                      7 (5.1%)
Canonical                    4 (2.9%)
Novell                       2 (1.4%)
AMD                          1 (0.7%)
tilman@code-monkey.de        1 (0.7%)
Oracle                       1 (0.7%)
daniel.vetter@ffwll.ch       1 (0.7%)
jesserayadkins@gmail.com     1 (0.7%)


**Pixman library** (pixman):

Processed 223 csets from 15 developers
12 employers found
A total of 10985 lines added, 6139 removed (delta 4846)

Developers with the most changesets
Søren Sandmann Pedersen   124 (55.6%)
Siarhei Siamashka           64 (28.7%)
Andrea Canciani             11 (4.9%)
Dmitri Vorobiev              5 (2.2%)
Rolland Dudemaine            4 (1.8%)
Cyril Brulebois              2 (0.9%)
Jon TURNEY                   2 (0.9%)
Liu Xinyun                   2 (0.9%)
Maarten Bosmans              2 (0.9%)
Benjamin Otte                2 (0.9%)

Developers with the most changed lines
Søren Sandmann Pedersen  6335 (45.3%)
Siarhei Siamashka         3119 (22.3%)
Liu Xinyun                1318 (9.4%)
Jonathan Morton            721 (5.2%)
Andrea Canciani            586 (4.2%)
Dmitri Vorobiev             62 (0.4%)
Benjamin Otte               62 (0.4%)
Maarten Bosmans             56 (0.4%)
Rolland Dudemaine           32 (0.2%)
Mika Yrjola                  7 (0.1%)

Developers with the most lines removed
Liu Xinyun                1318 (21.5%)
Maarten Bosmans             11 (0.2%)
Rolland Dudemaine            2 (0.0%)

Developers with the most signoffs (total 7)
Cyril Brulebois              2 (28.6%)
Jon TURNEY                   2 (28.6%)
Liu Xinyun                   1 (14.3%)
Alan Coopersmith             1 (14.3%)
Chen Miaobo                  1 (14.3%)

Developers with the most reviews (total 1)
Matt Turner                  1 (100.0%)

Developers with the most test credits (total 0)

Developers who gave the most tested-by credits (total 0)

Developers with the most report credits (total 0)

Developers who gave the most report credits (total 0)

Top changeset contributors by employer
Red Hat                    126 (56.5%)
Nokia                       64 (28.7%)
ranma42@gmail.com           11 (4.9%)
Movial                       7 (3.1%)
rolland@ghs.com              4 (1.8%)
jon.turney@dronecode.org.uk    2 (0.9%)
kibi@debian.org              2 (0.9%)
mkbosmans@gmail.com          2 (0.9%)
Intel                        2 (0.9%)
Oracle                       1 (0.4%)

Top lines changed by employer
Red Hat                   7969 (57.0%)
Nokia                     3156 (22.6%)
Intel                     1318 (9.4%)
Movial                     805 (5.8%)
ranma42@gmail.com          619 (4.4%)
mkbosmans@gmail.com         57 (0.4%)
rolland@ghs.com             40 (0.3%)
tml@iki.fi                   7 (0.1%)
jon.turney@dronecode.org.uk    6 (0.0%)
kibi@debian.org              2 (0.0%)

Employers with the most signoffs (total 7)
Intel                        2 (28.6%)
jon.turney@dronecode.org.uk    2 (28.6%)
kibi@debian.org              2 (28.6%)
Oracle                       1 (14.3%)

Employers with the most hackers (total 15)
Movial                       3 (20.0%)
Red Hat                      2 (13.3%)
Intel                        1 (6.7%)
jon.turney@dronecode.org.uk    1 (6.7%)
kibi@debian.org              1 (6.7%)
Oracle                       1 (6.7%)
Nokia                        1 (6.7%)
ranma42@gmail.com            1 (6.7%)
mkbosmans@gmail.com          1 (6.7%)
rolland@ghs.com              1 (6.7%)



X11 comformance's **XTS**, taken from Peter's repository:

Processed 36 csets from 2 developers
2 employers found
A total of 3114 lines added, 3339 removed (delta -225)

Developers with the most changesets
Peter Hutterer              21 (58.3%)
Aaron Plattner              14 (38.9%)

Developers with the most changed lines
Peter Hutterer            3242 (90.0%)
Aaron Plattner             136 (3.8%)

Developers with the most lines removed
Peter Hutterer             264 (7.9%)

Developers with the most signoffs (total 35)
Peter Hutterer              21 (60.0%)
Aaron Plattner              14 (40.0%)

Developers with the most reviews (total 4)
Joe Kain                     2 (50.0%)
Adam Cheney                  2 (50.0%)

Developers with the most test credits (total 0)

Developers who gave the most tested-by credits (total 0)

Developers with the most report credits (total 0)

Developers who gave the most report credits (total 0)

Top changeset contributors by employer
Red Hat                     21 (58.3%)
NVidia                      14 (38.9%)

Top lines changed by employer
Red Hat                   3402 (94.4%)
NVidia                     200 (5.6%)

Employers with the most signoffs (total 35)
Red Hat                     21 (60.0%)
NVidia                      14 (40.0%)

Employers with the most hackers (total 2)
Red Hat                      1 (50.0%)
NVidia                       1 (50.0%)



**X documentation** (doc repository):

Processed 108 csets from 7 developers
7 employers found
A total of 28556 lines added, 212807 removed (delta -184251)

Developers with the most changesets
Alan Coopersmith            57 (52.8%)
Gaetan Nadon                45 (41.7%)
Matt Dew                     2 (1.9%)
Peter Hutterer               1 (0.9%)
Samuel Thibault              1 (0.9%)
Jesse Adkins                 1 (0.9%)
Marc Balmer                  1 (0.9%)

Developers with the most changed lines
Gaetan Nadon              146676 (67.0%)
Matt Dew                  59191 (27.0%)
Alan Coopersmith          6927 (3.2%)
Samuel Thibault              7 (0.0%)
Jesse Adkins                 7 (0.0%)
Peter Hutterer               3 (0.0%)
Marc Balmer                  3 (0.0%)

Developers with the most lines removed
Gaetan Nadon              129581 (60.9%)
Matt Dew                  52738 (24.8%)
Alan Coopersmith          1932 (0.9%)
Jesse Adkins                 7 (0.0%)

Developers with the most signoffs (total 109)
Alan Coopersmith            59 (54.1%)
Gaetan Nadon                47 (43.1%)
Jesse Adkins                 1 (0.9%)
Peter Hutterer               1 (0.9%)
Samuel Thibault              1 (0.9%)

Developers with the most reviews (total 28)
Alan Coopersmith            17 (60.7%)
Gaetan Nadon                 4 (14.3%)
Peter Hutterer               2 (7.1%)
Daniel Stone                 1 (3.6%)
Dan Nicholson                1 (3.6%)
Julien Cristau               1 (3.6%)
Matt Turner                  1 (3.6%)
Adam Jackson                 1 (3.6%)

Developers with the most test credits (total 0)

Developers who gave the most tested-by credits (total 0)

Developers with the most report credits (total 0)

Developers who gave the most report credits (total 0)

Top changeset contributors by employer
Oracle                      57 (52.8%)
memsize@videotron.ca        45 (41.7%)
matt@osource.org             2 (1.9%)
Red Hat                      1 (0.9%)
marc.balmer@arcapos.com      1 (0.9%)
samuel.thibault@ens-lyon.org    1 (0.9%)
jesserayadkins@gmail.com     1 (0.9%)

Top lines changed by employer
memsize@videotron.ca      152747 (69.7%)
matt@osource.org          59195 (27.0%)
Oracle                    7088 (3.2%)
samuel.thibault@ens-lyon.org    7 (0.0%)
jesserayadkins@gmail.com     7 (0.0%)
Red Hat                      3 (0.0%)
marc.balmer@arcapos.com      3 (0.0%)

Employers with the most signoffs (total 109)
Oracle                      59 (54.1%)
memsize@videotron.ca        47 (43.1%)
samuel.thibault@ens-lyon.org    1 (0.9%)
jesserayadkins@gmail.com     1 (0.9%)
Red Hat                      1 (0.9%)

Employers with the most hackers (total 7)
Oracle                       1 (14.3%)
memsize@videotron.ca         1 (14.3%)
samuel.thibault@ens-lyon.org    1 (14.3%)
jesserayadkins@gmail.com     1 (14.3%)
Red Hat                      1 (14.3%)
matt@osource.org             1 (14.3%)
marc.balmer@arcapos.com      1 (14.3%)


—

About[ Nokia and Microsoft alliance](http://conversations.nokia.com/2011/02/11/open-letter-from-ceo-stephen-elop-nokia-and-ceo-steve-ballmer-microsoft/)? I was deeply shocked yes, but well, I guess I'm cool and over it now. I'm sure MeeGo is not dead by any chance though... Nevertheless, Nokia's contribution to X11 development will be obviously diminishing. It's sad. Our Graphics Team were just feeling the first effects of the new introduced culture for pushing whatever work (well the ones we are allowed) to upstream and now all was cracked down. So, unfortunately this won't happen with the same volume anymore and the collected numbers of 1.10 is definitely a mark for Nokia.
