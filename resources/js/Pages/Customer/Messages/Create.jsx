import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

export default function MessageCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('customer.messages.store'), {
            onFinish: () => reset('subject', 'message'),
        });
    };

    return (
        <CustomerLayout>
            <Head title="Contact Admin" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Contact Admin
                                </h2>
                                <Link
                                    href={route('customer.dashboard')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                    placeholder="Enter message subject"
                                />
                                {errors.subject && (
                                    <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={6}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                    placeholder="Type your message here..."
                                />
                                {errors.message && (
                                    <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href={route('customer.dashboard')}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-25"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
