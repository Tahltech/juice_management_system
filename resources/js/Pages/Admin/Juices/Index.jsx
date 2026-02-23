import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function JuiceIndex({ juices }) {
    return (
        <AdminLayout>
            <Head title="Juices Management" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Juices Management</h1>
                        <Link
                            href="/admin/juices/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add New Juice
                        </Link>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {juices.data.map((juice) => (
                                <li key={juice.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {juice.image && (
                                                    <img
                                                        src={`/storage/${juice.image}`}
                                                        alt={juice.name}
                                                        className="h-16 w-16 rounded-lg object-cover mr-4"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{juice.name}</p>
                                                    <p className="text-sm text-gray-500">{juice.description}</p>
                                                    <div className="mt-2 flex items-center space-x-4">
                                                        <span className="text-sm text-gray-900 font-medium">
                                                            ${parseFloat(juice.price).toFixed(2)}
                                                        </span>
                                                        <span className={`text-sm ${
                                                            juice.stock_quantity <= 10 ? 'text-red-600 font-medium' : 'text-gray-500'
                                                        }`}>
                                                            Stock: {juice.stock_quantity}
                                                        </span>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            juice.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {juice.is_available ? 'Available' : 'Unavailable'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/admin/juices/${juice.id}`}
                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/juices/${juice.id}/edit`}
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/juices/${juice.id}`}
                                                    method="delete"
                                                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                                                    as="button"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {juices.links && (
                        <div className="mt-6">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-700">
                                    Showing {juices.from} to {juices.to} of {juices.total} results
                                </div>
                                <div className="flex space-x-2">
                                    {juices.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
