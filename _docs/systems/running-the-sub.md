---
title: Running the Sub
category: Systems
order: 1
---

## Manual mode

You'll need the sub, the router, a gamepad, and another computer with ROS installed.

1. On the sub, run
```
roscore
```

2. On the sub, if desired, run an imaging program. To record images, run
```
cd ~/source/pict/ && python pict.py
```

    To run the neural network on the sub, which also records images, run
    ```
    python ~/source/ncs-ros/run-nnet.py
    ```

3. From the ground station (the other computer), run 
```
rostopic list
```
to make sure roscore is running and visible to both computers. It should print a list of topics, including at least /rosout.

4. From the ground station, with the gamepad plugged in, start the controller by running
```
rosrun joy joy_node
```

5. Again on the sub, run
```
rosrun movement_package manual_mode
```
This will arm the PixHawk. Once the PixHawk is armed, the sub will be ready.

Order is not critical for all of these steps. Roscore must be started before anything else happens, but the other steps can happen in any order. The order given is the one that has been most convenient.

## Autonomous mode
Make sure everything's plugged in. I recommend making sure that reading from the killswitch is working as well.

From the sub computer, run 
```
runsub
```
(doublecheck what that command is later)

This command will start roscore, movement_package, ncs-ros, and subdriver2018.

Then close the sub up. After you turn the killswitch, there will be about a 15 (?) second wait for movement_package to successfully arm the Pixhawk), then another 20 (?) second wait for the sub to start moving to make sure the Pixhawk has time to arm and anyone in the water has time to reposition it.
