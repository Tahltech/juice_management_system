import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function JuiceEdit({ juice }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: juice.name || '',
        description: juice.description || '',
        price: juice.price || '',
        stock_quantity: juice.stock_quantity || '',
        image: null,
        is_available: juice.is_available ?? true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.juices.update', juice.id), {
            _method: 'put',
            onSuccess: () => reset('image'),
        });
    }

    function handleImageChange(e) {
        setData('image', e.target.files[0]);
    }

    return (
        <AdminLayout>
            <Head title={`Edit ${juice.name}`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Juice</h1>
                        <Link
                            href="/admin/juices"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back to Juices
                        </Link>
                    </div>

                    <div className="bg-white shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Juice Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                    {errors.description && (
                                        <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            step="0.01"
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required
                                        />
                                        {errors.price && (
                                            <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
                                            Stock Quantity
                                        </label>
                                        <input
                                            type="number"
                                            id="stock_quantity"
                                            value={data.stock_quantity}
                                            onChange={(e) => setData('stock_quantity', e.target.value)}
                                            min="0"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            required
                                        />
                                        {errors.stock_quantity && (
                                            <p className="mt-2 text-sm text-red-600">{errors.stock_quantity}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Product Image
                                    </label>
                                    {juice.image && (
                                        <div className="mt-2 mb-4">
                                            <img
                                                src={`/storage/${juice.image}`}
                                                alt={juice.name}
                                                className="h-32 w-32 rounded-lg object-cover"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">Current image</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_available"
                                        checked={data.is_available}
                                        onChange={(e) => setData('is_available', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">
                                        Available for purchase
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Link
                                    href="/admin/juices"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Juice'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
