import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link } from '@inertiajs/react';

export default function ConversationsIndex({ conversations }) {
    // Debug: Log the conversations data
    console.log('Conversations data:', conversations);
    
    return (
        <CustomerLayout>
            <Head title="My Conversations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    My Conversations
                                </h3>
                                <div className="text-sm text-gray-600">
                                    {conversations?.data?.length || 0} conversation{conversations?.data?.length !== 1 ? 's' : ''}
                                </div>
                            </div>

                            {(!conversations?.data || conversations.data.length === 0) ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 mb-4">
                                        No conversations yet.
                                    </div>
                                    <Link
                                        href={route('customer.messages.create')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Start a Conversation
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {conversations.data.map((conversation, index) => {
                                        // Debug: Log each conversation
                                        console.log('Processing conversation:', conversation);
                                        console.log('Conversation ID:', conversation?.id);
                                        
                                        return (
                                            <div
                                                key={conversation?.id || `conversation-${index}`}
                                                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                                                            {conversation?.subject || 'Untitled Conversation'}
                                                        </h4>
                                                        <div className="text-sm text-gray-500">
                                                            {conversation?.created_at 
                                                                ? new Date(conversation.created_at).toLocaleString()
                                                                : 'No date available'
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        {conversation?.id ? (
                                                            <Link
                                                                href={route('customer.conversations.show', conversation.id)}
                                                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                            >
                                                                View
                                                            </Link>
                                                        ) : (
                                                            <span className="text-gray-400">No ID</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {conversations?.data?.length > 0 && (
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
        </CustomerLayout>
    );
}
