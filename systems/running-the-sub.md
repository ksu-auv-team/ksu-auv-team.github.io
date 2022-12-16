# Running the Sub
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

## Running Just One Part
In addition to running the whole sub with the `runsub.py` script, we also have the ability to run just a single piece if you only want to test one thing.

All of these python scripts can also be run using ROS instead of pathing to them. The difference would look like this if you were trying to run the `execute_withState.py` script from the `subdriver` package:
```
# Running in the traditional style:
python /path/to/sub_utilities/src/subdriver/src/execute_withState.py

# Running using the ROS style:
rosrun subdriver execute_withState.py
```
Obviously, the latter is much easier to type, but we also provide the full paths below, so you will know where these scripts live.

### Running the State Machine (subdriver)

So you wanna run the state machine, huh?

Well, that's done through the `execute_withState.py` script located in the `sub_utilities/src/subdriver/src` directory. if you run a `./execute_withState.py -h` it will show a list of all the available commands that you can run.
Typically we want to pass in the value for whatever state machine we want to run, for example `python execute_withState.py -m BaseStateMachine` but by default the main state machine is run. 

A quick side note, you will need to open up a second terminal and run `roscore` to start the ROS master node.  
You can just leave `roscore` running in a separate terminal for the whole time. It's what's connecting all the nodes in the background.

By making your own state machines, you are able to test that the behavior of your new code behaves in the way that you expect it to. For example, if you're working on a new torpedo machine, you can wire up a state that lines you up with the torpedo board, then another state that fires a torpedo, then a final state that leaves the torpedo board. And all of this you can do in simulation, allowing you to check most of the functionality of your code without ever having to run it on the actual sub. 

##### Using the --arbitrary Flag  
One really nice thing about the state machine is that we have the ability to test a single state without the need to create an individual state machine for it. To do this, we use the `--arbitrary` flag when running `python execute_withState.py`. The `--arbitrary` flag requires you to pass in the module path and class name to the state you want to use. For example, if you created a new state that had the following path `subdriver/StateMachine/interact/my_cool_state.py` and the name of the class was `My_Cool_State(Sub)` you would pass it in as following:
```bash
python execute_withState.py --arbitrary StateMachine.interact.my_cool_state.My_Cool_State
```
And the state machine would run through three states. 
 1. Dumb_Start (Sinks the sub for a few seconds to get it underwater and moves forward slightly)
 2. My_Cool_State (Does whatever you programmed it to do)
 3. Surface (Brings the sub back up to the surface)

This allows us to test individual states in the pool without having to write special state machines for each one.


## Watching the Logs in Real Time
If you want to watch the logs for any of the nodes in real time, you can do that using the helpful `auv-tail-*` alias that we add to the system. Just type that into your terminal, then hit tab twice to auto-fil the rest and you can see the logs in real time.
