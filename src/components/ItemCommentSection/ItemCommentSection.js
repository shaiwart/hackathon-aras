import React, { useEffect, useState } from 'react';
import "./ItemCommentSection.css"

const ChatComponent = ({ sg_item_id }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_URL = process.env.REACT_APP_API_URL_FOR_COMMENT_SECTION;

    // Fetch messages from API
    const fetchMessages = async () => {
        try {
            const response = await fetch(`${API_URL}?$expand=created_by_id`, {
                method: "GET",
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                },
            });
            const data = await response.json();
            const filteredMessages = data.value
                .filter((msg) => msg.sg_item_id === sg_item_id)
                .sort((a, b) => new Date(a.created_on) - new Date(b.created_on));
            setMessages(filteredMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [sg_item_id]);

    // Send a new message
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageBody = {
            sg_item_id: sg_item_id,
            sg_comment_text: newMessage,
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageBody),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Fetch the updated messages from the server after posting
            fetchMessages();

            // Clear the input field
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <div className="chat-container" id="chatContainer">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.created_by_id.login_name === 'current_user' ? 'user' : 'other'}`}
                    >
                        <div className="name">{msg.created_by_id.keyed_name}</div>
                        <div>{msg.sg_comment_text}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    id="chatInput"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="send-button" id="sendButton" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </>
    );
};

export default ChatComponent;
