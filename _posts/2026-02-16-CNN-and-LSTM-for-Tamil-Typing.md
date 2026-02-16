---
layout: post
title: "CNN-LSTM Hybrid Architecture for Thanglish-to-Tamil : Bridging 26 Letters to 247 Characters"
date: 2026-02-16
author: "Ajith Raghavan"
description: "OpenClaw"
tags: ["Tamil", "Thanglish", "CNN", "LSTM"]
cover_image: false
subtitle: ""
---

# Demo First ☝️

![VisAI](/assets/videos/VisAI%20Demo.mov)

# Introduction : Let's do Experiment 🧪

I sometime use Google Input Tools to write Tamil via Thanglish.  Like, if I type "Vanakkam" it will replace with "வணக்கம்"

Seeing(some years back) and using this on Day 1, I always thought, how they Built this?  What Model they use?  How we can Build this one?  Like those

So, on past Weekend I decided to Build One 💪

# Dataset : First thing in Machine Learning / Deep Learning 📊

I analyzed a lot of Dataset and decided to stick with [Google Dakshina Dataset](https://github.com/google-research-datasets/dakshina)

It contains a lot of Dataset, I chose to use below
- ta.translit.sampled.train.tsv
- ta.translit.sampled.dev.tsv
- ta.translit.sampled.test.tsv

So, it is **Character Level** not Word or Token Level

# Choosing Architecture 🏗️ : Comes Engineer's Artist 🎨

### Seq2Seq : Fixed

> Just briefly : Seq2Seq is used to turn one Sequence of Data into another Sequence, typically contain **Encoder Block** to read the Input then produce the **Context Representation** and **Decoder Block** to generate the output

First it is understandable that we need **Seq2Seq Model**

Yes, we enter the Sequence of Characters and we need to get Sequence of Characters

We shall proceed with that

### Intuition of Architecture

First, intuition that came to me to like
> 💭 Use Bidirectional RNN either BiLSTM or BiGRU with **Attention Mechanism**

That's the intuition that came to me

But, then I thought, wait, we are going to use Character Level, so, maximum Number of Timesteps will not exceed maximum of 50 time steps.

So, just LSTM works good here(LONG SHORT-TERM MEMORY!)

And I got another Thought, kind of FIRST PRINCIPLE

### Look closely at First Level

Why, my Intuition suggested BiRNN(LSTM or GRU) with **Attention Mechanism**?  Because of,

#### Thanglish Words Representation

Let us consider an example,

If we write "Vanakkam" for generating "வ" it needs to look for 'v' and 'a' both, right?

Similarly, for generating "ண" it needs to look for "na" and needs to decide which "ந", "ன", "ண" for that it needs to decide what comes BEFORE what comes AFTER

Because, "ன", "ண" won't appear in __starting__ of the word and "ந" won't appear at __end__ of the words **rarely**

#### Attention Mechanism

> I will not go too detail about Attention Mechanism here but generally, allows the Decoder to look back at all the Encoder's Hidden States and *Pick which ones are most Relevant* at each step of the output

Here we need to look for surrounding characters and decide

Note : "na" is just one example, there are other **PATTERNS** to consider like for "pattam", "tt" should be "ட்ட" like many other patterns too

#### Vanilla LSTM

But, just LSTM on Seq2Seq should solve the use case right?  Because there is no such _Long Range Dependencies_

### Local Receptive Field

Local Receptive Field is one of the Fundamental concept in Convolutional Neural Networks (CNNs) which focuses on a specific spatial location

Have explained briefly CNN [here](https://ajithraghavan.github.io/blog/cnn-intro/), please take a look!

### 🤷 What to do with Image Here?

We aren't dealing with Image right, then why use CNN?

#### 1D Convolution comes to rescue

We are going to use 1D Convolution, where Convolution is performed in Sequential Data, such as Text, Time Series, or Audio Signals etc.,

### Again why Convolution 🤷

[You can read more here](https://ajithraghavan.github.io/blog/cnn-intro/)

But briefly, it performs Convolution Operation : A Filter (or Kernel) that slides across an Input Data(mostly Image), Computing 
Element Wise Multiplications and Summing the results at each position to produce an output called a Feature Map

#### We have the solution here

Both Attention and Convolution compute weighted combinations of input values, but Convolution is restricted to a small local window, while Attention can relate any positions regardless of distance

Similar to Attention Mechanism(where Attention dynamically Computes Relationships between positions, often globally),  and Convolution Operation extracts Features from Local Spatial Regions (a small fixed window) to address our use case


### Best Architecture?

There are many Architectures and Design Choices but let us stick with it as of now

Any of those which one is the best Architecture, that's the billion dollar question, right?

Let the Evaluation Speak

## Evaluation 📈

Training using Google Colab

Note : These Accuracy are not too high, I am just tweaking Hyperparameter like Regularization, Architectural Design etc., with limited Compute Resource, just sharing the current progress here

### Vanilla LSTM

Current Total Parameters : 1,411,890

```
Train Loss: 0.1314 | Val Loss: 1.4453 | Val Acc: 53.41% | Val CER: 15.67% | LR: 0.000500
```

Test Exact Match Accuracy: 51.57%
Test Character Error Rate: 16.36%

#### Good
- The Model is actually Learning
- Some demo outputs are correct

#### Bad
- Overfitting
- Some Errors in demo

#### Fixes(but not limited to)
- Regularization
- Model Architecture Improvement


### BiGRU with Attention Mechanism

Current Total Parameters : 12,580,914

```
Train Loss: 0.1460 | Val Loss: 1.3492 | Val Acc: 54.74% | Val CER: 15.50% | LR: 0.000500
```

Test Exact Match Accuracy: 50.60%
Test Character Error Rate: 16.44%

#### Good
- The Model is actually Learning
- Some demo outputs are correct

#### Bad
- Overfitting
- Some Errors in demo

#### Fixes(but not limited to)
- Regularization
- Model Architecture Improvement
- Residual Connection

### CNN-LSTM Architecture

Current Total Parameters : 767,666

```
Train Loss : 0.0903 | Val Loss: 0.9868 | Val Acc : 53.13% | Val CER : 15.77% | LR : 0.000125
```

Test Exact Match Accuracy : 50.55%
Test Character Error Rate : 15.81%

#### Good
- Total Parameters size is low comparatively
- The Model is actually Learning
- Some demo outputs are correct

#### Bad
- Overfitting
- Some Errors in demo

#### Fixes(but not limited to)
- Regularization
- Model Architecture Improvement
- Residual Connection


## 🏆 Billion Dollar Question : Which Architecture is the Winner?

All three Models perform remarkably similarly on test metrics (~50-51% accuracy, ~15.8-16.4% CER)

But the winner is.....

.
.
.
.
.
.
.
.
.

### CNN-LSTM Architecture wins 🎉 🥳 

### Why CNN-LSTM wins : 

First CNN does Parameter Sharing

- Best generalization : Lowest val loss (0.9868) by a significant margin compared to the other two (~1.35–1.45)
- Best test CER (15.81%)
- Smallest Model : Only 767K parameters, roughly 16x smaller than BiGRU+Attention and 2x smaller than Vanilla LSTM.  This means faster Inference, easier Deployment
- Best efficiency : Achieving comparable (or better) results with far Fewer Parameters is a strong signal that the Architecture suits this task well and CNNs are good at capturing local character-level **n-gram patterns**, which is exactly what transliteration needs

Note : In all Three Architectures, we can do fixes to improve all Three Models, may be even with Hyperparameter tuning other Architecture might win but here sharing the current status


Also, CNN-LSTM is not new it's already applied in other various fields and domain, like
- OCR : Optical Character Recognition
- The CNN-LSTM Attention-based Seq2Seq model has been shown to be effective for OCR
- Many other Domains and Fields 

Because we need to Experiment and Find

Repository : [https://github.com/ajithraghavan/VisAI](https://github.com/ajithraghavan/VisAI)

Please feel free to Clone, Use and Train on your own Dataset for exploration

Thanks for reading!






