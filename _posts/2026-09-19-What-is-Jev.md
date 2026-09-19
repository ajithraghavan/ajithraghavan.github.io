---
layout: post
title: "Jev : an AI model very different from ChatGPT"
date: 2026-09-19
author: "Ajith Raghavan"
description: "The AI Model That Answers in Values, Not Sentences 🎯"
tags: ["AI", "TypeSafe", "Jev", "System One", "Structured Outputs", "AI-Powered Software"]
cover_image: false
subtitle: ""
---


# Jev : an AI model very different from ChatGPT

## Quick Introduction

Ask a LLM to sort a support ticket and you'll get something like this back: "Certainly! Based on the customer's message, this appears to be a **billing** issue, specifically a duplicate charge..."

That's a fine answer for a person

For a Program, it's different. We now have to wrap the whole thing in a schema, add a retry for when the JSON comes back malformed, and write a fallback for when it invents a category we never defined

The translation overhead, paid on every request, because the Model was built to produce text a human will read

TypeSafe's argument is that this mismatch is a design problem, not a prompting problem, and that the fix is a different kind of Model

(Any way but Fine Tuning will help to some LLMs too)

## Meet Jev

Jev is TypeSafe's Flagship Model, and the first of what they call **System One** Models: models built to make fast, structured decisions that Software consumes directly

(💭 System One?  Did they inspired from Thinking, Fast and Slow by Daniel Kahneman?  Where System 1 is the fast, intuitive read, System 2 is slow deliberation)

It's been said like it's built for the kind of judgment a knowledgeable person makes in the right context in front of them

The Interface is two things:

- **State** : the content you want be evaluated
- **Questions** : Typed judgments you want made about that content

What comes back isn't a reply. It's Typed Values and Probability Distributions : a selected option, a `score` along Levels you defined, a Probability between 0 and 1

So, Nothing to Parse, nothing to coerce, no key missing

Jev understands Natural Language Input the way an LLM does but it just doesn't answer in natural language

Today it's Text only : Strings, JSON Objects, Arrays of text 

Images, Audio and Video not yet supported yet

You reach it through a client SDK (Python and JavaScript) or `POST /v1/systemone`, with `jev-latest` as the default Model

## How Jev differs from an LLM

The obvious difference is the output shape. The more interesting ones are underneath it.

**Every answer is constrained to what we defined** : The Model returns a Distribution over your options

**Probabilities are calibrated** : Jev is Trained so that its stated Probabilities track real outcomes across many predictions 

**Questions are independent and parallel** : Every question in a request sees the same `State` and is evaluated in isolation. One answer never becomes hidden context that nudges another. Adding questions barely moves latency and costs

**It's fast** : Most queries finish in around 100 ms(as per [Docs](https://docs.typesafe.ai/concepts/how-to-build-with-system-one))

**It tells you when it isn't sure** : Choice and Score answers carry a `confidence` value derived from the Probability Distribution, so our Code can Branch on certainty and not just on the answer

Provided all Jev doesn't write replies, generate Code, or explain its Reasoning. It's a narrow instrument. If you want an explanation of a decision, that's still an LLM's job

## AI Powered Software

TypeSafe describes three ways to build software with AI

The difference between them is the clearest idea in their docs

**Traditional software** : The Code is a tree of small decisions, each piece does exactly one thing, and it does it the same way every time. Because the pieces are predictable, you can stack them into bigger Systems and trust the result

**Agents** : Here the Model is in charge, it reads your instructions, decides what to do next, does it, then decides again. This is useful when someone is watching it work. But every Loop is one more chance for it to drift off the course

**AI Powered Software** : This sits in the middle, and it's what Jev is built for, the Code stays in charge

Code handles the rules, the order of operations, and anything that writes to a Database or sends an email or any operation

The Model is called only at the points where the System needs judgment : reading a message, weighing a tone, making sense of something messy. Each of those calls is small, specific, and fenced in

Think of it as calling the Model for one narrow job instead of handing it the whole project(where some times necessary)

TypeSafe AI this  **Machine Native Intelligence** : AI that behaves like Software. Structured. Reliable. Testable. Fast. Consistent. Cheap.

Their own one line version of the strategy is `"Building prod, not God"`

## What it looks like

I got early access and using thought Python SDK

Here's a real Call against a support ticket : the kind with four things going on at once :

