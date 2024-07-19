const express = require('express');
const router = express.Router();
const chatbotController = require('./chatbotController');

// Utilisez le contrôleur pour la route /api/chatbot
router.post('/api/chatbot', chatbotController.postMessage);

module.exports = router;