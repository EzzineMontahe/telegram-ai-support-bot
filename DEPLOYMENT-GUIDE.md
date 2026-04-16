# 🚀 Deployment & Usage Guide - Cloud Server

## ✅ **Your Bot is Live!**

**Server:** DigitalOcean Droplet (161.35.28.229)  
**n8n URL:** http://161.35.28.229.nip.io:5678  
**Bot Username:** @my_support1_ai_bot  
**Status:** Running 24/7

---

## 📋 **Quick Reference Commands**

### **To Access Your Server**

```bash
ssh root@161.35.28.229
```

### **Check if n8n is Running**

```bash
pm2 status
```

Should show:
```
│ id │ name │ status  │
│ 0  │ n8n  │ online  │
```

### **Restart n8n**

```bash
pm2 restart n8n
```

### **Stop n8n**

```bash
pm2 stop n8n
```

### **Start n8n**

```bash
pm2 start n8n
```

### **View n8n Logs**

```bash
pm2 logs n8n
```

---

## 🔄 **Ngrok Setup (Required for Telegram Webhook)**

### **Start Ngrok Tunnel**

In SSH:

```bash
ngrok http 5678
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.dev`)

### **Set Telegram Webhook**

Replace `YOUR_NGROK_URL` with the actual URL:

```bash
curl "https://api.telegram.org/bot8121356067:AAEbpRiY8SvwOV23anw6dU9cQLVHevrwCP4/setWebhook?url=YOUR_NGROK_URL/webhook/webhook"
```

**Example:**
```bash
curl "https://api.telegram.org/bot8121356067:AAEbpRiY8SvwOV23anw6dU9cQLVHevrwCP4/setWebhook?url=https://rheological-wynona-peskily.ngrok-free.dev/webhook/webhook"
```

**Expected Response:**
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### **Keep Ngrok Running**

**Option 1 - Use tmux (recommended):**

```bash
# Install tmux
apt install tmux -y

# Start tmux session
tmux new -s ngrok

# Run ngrok
ngrok http 5678

# Detach: Press Ctrl+B, then D
# Reattach later: tmux attach -t ngrok
```

**Option 2 - Background process:**

```bash
nohup ngrok http 5678 > /dev/null 2>&1 &
```

---

## 🎮 **Bot Commands**

Users can use these commands in Telegram:

### **/start**
Shows welcome message and available commands

### **/clear**
Clears conversation history and starts fresh

### **Regular Questions**
Just type normally - bot uses FAQ or AI to respond

---

## 📊 **Google Sheets Logging**

All conversations are logged to:  
https://docs.google.com/spreadsheets/d/1YCPahMRh6DlguOGnxRp-MgmDigHF4pjoE5CITa-0Ujo/edit

**Columns:**
- Timestamp
- User ID
- Username
- User Message
- Bot Response
- Escalated

---

## 🔧 **Startup Procedure (After Server Restart)**

### **Full Startup from Scratch:**

```bash
# 1. Connect to server
ssh root@161.35.28.229

# 2. Check if n8n is running
pm2 status

# 3. If n8n is not running, start it
pm2 start n8n

# 4. Start ngrok in tmux
tmux new -s ngrok
ngrok http 5678

# 5. Copy the ngrok HTTPS URL (e.g., https://abc123.ngrok-free.dev)

# 6. Detach from tmux
# Press: Ctrl+B, then D

# 7. Set Telegram webhook (replace YOUR_NGROK_URL)
curl "https://api.telegram.org/bot8121356067:AAEbpRiY8SvwOV23anw6dU9cQLVHevrwCP4/setWebhook?url=YOUR_NGROK_URL/webhook/webhook"

# 8. Test in Telegram
# Send "Hello" to @my_support1_ai_bot
```

---

## 🌐 **Access n8n Dashboard**

### **From Browser:**

```
http://161.35.28.229.nip.io:5678
```

**Login:**
- Email: Your email
- Password: Your password

---

## 🛠️ **Troubleshooting**

### **Bot Not Responding**

**1. Check if n8n is running:**
```bash
pm2 status
```

If stopped:
```bash
pm2 start n8n
```

**2. Check if ngrok is running:**
```bash
ps aux | grep ngrok
```

If not running:
```bash
tmux new -s ngrok
ngrok http 5678
```

