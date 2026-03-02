import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useToast } from '@/Components/ToastProvider';

export default function MessagesIndex({ messages }) {
    const toast = useToast();
    
    // Ensure messages data exists
    const messagesData = messages?.data || [];
    const messageLinks = messages?.links || [];

    return (
        <AdminLayout>
            <Head title="Messages" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Customer Messages
                                </h3>
                                <div className="text-sm text-gray-600">
                                    {messagesData.length} message{messagesData.length !== 1 ? 's' : ''}
                                </div>
                            </div>

                            {messagesData.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500">
                                        No messages received yet.
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messagesData.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`border rounded-lg p-4 ${
                                                !message.is_read
                                                    ? 'border-green-300 bg-green-50'
                                                    : 'border-gray-200 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        {!message.is_read && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                New
                                                            </span>
                                                        )}
                                                        <h4 className="text-lg font-medium text-gray-900">
                                                            {message.subject || 'No Subject'}
                                                        </h4>
                                                    </div>
                                                    <p className="text-gray-600 mb-2">
                                                        From: {message.user?.name || 'Unknown'} ({message.user?.email || 'No email'})
                                                    </p>
                                                    <p className="text-gray-700 whitespace-pre-wrap">
                                                        {message.content || message.message || 'No message content'}
                                                    </p>
                                                    <div className="mt-3 text-sm text-gray-500">
                                                        {message.created_at ? new Date(message.created_at).toLocaleString() : 'No date'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {messagesData.length > 0 && (
                                <div className="mt-6">
                                    <p className="text-sm text-gray-600">
                                        Showing {messages.from || 1} to {messages.to || messagesData.length} of {messages.total || messagesData.length} messages
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
