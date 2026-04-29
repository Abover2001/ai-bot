import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

const bot = new TelegramBot('8402641357:AAHjiBeXvooBt5tuAVHGTxShF3zDgLpIBjM', { polling: true });

bot.on('message', async (msg) => {
    const text = msg.text;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyAz2KsMcaQ3UHpgrnsvHsTPL1JO6-agx34`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text }] }]
        })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";

    bot.sendMessage(msg.chat.id, reply);
});