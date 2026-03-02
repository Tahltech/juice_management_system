import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF'
    }).format(value);
};

export default function OrderShow({ order }) {
    // Defensive checks for order data
    if (!order) {
        return (
            <CustomerLayout>
                <Head title="Order Not Found" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
                        <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
                        <Link href="/customer/orders" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                            Back to Orders
                        </Link>
                    </div>
                </div>
            </CustomerLayout>
        );
    }

    // Ensure orderItems is an array
    const orderItems = Array.isArray(order.orderItems) ? order.orderItems : [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'processing':
                return 'Processing';
            case 'delivered':
                return 'Delivered';
            case 'cancelled':
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    const getStatusDescription = (status) => {
        switch (status) {
            case 'pending':
                return 'Your order is waiting for admin approval.';
            case 'processing':
                return 'Your order has been approved and is being prepared for delivery.';
            case 'delivered':
                return 'Your order has been successfully delivered!';
            case 'cancelled':
                return 'This order has been cancelled.';
            default:
                return '';
        }
    };

    return (
        <CustomerLayout>
            <Head title={`Order #${order?.id || 'N/A'} - Juice Store`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link href="/customer/orders" className="text-gray-500 hover:text-gray-700">
                                My Orders
                            </Link>
                        </li>
                        <li>
                            <span className="text-gray-500">/</span>
                        </li>
                        <li>
                            <span className="text-gray-900 font-medium">Order #{order?.id || 'N/A'}</span>
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Header */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">Order #{order?.id || 'N/A'}</h1>
                                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order?.status)}`}>
                                    {getStatusText(order?.status)}
                                </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">
                                {getStatusDescription(order?.status)}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-500">Order Date:</span>
                                    <span className="ml-2 text-gray-900">
                                        {order?.created_at ? `${new Date(order.created_at).toLocaleDateString()} at ${new Date(order.created_at).toLocaleTimeString()}` : 'N/A'}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Total Amount:</span>
                                    <span className="ml-2 text-gray-900 font-medium">
                                        ${order?.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
                            <div className="space-y-4">
                                {orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 py-3 border-b">
                                        <div className="flex-shrink-0">
                                            {item.juice?.image ? (
                                                <img
                                                    src={`/storage/${item.juice.image}`}
                                                    alt={item.juice?.name || 'Juice'}
                                                    className="h-16 w-16 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-2xl">🧃</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900">{item.juice?.name || 'Unknown Juice'}</h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {item.price ? formatCurrency(item.price) : '0.00'} × {item.quantity || 0}
                                            </p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {item.subtotal ? formatCurrency(item.subtotal) : '0.00'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Information */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium text-gray-500">Address:</span>
                                    <p className="mt-1 text-gray-900">{order?.shipping_address || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Phone:</span>
                                    <span className="ml-2 text-gray-900">{order?.phone || 'N/A'}</span>
                                </div>
                                {order?.notes && (
                                    <div>
                                        <span className="font-medium text-gray-500">Notes:</span>
                                        <p className="mt-1 text-gray-900">{order.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                            
                            <dl className="space-y-2 mb-6">
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        ${order?.total_amount ? (parseFloat(order.total_amount) / 1.1).toFixed(2) : '0.00'}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm font-medium text-gray-500">Tax (10%)</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        ${order?.total_amount ? ((parseFloat(order.total_amount) / 1.1) * 0.1).toFixed(2) : '0.00'}
                                    </dd>
                                </div>
                                <div className="flex justify-between pt-2 border-t">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">
                                        ${order?.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'}
                                    </dd>
                                </div>
                            </dl>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Link
                                    href="/customer/orders"
                                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    ← Back to Orders
                                </Link>
                                
                                {order?.status === 'pending' && (
                                    <form
                                        method="POST"
                                        action={`/customer/orders/${order.id}/cancel`}
                                        onSubmit={(e) => {
                                            if (!confirm('Are you sure you want to cancel this order?')) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Cancel Order
                                        </button>
                                    </form>
                                )}

                                <Link
                                    href="/customer/juices"
                                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}
