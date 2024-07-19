import React, { useState } from 'react';
import { fetchChatbotResponse } from '../api/chatbotApi';
import './app.css';

const Message = ({ sender, message }) => (
    <div className={sender}>
        <strong>{sender === 'user' ? 'You' : 'AI'}: </strong>
        <span>{message}</span>
    </div>
);

const App = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userMessage.trim() === '') return;

        const newChatHistory = [...chatHistory, { sender: 'user', message: userMessage }];
        setChatHistory(newChatHistory);

        try {
            const aiResponse = await fetchChatbotResponse(userMessage);
            setChatHistory([...newChatHistory, { sender: 'ai', message: aiResponse }]);
        } catch (error) {
            setChatHistory([...newChatHistory, { sender: 'ai', message: 'Failed to fetch response' }]);
        }

        setUserMessage('');
    };

    return (
        <div>
            <h1>CypherBot</h1>
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <Message key={index} {...chat} /> // Note: Idéalement, utilisez un identifiant unique au lieu de l'index
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={handleInputChange}
                    placeholder="Tap Tap Tap Tap..."
                    aria-label="Type your message here"
                    autoFocus
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default App;