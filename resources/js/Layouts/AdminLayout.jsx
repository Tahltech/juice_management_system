import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Admin - Juice Management System</title>
            </Head>

            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/admin/dashboard" className="text-white font-bold text-xl">
                                    Juice Admin
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="/admin/dashboard"
                                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/juices"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Juices
                                    </Link>
                                    <Link
                                        href="/admin/orders"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/admin/messages"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Messages
                                    </Link>
                                    <Link
                                        href="/admin/conversations"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Conversations
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <Link
                                    href="/profile"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/admin/dashboard"
                            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/juices"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Juices
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Orders
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Messages
                        </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="px-2 space-y-1">
                            <Link
                                href="/profile"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                as="button"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
