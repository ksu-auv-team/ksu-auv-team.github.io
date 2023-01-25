---
title: Building The Repo
category: Introduction
order: 3
---

### Build the System

Once you have installed all the dependencies, you need to build the system. Building is how we turn human-readable code into computer-readable code. To build the system, just run the following commands:
```bash
cd /path/to/sub_utilities
catkin_make
./setup.py
```
Obviously replace `/path/to/sub_utilities` with the actual path to wherever you have cloned the repo to. 
Once this is done, you will have a few new directoryies, but the most important are the `build` and the `devel` directories. These are where all the compiled code lives. 

The `setup.py` that you ran before does a few helpful things. Namely, it adds the `devel/setup.bash` to your working directory. This allows you to call any `roslaunch`, `rosrun`, or other system things from anywhere. Additionally, it adds some useful aliases to your `~/.bashrc` all starting with `auv-`. So, if you type `auv-` into your terminal and hit the tab key twice, it will populate with all the possible commands. 

All of the `tail` commands are used for watching the log files populate in real time. 

For example, if you want to watch the execute logs:
```bash
auv-tail-execute
```

**Note: If you are on Ubuntu 20.04 and using ROS Noetic, be sure to use the** `noetic` **branch.**