**3. Verify webhook is set:**
```bash
curl "https://api.telegram.org/bot8121356067:AAEbpRiY8SvwOV23anw6dU9cQLVHevrwCP4/getWebhookInfo"
```

Should show your ngrok URL.

**4. Check n8n workflow is Active:**
- Go to http://161.35.28.229.nip.io:5678
- Workflow should have green "Active" toggle

### **Ngrok URL Changed**

Ngrok free tier gives you a new URL each time you restart. If the URL changed:

1. Get new ngrok URL
2. Re-set Telegram webhook with new URL
3. Update n8n webhook URL if needed

### **Google Sheets Not Logging**

1. Check Google Sheets credential is connected in n8n
2. Verify workflow is Active
3. Check n8n execution logs for errors

---

## 💰 **Cost & Credits**

**DigitalOcean:**
- Plan: $24/month (4GB RAM, 2 vCPUs)
- Credit: $200 (lasts ~8 months)
- Expires: Check at https://cloud.digitalocean.com/account/billing

**Ngrok:**
- Free tier
- 1 online ngrok process at a time
- URL changes on restart

**Groq:**
- Free tier: 14,400 requests/day
- More than enough for the bot

---

## 📝 **Important Files & URLs**

### **Server Files:**
- n8n data: `/root/.n8n/`
- PM2 config: `/root/.pm2/`

### **URLs:**
- **DigitalOcean Dashboard:** https://cloud.digitalocean.com
- **n8n Dashboard:** http://161.35.28.229.nip.io:5678
- **Google Sheet Logs:** https://docs.google.com/spreadsheets/d/1YCPahMRh6DlguOGnxRp-MgmDigHF4pjoE5CITa-0Ujo/edit
- **Ngrok Dashboard:** https://dashboard.ngrok.com
- **Telegram Bot:** https://t.me/my_support1_ai_bot

### **API Keys & Tokens:**
- **Telegram Bot Token:** `8121356067:AAEbpRiY8SvwOV23anw6dU9cQLVHevrwCP4`
- **Ngrok Authtoken:** `3C1l3Mqiw0FQijDjbefDoXFqPDh_4QZaapfQWXpbWTa9ksYLa`
- **Groq API Key:** Your key (starts with `gsk_`)

---

## 🔄 **Regular Maintenance**

### **Weekly:**
- Check DigitalOcean credit balance
- Review Google Sheets logs for issues
- Test bot functionality

### **Monthly:**
- Update system packages:
  ```bash
  apt update && apt upgrade -y
  ```
- Check PM2 status
- Verify ngrok is still running

---

## 🚨 **Emergency Contacts**

If something breaks:
1. Check n8n Executions tab for errors
2. Check PM2 logs: `pm2 logs n8n`
3. Restart everything: `pm2 restart n8n` + restart ngrok
4. Check GitHub issues: https://github.com/EzzineMontahe/telegram-ai-support-bot/issues

---

## 📚 **Next Steps / Improvements**

### **Optional Upgrades:**

1. **Get a Real Domain:**
   - Buy domain from Namecheap/Google Domains (~$12/year)
   - Set up Caddy for auto HTTPS
   - No more ngrok needed!

2. **Add Redis for Better Memory:**
   - Install Redis on server
   - Update workflow to use Redis instead of in-memory storage
   - Scales to unlimited users

3. **Add More Features:**
   - Typing indicator
   - Image handling
   - Multi-language support
   - Admin dashboard

4. **Monitoring:**
   - Set up UptimeRobot to monitor bot
   - Email alerts if bot goes down

---

## ✅ **Checklist for Fresh Start**

Use this when you restart your computer or server:

- [ ] Connect to server: `ssh root@161.35.28.229`
- [ ] Check n8n status: `pm2 status`
- [ ] Start n8n if needed: `pm2 start n8n`
- [ ] Start ngrok: `tmux new -s ngrok` then `ngrok http 5678`
- [ ] Copy ngrok HTTPS URL
- [ ] Detach tmux: `Ctrl+B` then `D`
- [ ] Set Telegram webhook with new ngrok URL
- [ ] Test bot: Send "Hello" in Telegram
- [ ] Verify Google Sheets logging

---

**Your bot is now production-ready and running 24/7! 🎉**

Last Updated: April 16, 2026
