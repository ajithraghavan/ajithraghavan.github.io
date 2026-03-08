---
layout: post
title: "Note on `autoresearch`"
date: 2026-03-08
author: "Ajith Raghavan"
description: "A note on `autoresearch` by Andrej Karpathy"
tags: ["AI", "ML", "autoresearch"]
cover_image: false
subtitle: ""
---

# What is autoresearch?

`[autoresearch](https://github.com/karpathy/autoresearch)` lets AI Agents autonomously conduct Machine Learning Research overnight on a single GPU

Note : It is a playful but serious exploration of where AI Assisted Research might be heading

# The Core Idea

Instead of a manually tweaking `Hyperparameters` and `Code`, you give an AI Agent (like Claude or Codex) control of a small but real LLM Training setup

The Agent then :
- Modifies the Training Code (train.py)
- Runs a 5-minute Training Experiment(Interesting)
- Checks if the Validation Loss Improved
- Keeps or discards the change
- Repeats Autonomously


So, it is essentially turning "what Hyperparameters/Architectures should I try?"

# Requirements

- Single NVIDIA GPU (has been tested on H100, but others should work)
- Python 3.10+
- uv package manager


# Setup Steps

### 1. Clone the repo
```
git clone https://github.com/karpathy/autoresearch
cd autoresearch
```

### 2. Install uv (if you don't have it)
```
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 3. Install dependencies
```
uv sync
```

### 4. Download Data and Train Tokenizer (one-time, ~2 min)
```
uv run prepare.py
```

### 5. Test with a manual training Run (~5 min)
```
uv run train.py
```






Thanks for Reading!






