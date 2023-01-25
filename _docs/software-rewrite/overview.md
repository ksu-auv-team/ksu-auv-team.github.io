---
title: Overview
category: Software Rewrite
order: 1
---

## Introduction
During the 2022 Competition season, we noticed that our software stack was having a lot of issues. Some of them seemed simple, like manual control not working, others like not having a depth sensor are a little more difficult.

This has led to an effort by the team to upgrade and fix a lot of things for the 2023 season.

The biggest issue with our software setup is the outdated development stack that we are on.

During the 2022 season, we were using:
- A 4GB Jetson Nano
  - While a handy little device, it can't handle a lot of the machine learning tools we need neverless our software on top of it.
- Ubuntu 18.04
    - This is The Operating system that we have been on for a number of years on, of course it's good for some uses, however Canonical is currently on Ubuntu 22.04
- ROS1 Melodic
  - This was great for its time, but it will lose official support in 2023. This means that we are going to have to either upgrade, or lose support.


The current plan is to upgrade to:
 - A Jetson Orin
 - Ubuntu 20.04
   - The Jetson Orin supports Ubuntu 20.04, and not 22, but this will keep us safely in the support line for at least the next two years.
 - ROS2 Foxy Fitzroy
   - Of course, this transfer can't happen all at once, so we'll use ROS1 Noetic while we convert over to Foxy.

