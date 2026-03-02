import React, { useState } from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useToast } from '@/Components/ToastProvider';

const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(value);
    };

export default function Checkout({ cartItems, subtotal, tax, total }) {
    const toast = useToast();
    const [formData, setFormData] = useState({
        shipping_address: '',
        phone: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/customer/orders/place-order', formData);
            
            if (response.data.redirect) {
                window.location.href = response.data.redirect;
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <CustomerLayout>
            <Head title="Checkout - Juice Store" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your order details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Shipping Information */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Shipping Address *
                                        </label>
                                        <textarea
                                            id="shipping_address"
                                            name="shipping_address"
                                            rows={3}
                                            value={formData.shipping_address}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                            placeholder="Enter your complete shipping address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            maxLength="500"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                            placeholder="Any special instructions for your order"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.notes.length}/500 characters
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 py-3 border-b">
                                            <div className="flex-shrink-0">
                                                {item.juice.image ? (
                                                    <img
                                                        src={`/storage/${item.juice.image}`}
                                                        alt={item.juice.name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white text-lg">🧃</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{item.juice.name}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {formatCurrency(item.price)} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatCurrency(parseFloat(item.price) * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <Link
                                    href="/customer/cart"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    ← Back to Cart
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Placing Order...' : '🛒 Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {formatCurrency(subtotal)}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Tax (10%)</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {formatCurrency(tax)}
                                    </dd>
                                </div>
                                <div className="flex justify-between pt-2 border-t">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">
                                        {formatCurrency(total)}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-900 mb-2">Order Process</h3>
                                <ol className="text-xs text-blue-700 space-y-1">
                                    <li>1. Place your order</li>
                                    <li>2. Admin reviews and approves</li>
                                    <li>3. Order gets processed</li>
                                    <li>4. Items get delivered</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
