---
layout: post
title: "🎶 AllegroAgent 🚀"
date: 2026-04-14
author: "Ajith Raghavan"
description: "A Lightweight Python Framework for Building Stateful AI Agents 🚀"
tags: ["AI", "AI Agent", "AllegroAgent", "Agentic AI Framework", "Fast Agent"]
cover_image: false
subtitle: ""
---


# AllegroAgent : A Lightweight Python Framework for Building Stateful AI Agents 🚀

## 🎶 Introduction

Imagine the AI Agentic Framework that keeps things simple, and still gave you eveything you need to Build Stateful, Tool Calling AI Agent

That is exactly why I built **🎶 AllegroAgent**, a light weight, extensible Python Framework for Building Stateful AI Agents backed by Local or Remote LLMs

It is Open Source on GitHub and available on PyPI, ready for you to Install and start Building with

## About AllegroAgent 🎶

**AllegroAgent** is available in [github.com/ajithraghavan/AllegroAgent](https://github.com/ajithraghavan/AllegroAgent) and also published on [PyPI as `allegro-agent`](https://pypi.org/project/allegro-agent/)

So, you could easily start simply like, 

```bash
pip install allegro-agent
```

At its core, the `AllegroAgent` has single public entry point : the `Agent` Class

You could Configure with a `Model` and necessary `Parameters` and `Tools` and `AllegroAgent` take care of rest like, handling Conversation History, Provider Routing, Tool Calling Loop for you

The Architecture is deliberately flat and easy to Navigate. No nested layers of Abstraction

Just clean Python Code you can Read and Extend ⚡️

## 🤔 Why AllegroAgent? 

There are plenty of Agent Frameworks out there and why need another one?

Here are the reasons that drove this project :

**1. Zero Heavy Dependencies**
- AllegroAgent requires only `requests` 
- No massive Dependencies

You get a Framework that is lean and Fast to set up

**2. Simplicity First**
- The public API is one Class : `Agent`
- You configure it, call `run()`, and it Works
- There is no configuration patterns before you can Build your first Agent ⚡️s

**3. Pluggable Providers**
- Want to add a new LLM backend which is Provider? Just implement a single `generate()` method by sub Classing `BaseProvider` and register it
- Ollama ships in the box, but adding support for OpenAI, Anthropic, or any other Provider is straightforward

**4. JSON Schema Tools**
- Tools follow a clean Pattern
- Sub Class `BaseTool`, declare your Parameters using standard JSON Schema, implement `execute()`, and you are good 
- The Agent Automatically exposes your Tools to any "Function Calling Capable" Model

**5. Typed Errors**
- The framework provides a small but effective hierarchy of exceptions : `FrameworkError`, `ProviderError`, `ProviderNotFoundError`, `InvalidModelFormatError`, and `ToolError`
- This makes Debugging and Error handling clean and predictable

**6. Stateful by Design**
- `Agent.run()` manages Conversation History across calls
- Your Agent remembers the Context from previous turns, so you can have multi turn interactions naturally
- Call `reset()` when you want to start fresh

## ⚙️ How It Works 

The flow inside `AllegroAgent` is elegant in its simplicity:

```
┌─────────────────────────────────────────────┐
│  Agent            (Public, Stateful Loop)   │
├─────────────────────────────────────────────┤
│  Providers        (Ollama, ...)             │
└─────────────────────────────────────────────┘
```

When you call `agent.run("your prompt here")`, the following happens :

1. The Agent sends your Prompt along with the Tool Schemas(if provided) to the LLM via the Configured Provider
2. If the LLM returns `tool_calls`, the Agent Executes each Tool and feeds the results back to the LLM
3. Steps 1 and 2 repeat in a Loop until the LLM returns a plain text answer, or until the maximum of 10 Tool Rounds is reached

The `Agent` communicates with Providers through a small internal router (`_Client`) that parses the `provider:model` string and caches Provider instances

You never need to interact with this Layer directly, all handled by `Agent`

## 💻 Sample Implementation 

Getting started with `AllegroAgent` is very straight forward

### Installation

You can install it directly from PyPI :

```bash
pip install allegro-agent
```

Or Clone and Install in Development Mode:

```bash
git clone https://github.com/ajithraghavan/AllegroAgent.git
cd AllegroAgent
pip install -e .
```

For the default Ollama Provider, make sure Ollama is running locally :

```bash
ollama serve
ollama pull llama3
```

### Building Your First Agent

```python
from allegro_agent import Agent, FileReadTool, FileWriteTool

agent = Agent(
    name="Writer",
    model="ollama:llama3",
    temperature=0.1,
    system_prompt="You are a helpful writing assistant.",
    tools=[FileReadTool(), FileWriteTool()],
)

print(agent.run("Write a haiku about the ocean to ocean.txt"))
print(agent.run("Now write one about mountains to mountains.txt"))
agent.reset()  # clear history
```

That is it. No boilerplate, no Configuration Files. Just create an Agent, give it a Model and some Tools, and call `run()`

### Adding a Custom Tool

Creating your own Tool is just as clean :

```python
from allegro_agent import BaseTool

class AddTool(BaseTool):
    name = "add"
    description = "Add two integers."
    parameters = {
        "type": "object",
        "properties": {
            "a": {"type": "integer"},
            "b": {"type": "integer"},
        },
        "required": ["a", "b"],
    }

    def execute(self, **kwargs) -> str:
        return str(kwargs["a"] + kwargs["b"])
```

### Adding a Custom Provider

Want to bring your own LLM backend or Provider? Here is how :

```python
from allegro_agent.providers.base import BaseProvider, ProviderResponse
from allegro_agent import register_provider

class OpenAIProvider(BaseProvider):
    def generate(self, messages, **kwargs) -> ProviderResponse:
        # call the API, translate the response
        return ProviderResponse(
            content="...",
            model=kwargs["model"],
            provider="openai",
            tool_calls=None,
        )

register_provider("openai", OpenAIProvider)
# now usable as model="openai:gpt-4"
```

### Configuration Options

The `Agent` class accepts the following keyword Arguments :

| Argument | Type | Description |
|---|---|---|
| `model` | `str` | **Required.** Format : `provider:model` |
| `name` | `str` | Display Name (default `"Agent"`) |
| `temperature` | `float` | Sampling Temperature |
| `max_tokens` | `int` | Max Response Tokens |
| `system_prompt` | `str` | System Instruction prepended to every Call |
| `tools` | `list[BaseTool]` | Tools the Agent may invoke |

## 🔮 What is Next? 

AllegroAgent is at version 0.2.0, and there is a lot of room to grow

I am exploring include adding more built-in Providers (OpenRouter, OpenAI, Anthropic, etc.), Streaming Support, Async Execution, and Richer Tool patterns

The Framework is designed to be Extended 🧩, so Contributions and Ideas are welcome

If you are looking for a Framework that respects your time, keeps things simple, and lets you focus on Building Agents, give `AllegroAgent` a try

**GitHub:** [github.com/ajithraghavan/AllegroAgent](https://github.com/ajithraghavan/AllegroAgent)
**PyPI:** [pypi.org/project/allegro-agent](https://pypi.org/project/allegro-agent/)

```bash
pip install allegro-agent
```

Happy Building! 🎉


Thanks for Reading!






