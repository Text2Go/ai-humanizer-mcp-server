# MCP AI Humanize Server
---
A Model Context Protocol (MCP) server implementation for refining AI-generated content with built-in AI detection capabilities, delivering human-like text while ensuring grammatical accuracy, readability, and seamless contextual flow.

---
# Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)

---
## Overview
This MCP Server include useful ai text hunmanlize tools powered by [text2go](https://www.text2go.ai/).

## Screenshot

![screenshot](./image/screenshot.png)

## Features
- 👤 Sound More Like Human
- ⭐ Improve Grammatical Accuracy
- 📋 Enhance Readability
- 📏 Adjust the Length
- ⚖️ Keep Specific Terms

## Prerequisites
- node version >= 16
- Claude Desktop latest version

## Installation
1. Clone the repository
```bash
git clone 
```
2. Install Dependencies
```bash
pip install
```
3. Build
```bash
npm run build
```

3. Open Claude desktop app and go to Settings -> Developer -> Edit Config
add the following entry:
```json
{
    "ai-humanlize": {
        "command": "node",
        "args": ["/PATH/TO/MCP/build/index.js"]
    }
}
```
4. Restart Claude desktop app.

## Usage
Ask claude to detect if your text is ai-generated.
```text
Is this text ai-generated:  In a fast-paced world, where technology is advancing at an exponential rate, it is crucial for businesses to adapt to new trends and keep up with the changing demands of the market.
```