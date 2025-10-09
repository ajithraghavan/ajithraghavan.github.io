---
layout: post
title: "Hierarchical Reasoning Model and Tiny Recursive Model"
date: 2025-10-09
author: "Ajith Raghavan"
description: "Blog on HRM and TRM"
tags: ["Reasoning Models", "HRM", "TRM", "Hierarchical Reasoning Model", "Tiny Recursive Model"]
cover_image: false
subtitle: ""
---

# A Brief Introduction
All About reasoning

## 🦾 The ARC-AGI Challenge

First let us understand the what is **ARC-AGI Challenge**

ARC(Abstraction and Reasoning Corpus) Created by Francois Chollet ( Familiar name?  Yes he is the Author of [Deep Learning with Python](https://share.google/JHZJTiSCVzf5VWRMK) )

So ARC-AGI presents Geometric Puzzels that is easy for Humans but hard for AI to solve

It contains 2 to 3 Input Output Demo, where AI is seeing it as an example and try to apply to new test case

So, achieving human-level performance on ARC-AGI is hard, making it one of the most important unsolved problems in AGI

It even carries Monetary Prizes 💵


## 🧩 The Reasoning Challenge

So, LLMs use Chain of Though, where Models "think out loud" through reasoning steps, still remain hard to solve ARC-AGI Challenge

## 🧠 Hierarchical Reasoning Model (HRM) : The Brain Inspired Approach

On 4th August 2025, Sapient Intelligence introduced the HRM, which they claimed different approach which is inspired by how the Human Brain Processes Information and build a new Architecture

![HRM Brain](/assets/images/hrm-and-trm/hrm-brain.png)

So, they came up with NeuroScience like the Brain process Information Hierarchically across **different timescales**

Like, some regions handle **RAPID** detailed Computations and other perform **SLOWER** abstract reasoning

HRM mimics this with two Interconnected Recurrent Networks

![HRM Brain](/assets/images/hrm-and-trm/hrm-architecture.png)

#### Low Level Module (fL​)
Which process frequently and handling detailed Computations, having **Hidden State : zL**

#### High Level Module (fH)
Which process slowly and managing Abstract Planning, having **Hidden State : zH**

**So one full step in HRM is one Supervision Step**

### 🔍 Deep Supervision
HRM uses Deep Supervision, like rather than making a single prediction, it iteratively refines its answer across upto 16 **Supervision Steps**, using previous attemps to improve the next one

### ✅ Adaptive Computational Time (ACT)
Before moving to the next Mini Batch each Mini Batch should must use 16 Supervision Steps, which is expensive

So there should be balance between like for some data samples there should be more Supervision Steps and for some other data samples there might be few Supervision Steps

For this there is a need to have some Halting Mechanism to determine whether the Model should terminate early

#### Q Learning Objective
So, here it requires doing additional Forward Pass to determine to halt now or later is preferable

They call this as Adaptive Computational Time (ACT) and they do it on Training only and during Testing they use full `Nsup = 16` Steps to to Maximize the Performance

!Note : In paper `Nsup = 16` 

**May be let us see the Hierarchical Reasoning Model in in detail in another post**

### 1 Step Gradient Approximation instead of Backpropagation Through Time (BPTT)

So, HRM will use Backpropagation to last two Function Evaluations like final `fL` and `fH` and doesn't do BPTT

### HRM Results

![HRM Brain](/assets/images/hrm-and-trm/hrm-results.png)

Although there are more debate and discussion over HRM and [ARC-AGI itself tested HRM](https://arcprize.org/blog/hrm-analysis)

## ✨ Tiny Recursive Model : Less is More

Released 6th October 2025 by Samsung

They have release the Paper to attack the HRM and they should have named Paper Title : **Why Two instead of One?** 😂 (JFF)

### TRM Architecture

![HRM Brain](/assets/images/hrm-and-trm/trm-architecture.png)

Nostalgia on Transformers 😍

### About Tiny Recursive Model

While HRM was groundbreaking on ARC-AGI Benchmarks Authors of TRM, thought to not complicate for this task and they build TRM and guess what result were improved with TRM against HRM

And Authors of TRM asked why relate this to Biological argument and why two Latent Features of Hierarchies from Argument of Biology?

And they propose a Single Tiny Network replacing HRM's two Networks with thinking like, "Iterating on Reasoning"


### Simpler Interpretation

TRM do not use Biological Hierarchies like HRM do for more Intuitive

Simply,
```
x : The Input Question
y : The Current Proposed Solution
z : Latent Reasoning Feature
```

So, the Model Recursively Improve `z` given `x`, `y` and `previous z` and updates `y` : **the solution** based on `improved z`

### Backpropagation Through Time (BPTT)
TRM use **Full Backpropagation Through Time** rather than 1 Step Gradient Approximation in HRM

## 📝 Notable Points

- Tiny Recursive Model use Multilayer Perceptron for the task and they too say like different Architecture works for different problems like TRM with **Self Attention**
- And, TRM does not use additional Forward Pass needed with **ACT**

## 🥊 Overall Differences Between HRM and TRM
|Feature          |HRM                                  |TRM                              |
|-----------------|-------------------------------------|---------------------------------|
|Architecture     |Two separate networks (fL and fH)    |Global Attention                 |
|Parameters       |27M                                  |7M (with Attention) / 5M (MLP)   |
etc.,

## 📚 References

### Research Papers
[1] Wang, G., et al. (2025) https://arxiv.org/pdf/2506.21734
[2] Jolicoeur-Martineau, A (2025) https://arxiv.org/pdf/2510.04871

###Code Repositories

HRM Official Implementation : https://github.com/sapientinc/HRM
ARC-AGI Challenge  https://github.com/fchollet/ARC-AGI


Thanks for reading!




