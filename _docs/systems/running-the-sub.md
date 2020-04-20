---
title: Running the Sub
category: Systems
order: 1
---
## Introduction
The main way that we launch processes on the sub is from the `runsub.py` script that lives in the `sub_utilities/scripts` directory. You can run it with the command line argument --help for all the possible uses: `./runsub.py --help`

Additionally, this is is all contingent on the fact that you have your networking setup properly, if you don't it wont work.

## Manual mode

You'll need the sub, the router, a gamepad, and another computer with ROS installed.

1. On the sub, cd into the sub_utilities repo, then run
```
./scripts/runsub.py --manual
```

2. If you don't want to run the neural network, then run:
```
./scripts/runsub.py --manual --no-network
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
The sub drives like a drone, so check out [this link](https://dronenodes.com/wp-content/uploads/2016/07/Drone-Quadcopter-Transmiter-Anatomy.jpg) for help, sort of. **YOU MUST HOLD DOWN THE LEFT TRIGGER TO MOVE THE SUB AT ALL**


## Autonomous mode
Make sure everything's plugged in. I recommend making sure that reading from the killswitch is working as well.

1. SSH into the sub computer

2. Make sure that the sub's IP address is set to localhost in the `~/.basrh`, see networking for more information

3. Run screen to start a new detachable process
```
screen
```

4. Start up runsub 
 
```
./scripts/runsub.py
```
This command will start roscore, movement_package, subdriver, and probably other stuff.
Everything runs off of the killswitch arming and disarming. This is how you start up the proccess while in the water.

5. Hit `Ctrl+a` then `d` to detach the process from the current screen. You may not remove the tether and put it in the water.

6. Once you're done testing, you may re-attach the tether, SSH back in, then `screen -r` to pull up the most recent `screen` session. You may now kill the processes like normal.

## Simulation mode
This is a way to test your code without having to actually hook it up to the sub

1. Just run runsub with some specific commands
```
./scripts/runsub.py --no-arduino --debug-execute
```

This should start up all the processes it can without crashing. Don't worry if you see lots of red stuff, it's going to try and start up things that you don't have attached, but you should see stuff populate the terminal.
Everything gets logged to the `logs` directory when you end the task.

