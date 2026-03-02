import { useState, useEffect, useCallback, useRef } from 'react';

export function useRealTimeCustomerMessages(conversationId, currentUserId) {
    const [messages, setMessages] = useState([]);
    const [lastMessageId, setLastMessageId] = useState(0);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const fetchNewMessages = useCallback(async () => {
        if (!conversationId) return;

        try {
            const response = await fetch(`/conversations/${conversationId}/messages/latest`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const newMessages = await response.json();
                
                if (newMessages.length > 0) {
                    setMessages(prev => [...prev, ...newMessages]);
                    setLastMessageId(newMessages[newMessages.length - 1]?.id || lastMessageId);
                    
                    // Scroll to bottom after adding new messages
                    setTimeout(scrollToBottom, 100);
                }
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [conversationId, lastMessageId]);

    useEffect(() => {
        if (!conversationId) return;

        // Poll for new messages every 3 seconds
        const interval = setInterval(fetchNewMessages, 3000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [conversationId, fetchNewMessages]);

    // Reset messages when conversation changes
    useEffect(() => {
        setMessages([]);
        setLastMessageId(0);
    }, [conversationId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(scrollToBottom, 100);
        }
    }, [messages]);

    return { messages, messagesEndRef };
}
