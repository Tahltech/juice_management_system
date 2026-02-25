import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import SalesChart from '@/Components/SalesChart';
import TopJuicesChart from '@/Components/TopJuicesChart';

const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(value);
    };

export default function Dashboard({ stats, recentOrders, lowStockJuices, salesData, monthlySalesData, topJuices }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-8">Admin Dashboard</h1>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                                            <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.total_sales || 0)}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total_orders}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total_customers}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.low_stock_juices}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <SalesChart 
                            data={monthlySalesData} 
                            title="Monthly Sales (Last 12 Months)" 
                            type="bar" 
                            color="#3b82f6" 
                        />
                        <SalesChart 
                            data={salesData} 
                            title="Daily Sales (Last 30 Days)" 
                            type="line" 
                            color="#10b981" 
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <TopJuicesChart data={topJuices} />
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm font-medium text-green-800">Total Revenue</span>
                                    <span className="text-lg font-bold text-green-900">
                                        ${parseFloat(stats.total_sales).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm font-medium text-blue-800">Total Orders</span>
                                    <span className="text-lg font-bold text-blue-900">
                                        {stats.total_orders}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                    <span className="text-sm font-medium text-purple-800">Average Order Value</span>
                                    <span className="text-lg font-bold text-purple-900">
                                        {formatCurrency(stats.total_orders > 0 ? parseFloat(stats.total_sales) / stats.total_orders : 0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders and Low Stock */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Orders */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Orders</h3>
                                <div className="flow-root">
                                    <ul className="-my-5 divide-y divide-gray-200">
                                        {recentOrders.map((order) => (
                                            <li key={order.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {order.user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {order.user.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Order #{order.id} - ${parseFloat(order.total_amount).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Low Stock Juices */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Low Stock Alerts</h3>
                                <div className="flow-root">
                                    <ul className="-my-5 divide-y divide-gray-200">
                                        {lowStockJuices.map((juice) => (
                                            <li key={juice.id} className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {juice.name}
                                                        </p>
                                                        <p className="text-sm text-red-600">
                                                            Only {juice.stock_quantity} left in stock
                                                        </p>
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ${parseFloat(juice.price).toFixed(2)}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
