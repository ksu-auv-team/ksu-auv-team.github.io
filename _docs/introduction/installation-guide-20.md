---
title: Installation Guide (Ubuntu 20.04)
category: Introduction
order: 2
---

This is a list of all of AUV's software dependencies and how to get them.

### [Linux (Ubuntu 20.04 recommended)](https://releases.ubuntu.com/20.04/)
Open-source Unix-like operating system. Ubuntu is the most widely-used desktop version, and it's strongly recommended. It's pretty great, and it's required for ROS. If you use Ubuntu, you'll need version 18.04.

To install it, follow the link, download the installer, and follow the instructions. You'll need to put it on a CD or flash drive, or ask around to find out whether someone has a drive you can borrow. You can dual-boot Linux with your existing OS by installing it on a separate partition, which the installer will walk you through. You'll probably need about 50 GB of hard drive space if all you want is AUV data. (You might be able to get by with less if space is tight - I don't know the exact number, so I'm estimating generously.) Here's a tutorial on how to dual boot with [windows and 18.04](https://www.youtube.com/watch?v=u5QyjHIYwTQ) (Instead of using a 18.04 install, use a 20.04)

If you don't want to dual boot your system, you can also get a virtual machine, but be wary - VMs can be extremly slow if you computer can't handle simulating a whole other computer. Here is a tutorial on [using a VM](https://www.youtube.com/watch?v=QbmRXJJKsvs).


### [Python 3](https://www.python.org/downloads/release/python-3916/)
This is almost certainly included with your OS, but it's worth double-checking which version you have with 

```
python --version
```
If you don't have Python 3, you can install it on Ubuntu with this command.

```
sudo apt install python3
```

### [ROS (Noetic)](http://wiki.ros.org/noetic/Installation/Ubuntu)
Short for Robotic Operating System, but it isn't actually an operating system, more of a very complicated framework.

We use the Noetic version on Ubuntu 20.04. Install it by following the instructions.

### [OpenCV](https://opencv.org/)
Short for Open Computer Vision. It's a library that provides a lot of functions and data structures for image processing.

I recommend installing this using a package manager, like apt. [Instructions for that are here.](https://docs.opencv.org/3.4.1/d2/de6/tutorial_py_setup_in_ubuntu.html) If you don't and build it from source instead, uninstalling it becomes . . . impractical.

### [CUDA](https://developer.nvidia.com/cuda-downloads)
Nvidia's proprietary graphics card interface software. If you aren't training the neural network, you probably won't need this for AUV (for now), because this is what we (and programs like Caffe and OpenCV) use to make the GPU process stuff, and currently neural network training is all we use GPUs for. It requires an Nvidia GPU. Install following the installation instructions.

### A good text editor

Whichever is your favorite. [Visual Studio Code](https://code.visualstudio.com/) is great, but some people prefer [Sublime Text](https://www.sublimetext.com/), Vim, or something else.


### External ROS packages
ROS has a great community of people that contribute to it all the time, this is one of the things that makes ROS so great. We use lots of these commuinty-made things called "packages". 

A readable list of ROS packages that we use is here. ROS installs packages in the form `sudo apt install ros-<distro>-<package>` where `<distro>` and `<package>` are replaced with the desired distro and package respectively. For example `sudo apt install ros-noetic-mavlink`. For more information on any of these, just google "<package_name> ros package":
 * mavlink - Pixhawk messages
 * mavros - Pixhawk messgages
 * mavros-msgs - Pixhawk messages
 * cmake-modules - Build system
 * control-toolbox - Controller for movement
 * joy - Joystick control
 * smach - State Machine manager
 * cv_bridge - Converts OpenCV images to ROS messages

### Too Long; Didn't Read
Here's just the straight up commands to install everything above. If it doesn't work, then see above for some links:
```bash
# Install ROS Noetic
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list' && \
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 && \
sudo apt update && \
sudo apt install ros-noetic-desktop-full && \
sudo rosdep init && \
rosdep update && \
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc &&\
source ~/.bashrc

# Install git, vim, cmake, catkin
sudo apt update && \
sudo apt -y install git vim cmake python-catkin-pkg-modules && \
source /opt/ros/noetic/setup.bash

# Install mavros, joystick node, smach
sudo apt -y install ros-noetic-mavlink ros-noetic-mavros ros-noetic-mavros-msgs \
    ros-noetic-cmake-modules ros-noetic-control-toolbox ros-noetic-joy ros-noetic-smach
    
# GeographicLib
sudo geographiclib-get-geoids minimal

# Arduino ROS bridge
sudo apt install ros-noetic-rosserial-arduino ros-noetic-rosserial

# OpenCV Python
sudo apt install python3-pip && \
pip3 install opencv-python

# OpenCV Bridge
sudo apt install ros-noetic-cv-bridge
```
