---
layout: post
title: "🏞️ CNN Basics"
date: 2025-08-26
author: "Ajith Raghavan"
description: "CNN Basics"
tags: ["🧑‍💻 ML", "Neural Network", "CNN"]
cover_image: true
subtitle: ""
---

## ⿻ ConvNet

☝️- This should be best(available) Emoji 😉 - [Emoji Generator](https://ajithraghavan.github.io/blog/emoji-generator/)

Convolution Neural Network (CNN or ConvNet) is a type of Neural Network, which is good at processing image

We do Convolution(Cross Correlation), by following BUT much larger and bigger

Yes, now also, still competitive to ViT(Vision Transformer)

With ConvNet we can do,

### Image Classification

Where we classify image, like what contains in an image

Some Models are:

1. AlexNet
2. VGGNet(16, 19)
3. Inception(Very different approach)
4. ResNet(Responsible for Residual Connection which is used in Transformers too!)

### Object Detection

Detect and draw Bounding Box around the objects in the image like Car, Pedastrian

Some Models are:

1. R-CNN
2. YOLO
    - YOLO is such an amazing Paper covers cool topics like:
    1. Intersection Over Union(IoU)
    2. Non-Max Suppression
    3. Anchor Boxes

### Image Segmentation

Where we paint the color around possible Objects in an image

Some Models are:

1. FCN
2. U‑Net 😍

And much more CNN Models

Let us discuss more in another Post!

### What Deep ConvNet Learns?

The crucial question CNN have these layers, what these layers learn?

Let us Consider this image and let us consider that this CNN has 4 Layers

![Image](https://cdn.analyticsvidhya.com/wp-content/uploads/2019/01/image-classification-model-6731d4bb5c389.webp)
Source : [Analytics Vidhya](analyticsvidhya.com)

It might Learn the Features like,

First Layer :  "Straight Line", "Cross Lines", etc

Second Layer : "Curves", " Common Pattern", etc

Third Layer : "Cat Nose", "Dog Ears" etc

Fourth Layer : "Cat Face", "Dog Face" etc 

> Earlier Layers learns small patters like Lines, Shapes and 

> Deep Layers will Learn Complex Features like Nose, Ears, even Face etc


Thanks for reading