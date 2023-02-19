# p5js Examples for oscxyz

[oscxyz](https://github.com/rahji/oscxyz) is an OSC-to-WebSockets bridge that receives accelerometer data from your phone (using an OSC client like TouchOSC) and makes it available via WebSockets.

It lets your p5.js sketch (or other WebSockets client) access your phone's accelerometer data in real time.

## The Code

This repo contains three examples:

1. An on-screen 3D object that moves in response to your phone's movements
2. A bar graph, visualizing the live x/y/z accelerometer data
3. A table that shows the current x, y, and z values, as well as the minimum and maximum values over time

To see the examples in action, I'd suggest the following:

1. Install [Visual Studio Code](https://code.visualstudio.com/download) and the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Run the [oscxyz](https://github.com/rahji/oscxyz) server on your computer.
3. Open TouchOSC on your phone, with the correct settings (see #2)
4. Download the files in this repo and open one of the example folders in Visual Studio Code
5. Right-click on the `index.html` file and choose "Open with Live Server"

## Notes

* The 3D object doesn't spin a full 360 degrees - just 180 degrees back and forth. I was lazy and didn't figure out how to make it do that.
* Some of the examples use the `lerp()` function to smooth out the data.
* Honestly, I don't completely understand the data that comes from the phone. The values are normally between -10 and 10, but if you shake the phone, you get very high numbers as well. There's an example of how to constrain the numbers to the -10 to 10 range. You could also really easily tell when someone shakes their phone, by the spike in values.
* Again, not fully understanding accelerometer data, I briefly tried just using the x, y, and z values for the x/y/z rotation of the 3D object, but it's not that simple. Look at the bar graph example and you'll see what I mean.
* I will update these examples (and oscxyz) to work with other apps, but right now it seems like TouchOSC is the way to go because it includes all three axes in each message.
