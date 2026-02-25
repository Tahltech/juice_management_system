import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useFlashToasts } from '../Hooks/useFlashToasts';
import ThemeToggle from '../Components/ThemeToggle';

export default function CustomerLayout({ children }) {
    const { auth } = usePage().props;
    const page = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Convert flash messages to toast notifications
    useFlashToasts();
    
    return (
        <div className="min-h-screen bg-primary">
            <Head>
                <title>FreshSip - Fresh Juice Store</title>
                <link href="/css/theme.css" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/logo.png" />
            </Head>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Navigation */}
            <nav className="bg-secondary border-b border-primary shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="flex items-center">
                                    <img 
                                        src="/logo.png" 
                                        alt="FreshSip Logo" 
                                        className="h-10 w-auto"
                                    />
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                                <Link
                                    href="/juices"
                                    className="text-primary hover:text-fresh-orange px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Shop
                                </Link>
                                {auth?.user && (
                                    <Link
                                        href="/customer/dashboard"
                                        className="text-primary hover:text-fresh-orange px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        My Orders
                                    </Link>
                                )}
                                {auth?.user && (
                                    <Link
                                        href="/customer/cart"
                                        className="text-primary hover:text-fresh-orange px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        🛒 Cart
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center">
                            {auth?.user ? (
                                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                                    <Link
                                        href="/customer/orders"
                                        className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        href="/customer/dashboard"
                                        className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        as="button"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <div className="sm:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/juices"
                                className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Shop
                            </Link>
                            {auth?.user && (
                                <Link
                                    href="/customer/dashboard"
                                    className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    My Orders
                                </Link>
                            )}
                            {auth?.user && (
                                <Link
                                    href="/customer/cart"
                                    className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    🛒 Cart
                                </Link>
                            )}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            {auth?.user ? (
                                <div className="px-2 space-y-1">
                                    <Link
                                        href="/customer/orders"
                                        className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        href="/customer/dashboard"
                                        className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        className="text-red-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                        as="button"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="px-2 space-y-1">
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Flash Messages */}
            {page.props.flash && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-green-700">
                                {page.props.flash.success}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <main className="bg-secondary">{children}</main>

            {/* Footer */}
            <footer className="bg-tertiary text-primary mt-12">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex justify-center mb-4">
                                <img 
                                    src="/logo.png" 
                                    alt="FreshSip Logo" 
                                    className="h-16 w-auto"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-center">About FreshSip</h3>
                            <p className="text-secondary text-center">
                                We provide fresh, healthy, and delicious juices made from the finest ingredients.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/juices" className="text-secondary hover:text-fresh-orange">
                                        Shop All Juices
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-secondary hover:text-fresh-orange">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <p className="text-secondary">
                                Email: info@freshsip.com<br />
                                Phone: (555) 123-4567
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-primary text-center">
                        <p className="text-tertiary">
                            © 2026 FreshSip. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
