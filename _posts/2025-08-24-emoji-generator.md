---
layout: post
title: "Try My ~3.5 Million Parameters Model Instead for ✨😉"
date: 2025-08-24
author: "Ajith Raghavan"
description: "Try My ~3.5 Million Parameters Model Instead for ✨😉 for Emoji Generation"
tags: ["🧑‍💻 ML", "Neural Network", "RNN", "LSTM"]
cover_image: true
subtitle: "Emoji Generator"
toc: |
  <ul>
    <li><a href="#intro">Intro</a></li>
    <li><a href="#demo">Demo</a></li>
    <li>
      <a href="#technical-details">Technical Details</a>
      <ul>
        <li><a href="#model-selection">Model Selection</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#hyperparameters">Hyperparameters</a></li>
        <li><a href="#accuracy-and-important-study">Accuracy and Important Study</a>
        <li><a href="#little-history">Little History</a>
        </li>
      </ul>
    </li>
  </ul>
---

## 😊 Introduction {#intro}

I thought to Build a Machine Learning Model to generate Emojis for My Writing content 

Like when typing some sentences, I think I need relevant Emojis in the sentences, as it will give more expressiveness, right

And also because currently I am searching in Web(using some website like Emoji Finder etc., it is based on keywords only) to pick Emojis

So I decided to Develop a **LSTM Model** to automatically generate Emoji for My Sentences

## 🎥 First Demo {#demo}
![Demo Video](/assets/images/2025-08-24-emoji-generator/output.gif)

## 🧑‍🏫 Explanation 

When the user types the paragraph, for each paragraph the Model predicts the approximate Emoji 

For example, if you have 5 sentences in a paragraph, the Model will generate 5 Emojis

## ⚙️ Technical Details {#technical-details}

I currently have totally 20 Emojis ❤, 😍, 😂, 💕, 🔥, 😊, 😎, ✨, 💙, 😘, 📷, 🇺🇸, ☀, 💜, 😉, 💯, 😁, 🎄, 📸, 😜

And used Dataset from [Hugging Face](https://huggingface.co/datasets/cardiffnlp/tweet_eval) and used Google Colab for Training 

### 🎯 Model Selection {#model-selection}

I have decided to use BiLSTM(Bidirectional LSTM(Long Short-Term Memory)) 

We could have just used **LSTM** rather then **BiLSTM** as we are not doing Seq2Seq Task, like we are not translating English to Emojis 

But, here **BiLSTM** improves the performance by at least 10% 

So, decided to use **BiLSTM**

> Note : 

> Here we could have used BiLSTM with Attention Mechanism or even  Fine-Tuned Pre Trained Model like BERT

> But decided to use BiLSTM

### 🏗️ Architecture {#architecture}

1. First have used Embedding Layer 
2. Then, BiLSTM with 2 Layers 
3. Dropout for Regularization 
4. Then Linear Layer with 20 output units for each Emojis 
	- Note : 
	- We are using BiLSTM, so it will hidden states from both the directions 
	- So, before passing to Linear Layer we must concatenate both the hidden states

### 🎲 Hyperparameters {#hyperparameters}

1. I have used the Maximum length of the Sequence to be `50` 
2. Embedding Dimension as `128` 
3. Hidden Dimension for LSTM States to be `128` 
4. As stated before, we have chosen Number of Layers to be 2 
5. Learning Rate α : 0.0005

### 🚨 Accuracy and Important Study {#accuracy-and-important-study}

Regarding Accuracy, it is relatively low although with **BiLSTM** and even low with **Unidirectional LSTM**

Was tweaking and trying to improve the performance then LATER ONLY realized that data has Class Imbalance Problem

Where ~21% of the Data has "❤" which dominates most and followed by ~10% of Data has "😍" and so on... then "😜" was barely minimum

#### ⚠️ Important action

🥇 First Rule : Data in Training Set, Development Set and Test Set should follow the same Distribution

Followed by, may be here, we can Augmented Data Synthetically, or may be with some other Architecture so on

Yes, we can also increase Accuracy with the same Data but as of now saved that for later


### 📜 Little History {#little-history}

I have used Regular LSTM and saw the Model was Overfitting 

So, of various Hyperparameters(still overfitting) after few tweaking various Hyperparameters along with  BiLSTM showed little improvement and continued and seems to work fine


Thanks for reading