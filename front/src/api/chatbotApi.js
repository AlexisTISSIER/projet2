export const fetchChatbotResponse = async (message) => {
    try {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response; // Assurez-vous que cela correspond à ce que le back-end envoie
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};