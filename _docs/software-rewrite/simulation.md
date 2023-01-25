---
title: Running in Simulation
category: Software Rewrite
order: 3
---

## Running in Simulation
To run the software using SITL, you want to first, set up a simulation instance.

### Installing Simulation Tools.

First, `cd` into the ROS1 folder
```bash
cd sub_utilities
```

Next, install the simulation submodule
```bash
git submodule update --init --recursive
```

This next part may seem familiar to you if you've used the ROS1 sub_utilities before.

```bash
cd simulation/ardupilot
Tools/environment_install/install-prereqs-ubuntu.sh -y # Installs dependencies
. ~/.profile # Reloads your path variables
./waf configure --board Pixhawk1 # Loads the configuration for the pixhawk
./waf sub # Builds the ardupilot repo
```

**At this point, it's required that you log out, then back in!**

Go back to the sub_utilities module.
```bash
cd /path/to/sub_utilities_2/sub_utilities/
```

Once that's done you should now be able to run the simulations. First, you need to generate the eeprom files by running a simulation.
```bash
sim_vehicle.py -w -v ArduSub --map # Starts a simulation
```

### Running a simulation:

From the root `sub_utilities_2` folder, run this command
```bash
bash ./scripts/run_sim.bash
```

This should boot up a simulation instance with everything required to run.


### Side-notes:
If you wanted to use a different launch command (As of 1/25/2023), you should go into `./scripts/run/run_ros1_sim.bash` and edit the line that starts with `./scripts/runsub.py` to have the arguments you want.