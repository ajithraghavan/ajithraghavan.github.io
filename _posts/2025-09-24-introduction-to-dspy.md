---
layout: post
title: "Introduction to DSPy with Ollama"
date: 2025-09-24
author: "Ajith Raghavan"
description: "NST Basics"
tags: ["🧑‍💻 DSPy", "AI Agent", "AI Application"]
cover_image: true
subtitle: ""
---

# Introduction to DSPy with Ollama

 ## 🤔 What is DSPy?

DSPy is a Declarative Framework for building modular AI Software that allows to focus on Core Logic or Business Logic rather than much on Prompting

DSPy stands for "Declarative Self-improving Python" and was developed by Stanford NLP

Because, for building AI Agent we need to spend much time on Prompting and refining Prompting and so on

DSPy allows one to focus on building Application rather that focusing much on Prompting and DSPy takes care of it 😉
But why DSPy?

There are many Frameworks available like LangChain, AutoGen where each have unique features, and rely on manual Prompt Engineering but DSPy automatically optimizes LLM Prompts and allows one to iterate fast on Application
Core Components of DSPy :

### Signatures

It is the declarative specification of input and output behavior.  So it tell the LLM what need to do rather than how to do

### Modules

It is the building block of DSPy

There are many built in modules like,

    - dspy.Predict

    - dspy.ChainOfThought

    - dspy.ProgramOfThought

    - dspy.ReAct

    - dspy.MultiChainComparison

Each built in module abstracts the prompting technique

### Adapters

It is the bridge between Module and LLM and is responsible,

    - Translating Signatures into System Prompt

    - Formatting Input

    - Parsing output

    - much more

### Tools

As like in other Frameworks it is used to call external Tools for Agents that interact with environment

OK, now let's look examples

## Examples

Let us see example with Ollama
What is Ollama?

Ollama is a free, Open Source tool that allows you to run LLMs like Llama and Codestral directly on your own Computer

Example 1 :

Simple Example

```
import dspy

def setup_ollama():

    print("Connecting to Ollama")
    
    try:
        lm = dspy.LM(
            model="ollama/llama3.1:8b",  # Use your installed Model
            api_base="http://localhost:11434",
            model_type="chat",
            max_tokens=500,
            temperature=0.7
        )
        print("Connected to Ollama")
        return lm
    except Exception as e:
        print(f"Failed to connect: {e}")


lm = setup_ollama()
dspy.settings.configure(lm = lm)
classify = dspy.Predict('question -> answer')

question = "What is the capital of France?"
print(classify(question=question).answer)

# Output :
#Connecting to Ollama
#Connected to Ollama
# Paris
```

Example 2 : Tool Call with ReAct

```
import dspy
from datetime import datetime

def setup_ollama():

    print("Connecting to Ollama")
    
    try:
        lm = dspy.LM(
            model="ollama/llama3.1:8b",  # Use your installed model
            api_base="http://localhost:11434",
            model_type="chat",
            max_tokens=500,
            temperature=0.7
        )
        print("Connected to Ollama")
        return lm
    except Exception as e:
        print(f"Failed to connect: {e}")


def get_current_date() -> str:
    """Get the current date"""
    return datetime.now().strftime("%Y-%m-%d")

def count_letters(word: str, character: str) -> str:
    """Count occurrences of a character in a word"""

    count = word.count(character)
    return f"Count of '{character}' in '{word}': {count}"


lm = setup_ollama()
dspy.settings.configure(lm = lm)

react_agent = dspy.ReAct(
    signature="question -> answer",
    tools=[get_current_date, count_letters],
    max_iters=5
)


result = react_agent(question="how many 'r' in 'strawberry' ?")
print(result.answer)

#Output :
#Connecting to Ollama
#Connected to Ollama
#3
```

Very nice

We can discuss more!


Thanks for reading!



