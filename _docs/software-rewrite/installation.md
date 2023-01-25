---
title: Installation
category: Software Rewrite
order: 2
---

## Software Installation

### Requirements:
- A Computer with Ubuntu 20.04 (Nvidia Fork is okay)
- At least 4GB of RAM, (though at least 8 is recommended)


### Steps:
First, Open Up a terminal on Ubuntu 20.04 and install Git.
```bash
sudo apt install -y git       
``` 

Next, clone the `sub_utilities_2` repo.
```bash
git clone https://github.com/ksu-auv-team/sub_utilities_2.git
```

From here, you can CD into the repo, and run the installation process.
```bash
cd sub_utilities_2/
bash ./scripts/install_core.bash
```

This should create a basic install of all of the ROS dependencies to run.