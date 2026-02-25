import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Forgot Password - FreshSip" />
            
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
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-secondary">
                        Or{' '}
                        <a href="/login" className="font-medium text-fresh-orange hover:text-fresh-dark">
                            back to login
                        </a>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 text-sm text-secondary">
                        Forgot your password? No problem. Just let us know your email
                        address and we will email you a password reset link that will
                        allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-sm font-medium text-green-800">
                                {status}
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-primary">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email address"
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
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
                                        Sending...
                                    </>
                                ) : 'Email Password Reset Link'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
