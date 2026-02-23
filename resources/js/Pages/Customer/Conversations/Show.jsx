import React, { useState } from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ConversationShow({ conversation }) {
    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('customer.conversations.messages.store', conversation), {
            onFinish: () => reset('message'),
        });
    };

    return (
        <CustomerLayout>
            <Head title={`Conversation: ${conversation.subject}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <Link
                                    href={route('customer.conversations.index')}
                                    className="text-green-600 hover:text-green-800 mb-4 inline-block"
                                >
                                    ← Back to Conversations
                                </Link>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {conversation.subject}
                                </h3>
                                <p className="text-gray-600">
                                    Conversation with Admin
                                </p>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {conversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.type === 'customer' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                message.type === 'customer'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            <div className="text-sm font-medium mb-1">
                                                {message.type === 'customer' ? 'You' : 'Admin'}
                                            </div>
                                            <div>{message.content}</div>
                                            <div className="text-xs mt-1 opacity-75">
                                                {new Date(message.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Form */}
                            <form onSubmit={submit} className="border-t pt-4">
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        placeholder="Type your message..."
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
        </CustomerLayout>
    );
}
