#!/usr/bin/env node

/**
 * Telegram AI Support Bot - Setup Helper
 * This script helps verify your environment before deploying the bot
 */

console.log('🤖 Telegram AI Support Bot - Environment Check\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`✅ Node.js: ${nodeVersion}`);

// Check if required environment variables would be set
const requiredEnvVars = ['TELEGRAM_BOT_TOKEN', 'GROQ_API_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('\n⚠️  Missing environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\nℹ️  Set these before running your n8n workflow');
} else {
  console.log('\n✅ All environment variables configured!');
}

console.log('\n📚 Next steps:');
console.log('   1. Import Telegram-AI-Support-Bot.json into n8n');
console.log('   2. Configure your API credentials');
console.log('   3. Set up the Telegram webhook');
console.log('   4. Activate the workflow\n');
console.log('📖 Full instructions: See README.md\n');
