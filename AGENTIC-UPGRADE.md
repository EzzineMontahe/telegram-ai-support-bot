# Agentic Upgrade — ReAct AI Agent Integration

## What Changed

The original bot used a single Groq HTTP call to generate responses. This upgrade replaces that with an **n8n AI Agent node in ReAct (Tools Agent) mode**, giving the bot the ability to reason, plan, and use tools before responding.

## Architecture: Before vs After

### Before
```
Webhook → Extract Message → FAQ Lookup → Has FAQ Answer?
  ├── true  → FAQ Response
  └── false → Format Messages → HTTP Request (Groq) → Check Escalation
```

### After
```
Webhook → Extract Message → Get Conversation History → FAQ Lookup → Has FAQ Answer?
  ├── true  → FAQ Response
  └── false → AI Agent (ReAct) with Tools
                ├── Tool: Tavily Web Search (MCP)
                └── Groq llama-3.3-70b-versatile
→ Merge Responses → Update Conversation History → Google Sheets Log → Send Telegram Response
```

## Tools Available to the Agent

| Tool | Type | Purpose |
|------|------|---------|
| Tavily Search | MCP (STDIO) | Web search for questions outside the FAQ |

## Key Improvements

- **ReAct reasoning** — agent decides whether to search before answering
- **Tool use** — can fetch real-time information via Tavily when FAQ doesn't cover it
- **Conversation history** — full history injected into system prompt for context
- **Escalation detection** — `[ESCALATE]` flag stripped from user-facing response, logged to Sheets
- **Google Sheets logging** — Timestamp, User ID, Username, Message, Response, Escalated

## Stack

- **Orchestration:** n8n (self-hosted on Azure for Students VM — B2ls_v2, Spain Central)
- **LLM:** Groq API — `llama-3.3-70b-versatile`
- **Search:** Tavily MCP via `npx tavily-mcp`
- **Reverse proxy:** Nginx + Let's Encrypt SSL
- **Process manager:** PM2
- **Logging:** Google Sheets API

## Known Limitations / Next Steps

- [ ] Memory recall across distant messages needs improvement (history window tuning)
- [ ] Add FAQ tool as a proper agent tool (not pre-filter)
- [ ] Add Google Sheets query tool so agent can look up past interactions
- [ ] Response time benchmarking vs original HTTP call approach
