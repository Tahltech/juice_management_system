import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useFlashToasts } from '../Hooks/useFlashToasts';
import ThemeToggle from '../Components/ThemeToggle';

export default function AdminLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Convert flash messages to toast notifications
    useFlashToasts();
    
    return (
        <div className="min-h-screen bg-primary">
            <Head>
                <title>FreshSip Admin - Juice Management</title>
                <link href="/css/theme.css" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/logo.png" />
            </Head>

            {/* Theme Toggle */}
            <ThemeToggle />

            <nav className="bg-tertiary border-b border-primary shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/admin/dashboard" className="flex items-center">
                                    <img 
                                        src="/logo.png" 
                                        alt="FreshSip Admin Logo" 
                                        className="h-12 w-auto"
                                    />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="/admin/dashboard"
                                        className="bg-fresh-orange text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/juices"
                                        className="text-secondary hover:bg-fresh-orange hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Juices
                                    </Link>
                                    <Link
                                        href="/admin/orders"
                                        className="text-secondary hover:bg-fresh-orange hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/admin/messages"
                                        className="text-secondary hover:bg-fresh-orange hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Messages
                                    </Link>
                                    <Link
                                        href="/admin/conversations"
                                        className="text-secondary hover:bg-fresh-orange hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!mobileMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
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
                            <Link
                                href="/admin/conversations"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Conversations
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
                )}
            </nav>

            <main className="bg-secondary">{children}</main>
        </div>
    );
}
