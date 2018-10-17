---
title: Software Overview
category: Introduction
order: 1
---

![sub architectural diagram](https://raw.githubusercontent.com/ksu-auv-team/training/master/images/2018_sub_architecture.png)

### OpenCV
OpenCV is an image processing library that lets us read images and videos from cameras or files easily and gives us ways to process those images.

### ROS
ROS stands for Robot Operating System, but it isn't an operating system. It's really a message passing framework designed for robotics. It lets us send messages between programs - and between programming languages - easy, which makes it easier for our code to run in multiple threads, or even on multiple computers.

### ncs-ros.py
ncs-ros.py captures images from the webcam using OpenCV, processes them to prepare them for the neural network, sends them to the Movidius to be processed, reads the result, and sends it to execute.py.

### SSD-Mobilenet
The neural network we use for object identification uses the SSD-Mobilenet architecture on Caffe. Caffe is the base neural network library that provides the framework to build the network on. SSD-Mobilenet is the network architecture we use. It lets us get the location and type of objects found in the image we feed it.

### Movidius
The Movidius Neural Compute Stick is a USB vision processing unit made by Intel for neural network inference, i.e. running neural networks. It comes with an API that lets us translate the network from a standard Caffe model to a format compatible with the NCS, then run it. We use it because it's smaller and more efficient than a GPU, although it is less powerful.

### execute.py
Execute.py is the Python file that has our higher-level AI code. It reads the bounding boxes ncs-ros.py sends and the pressure data from the sensor via the Pixhawk and uses them to decide where the sub needs to go, then sends out a joystick ROS message that movement_package can read.


### movement_package
movement_package is a ROS package that moves the sub. In manual_mode, which is the one we use, it takes joystick commands in the form of a ROS joy message and translates them into movement commands for the Pixhawk. We can also use it with an actual joystick or game controller to drive the sub manually.

### Pixhawk
The Pixhawk is a drone flight controller running ArduSub firmware, which lets it control the sub. It has a gyroscope, accelerometer, and other sensors that let it hold the sub steady when we aren't sending it commands. It translates the commands we send from movement_package into signals the ESCs can understand.

### MavROS
The Pixhawk uses software called MavLink to communicate with the computer. MavROS is a wrapper for MavLink that lets us access the Pixhawk through ROS instead of having to deal with two types of messages.

### ESCs & motors
ESC stands for electronic speed controller. The ESCs take the signal from the Pixhawk and power from the sub's batteries and use the Pixhawk signal to control the power the motors receive, which controls their speed and direction.