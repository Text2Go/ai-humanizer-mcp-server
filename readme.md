# AI Humanize MCP Server
---
A Model Context Protocol (MCP) server implementation for refining AI-generated content with built-in AI detection capabilities, delivering human-like text while ensuring grammatical accuracy, readability, and seamless contextual flow. Powered by [text2go](https://text2go.ai).

---
# Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)

---
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
1. Clone this repository
2. Install Dependencies
```bash
npm install
```
3. Build
```bash
npm run build
```

4. Open Claude desktop app and go to Settings -> Developer -> Edit Config
add the following entry:
```json
{
    "ai-humanize": {
        "command": "node",
        "args": ["<YOUR_PROJECT_PATH>/build/index.js"]
    }
}
```
5. Restart Claude desktop app.

## Usage
Ask claude to detect if your text is ai-generated.
```text
Is this text ai-generated:  In a fast-paced world, where technology is advancing at an exponential rate, it is crucial for businesses to adapt to new trends and keep up with the changing demands of the market.
```