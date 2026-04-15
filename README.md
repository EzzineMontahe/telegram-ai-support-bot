# 🤖 Telegram AI Support Bot with n8n & Groq

A production-ready, intelligent customer support bot for Telegram that combines FAQ automation with AI-powered responses. Built with n8n workflow automation and Groq's lightning-fast LLM API.

![Bot Demo](https://img.shields.io/badge/Status-Production%20Ready-success)
![Response Time](https://img.shields.io/badge/Response%20Time-Under%201s-brightgreen)
![Cost](https://img.shields.io/badge/Cost-Free%20Tier-blue)

---

## ✨ Features

### 🎯 Core Capabilities
- **Instant FAQ Responses** - Answers common questions in <100ms using keyword-based matching
- **AI-Powered Intelligence** - Leverages Groq's Llama 3.3 70B for complex queries
- **Conversation Memory** - Maintains context across multiple messages per user
- **Smart Escalation** - Automatically detects when human support is needed
- **Multi-User Support** - Handles unlimited concurrent conversations
- **Zero Downtime** - Webhook-based architecture for 24/7 availability

### 🚀 Performance
- **Sub-second responses** for FAQ queries (~100-400ms total)
- **Fast AI responses** using Groq (average 500-800ms including network)
- **Scalable architecture** ready for production traffic
- **Conversation history** stores last 10 exchanges per user

### 💡 Intelligence
- **Context-aware responses** using conversation memory
- **Automatic escalation detection** for billing, account-specific, or complex issues
- **Customizable FAQ database** with keyword matching
- **Graceful fallback** when AI can't provide confident answers

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Workflow Engine** | n8n (self-hosted) | Automation orchestration |
| **AI/LLM** | Groq API (Llama 3.3 70B) | Natural language understanding |
| **Messaging Platform** | Telegram Bot API | User interface |
| **Webhook Tunnel** | ngrok | Local development exposure |
| **Language** | JavaScript (Node.js) | Custom logic in Code nodes |

---

## 📋 Prerequisites

- **n8n** (self-hosted or cloud) - [Installation guide](https://docs.n8n.io/hosting/)
- **Telegram Bot Token** - Create via [@BotFather](https://t.me/botfather)
- **Groq API Key** - Free tier at [console.groq.com](https://console.groq.com)
- **ngrok** (for local development) - [Download here](https://ngrok.com/download)

---

## 🚀 Quick Start

### 1️⃣ Clone & Setup

```bash
# Clone the repository
git clone https://github.com/EzzineMontahe/telegram-ai-support-bot.git
cd telegram-ai-support-bot

# Start n8n (if self-hosted)
n8n start
```

### 2️⃣ Import Workflow

1. Open n8n at `http://localhost:5678`
2. Click **Workflows** → **Import from File**
3. Select `telegram-ai-bot.json`
4. Workflow appears with all nodes configured

### 3️⃣ Configure Credentials

#### Telegram Bot Token
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` and follow prompts
3. Copy your bot token (format: `123456789:ABC...`)
4. In workflow, find **"Send Telegram Response"** node
5. Replace token in URL field

#### Groq API Key
1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Create new API key
3. In workflow, find **"HTTP Request"** (Groq) node
4. Click **Header Auth** → Create credential
5. Name: `Authorization`
6. Value: `Bearer YOUR_GROQ_KEY_HERE`

### 4️⃣ Set Up Webhook

```bash
# Start ngrok tunnel
ngrok http 5678

# Copy the HTTPS URL (e.g., https://abc123.ngrok-free.app)
```

Set Telegram webhook (replace `YOUR_BOT_TOKEN` and `YOUR_NGROK_URL`):

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_NGROK_URL>/webhook/webhook
```

Example:
```
https://api.telegram.org/bot8121356067:AAE.../setWebhook?url=https://abc123.ngrok-free.app/webhook/webhook
```

### 5️⃣ Activate & Test

1. In n8n, toggle workflow to **Active** (green switch)
2. Open Telegram and search for your bot
3. Send: `Hello`
4. Bot should respond instantly! 🎉

---

## 📊 Workflow Architecture

```
┌─────────────┐
│   Telegram  │
│   Webhook   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Extract Message    │
│  (Parse user data)  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Get Conversation    │
│    History          │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  FAQ Knowledge      │
│      Base           │
└──────┬──────────────┘
       │
       ▼
    ┌──────┐
    │ IF?  │ Has FAQ Answer?
    └─┬──┬─┘
      │  │
 YES  │  │  NO
      │  │
      ▼  ▼
  ┌───────┐  ┌──────────────┐
  │  FAQ  │  │ Format Groq  │
  │Response│  │   Messages   │
  └───┬───┘  └──────┬───────┘
      │             │
      │             ▼
      │      ┌──────────────┐
      │      │  HTTP Groq   │
      │      │   API Call   │
      │      └──────┬───────┘
      │             │
      │             ▼
      │      ┌──────────────┐
      │      │   Extract    │
      │      │   Response   │
      │      └──────┬───────┘
      │             │
      │             ▼
      │      ┌──────────────┐
      │      │    Check     │
      │      │  Escalation  │
      │      └──────┬───────┘
      │             │
      └─────┬───────┘
            │
            ▼
    ┌──────────────┐
    │    Merge     │
    │  Responses   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   Update     │
    │ Conversation │
    │   History    │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Send Telegram│
    │   Response   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   Respond    │
    │  to Webhook  │
    └──────────────┘
```

---

## 🎨 Customization

### Adding FAQs

Edit the **"FAQ Knowledge Base"** node:

```javascript
const FAQs = [
  {
    keywords: ['hours', 'open', 'timing', 'schedule'],
    answer: '🕐 We are open Monday-Friday: 9 AM - 6 PM...'
  },
  {
    keywords: ['price', 'cost', 'pricing'],
    answer: '💰 Our pricing starts at $49/month...'
  },
  // Add your own FAQs here
  {
    keywords: ['YOUR', 'KEYWORDS'],
    answer: 'Your custom answer here'
  }
];
```

### Changing AI Personality

Edit the **"Format OpenAI Messages"** node system prompt:

```javascript
{
  role: 'system',
  content: `You are a [YOUR BRAND] support assistant.
  [YOUR TONE: friendly/professional/casual]
  
  Answer questions about [YOUR PRODUCTS/SERVICES].
  If uncertain, escalate to human agent.`
}
```

### Switching AI Models

In **HTTP Request (Groq)** node, change model:

```javascript
// Current: llama-3.3-70b-versatile (balanced)
// Fast: llama-3.1-8b-instant
// Smart: mixtral-8x7b-32768
```

---

## 📈 Performance Benchmarks

Tested on: n8n self-hosted (Windows), 50 Mbps connection

| Query Type | Response Time | Model Used |
|------------|---------------|------------|
| FAQ Match | 100-400ms | Keyword matching |
| AI Response | 500-800ms | Groq Llama 3.3 70B |
| With Memory | +50ms overhead | In-memory storage |

**Average end-to-end:** 375ms ⚡

---

## 🔒 Security Best Practices

✅ Store API keys in environment variables (not hardcoded)  
✅ Use HTTPS for webhooks (required by Telegram)  
✅ Validate incoming webhook requests  
✅ Rate limit users to prevent abuse  
✅ Never log sensitive user data  

---

## 🐛 Troubleshooting

### Bot doesn't respond

**Check webhook status:**
```
https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo
```

Should show your ngrok URL. If not, re-set webhook.

**Check n8n executions:**
- Go to **Executions** tab
- Look for errors in red
- Click execution to see which node failed

### "Chat not found" error

The `chatId` field is missing. Check:
1. **Extract Message** node output has `chatId`
2. Data flows through all nodes (check connections)
3. Merge node passes data correctly

### Groq API errors

- Verify API key is correct (starts with `gsk_`)
- Check model name: `llama-3.3-70b-versatile`
- Ensure you have free tier credits remaining

### Slow responses

- Groq: 500-800ms is normal for AI
- FAQ: Should be <400ms
- Network: Check your connection to Telegram API

---

## 📦 What's Included

```
telegram-ai-support-bot/
├── telegram-ai-bot.json       # n8n workflow (import this)
├── README.md                   # This file
└── examples/
    ├── conversation-flow.png   # Visual workflow diagram
    └── demo-screenshot.png     # Bot in action
```

---

## 🎯 Use Cases

- **Customer Support** - 24/7 instant responses to common questions
- **Lead Qualification** - Pre-screen customers before human handoff
- **Product Information** - Answer specs, pricing, availability
- **Technical Support** - First-line troubleshooting and guidance
- **Onboarding** - Guide new users through setup processes

---

## 🚀 Deployment to Production

### Option 1: Cloud n8n
1. Sign up at [n8n.cloud](https://n8n.io)
2. Import workflow
3. Use production webhook URL (no ngrok needed)
4. Set environment variables for tokens

### Option 2: VPS/Server
1. Deploy n8n to DigitalOcean/AWS/Hetzner
2. Set up reverse proxy (Nginx + SSL)
3. Use server domain for webhook
4. Add systemd service for auto-restart

### Option 3: Docker
```bash
docker run -d --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| **Groq API** | Free Tier | $0/month (14,400 requests/day) |
| **Telegram** | Free | $0/month |
| **n8n Self-Hosted** | Free | $0/month |
| **n8n Cloud** | Starter | $20/month (optional) |
| **ngrok** | Free | $0/month (dev only) |

**Total for self-hosted:** $0/month 🎉

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - feel free to use for commercial or personal projects.

---

## 👨‍💻 Author

**Montahe Ezzine (Patata)**  
- GitHub: [@EzzineMontahe](https://github.com/EzzineMontahe)
- Upwork: [Hire me for n8n automation projects](https://www.upwork.com/freelancers/~YOUR_PROFILE)
- Skills: n8n, AI/LLM Integration, Telegram Bots, Workflow Automation

---

## 🙏 Acknowledgments

- [n8n](https://n8n.io) - Fantastic workflow automation platform
- [Groq](https://groq.com) - Blazing fast LLM inference
- [Telegram](https://telegram.org) - Excellent bot API

---

## 📞 Support

Need help? 

- 🐛 [Open an issue](https://github.com/EzzineMontahe/telegram-ai-support-bot/issues)
- 💬 [Start a discussion](https://github.com/EzzineMontahe/telegram-ai-support-bot/discussions)
- 📧 Contact me for custom implementations

---

**⭐ If this helped you, please star the repo!**

Built with ❤️ using n8n and Groq
