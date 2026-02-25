import React from 'react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF'
    }).format(value);
};

export default function OrdersIndex({ orders }) {
    // Ensure orders is an array
    const ordersArray = Array.isArray(orders) ? orders : [];

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

    return (
        <CustomerLayout>
            <Head title="My Orders - Juice Store" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-600">Track and manage your juice orders</p>
                </div>

                {(!ordersArray || ordersArray.length === 0) ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            You haven't placed any orders yet. Start shopping to create your first order!
                        </p>
                        <Link
                            href="/customer/juices"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Browse Juices
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {ordersArray && ordersArray.map((order) => (
                                <li key={order.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-green-600 truncate">
                                                        Order #{order.id}
                                                    </p>
                                                    {order.phone && (
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            📞 {order.phone}
                                                        </p>
                                                    )}
                                                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                        {getStatusText(order.status)}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'} • 
                                                    {order.orderItems?.length || 0} {(order.orderItems?.length || 0) === 1 ? 'item' : 'items'}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-900 font-medium">
                                                    Total: {formatCurrency(order.total_amount || 0)}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/customer/orders/${order.id}`}
                                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    View Details
                                                </Link>
                                                {order.status === 'pending' && (
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
                                                            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
