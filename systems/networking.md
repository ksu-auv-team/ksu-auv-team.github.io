# Sub Networking

This page explains how to connect the sub to another computer.

![Networking](https://ksu-auv-team.github.io/images/Networking_Diagram.jpg)

## Physical connection
The physical connection is simple. All you need is for both computers to be connected to the router by ethernet cables. If you need the computers' IP addresses you should be able to find them by checking the router management page at `192.168.1.1`.

## The rest of the connection
Once you're physically connected, you should be able to SSH into the sub computer to run whatever you need, including the sub starting script or `roscore`. See [Running the Sub](http://ksu-auv-team.github.io/systems/running-the-sub/) for more information.

## Basic ROS networking

ROS is designed to for communication among multiple systems. Its network architecture expects one "master" PC which manages message traffic and zero to many clients with nodes that depend on the master messaging system. The master is where `roscore` runs. In our case, this is the PC in the sub.

You will need to tell ROS where it is and where to find the master by changing some environment variables. 

It's easiest to change these in `~/.bashrc` since they shouldn't change often. You can `export` them and `echo $<variable name>` if you need to see their value like any other environment variable.

* `ROS_MASTER_URI` is the URI of the master machine, which can be an IP, URL, or hostname, including the protocol and followed by the port number 11311, making the full format `http://<name>:11311`. This should be set to the same address - the one pointing to the sub computer - on all machines. Those machines will reach out to this address to establish connections, and that computer will handle the rest. Using `localhost` or `128.0.0.1` instead of the network IP on the master machine will not work.
* `ROS_HOSTNAME` or `ROS_IP` is the hostname or IP address of the machine of the setting is on. You can use either of these, but not both. ROS needs one of these variables to tell `roscore` running on the master computer how to connect to it.

Some teams at the competition last year reported problems with ROS when they did not use host names, but we haven't run into them ourselves.

Note that if you want to run ROS locally again afterward, you will have to reset these variables to localhost, as seen below:
```
export ROS_HOSTNAME=localhost
export ROS_MASTER_URI=http://localhost:11311
```

If you need more information, check out the ROS wiki, especially [the network setup page](http://wiki.ros.org/ROS/NetworkSetup#Configuring_.2BAC8-etc.2BAC8-hosts) or [the simpler multiple machines tutorial](http://wiki.ros.org/ROS/Tutorials/MultipleMachines).

Since we can configure our router to assign the same IP address to a computer each time it is connected, these should rarely change. `ROS_MASTER_URI` and `ROS_IP` on the sub computer should almost never change, since its settings only use its own address. The settings of the other computers may change more often because they may need to connect to different masters or be at a different IP address.

We can manually set host names at `/etc/hosts` so that we don't have to type IP addresses. See a Linux tutorial for more information about this.

`roscore` only runs once per ROS session, on the master computer. Trying to run `roscore` on one of the other computers will fail.

Running `rostopic list` will show everything currently running, or give an error if you aren't connected to a machine running `roscore`.

Note that ROS communication working one way does not necessarily indicate that it works in both directions. The best way to know for sure is by sending messages between computers. The commands `rostopic echo <topic>` to display the messages in a topic and `rosrun joy joy_node` to generate joystick messages, or any other program that generates messages, can be useful for this purpose.
