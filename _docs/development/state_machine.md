---
title: State Machine
category: Development
order: 1
---
## How to Write a State

We use a ROS package called [SMACH](http://wiki.ros.org/smach) that organizes our state machine into smaller pieces. This helps us abstract the individual pieces of the way we run the sub, meaning we can re-use pieces previously coded super easily. All a new user has to do is re-wire a new state machine (described below) from a whole bunch of little 'states' as described here.

Firstly, let's get some logistics of the anatomy of a state out of the way. Every single one of our states inherit from a super class called `sub.py`. This super class holds lots of useful methods and bits of code that make it much easier to develop, [take a look at it](https://github.com/ksu-auv-team/subdriver/blob/master/StateMachine/sub.py) before making a new state to be familliar with what's available to you.

Next, each one of these states has *hard* requirements, and some *soft* requirements. The two hard requirements are `__init__(self)` and `execute(self, userdata)`. These are two methods that SMACH requires of us to override when we make a new state. While fairly self-explainitory, init happens in the initialization of the state, while execute is the actual execution of the state. `__init__` requires you to define all the possible outcomes of the state, while `execute` requires that you return one of those defined outcomes. Alos, **an important note** `execute` only happens **once** so, if you want it to loop through some behavior, you need to have a loop inside of `execute`.

Lastly, some of the soft requirements are just things that you should be doing in most states to initialize them for general helpfulness. The first of which is running `self.init_state()` in the beginning of your `execute` which logs some things internally. You can check out the `sub.py` class to see the specifics of what it's doing. Additionally, it's helpful to log some info to the terminal using `rospy.loginfo('Your message here!')`

Now that that's out of the way, writing a new state is as easy as 1, 2, 3:

1. Decide where you want your state to start. What assumptions are you going to make that your system in in when starting?
2. Decide where your system can transition to next. What are all the possible end conditions of your state?
3. Implement the logistics of the your state, and make sure that you adhere to the above two rules.

#### 1. Where to start  
This first step is more of a theoretical step as opposed to a hard requirement. This is something that should direct your future writing.

Unlike with the future transitions, SMACH does not require you to program in where your current state needs to start at. You should try and think of your state as a stand-alone idea with as little reliance on outside information as possible. Also, try and make your state as small and distinct as possible without getting ridiculous. The smaller the state, the easier it is to re-use it for future state machines. 

Commenting at the beginning of the state is extremely helpful also. You should be letting future users know where they are and where they can slot this state into a larger picture as well as what exactly this state is attempting to do. 

#### 2. Where to go  
This step is a hard requrement of SMACH. As mentioned before, in your `__init__` you need to tell the state what are the possible outcomes of this state. For example, most of the time the first state we start in is called `start.py` and it has two outcomes in the `__init__` as follows:

```python
def __init__(self):
    smach.State.__init__(self, outcomes=['not_found_gate', 'found_gate'])
```

This tells SMACH that we have two possible outcomes, 'not_found_gate', and 'found_gate'. These possible outcomes will influience how we wire up state machines in the future depending on what our outcomes are. 

After you have defined what these outcomes are in the `__init__`, you will need to return one of these in your `execute`. That's how SMACH works, you return the outcome that actually happened and the state machine uses that information to transition to the next position in the system. For example, again from `start.py`:

```python
# Control loop
while(1):
   self.publish_joy(curr_msg)

    if(rospy.get_time() - self.current_state_start_time) > 2:    
        if self.get_box_of_class(gbl.detections_front, const.CLASSES['start_gate']):
            return 'found_gate'
        elif (rospy.get_time() - self.current_state_start_time) > 6:
            return 'not_found_gate'

    rospy.sleep(const.SLEEP_TIME)
```

What this section of code is doing, is it's trying to decide if we have found the start_gate or not between the first 2 to 6 seconds of running. If we have found the gate, we return 'found_gate' as a string, but if we have not found it, we return 'not_found_gate'. 

#### 3. Implementation  
When it comes down to implementation, it's more art than science, but here's some very practical tips for you to get started with.

1. Follow the above steps for all the logistical stuff: Inherit from sub, setup possible outcomes in `__init__`, run `self.init_state()` in execute, you will probably need a loop to run your code in inside of `execute`, use `rospy.loginfo()` as much as is useful, return whatever outcome is applicable. 
2. Try not to use system sleep delays or `rospy.sleep()`, but use the 'wait without delay' types of programming. If that doesn't make sense, take a look at [this arduino LED blink](https://www.arduino.cc/en/tutorial/BlinkWithoutDelay) as an example, or the above python example.
3. Utilize the `sub.py` class as much as possible, it's got a lot of useful methods in it. 
4. Take a look at `start.py` as a good example of how to write your first state. It shows you how to fill up a joystick message and write a control loop.
5. For joystick messages, they are in the range of -1 to +1 for all their axes. The only tricky thing is positive X and Y is the **TOP LEFT** of each direction, and negative X and Y is **BOTTOM RIGHT** which is against what I would think. This means that if you want the sub to strafe right at max speed, you would give the 'strafe' axes a value of '-1'. If you wanted to go down at max speed, you would give the 'vertical' axes a value of '-1'.
6. When publishing joystick messages, use `self.publish_joy` from the `sub.py` class. It makes global edits easier to do. 
7. We can run the autonomy with the `--debug` flag which just makes `gbl.debug` true. Use this to your advantage when working on your code, incorporate parts of code to skip over when running debug mode. Any infinite loops should have an end condition for a `--debug` option. Again, check `start.py` for an example. 
8. We have 2 special files, `gbl.py` and `const.py`. `gbl.py` is data that is designed to be changing constantly and only ever read from. Think 'current depth' or 'current heading', the most up to date information on this data. `const.py` is designed to hold constants that will only change if there is actual hardware changes to the sub, or we add new physical functionality. These are things like the controller buttons/axes for joysticks.

## How to Write a good StateMachine

So, now that we've talked about how to write individual states, it's time to wire them all together and make a brand new State Machine! If you want the official documentation tutorial, check out the [Smach Ros wiki](http://wiki.ros.org/smach/Tutorials/Simple%20State%20Machine).

The first thing to know is where to put your new state machine. Typically we put them in [subdriver/tree/master/StateMachine/machines](https://github.com/ksu-auv-team/subdriver/tree/master/StateMachine/machines) with all of them listed at `TutorialMachine.py` or whatever they are called. 

After you have your brand new file, you will need to start wiring it up with all the states you care about, which is not too difficult. Here's an example of a few simple lines:

```python
sm_AUV = smach.StateMachine(outcomes=['finished_run'])

with sm_AUV:
    smach.StateMachine.add('START', Start(), transitions={'not_found_gate':'SEARCH_GATE', 'found_gate':'TRACK_GATE'})
    smach.StateMachine.add('SEARCH_GATE', Search_Gate(), transitions={'search_found':'TRACK_GATE'})
    smach.StateMachine.add('TRACK_GATE', Track_Gate(), transitions={'lost_gate':'SEARCH_GATE', 'approached_gate':'INTERACT_GATE'})
    smach.StateMachine.add('INTERACT_GATE', Interact_Gate(), transitions={'through_gate':'SURFACE'})
    smach.StateMachine.add('SURFACE', Surface(), transitions={'surfaced':'finished_run'})

outcome = sm_AUV.execute()
```
While the meat is in the middle, there are some surrounding lines that are more logistical than anything else. `sm_AUV` is a new `smach.StateMachine` container with 1 possible outcome. We also create a new variable `outcome` that holds whatever the outcome from `sm_AUV.execute()` returns (which should always be 'finished_run').


The middle five lines makeup a very simple state machine comprised of five individual states. The goal of this particular state machine would be to search for the start gate, track and approach it, then, once through, surface. 

All the commands are basically the same, so I will disect one as an example for all the rest, in this case, the `TRACK_GATE` state addition:

* `smach.StateMachine.add` - This is python calling the `smach` package, which holds a `StateMachine` object with member `add`.
* `TRACK_GATE` - This is what we, as state machine designers have arbitrarily decided to call the new state I'm adding. By convention, new states we add are in all caps. However, it could have also been called `TrAcK_gAtE` if we wanted.
* `Track_Gate()` - This coresponds to the file that we import at the top of the state machine file. Something like `from StateMachine.track.track_gate import *`. Inside the `StateMachine/track/track_gate.py` file the name of the class is what we care about: `class Track_Gate(Sub):`. What this line is doing is it is matching the name we gave it before `TRACK_GATE` to the name of this python class `Track_Gate`.
* `transitions={'lost_gate':'SEARCH_GATE', 'approached_gate':'INTERACT_GATE'}` - Finally, this is where we define where the state machine is allowed to transition into after its current state of `TRACK_GATE`. This has to match exactly with what is in the `__init__` of `StateMachine/track/track_gate.py`. What we are telling the state machine here is that if `TRACK_GATE` returns `lost_gate`, then transition into `SEARCH_GATE`. However, if `TRACK_GATE` returns `approached_gate` then transition into `INTERACT_GATE`. 

In addition to following the format above, take a look at one of the machines inside of `StateMachine/machines` to get a better feel for the format of what's going on.
