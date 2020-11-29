---
date: 2011-12-19 23:31:29+00:00
draft: false
title: 'Qt on wayland: howto'
categories:
- Computing
---

To run Qt applications on Wayland is fairly simple nowadays. Thank to Qt developers, they are following up quite well our last changes on Wayland protocol and updating accordingly on Qt5 code base -- by the way, the fresh and just released Qt 4.8 [does not ship the latest](https://qt.gitorious.org/qt/qt/blobs/4.8/src/plugins/platforms/wayland/wayland_sha1.txt) protocol additions, so that's not the one I'm referring.

So, today I've set up the last bits of Qt environment on my Intel Pine-Trail pretty easy (yeah, I compile on my tablet :-O). You don't need to clone the whole data base for starting hacking on it. Let's see.

first, you have to clone qtbase:

# mkdir qt; cd qt
# git clone git://gitorious.org/qt/qtbase.git


Before start the compilation steps, I like to set up my testbed in a different directory than what the ordinary system uses, so I include this on my .bashrc:

export QTVER=qt5
export QTDIR=/opt/qt/$QTVER
export PATH=$QTDIR/bin/:$PATH
export LD_LIBRARY_PATH=$QTDIR/lib/:$LD_LIBRARY_PATH
export PKG_CONFIG_PATH=$QTDIR/lib/pkgconfig/:$PKG_CONFIG_PATH
export QT_PLUGIN_PATH=$QTDIR/lib/plugins/


and don't forget to re-run your bashrc! Now, when developing a Wayland application it's quite useful to check if your app is behaving nicely, so for doing so I like to compare it with Qt's XCB backend. Then you'll need the following -- I'm under Ubuntu 11.10:

# apt-get install libxcb1 libxcb1-dev libx11-xcb1 libx11-xcb-dev libxcb-keysyms1 libxcb-keysyms1-dev libxcb-image0 libxcb-image0-dev libxcb-shm0 libxcb-shm0-dev libxcb-icccm4 libxcb-icccm4-dev libxcb-sync0 libxcb-sync0-dev libxcb-xfixes0-dev


you should be ready now to go for the configuration:

# ./configure -confirm-license -opensource -no-qt3support -no-multimedia -no-webkit -no-phonon -no-v8 -debug -qpa -xcb -wayland -egl -opengl es2 -nomake examples -prefix ${QTDIR}


and now, the compilation -- which took approximately 1hr and half in my system:

# make


install it:

# make install


At this point you got all Qt libraries, and needed tools to compile qtwayland platform. So go back one directory and clone that:

# cd ../
# git clone git://gitorious.org/qt/qtwayland.git


You need Wayland protocol libraries now in your system, and that's the very late ones, which means the stock packages from your distro won't work. Get and
build them using the following:

http://wayland.freedesktop.org/building.html


You might want to develop Wayland on the top of X, so before compile you'll need this:

# apt-get install libxcomposite-dev


Jørgen Lind, updated me with: "the default buffersharing to use is wayland_egl. To be able to use the xcomposite stuff you need to export the environment variable QT_WAYLAND_GL_CONFIG to be either xcomposite_egl or xcomposite_glx". So in order do to Wayland on X you will need to tweak it as well.

and then:

# cd qtwayland/
# qmake
# make && make install


To run now a Qt app, I first set the XDG directory that compositor and clients use to talk under Wayland. You better to watch out, cause some distros already have this set somewhere. Anyway, I put this on my .bashrc:

# export XDG_RUNTIME_DIR=$HOME/.xdg
# mkdir $HOME/.xdg


and re-ran .bashrc. Finally the Qt app running and voilà:

# cd ../qtbase/examples/opengl/hellowindow
# qmake
# make
# wayland-compositor &
# ./hellowindow -platform wayland

---

Kudos to [Thiago Macieira](http://www.macieira.org/blog/) for reviewing the content!
