---
layout: post
title: "📝 Instructions.md vs SKILL.md vs Agent.md vs AGENTS.md"
date: 2026-03-17
author: "Ajith Raghavan"
description: "The Essential Guide to AI Agent Configuration Files"
tags: ["AI", "Claude Code", "Cursor", "Codex", "GitHub Copilot"]
cover_image: false
subtitle: ""
---


# 👋 Introduction

AI Coding Agents now need their own Documentation. Not READMEs for Humans, but Configuration Files that tells LLMs how to work with your Code

Four (✌️✌️) key files have emerged in this space, each solving a different problem

This blog breaks down what each file does, why it matters, and which one you should use



## 🔍 What Are These Files?

All Four Files share one Objective : giving AI Agents the Context and Instructions they need to work effectively. But each one approaches this from a different angle ( 📐 )



## 1. 📋 Instructions.md / CLAUDE.md / .cursorrules

### 🎯 What :

A project level Markdown file providing persistent Instructions to an AI Agent

* In Claude Code, this is called **CLAUDE.md**
* In Cursor this is called **.cursorrules**
* Other tools use **Instructions.md** or equivalent names.

### ❓ Why : 

AI Agents start every session with zero memory

They don't remember your : 
* Code Style
* Build Commands
* Or Project Style
* etc.,

Without a persistent Instruction file, you repeat yourself again and again

CLAUDE.md fixes this by loading your preferences into Context automatically

### ⚙️ How : 

Claude Code reads the CLAUDE.md file from your Project root at launch

The contents become part of the System Prompt, available throughout the session

It follows :

- ➡️ project `CLAUDE.md` 
- ➡️ global `~/.claude/CLAUDE.md`

Subdirectory CLAUDE.md files load on demand when Claude works in those Directories

You can generate a starter file using the `/init` command

### 📊 How Effective :

Very effective, with a critical constraint

The recommendation is Anthropic's docs suggest targeting under 200 lines, and Community prefer generally ranges from under 200 to under 300 lines

### 💥 Impact : 

Eliminates repetitive Prompting, enforces consistent Code Style across Sessions, and gives Agents immediate Project Orientation

> ⚠️ **Key Limitation: ** CLAUDE.md is Claude Code specific. It does not work with Cursor, Codex, or other AI Coding Tools


## 2. 🧩 SKILL.md (Agent Skills)

### 🎯 What :

A reusable package of Procedural Knowledge, structured as a folder with a `SKILL.md` file at its center, optionally bundled with Scripts, Templates, and Reference Materials

### ❓ Why : 

Instruction files tell an Agent your Project's general Rules

Skills Teach an Agent how to perform a Specific Task
- If CLAUDE.md is your Employee Handbook
- Skills are the detailed Training Manuals for specialized jobs like Reviewing Code to a specific standard or generating a PowerPoint 

### ⚙️ How :
Skills use a three level Progressive Disclosure system :

- **🔎 Level 1 (Discovery) :** Agent loads only the Name and Description of each Skill (~100 tokens per Skill)
- **📖 Level 2 (Activation) :** When a Task matches a Skill's Description, the full `SKILL.md` body loads into context
- **📂 Level 3 (Resources) :** Referenced Files, Scripts, and Templates load only when needed

Token cost at idle : effectively zero. You can install many Skills without bloating Context

### 📊 How Effective :

Effectiveness depends heavily on the Description in the YAML Frontmatter

If a Skill doesn't trigger, the problem is often(almost) the Description, not the Instructions inside

Agent Skills are an Open Standard supported across Claude Code, GitHub Copilot, VS Code, OpenAI Codex, and others, making them Portable across Platforms!

### 💥 Impact : 

Skills bridge the gap between "capable" and "competent"

They add Domain Specific Knowledge that tells Agents how to use their Tools well

> 💡 **Key Strength:** Write once, use everywhere. Skills work across Multiple Agent products



## 3. 🕵️ Agent.md (Sub Agent Definitions)

### 🎯 What : 

A Configuration File that defines a specialized Sub Agent's Persona, Capabilities, and Scope

Not a single standardized format(In Claude Code, these live inside `.claude/agents/`)

### ❓ Why : 

Complex Projects benefit from specialized AI Personas rather than one General Purpose Agent

- A Code Reviewer Agent focuses entirely on bugs and style violations
- A Security Auditor Agent focuses on vulnerabilities

