# Neural Networks and You

Hi! This is an introduction to the basic principles behind neural networks and to their use in AUV. It's designed to teach you just what you need to know to start working with neural networks, so there's not much theory and a lot of practical information.

## The Problem

We're building an autonomous submarine. Since we can't control the submarine directly, it has to be able to sense the environment around itself. The easiest sensing method to implement - and one of the most useful - is vision. Just strap a camera on that sucker (waterproofed, of course) and it's ready to go. 

The problem is that visual data is hard for computers to interpret. Computers don't see the way humans do; to a computer, an image is just a two-dimensional array of pixel values, where each value represents the color and/or brightness of that pixel. That means that the computer needs to be able to identify what each part of the image corresponds to in the real world, which is difficult. 


### Object Classification and Recognition

There are two basic problems of machine vision that AUV solves with neural networks.

#### Image Classification

Given an image, determine what it is. Usually, the computer selects from a group of predefined (by the programmer) **classes**, like "dog", "cat", and "horse", which is why it's called "*class*ification."

#### Object Recognition

Given an image, determine what objects are in the image (if any) and their locations. This is a harder problem because it expects the computer to do more work; it has to be able to discard irrelevant parts of the image. Note that once you know where the object is in the image, the next step is determining what the object is - image classification.

<img alt="deathkitty riding unicorn" src="https://ksu-auv-team.github.io/images/deathcat.jpg"  width="500px" style="align: center; margin: 25px">

These are easy for humans, because our nervous systems are built for it, but hard for computers. A three-year-old human could point to the cat in this picture and tell you what it is, but computers have to be taught, and it isn't is easy as saying

```python
shape = find_shape()
if is_cat(shape):
        shape.type = 'cat'
```

In theory, you *could* write a massive series of if statements that would identify every picture of a cat correctly, but it would be so complex that no human could keep track of it, and it might fail if a new type of cat picture you didn't plan for showed up.

Another possible solution, called **blob detection**, works by identifying all the pixels in a group, or blob, with roughly the same color (or that share some other property like brightness). This works well for simple objects, and in some situations it is still better than a neural network, but there are problems.

* It's inflexible. If you have a blob detector precisely tuned to recognize objects of a specific color, even a small difference like a lighting change might throw it off. You also have to worry about contrast - for example, you can't look for black or dark gray to find the cat in the image above because the background color is so similar.
* It doesn't handle complexity well. Since you're looking for groups of similar pixels, if the object you want to find has a lot of different pixels, you'll have to do something to get around that, whether it's detecting and assembling multiple blobs or something else.
* It takes a lot of work. If you want to get around the problems mentioned above, you do it by specifying your detector more carefully. That works, but it's time consuming - you have to test, then revise, then test, then revise, etc.

There are other simple mathematical methods for dividing an image and recognizing things within it, like edge detection, but those are less relevant to what we do than blob detection.

### Why neural networks?

Because they work better than anything else we've come up with.

That answer is simplistic, but true. At this point, we (we meaning humans) haven't found a better way to automate object classification and recognition. The key is that they can learn. Instead of trying to write our own series of if statements, we feed the computer data and let it find a system of functions that produce the output we want. The neural network is the structure that holds those functions.

## Basics

A neural network is a complex system of linear functions. Their design is inspired by the structure of the brain, which is why they're called *neural* networks, after neurons.

It is composed of nodes, or **neurons**, which are connected to each other through inputs and outputs (which are numbers between 0 and 1). These neurons are arranged into **layers**, so that each neuron in one layer is connected to some or all of the neurons in the next layer. Each input has a **weight**, which tells the neuron how much to use that input - how seriously to take it, if you want an an analogy. Each neuron takes in its inputs, weighs them, then uses its **activation function** to determine the output.

The weights are what determines what the network does, because they're what controls the input to each neuron. However, it isn't feasible to write them by hand, so we have to **train** the network to find them automatically. That happens with a process called **backpropagation**: basically, you give the network an input and the desired output, and it modifies its own weights to get its actual output closer to the desired output. 

Since just one input only tells you how to find one output, you need to train the network on a huge number of inputs, ideally hundreds or thousands, all of which need to be processed by a human to determine what the network's output should be. This process is simple, but labor-intensive.

