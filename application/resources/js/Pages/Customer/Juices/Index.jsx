import React, { useState, useEffect } from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(value);
    };

export default function JuiceIndex() {
    const [juices, setJuices] = useState({ data: [], links: [] });
    const [filters, setFilters] = useState({ search: '', sort: 'latest' });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJuices = async (search = '', sort = 'latest') => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/juices', {
                params: { search, sort }
            });
            
            setJuices(response.data.juices);
            setFilters(response.data.filters);
        } catch (err) {
            setError('Failed to load juices. Please try again.');
            console.error('Error fetching juices:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJuices(searchTerm, sortBy);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== filters.search) {
                fetchJuices(searchTerm, sortBy);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (sortBy !== filters.sort) {
            fetchJuices(searchTerm, sortBy);
        }
    }, [sortBy]);

    const handleQuickAdd = async (juiceId) => {
        try {
            await axios.post('/customer/cart/add', {
                juice_id: juiceId,
                quantity: 1
            });
            // Show success message
            alert('Item added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    return (
        <CustomerLayout>
            <Head>
                <title>Browse Juices - Juice Store</title>
                <meta name="description" content="Browse our fresh and healthy selection of juices" />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Our Juices</h1>
                    <p className="text-gray-600">Discover our fresh and healthy selection of juices</p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search juices..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="latest">Latest First</option>
                                <option value="name">Name (A-Z)</option>
                                <option value="price_low">Price (Low to High)</option>
                                <option value="price_high">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Results Count */}
                {!loading && !error && (
                    <div className="mb-6 text-gray-600">
                        {juices.data && juices.data.length > 0 ? (
                            <p>Showing {juices.from || 1} to {juices.to || juices.data.length} of {juices.total || juices.data.length} juices</p>
                        ) : (
                            <p>No juices found matching your criteria.</p>
                        )}
                    </div>
                )}

                {/* Juice Grid */}
                {!loading && !error && juices.data && juices.data.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {juices.data.map((juice) => (
                            <div key={juice.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="relative">
                                    {juice.image ? (
                                        <img
                                            src={`/storage/${juice.image}`}
                                            alt={juice.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                            <span className="text-white text-4xl">🧃</span>
                                        </div>
                                    )}
                                    {juice.stock_quantity <= 10 && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            Low Stock
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{juice.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{juice.description}</p>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl font-bold text-green-600">{formatCurrency(juice.price)}</span>
                                        <span className={`text-sm ${
                                            juice.stock_quantity <= 10 ? 'text-red-600 font-medium' : 'text-gray-500'
                                        }`}>
                                            {juice.stock_quantity} left
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/juices/${juice.id}`}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200"
                                        >
                                            View Details
                                        </Link>
                                        <button 
                                            onClick={() => handleQuickAdd(juice.id)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200"
                                        >
                                            Quick Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && (!juices.data || juices.data.length === 0) && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No juices found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && juices.links && juices.data && juices.data.length > 0 && (
                    <div className="mt-8">
                        <div className="flex justify-center">
                            <div className="flex space-x-2">
                                {juices.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!link.url) return;
                                            // Parse URL and fetch new page
                                            const url = new URL(link.url, window.location.origin);
                                            const search = url.searchParams.get('search') || '';
                                            const sort = url.searchParams.get('sort') || 'latest';
                                            setSearchTerm(search);
                                            setSortBy(sort);
                                            fetchJuices(search, sort);
                                        }}
                                        className={`px-3 py-1 text-sm rounded ${
                                            link.active
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!link.url}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
