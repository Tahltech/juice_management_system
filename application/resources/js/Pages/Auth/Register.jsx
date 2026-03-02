import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Register - FreshSip" />
            
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-fresh-light">
                        <img 
                            src="/logo.png" 
                            alt="FreshSip Logo" 
                            className="h-8 w-auto"
                        />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-secondary">
                        Or{' '}
                        <Link href="/login" className="font-medium text-fresh-orange hover:text-fresh-dark">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-primary">
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Enter your full name"
                            />

                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-primary">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="Enter your email address"
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-primary">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="Create a password"
                            />

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-primary">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />

                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-semibold rounded-lg text-white bg-fresh-orange hover:bg-fresh-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fresh-orange disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 8 8 0 018 0z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