[For more information on the theory and math behind neural networks, this video series, which explains them better than this can, is highly recommended.](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

In more complex neural networks, layers can be more complicated than a simple 2D array. For example, input layers for image processing often have three layers - one each for red, green, and blue (the three components of a pixel value). Others perform more complicated operations, like convolutional layers that consider a region of an image at a time in **convolutional neural networks** (CNNs), which we currently use, and pooling layers, which shrink the network to reduce the computation necessary. [This webpage from a Stanford course has more information on how CNNs work.](http://cs231n.github.io/convolutional-networks/)

Layer sizes vary. The input and output layer sizes are usually matched to something: for image classification, the input layer is typically the size of the input image, and the output layer typically has one neuron per class. The sizes of the layers vary widely depending on what the layer does.

Since a neural network is ultimately a series of linear functions, calculating those functions (for training or inference) takes math, and a lot of it. Every connection between neurons has to be calculated, and since the number of connections multiplies exponentially, the number of calculations that has to be performed is massive, and it's all with floating point (decimal) numbers, which is harder than integer math. The good news is that since the calculations don't depend on each other and are all the same type, they're easy to process in parallel (i.e. by different processors).

Fortunately, GPUs (Graphics Processing Units) are ideal for neural network processing because they're optimized for graphical processing, which requires the same kind of math - it's easily parallelized floating point math, with a large number of simple computations. The speed difference between a neural network running on a CPU and a GPU is *massive*; training is many times faster on a GPU.

[TensorFlow Playground](PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) will let you experiment with a simple neural network in your browser. It's a good way to see some of the structure in practice at a scale that's comprehensible.

## Tools

In practice, building neural networks from scratch is very uncommon. There's just no point - there are enough resources out there already that you can do most things without much modification of your own. Here are the ones we use, and a few others we don't that you'll probably hear about.

### Caffe
Caffe is the neural network framework we use. It is fairly simple to work with, with all its configuration done through .prototxt files. (They look like JSON files with a slightly different syntax.) It allows us to train our network and move it to the Movidius easily.

### Movidius

The Intel Movidius Neural Compute Stick is a USB vision processing unit that we use to run neural network **inference**, which means running the network to get output, as opposed to training. The Movidius uses a GPU-like architecture and cores to get good performance, but it's smaller and cheaper than a GPU would be, which makes it easier for us to put one (or two) in the sub. The catch is that it is still slower than a GPU, and unlike a GPU we can't use it to train a neural net, so we have to use a PC for that. Using the Movidius also forces us to use Intel's software for it, which has some flaws and restrictions.

### TensorFlow

TensorFlow is another neural network framework like Caffe. It does roughly the same job, and it's more popular than Caffe, but we don't use it because Caffe is better supported by the Movidius, the hardware we run our networks on.

### Others
Caffe and TensorFlow are the most widely used, but you might also hear about Keras, which is a simpler wrapper for TensorFlow, Caffe 2, Pytorch, or Darknet.

### Predesigned networks
In practice, it's rarely worth building a neural network of your own. There are enough preexisting networks out there that it's easier to retrain one, especially since most of them were designed by experts. We're currently using [MobileNet-SSD]() for object recognition, which combines SSD (Single-Shot Detection) for recognition with MobileNet for classification. Other popular networks are YOLO (You Only Look Once), ImageNets, VGGNet and ResNet.

### Datasets
We don't use these directly, but it's worth knowing what some of the most common ones are because you'll hear about them a lot, especially when you're comparing performance between networks. It's usually expressed in terms of performance on a common dataset, since they provide a reliable baseline.

`//to be added`

## Use

In practice, actually using a neural network is much easier than understanding it. It isn't necessary to understand everything about a network to use it; just enough to make it work.

### Data Collection

After you've chosen a network, the first step is collecting and labeling the data you're going to train the network on. Since we're using neural nets for submarine vision, we'll usually collect our data by keeping a video running while we pilot the submarine to the things we want to see.

Once you have a dataset, you need to label it so that you can use it for training. We have a [labeling tool](http://ksu-auv-team.github.io/labeling) on GitHub, which is what we have used in the past. You'll have to change the list of classes to the classes you're training for, but it works and it works with the rest of the infrastructure we currently have. Other solutions also exist.

### Training

Training the network is simple but time consuming. It can technically be done on any computer, but in practice you'll always want to use a computer with a powerful GPU because anything else is too slow. We have one computer with a GPU at the lab (for now), and you may have one of your own.

To take a dataset, convert it to the format Caffe expects, and train a network, [see the documentation for our network.](https://github.com/ksu-auv-team/ncs-ros) After reading that documentation, you may think the process is an incomprehensible mess. You're right; that's one thing we need to fix - we need to rewrite our script files for that to eliminate the extra steps you have to take now.

### Inference

To run the network, you'll have to get the complete weight file from Caffe (the documentation I haven't added will explain where). Once you do that, you'll have to convert it into a Movidius graph file with the [Movidius SDK](https://movidius.github.io/ncsdk/), specifically the [`MVNCCompile` command](https://movidius.github.io/ncsdk/tools/compile.html). Once you have your graph file, tell the sub's program (most likely `run-nnet.py` - [see the ncs-ros documentation for details](https://github.com/ksu-auv-team/ncs-ros)) where it is and run it.

## More information

For more information, check out [our tutorials page](https://github.com/ksu-auv-team/training/wiki/Tutorials), any reputable AI textbook, or the rest of the internet.