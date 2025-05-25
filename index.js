require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

app.get("/", async (req, res) => {
  const ip = req.ip;
  const message = `Yeni Ziyaretçi IP: ${ip}`;
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: message,
    });
    console.log("IP gönderildi:", ip);
  } catch (err) {
    console.error("Telegram'a gönderilemedi:", err.message);
  }

  res.send("<h1>Hoş geldiniz</h1><p>IP adresiniz gönderildi.</p>");
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
