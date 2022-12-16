# Running In Simulation

This area describes the process for running the Software-In-The-Loop. Also known as just a simulation. The simulation uses ArduSub with Mavros to communicate. Basically what we're doing is simulating the pixhawk and running it virtually. 

The setup is fairly easy and just needs some extra ardupilot stuff to run.

Start out in the `sub-utilities` directory:
```bash
cd /path/to/sub-utilities
git submodule update --init --recursive # Clones all the ardupilot repos needed
cd simulation/ardupilot
Tools/environment_install/install-prereqs-ubuntu.sh -y # Installs dependencies
. ~/.profile # Reloads your path variables
./waf configure --board Pixhawk1 # Loads the configuration for the pixhawk
./waf sub # Builds the ardupilot repo
```

**At this point, it's required that you log out, then back in!**

Once that's done you should now be able to run the simulations. First, you need to generate the eeprom files by running a simulation.
```bash
sim_vehicle.py -w -v ArduSub --map # Starts a simulation
```

Ctrl+C that, and you should be ready.
To run all of our software in simulation, just use the `--simulate` flag on `runsub.py`:
```bash
./scripts/runsub.py --no-arduino --no-network --simulate
```

You should see a simulation window come up with the sub and, fingers crossed, everything connects and the sub should start moving.