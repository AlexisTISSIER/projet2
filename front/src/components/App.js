import React, { useState } from 'react';
import { fetchChatbotResponse } from '../api/chatbotApi';

const App = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userMessage.trim() === '') return;

        // Add user message to chat history
        const newChatHistory = [...chatHistory, { sender: 'user', message: userMessage }];
        setChatHistory(newChatHistory);

        try {
            const aiResponse = await fetchChatbotResponse(userMessage);
            setChatHistory([...newChatHistory, { sender: 'ai', message: aiResponse }]);
        } catch (error) {
            setChatHistory([...newChatHistory, { sender: 'ai', message: 'Failed to fetch response' }]);
        }

        // Clear the input field
        setUserMessage('');
    };

    return (
        <div>
            <h1>Chat with AI</h1>
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={chat.sender}>
                        <strong>{chat.sender === 'user' ? 'You' : 'AI'}: </strong>
                        <span>{chat.message}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default App;