---
layout: post
title: "Browser use in Client"
date: 2025-10-11
author: "Ajith Raghavan"
description: "Blog about how to use Brower use like feature in Client that is in Browser Itself"
tags: ["🧑‍💻 Tech", "🙋 Agent"]
cover_image: true
subtitle: "First Template"
---

## Introduction
On top of our Application, we would have an Agent. 

So the Agent will do tasks and give the response.

But, how can we use the Agent to control our Browser?

Let us see here 🚀

## Through LLM
1. We use LLM where we can pass all the `fields` with the `type` to LLM
2. For that, in the Front End user can feed like say,
 ```
 @BrowserAgent please book a ticket for me today
 ```
3. So, in the Agent we need to give the proper instruction to give the response or instructions to follow to do in the Browser through JavaScript
4. And from the response from LLM we can do the `action` accordingly
5. So, we need to have a JavaScript Handler to do the `action` given by LLM
6. Now our Agent should have controlled Browser
7. Here, we have seen the single flow, for **Truly** Agentic we need to again give the performed `action` and current state to LLM and LLM will again process and give the updated `action` and we need to process and continue the same

In this way we achieve the Agent that will have the ability to control the Browser in the Browser itself

This will give our Agent a Powerful Mechanism that will be very powerful in the Future

Thanks for reading!

