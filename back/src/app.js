const express = require('express');
// const fetch = require('node-fetch'); // Décommentez si Node < 18
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Gestionnaire de route pour /api/chatbot
app.post('/api/chatbot', async (req, res) => {
    try {
        const userQuery = req.body.query;
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Assurez-vous que cette variable correspond à votre configuration .env
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: userQuery,
                max_tokens: 50,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from OpenAI');
        }

        const data = await response.json();
        res.json({ message: data.choices[0].text.trim() }); // Ajout de .trim() pour nettoyer la réponse
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
