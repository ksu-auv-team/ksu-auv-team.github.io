# USB Peripherals

This area describes the process for adding any new USB peripherals to the onboard computer. Let's say you want to add a new camera or some USB sensor, you need to make sure you can access it consistantly every time.

The Linux operating system has a couple of things that it does depending of what type of USB device is plugged into it, but they will all have one thing in common, the `/dev/` directory. The `/dev/` directory is where you can take a look at all of the USB devices that are plugged into your machine. Just type in `ls /dev` in a console and you can see everything taking up what Linux calls 'special or device files'. There's going to be a lot of things listed there, but we don't care about most of them. 

Most non-camera devices will be mapped to either `/dev/ttyUSB*` or `/dev/ttyACM*`, while cameras are typically mapped to `/dev/video*`. The reason I put a * after each of these is beacuse they are typically numbered, starting with 0 and incrementing by 1 with each additional device plugged in. The easiest way to identify which physical device is the one you care about is to type `ls /dev`, unplug it, then type `ls /dev` again and see what changed.  Now, **IMPORTANTLY** Linux does **not** keep these names constant. It completely depends on which device is plugged in first as the names are just pointers to those devices. 

So, if you have a script that relies on accessing the arduino instead of the pixhawk (which would probably both be mapped to `/dev/ttyACM0` or `/dev/ttyACM1`) then you **NEED** to give these devices static names. We can do this by writing [UDEV rules](https://linuxconfig.org/tutorial-on-how-to-write-basic-udev-rules-in-linux). The specific rule we care about it the `99-usb-serial.rules` which governs the USB names. 

To write a new rule, you just need to either create the file with the correct name in the correct location, or edit that file if it already exists. The below example will be to give an arduino a static name based on it's internal serial number. In our case, we have already identified that the arduino is currently mapped to /dev/ttyUSB1.

Type:
```bash
udevadm info -a -n /dev/ttyUSB1 | grep '{serial}' | head -n1
```

This will spit out a serial number. Next, create or edit the following file with your favorite text editor, I'll use vim:
```bash
sudo vim /etc/udev/rules.d/99-usb-serial.rules
```

Finally, paste the following line in the file and save it, replacing VALUE_FROM_ABOVE with whatever the serial number was:
```bash
SUBSYSTEM=="tty", ATTRS{serial}=="VALUE_FROM_ABOVE", SYMLINK+="arduino_0"
```

Then, once you have unplugged and re-plugged in the arduino, you should be able to type `ls /dev/arduino_0` and see that arduino_0 is pointing -> to some /dev/ttyUSB*. Then, every time you need to reference that arduino in your code, you can access it by `/dev/arduino_0`.
