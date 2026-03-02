import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useToast } from '@/Components/ToastProvider';

export default function ConversationsIndex({ conversations }) {
    const toast = useToast();
    
    // Ensure conversations data exists
    const conversationsData = conversations?.data || [];

    return (
        <AdminLayout>
            <Head title="Conversations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Customer Conversations
                                </h3>
                                <div className="text-sm text-gray-600">
                                    {conversationsData.length} conversation{conversationsData.length !== 1 ? 's' : ''}
                                </div>
                            </div>

                            {conversationsData.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500">
                                        No conversations yet.
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {conversationsData.map((conversation) => (
                                        <div
                                            key={conversation.id}
                                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <Link
                                                href={`/admin/conversations/${conversation.id}`}
                                                className="block"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <h4 className="text-lg font-medium text-gray-900">
                                                                Conversation with {conversation.user?.name || 'Unknown'}
                                                            </h4>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {conversation.messages_count || conversation.message_count || 0} messages
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 mb-2">
                                                            From: {conversation.user?.name || 'Unknown'} ({conversation.user?.email || 'No email'})
                                                        </p>
                                                        {conversation.latestMessage?.content && (
                                                            <p className="text-gray-700 text-sm mb-2">
                                                                Last message: {conversation.latestMessage.content.substring(0, 100)}...
                                                            </p>
                                                        )}
                                                        <div className="text-sm text-gray-500">
                                                            {conversation.last_message_at 
                                                                ? new Date(conversation.last_message_at).toLocaleString()
                                                                : conversation.created_at 
                                                                    ? new Date(conversation.created_at).toLocaleString()
                                                                    : 'No date available'
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {conversations.data.length > 0 && (
                                <div className="mt-6">
                                    <p className="text-sm text-gray-600">
                                        Showing {conversations.from} to {conversations.last} of {conversations.total} conversations
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
