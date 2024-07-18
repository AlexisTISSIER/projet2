export const fetchChatbotResponse = async (query) => {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VOTRE_CLE_API}`, 
            },
            body: JSON.stringify({
                model: "text-davinci-003", 
                prompt: query,
                max_tokens: 50, 
                
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.choices[0].text; 
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
