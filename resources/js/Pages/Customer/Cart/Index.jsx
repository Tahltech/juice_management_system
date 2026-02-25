import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(value);
    };

export default function CartIndex({ cartItems, total, count }) {
    const { flash } = usePage().props;

    const handleUpdateQuantity = async (cartId, newQuantity) => {
        try {
            const response = await axios.put(`/customer/cart/${cartId}`, {
                quantity: newQuantity
            });
            
            if (response.data.success) {
                // Reload the page to show updated cart
                window.location.reload();
            } else {
                alert(response.data.message || 'Failed to update quantity. Please try again.');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Failed to update quantity. Please try again.');
            }
        }
    };

    const handleRemoveItem = async (cartId) => {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            try {
                const response = await axios.delete(`/customer/cart/${cartId}`);
                
                if (response.data.success) {
                    // Reload the page to show updated cart
                    window.location.reload();
                } else {
                    alert(response.data.message || 'Failed to remove item. Please try again.');
                }
            } catch (error) {
                console.error('Error removing item:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('Failed to remove item. Please try again.');
                }
            }
        }
    };

    const handleClearCart = async () => {
        if (confirm('Are you sure you want to clear your entire cart?')) {
            try {
                const response = await axios.delete('/customer/cart');
                
                if (response.data.success) {
                    // Reload the page to show updated cart
                    window.location.reload();
                } else {
                    alert(response.data.message || 'Failed to clear cart. Please try again.');
                }
            } catch (error) {
                console.error('Error clearing cart:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('Failed to clear cart. Please try again.');
                }
            }
        }
    };

    return (
        <CustomerLayout>
            <Head title="Shopping Cart - Juice Store" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {flash.error}
                    </div>
                )}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">
                        {count} {count === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 11V7a4 4 0 00-8 0v4m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Looks like you haven't added any juices to your cart yet.
                        </p>
                        <Link
                            href="/customer/juices"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Browse Juices
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                        Cart Items
                                    </h3>
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                                                <div className="flex-shrink-0">
                                                    {item.juice.image ? (
                                                        <img
                                                            src={`/storage/${item.juice.image}`}
                                                            alt={item.juice.name}
                                                            className="h-16 w-16 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                                            <span className="text-white text-2xl">🧃</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.juice.name}</h4>
                                                    <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex items-center border border-gray-300 rounded-md">
                                                        <button
                                                            onClick={() => {
                                                                const newQuantity = Math.max(1, item.quantity - 1);
                                                                handleUpdateQuantity(item.id, newQuantity);
                                                            }}
                                                            className="px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-l-md"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                if (value >= 1 && value <= 10) {
                                                                    handleUpdateQuantity(item.id, value);
                                                                }
                                                            }}
                                                            className="w-12 px-2 py-1 text-center border-0 focus:ring-0 focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const newQuantity = Math.min(10, item.quantity + 1);
                                                                handleUpdateQuantity(item.id, newQuantity);
                                                            }}
                                                            className="px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-r-md"
                                                            disabled={item.quantity >= 10}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                        Order Summary
                                    </h3>
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                {formatCurrency(total)}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500">Tax</dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                {formatCurrency(parseFloat(total) * 0.1)}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">
                                                {formatCurrency(parseFloat(total) * 1.1)}
                                            </dd>
                                        </div>
                                    </dl>

                                    <div className="mt-6 space-y-3">
                                        <button
                                            onClick={() => window.location.href = '/customer/orders/checkout'}
                                            className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            🛒 Proceed to Checkout
                                        </button>
                                        <Link
                                            href="/customer/juices"
                                            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Continue Shopping
                                        </Link>
                                        <button
                                            onClick={handleClearCart}
                                            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
