# 2018 Software Goals

* Refactor existing code so it's easier to work with
* Add to existing code so we have more working for next year (especially easyish tasks)
* Document everything so it's easier to get new people started
* Recruit more programmers

## Competition obstacles:
#### Doneish
* Start gate

#### Easyish
* Dice/buoys
* Path

#### Medium
* Surfacing in area
* Dropper/roulette wheel

#### Hard
* Torpedoes
* Pickup/drop off
    * Funnels
    * Gold chips

## Documentation
* Ideally want a guide/tutorial we can give new people to get them started with minimal help. Probably won't get that, so go for a guide we can give new people to get them started. We'll probably need one for complete beginners and one for programmers.
* Explain what every module does and how it fits together.
* Explain how each module works (i.e. comment and document each)
* Explain how we use third-party libraries like ROS and the NCSDK, ideally with both links to their documentation and our own documentation of how we use it.
* Explain other software we use, like Ubuntu.
* Find ways to get nonprogrammers started and to get non-Python programmers switched over.


## Potential projects:
* Refactor execute.py
* Write more convenience scripts, especially for training and starting the sub tethered
* Find a better way to log data from runs
* Find a way to connect to the sub wirelessly (or otherwise without opening it)
* Update execute.py to use depth sensor throughout
* Figure out why pixhawk depth_hold won't work
* Test stereo camera
* Retrain SSD properly for start gate
    * Figure out if we need to label gate parts separately and rewrite if so
* Fix qualification code
* Write classifier for die faces or get SSD working with them if possible, then write dice code
* Train SSD for path marker (or other detection) & write path following code
* Start work on claw/dropper/torpedoes
    * First figure out what we'll have
    * Then be ready to start working with it
