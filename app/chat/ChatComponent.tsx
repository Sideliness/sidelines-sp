
'use client';

import { useState } from "react";

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: Date;
    userId: string; // Added userId field
}

export default function ChatComponent() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = "user-123"; // Replace this with actual user ID from your auth system

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: Date.now(),
                    text: newMessage,
                    sender: 'user',
                    timestamp: new Date(),
                    userId: userId,
                },
            ]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4"> {/* Added dark background */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-200' // Darker message bubbles
                            }`}
                        >
                            <p>{message.text}</p>
                            <div className="text-xs opacity-70 flex justify-between">
                                <span>{message.userId}</span>
                                <span>{message.timestamp.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
