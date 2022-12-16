# Testing Motors with pixhawk
## Introduction
This is how you can test to make sure your motors are wired to the pixhawk correctly just in case they aren't labeled or someone (Dante/Kevin) plugs them in wrong.

**NOTE:** The blue robotics motors are not meant to be ran outside of water for a long period of time because they can burn up easily because the bearings are lubricated with water.
If you do want to run the motors, take the squeeze bottle we should have in the lab and spray some water on each motor. 
Even after lubricating the motors, you shouldn't be running the motors at full power for too long. For test purpose, you should only need to give each motor a little power in each direction.

## Requirements
* Pixhawk
* Laptop with [QGroundControl](http://qgroundcontrol.com/) installed 
* USB-A to micro-USB cable
* Someone who knows how to connect the motors and batteiers together.

## Guide

1. Make sure all of the motors are powered and connected to the pixhawk. Everything should be connected like we were actually going to a pool test

2. Plug the micro-USB cable into your laptop and connect it to the Pixhawk. Once the Pixhawk is powered on you should hear the ESCs chirp

3. Wait for the Pixhawk to flash blue (or yellow, TODO(NT): figure out which one it blinks first)

4. Open QGroundControl on the laptop. This should automatically register that the pixhawk is connected but Disarmed

5. Click the 'Q' (see picture) in the upper Left Corner and select settings. This should bring up a menu with a list on the side.

![QGroundControlLogo](https://ksu-auv-team.github.io/images/QGroundControlLogo.png)

<!--![QGroundControlSettings](https://ksu-auv-team.github.io/images/QGroundControlSettings.jpg)-->

6. Locate and click "Motors" (see picture)

![QGroundControlMotors](https://ksu-auv-team.github.io/images/QGroundControlMotors.jpg)

7. You should see a slider with some red text. Ignore the red text because it's just a caution and slide the slider. This will Arm the vehicle.

![QGroundControlArmSlider](https://ksu-auv-team.github.io/images/QGroundControlArmSlider.jpg)

8. Carefully move each slider up, if the motors are connected correctly then each numbered slider should correlate with that numbered motor (1->1, 2->2, etc.). Moving the sliders down will cause the motors to spin in the opposite direction. Once you see motor spin and in the right direction (read the paragraph in the motors tab on QGroundControl) then move the sldier back to the middle position so the motor stops.
    * Notice the reverse direction toggles? These are for if we mounted a motor backwards for whatever reason (blame mechanical but maybe they know what they're doing).
      On our current design, we have some motors that need to be revered and those should already be ticked. Please don't touch them if you don't need to. 
