---
layout: post
title: "Evaluation on Agentic AI Applications"
date: 2025-11-11
author: "Ajith Raghavan"
description: "Post about Evaluation on Agentic AI Applications"
tags: ["🧑‍💻 Tech", "Agentic AI", "Evaluations"]
cover_image: true
---

## 🤖 Introduction
We build an AI Agentic System to solve the specific usecase

These "Agentic" Systems don't just answer questions, they perform tasks. They can plan multi step Actions, use Tools like APIs and Web Browsers, and interact with digital Environments to achieve complex goals, all with some degree of Autonomy

But equally we have to spend time on Evaluating the AI Agentic Application because doing Evaluations will enhance our Agentic System more reliable

## 📊 Evaluations
Evaluations are the Systematic Process of assessing an AI Agent's Performance, Reliability and Safety

## 🔍 Types of Evals
### End to End Evals
We Evaluate the Agent from User Input to Agent's Output
### Components Level Evals
Generally, Agent will have Multiple Components like Web Search Tool, Summarizer, etc, 
So, Here we will Evaluate each Component, how will it perform?

## ⚙️ How to perform Evaluations
### Write Program to assess
For example, in a specific Components we want our LLM to parse the Date from the text in specific format say `DD/MM/YYYY`, but say LLM failed to parse like above format

In that case we write Program to do Validation and count, how often the LLM is making this Mistake

### Use LLM as Judge
In specific case we cannot do Evaluation 

For example, if we asked our LLM to write essay about particular topic but it missed some core points about the topic

Then in that case we ask LLM to check for mistake, that's how we use LLM as judge

> To be noted there will be 4 types from here

## 🔬 Apply Error Analysis
Let us consider an example to proceed further, let say we see the Research Agent

Here are the Typical Tools needed,
Tools : 
1. Web Search 
2. Web Fetch 
3. PDF to Text

So the Workflow will be like,

```
User Query -> LLM which decides to use Web Search -> Response from Web Search -> LLM Fetch best 5 source using Web Fetch Tool -> LLM write the essay -> Response to User
```

In this Workflow, any component might go wrong.  How do we evaluate?

Here is a way!

In our Research Agent we need to come up with DataSet to Evaluate the Agent

> Which is similar to Validation of Machine Learning Model using Validation Set

#### Look at traces
We can find potential error by looking at traces of each steps

#### Counting the errors
So, with the Evaluation DataSet may like 20 we set up Table like,

| Prompt | Web Search | Web Fetch | Response |
| --- | --- | --- | --- |
| Agentic AI |   | May be wrong resource |   |
| Secure Agent |   |   | LLM summarize error |
| ... | ... | ... | ... |
| Agent Workflow |   | May be wrong pages |   |

From this Table we count up, how much number of error count up to maximum number of error out of 20

Which gives us statistical way to Evaluate and find which Components need improvement

### Component Level Evals
In Component Level Evals instead of checking the full end to end Workflow of Agentic AI, we Evaluate how specific Component Performs

#### Why?
Because, if we do a change in the Component and try to check as full Workflow then we might not get that much noticeable improvement also due to randomness in other Components it is hard to check whether the improvement in Component, actually improved Performance

#### How?
Let's consider an example Web Search Component, we take the handful of search query and check whether the expected result are returned by using Program may to use F1 Score or LLM as Judge

If needed we can tune Hyperparameter of Web Search Tool and proceed and fix the Component

And later with that we can check Full Workflow

### Latency and Cost
#### Latency
We need to measure the Each Components' Runtime and overall Run Time and we can check whether the Component can be made fast like for example, some LLM provider will do Inference fast or some API etc., like that we can try

#### Cost
Cost differs by, 
1. LLM will cost to Tokens
2. API Tools will cost per call
etc.,

Like that we can Evaluate and fix the Latency and Cost

Note : Always have as much Evals set as possible and initially we can do manually and later we build Eval System as discussed above and we can proceed
And these are overall but the topic is very Deep and there are more topics Evaluations

Thanks for reading







