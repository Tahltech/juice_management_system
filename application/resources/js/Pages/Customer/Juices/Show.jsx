import React, { useState } from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(value);
    };

export default function JuiceShow({ juice, relatedJuices }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        try {
            await axios.post('/customer/cart/add', {
                juice_id: juice.id,
                quantity: quantity
            });
            alert(`${quantity} ${juice.name}(s) added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    return (
        <CustomerLayout>
            <Head title={juice.name} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link href="/juices" className="text-gray-500 hover:text-gray-700">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <span className="text-gray-500">/</span>
                            </li>
                            <li>
                                <span className="text-gray-900 font-medium">{juice.name}</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {juice.image ? (
                                    <img
                                        src={`/storage/${juice.image}`}
                                        alt={juice.name}
                                        className="w-full h-96 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-96 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                        <span className="text-white text-8xl">🧃</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div>
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{juice.name}</h1>
                                
                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-green-600">
                                        {formatCurrency(juice.price)}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-600 leading-relaxed">{juice.description}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-700">Availability:</span>
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                                            juice.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {juice.is_available ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">Stock Quantity:</span>
                                        <span className={`font-medium ${
                                            juice.stock_quantity <= 10 ? 'text-red-600' : 'text-green-600'
                                        }`}>
                                            {juice.stock_quantity} units
                                        </span>
                                    </div>
                                    
                                    {juice.stock_quantity <= 10 && (
                                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                            <p className="text-sm text-red-600">
                                                ⚠️ Only {juice.stock_quantity} left in stock! Order soon.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Add to Cart Section */}
                                {juice.is_available && juice.stock_quantity > 0 ? (
                                    <div className="border-t pt-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                                Quantity:
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                min="1"
                                                max={juice.stock_quantity}
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), juice.stock_quantity))}
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                        
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={handleAddToCart}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                                            >
                                                🛒 Add to Cart
                                            </button>
                                            <Link
                                                href="/juices"
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                                            >
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border-t pt-6">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-red-600 font-medium text-center">
                                                {juice.is_available ? 'Out of Stock' : 'Currently Unavailable'}
                                            </p>
                                            <p className="text-red-500 text-sm text-center mt-2">
                                                Check back later or contact us for availability.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Product Info */}
                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                                    <dl className="grid grid-cols-1 gap-4">
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Added by:</dt>
                                            <dd className="text-sm text-gray-900">{juice.user.name}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Added on:</dt>
                                            <dd className="text-sm text-gray-900">
                                                {new Date(juice.created_at).toLocaleDateString()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedJuices.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedJuices.map((relatedJuice) => (
                                    <div key={relatedJuice.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="relative">
                                            {relatedJuice.image ? (
                                                <img
                                                    src={`/storage/${relatedJuice.image}`}
                                                    alt={relatedJuice.name}
                                                    className="w-full h-32 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                    <span className="text-white text-2xl">🧃</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 truncate">{relatedJuice.name}</h3>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-lg font-bold text-green-600">
                                                    ${parseFloat(relatedJuice.price).toFixed(2)}
                                                </span>
                                                <span className={`text-xs ${
                                                    relatedJuice.stock_quantity <= 10 ? 'text-red-600 font-medium' : 'text-gray-500'
                                                }`}>
                                                    {relatedJuice.stock_quantity} left
                                                </span>
                                            </div>
                                            <Link
                                                href={`/juices/${relatedJuice.id}`}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center block transition-colors duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CustomerLayout>
    );
}
