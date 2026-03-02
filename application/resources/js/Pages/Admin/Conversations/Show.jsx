import React, { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useToast } from '@/Components/ToastProvider';
import { useRealTimeMessages } from '@/Hooks/useRealTimeMessages';

export default function ConversationShow({ conversation }) {
    const toast = useToast();
    const { auth } = usePage();
    
    // Use real-time messages hook
    const { messages, messagesEndRef } = useRealTimeMessages(conversation?.id, auth?.user?.id);
    
    const [deletingMessageId, setDeletingMessageId] = useState(null);
    
    const handleClearChat = () => {
        if (confirm('Are you sure you want to clear all messages in this conversation? This action cannot be undone.')) {
            router.delete(`/admin/conversations/${conversation.id}/clear`, {
                onSuccess: () => {
                    toast.success('Chat cleared successfully');
                    router.reload();
                },
                onError: (errors) => {
                    toast.error('Failed to clear chat');
                    console.error('Clear chat errors:', errors);
                },
            });
        }
    };
    
    const handleDeleteMessage = (messageId) => {
        if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
            setDeletingMessageId(messageId);
            
            router.delete(`/admin/conversations/${conversation.id}/messages/${messageId}`, {
                onSuccess: () => {
                    toast.success('Message deleted successfully');
                    setDeletingMessageId(null);
                    // Don't reload - let the real-time hook handle the update
                },
                onError: (errors) => {
                    toast.error('Failed to delete message');
                    setDeletingMessageId(null);
                    console.error('Delete message errors:', errors);
                },
            });
        }
    };
    
    // Defensive checks for conversation data
    if (!conversation) {
        return (
            <AdminLayout>
                <Head title="Conversation Not Found" />
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Conversation Not Found</h1>
                        <p className="text-gray-600 mb-6">The conversation you're looking for doesn't exist.</p>
                        <Link href="/admin/conversations" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                            Back to Conversations
                        </Link>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/conversations/${conversation.id}/messages`, {
            onSuccess: () => {
                reset('content');
                toast.success('Message sent successfully');
                // Refresh the page to show the new message
                router.reload();
            },
            onError: (errors) => {
                toast.error('Failed to send message');
                console.error('Message send errors:', errors);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Conversation with ${conversation.user?.name || 'Customer'}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <Link
                                    href="/admin/conversations"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                                >
                                    ← Back to Conversations
                                </Link>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {conversation.subject}
                                        </h3>
                                        <p className="text-gray-600">
                                            Conversation with {conversation.user?.name || 'Customer'}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleClearChat}
                                            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Clear Chat
                                        </button>
                                        <Link
                                            href="/admin/conversations"
                                            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                            Back to Conversations
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {conversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.type === 'admin' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                message.type === 'admin'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            <div className="text-sm font-medium mb-1">
                                                {message.type === 'admin' ? 'Admin' : (message.sender?.name || 'Customer')}
                                            </div>
                                            <div>{message.content || 'No message content'}</div>
                                            <div className="text-xs mt-1 opacity-75 flex justify-between items-center">
                                                <span>
                                                    {message.created_at ? new Date(message.created_at).toLocaleString() : 'No date'}
                                                </span>
                                                {message.type === 'admin' && (
                                                    <button
                                                        onClick={() => handleDeleteMessage(message.id)}
                                                        disabled={deletingMessageId === message.id}
                                                        className="ml-2 text-red-500 hover:text-red-700 text-xs opacity-75 hover:opacity-100"
                                                        title="Delete message"
                                                    >
                                                        {deletingMessageId === message.id ? 'Deleting...' : '🗑️'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* This div will be used as a scroll anchor */}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Reply Form - Fixed at bottom */}
                            <form onSubmit={submit} className="border-t pt-4 sticky bottom-0 bg-white">
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        placeholder="Type your reply..."
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-25"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
