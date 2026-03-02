import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Juice Store" />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            🧃 Fresh & Healthy Juices
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-green-50">
                            Discover our delicious selection of freshly made juices
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/login"
                                className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto text-center"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/register"
                                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto text-center"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href="/juices"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto text-center"
                            >
                                Browse Juices
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Juices?</h2>
                        <p className="text-lg text-gray-600">Fresh ingredients, great taste, and healthy options</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center px-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Fresh</h3>
                            <p className="text-gray-600">All our juices are made fresh daily with finest ingredients</p>
                        </div>
                        
                        <div className="text-center px-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Taste</h3>
                            <p className="text-gray-600">Delicious flavors that will keep you coming back for more</p>
                        </div>
                        
                        <div className="text-center px-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Healthy Options</h3>
                            <p className="text-gray-600">Nutritious choices packed with vitamins and minerals</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Products Preview */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Juices</h2>
                        <p className="text-lg text-gray-600">Try our customer favorites</p>
                    </div>
                    
                    <div className="text-center">
                        <Link
                            href="/juices"
                            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                        >
                            View All Juices
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Fresh?</h2>
                    <p className="text-xl mb-8 text-green-50">Join thousands of satisfied customers today!</p>
                    <Link
                        href="/register"
                        className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold mb-4">About Juice Store</h3>
                            <p className="text-gray-300">
                                We provide fresh, healthy, and delicious juices made from finest ingredients.
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/juices" className="text-gray-300 hover:text-white">
                                        Shop All Juices
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-gray-300 hover:text-white">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className="text-gray-300 hover:text-white">
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
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
        </>
    );
}