Agent.md files define these Roles

### ⚙️ How : 

You Create Definition files like `.claude/agents/code-reviewer.md`

The Sub Agent Operates with isolated context focused on its defined Role, preventing cross contamination from unrelated tasks

You invoke Sub Agents when you need a distinct phase of work like "use a sub agent to perform a Security Review of that Code"

### 📊 How Effective : 

Highly Dependent on Project complexity

- For simpler Projects, a single Agent with a good CLAUDE.md is sufficient
- For large __monorepos__ with distinct phases (Implementation ➡️ Review ➡️ Security Audit ➡️ Documentation), specialized Agents produce better results through focused, isolated Context

### 💥 Impact : 

Enables parallel AI workflows

One Agent Implements a feature while another Reviews the Code, each with isolated Context that keeps concerns separated

> ⚠️ **Key Limitation:** Tool specific and niche. Not a broadly adopted Standard


## 4. 🌐 AGENTS.md (The Open Standard)

### 🎯 What : 

An Open Standard Markdown File providing AI Coding Agents with project specific Instructions and Context

Adopted by many repositories on GitHub and supported across multiple Tools

### ❓ Why : 

Before AGENTS.md, every AI tool had its own proprietary Configuration Format

AGENTS.md emerged from collaboration between OpenAI Codex, Google Jules, Cursor, Amp, and Factory to create a single, Standard

It is now managed by the Agentic AI Foundation under the Linux Foundation

- Think of it as a **README for AI Agents** 🤝
- README.md tells Humans how to work with your Project
- AGENTS.md tells Machines.

### ⚙️ How : 

Plain Markdown with no required fields

Place it at your Repository Root

Agents read it before planning any change

You can also place additional AGENTS.md files in sub directories, and the closest file to the Edited Code takes precedence

Typical contents include Build/Test Commands, Architecture Overviews, Security guidelines, Git Workflows, and Coding Conventions

### 📊 How Effective : 

The key advantage is consistent availability : 

- AGENTS.md content is loaded at the start of each Session and remains Available throughout
- Skills load Asynchronously and only when Invoked, Creating Sequencing issues

### 💥 Impact : 

Rapidly becoming the standard cross Tool Standard

Your investment in AGENTS.md benefits the team regardless of which AI Coding Tool individual Developers choose

> 💡 **Key Strength:** One file works across Codex, Cursor, Copilot, Jules, Zed, and many more


## ⚖️ Quick Comparison

| Dimension | 📋 Instructions.md | 🧩 SKILL.md | 🕵️ Agent.md | 🌐 AGENTS.md |
|---|---|---|---|---|
| **Scope** | Project wide Context | Task specific expertise | Role specific sub-agent | Project wide cross Tool |
| **Portability** | Specific only | Multi-platform ✅ | Tool-specific | Multi-platform ✅ |
| **Loading** | Always at session start | On demand (progressive) | On Invocation | Always at Session Start |
| **Best For** | Build Commands, Code Style | Specialized Workflows | Isolating concerns | Cross Tool Collaboration |
| **Adoption** | Specific Ecosystem | Growing (Open Standard) | Niche | Widely adopted |


## 🎯 When to Use What?

**📋 Use Instructions.md (CLAUDE.md)** when you work primarily in Claude Code and want persistent Project Context for every session

**🧩 Use SKILL.md** when you have Repeatable, Specialized Workflows to package once and reuse across Projects

**🕵️ Use Agent.md** when your Project needs specialized Sub Agents with isolated context for distinct phases of work

**🌐 Use AGENTS.md** when your team uses multiple AI Tools, or you maintain an Open Source Project where contributors use different AI Assistants

**🔗 Use them together** for the best results. A lean AGENTS.md for cross Tool compatibility + a CLAUDE.md for Claude specific guidance + Skills for specialized on demand tasks


## 🌟 The Bigger Picture

These files represent a shift from ad-hoc prompting to systematic **Context Engineering**

The core insight is simple : AI Agents perform dramatically better with structured, persistent Context than with one instruction

The future points toward convergence

AGENTS.md and Agent Skills are both Open Standards gaining broad adoption

As the Ecosystem matures, expect AGENTS.md to handle always on Project Context while Skills handle on demand specialized Expertise

The Developers investing in these files today are building a compounding advantage with every session. ⚡


Thanks for Reading!






