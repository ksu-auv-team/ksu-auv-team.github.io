---
title: Installation Guide
category: Introduction
order: 2
---

This is a list of all of AUV's software dependencies and how to get them.

### [Linux (Ubuntu 16.04 recommended)](http://releases.ubuntu.com/16.04/)
Open-source Unix-like operating system. Ubuntu is the most widely-used desktop version, and it's strongly recommended. It's pretty great, and it's required for ROS and the Movidius SDK. If you use Ubuntu, you'll need version 16.04 specifically, not the latest version.

To install it, follow the link, download the installer, and follow the instructions. You'll need to put it on a CD or flash drive, or ask around to find out whether someone has a drive you can borrow. You can dual-boot Linux with your existing OS by installing it on a separate partition, which the installer will walk you through. You'll probably need about 50 GB of hard drive space if all you want is AUV data. (You might be able to get by with less if space is tight - I don't know the exact number, so I'm estimating generously.)


### [Python 2.7](https://www.python.org/downloads/release/python-2713/)
This is almost certainly included with your OS, but it's worth double-checking which version you have with 

```
python --version
```
. If you don't have 2.7, you'll need to install it. Python 2 and 3 are different enough that programs written for one won't work in the other, but you can have both installed at once.

If you don't have the right version (most likely you'd have Python 3), the terminal command to install it is

```
sudo apt install python2.7
```

### [ROS (Kinetic)](http://wiki.ros.org/kinetic/Installation)
Short for Robotic Operating System, but it isn't actually an operating system, more of a very complicated framework.

We use the Kinetic version. Install it by following the instructions.

### [OpenCV](https://opencv.org/)
Short for Open Computer Vision. It's a library that provides a lot of functions and data structures for image processing.

I recommend installing this using a package manager, like apt. [Instructions for that are here.](https://docs.opencv.org/3.4.1/d2/de6/tutorial_py_setup_in_ubuntu.html) If you don't and build it from source instead, uninstalling it becomes . . . impractical.

### [Caffe](http://caffe.berkeleyvision.org/)
A neural network library, which we use because it's the most easily compatible with the Movidius. A version of Caffe is automatically installed with the Movidius SDK, but it doesn't include GPU support, so if you want to train the network, you'll want to install your own version with the instructions [here](http://caffe.berkeleyvision.org/install_apt.html). Note that if you do that, you'll also need CUDA. There's also a [list of commonly encountered build issues](https://github.com/BVLC/caffe/wiki/Commonly-encountered-build-issues).

### [CUDA](https://developer.nvidia.com/cuda-downloads)
Nvidia's proprietary graphics card interface software. If you aren't training the neural network, you probably won't need this for AUV (for now), because this is what we (and programs like Caffe and OpenCV) use to make the GPU process stuff, and currently neural network training is all we use GPUs for. It requires an Nvidia GPU. Install following the installation instructions.

### [Movidius SDK and API](https://github.com/movidius/ncsdk)

This API is what runs the Movidius Neural Compute Sticks that run our object detection neural networks. If you want to work on code that uses them, you'll need it.

[Installation instructions are here, with the rest of the documentation.](https://movidius.github.io/ncsdk/install.html) Make sure to install version 2 of the API and not version 1. (They're on different Git branches. If you install the old version by accident you can install the new one over it.)

Unfortunately, this isn't as well-supported as most of the software we use. It's the most likely to have installation issues, the documentation isn't great, and there aren't many users, so it can be hard to find answers if you run into problems. Google is your friend, as is asking other software team members for help. We deal with it because once you get it working it's great.

If you have trouble, [this forum thread](https://ncsforum.movidius.com/discussion/370/intel-ncs-troubleshooting-help-and-guidelines) is for troubleshooting and has a list of common issues. The rest of that forum is the main place discussion of the software happens, so it's also a good place to look.

##### Known installation issues:
* The Movidius SDK isn't compatible with Anaconda. If you have Anaconda, you'll have to uninstall it first.
* It has a weird relationship with OpenCV that I don't fully remember. Very helpful, I know.

### A good text editor

Whichever is your favorite. [Visual Studio Code](https://code.visualstudio.com/) is great, but some people prefer [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), Vim, or something else.
