import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function CustomerLayout({ children }) {
    const { auth } = usePage().props;
    const page = usePage();
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Juice Store - Fresh & Healthy</title>
            </Head>

            {/* Navigation */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-bold text-green-600">
                                    🧃 Juice Store
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                                <Link
                                    href="/juices"
                                    className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Shop
                                </Link>
                                {auth?.user && (
                                    <Link
                                        href="/customer/dashboard"
                                        className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        My Orders
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center">
                            {auth?.user ? (
                                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
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
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
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
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {auth?.user ? (
                            <div className="px-2 space-y-1">
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

            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-12">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Juice Store</h3>
                            <p className="text-gray-300">
                                We provide fresh, healthy, and delicious juices made from the finest ingredients.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/juices" className="text-gray-300 hover:text-white">
                                        Shop All Juices
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <p className="text-gray-300">
                                Email: info@juicestore.com<br />
                                Phone: (555) 123-4567
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p className="text-gray-400">
                            © 2026 Juice Store. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
