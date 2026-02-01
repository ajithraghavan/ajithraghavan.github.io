---
layout: post
title: "My Take on OpenClaw"
date: 2026-01-30
author: "Ajith Raghavan"
description: "OpenClaw"
tags: ["OpenClaw", "ClawdBot", "MoltBot", "Agent"]
cover_image: false
subtitle: ""
---

# 🦞 OpenClaw

In One Line: OpenClaw is a very good Agentic System Design

OpenClaw is the AI Agent Software that runs on your own device. It can perform various things in your Computer that you would do, if the necessary Tools are provided.

Basically you can imagine like J.A.R.V.I.S. from Iron Man Movie

First let me give the basic explanation of OpenClaw and will explain how I set it up

## 🏗️ OpenClaw Basic Architecture

#### Gateway
Is the Component that connects to the various Interfaces like Telegram, WhatsApp, Discord etc.

#### Agent Runtime
- It is powered by LLM Providers.
- Uses a workspace directory (~/.openclaw/workspace) containing personality and instruction files.
- Bootstrap files injected into context: AGENTS.md (instructions), SOUL.md (persona), TOOLS.md (tool guidance), IDENTITY.md (name/vibe)

#### Sessions
- Each conversation gets its own session with isolated context
- Group chats get separate sessions

#### Nodes
- Devices (macOS, iOS, Android) can connect as nodes to expose device-specific capabilities like Camera, Location etc.

## 📨 Message Flow
- An Inbound message arrives on a Channel (like Telegram, WhatsApp, etc.)
- Gateway receives it and routes to the appropriate session
- The Agent Runtime processes the message with full context
- Agent may use Tools (Execute Code, Browse Web, Take Screenshots, etc.)
- Response streams back through the Gateway
- Gateway delivers the reply to the original Channel

## ⚙️ How I Set Up?

#### On VPS and OpenClaw Setup
- Since it is highly autonomous, first step I have to do is run it in an isolated environment so I decided to purchase the VPS from Hostinger (but it's purely your preference)
- After getting VPS from Hostinger, I installed OpenClaw via `curl -fsSL https://openclaw.ai/install.sh | bash`

#### Using LLM
I always say like Agent is like the body and LLM is the Brain.

For example, Body (Agent) uses Eyes (Image) to See and Brain (LLM) decides which Action (Tool) to Perform (Invoke)

In that case for OpenClaw, which is a very good Agentic System Design, needs an LLM so, we need to choose that

In My Case I decided to use Gemini 2.5 Flash Lite Model (but again it's purely your preference)

So, we need to get Key from Google AI Studio

#### Back to OpenClaw Setup
When Installing OpenClaw, it will `Onboard`, for that we need to give,
- LLM of Choice
- API Key
- Skills
- Interface

##### Interface
Here is the thing, we need to use some Interface to interact with OpenClaw right, for that we can choose Telegram, WhatsApp, Discord etc.

In My Case I decided to use Telegram

#### Telegram Bot Creation
- We need to use "BotFather" to create a Bot in Telegram
- After that we need to Copy that API Key from BotFather and give it to OpenClaw Onboarding process

#### Again Back to OpenClaw Setup
We need to provide the API key of Bot to OpenClaw (we might also need to pair)

#### Open Gateway
We need to open the Gateway to start the communication

After the Gateway is started we can open our Bot in Telegram and start chatting

This message goes to OpenClaw and OpenClaw processes (using above mentioned stages) and replies back

## 💭 My Take
So, I see it as highly superb Agentic System Design, that can achieve anything with provided Skills and does task Intelligently

Simply it's like J.A.R.V.I.S.

Hope it is going to evolve more and we expect more other Architectures in various ways!

Thanks for reading!