```python
from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

client = TypeSafeClient()

ticket = "Hi, I see two charges of ₹2,499 on Oct 3 for the same subscription. I already emailed on Oct 5 and got an auto-reply, nothing since. This is the second time this has happened. I want the duplicate refunded and honestly I'm thinking of cancelling at this point."

response = client.system_one(
    state=ticket,
    questions={
        "intent": Choice(
            instructions="What is the customer primarily asking for",
            criteria={
                "refund": "Wants money returned",
                "technical_help": "Needs something fixed or explained",
                "cancellation": "Wants to close or downgrade the account",
                "feedback": "Sharing an opinion, no action needed"
            }
        ),
        "frustration": Score(
            instructions="How frustrated does the customer sound",
            criteria=[
                "Calm, just stating facts",
                "Mildly annoyed",
                "Clearly frustrated",
                "Angry, threatening to leave or escalate"
            ]
        ),
        "is_repeat_issue": {
            "type": "noul",
            "instructions": "The customer says this problem has happened to them before"
        },
        "awaiting_reply": {
            "type": "noul",
            "instructions": "The customer contacted support earlier and has not received a human response"
        },
        "is_urgent": Noul(
            instructions="The message conveys urgency or time-sensitivity",
        ),
    },
)

print(response.answers["intent"].choice)
print(response.answers["frustration"].score)
print(response.answers["is_repeat_issue"].noul)
print(response.answers["awaiting_reply"].noul)
print(response.answers["is_urgent"].noul)


Output : 
------------
refund
2.67
0.97
0.96
0.8

```

Five judgments, one round trip

We can mix the typed helper Objects (`Choice`, `Score`, `Noul`) with plain Dictionaries

The response gives us `choice` as a string, `score` as a Float that can land between our levels, `noul` as a probability, plus `probabilities` and `confidence` on the Choice and Score answers


## State : The Material

**State** is whatever we want to be evaluated. One request evaluates one state against as many questions as we like

The simplest `state` is a String, as above. It can also be a JSON object or an array : a conversation plus the relevant order plus the refund policy, all as one `state`, because the judgment needs to compare those pieces

A useful way to think about it : `state` is the packet of material we would hand a panel of experts before asking them anything


## The three primitives

TypeSafe exposes three question Types

They are deliberately described as *primitives*, in the same similar to Software Primitives

| Type | Answers | Returns |
|---|---|---|
| **Choice** | Which of these options? | `choice`, `probabilities`, `confidence` |
| **Score** | Which level? | `score`, `legend`, `probabilities`, `confidence` |
| **Noul** | Is this true? | `noul` (0–1) |

**Choice** : Fits an unordered Set : route to billing, technical or sales; detect a document type

**Score** : Fits a spectrum we can describe level by level, we write the levels, the Model returns a position along them

**Noul** : Fits a clean Yes or No where the Probability itself is the signal, it returns a single number : near 1 is a strong Yes, near 0 a strong No, near 0.5 the Model sees Yes and No as about equally likely


## Under the hood : a Post Training path

The last piece is why a Model behaves this way at all, and TypeSafe's answer is a Training Objective

Pre Trained Models have mainly been adapted two ways

**RLHF** (Reinforcement Learning from Human Feedback) : Turned them into Chat Bots by optimizing for responses People prefer, it's the path behind InstructGPT and ChatGPT, and TypeSafe co founder Diogo Almeida was a co inventor!

**RLVR** (Verifiable Rewards) : produced Reasoning Models that are strong at things like Mathematics, at the cost of Speed and Money

TypeSafe adds a third : **RLCD**, Reinforcement Learning for Calibrated Decisions, the Output contract changes
The Model doesn't Generate text, it returns Decisions and Probabilities, and Higher Probability is Trained to mean a greater chance of being right

The complaint about RLHF is narrow, and it's worth following

Optimizing for what people prefer Rewards Answers that *sound* good, which is also how you get sycophancy and confident sounding _Hallucinations_

It also causes **Mode Dropping** : the Model concentrates on a favored style and suppresses other Plausible outputs

That narrowing is a milder cousin of Mode Collapse in GANs, where a **Generator** keeps producing the same output because it keeps fooling the **Discriminator**

For a Chat Product, a compelling answer is the goal, for unattended automation, compelling and trustworthy are different targets

Calibration is what makes the difference usable. If the 0.2s come true about a fifth of the time, uncertainty becomes something Code can act on : a threshold, an escalation, a second opinion from a more expensive Model


## Where this leaves us?

Jev isn't trying to replace the Model we already use. It's aimed at the layer underneath the chat : the hundreds of small judgments a System makes per request that currently get answered in prose and then scraped back into Variables

If we are already writing Regex against a Model's Output, or maintaining a retry loop for malformed JSON, or discovering that adding one more instruction to a prompt quietly changed an unrelated classification : that's the seam this is Built for

There are some other things also, but let us keep it for another post


Happy Building! 🎉


Thanks for Reading!






