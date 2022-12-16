# Software Overview
#TODO: Make Sub Diagram

## External Software

### [OpenCV](https://opencv.org/)
OpenCV is an image processing library that lets us read images and videos from cameras or files easily and gives us ways to process those images.

### [ROS](https://www.ros.org/)
ROS stands for Robot Operating System, but it isn't an operating system. It's really a message passing framework designed for robotics. It lets us send messages between programs - and between programming languages - easy, which makes it easier for our code to run in multiple threads, or even on multiple computers.

### [Tensorflow](https://github.com/tensorflow/tensorflow)
Tensorflow is a Neural Network architecture that helps us do object detection. It is able to be trained to recognize any arbitrary set of images in the water. We typically use the ssd_mobilenet networks from the [Tensorflow Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md).

### [Pixhawk](https://pixhawk.org/)
The Pixhawk is a drone flight controller running ArduSub firmware, which lets it control the sub. It has a gyroscope, accelerometer, and other sensors that let it hold the sub steady when we aren't sending it commands. It translates the commands we send from movement_package into signals the ESCs can understand.

### [Ardusub](https://www.ardusub.com/)
Ardusub is the firmware that runs on the Pixhawk based on the extremely sucessful Ardupilot code base.

### [MavROS](http://wiki.ros.org/mavros)
The Pixhawk uses software called MavLink to communicate with the computer. MavROS is a wrapper for MavLink that lets us access the Pixhawk through ROS instead of having to deal with two types of messages.

## Our ROS Packages

### [camera_utilities](https://github.com/ksu-auv-team/sub_utilities/tree/master/src/camera_utilities)
camera_utilities is our ROS package that takes in camera feeds and distributes them to the rest of the system. We have the ability to publish from a camera, view from a camera, publish images in a directory, etc.

### [movement_package](https://github.com/ksu-auv-team/sub_utilities/tree/master/src/movement_package)
movement_package is a ROS package that moves the sub. In manual_mode, which is the one we use, it takes joystick commands in the form of a ROS joy message and translates them into movement commands for the Pixhawk. We can also use it with an actual joystick or game controller to drive the sub manually.

### [subdriver](https://github.com/ksu-auv-team/sub_utilities/tree/master/src/subdriver)
subdriver is the ROS package that does all of our high-level control of the sub. It is where the state machine lives and manages what the sub is trying to do at any moment. All things related to "I wan the sub to move here and do this" should go here.

### [sub_vizualizer](https://github.com/ksu-auv-team/sub_utilities/tree/master/src/sub_vizualizer)
sub_vizualizer is a GUI vizualizer for the sub. It is designed to help the sub operator get a snapshot of the status of the system in a quick moment.

### [network_wrapper](https://github.com/ksu-auv-team/sub_utilities/tree/master/src/network_wrapper)
network_wrapper is where all of the nerual network code is plugged in. We run a neural network to identify different objects in the water using the camera feeds. This repo is what we can hook into whenever we need to access that information.

### [submarine_msgs_srvs](https://github.com/ksu-auv-team/sub_utilities/tree/master/src/submarine_msgs_srvs)
submarine_msgs_srvs is where all of our custom ROS messages and services live. It you have a new concept that needs a ROS message, it should be put into here. 
