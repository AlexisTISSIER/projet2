const express = require('express');
const router = express.Router();

// Exemple de route pour recevoir des messages du chatbot
router.post('/message', (req, res) => {
  const userMessage = req.body.message;
  // Logique pour traiter le message et déterminer la réponse
  const botResponse = 'Ceci est une réponse du chatbot.';
  res.json({ message: botResponse });
});

module.exports = router;