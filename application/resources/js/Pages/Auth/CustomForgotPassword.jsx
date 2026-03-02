import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function CustomForgotPassword({ status, success }) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/forgot-password', {
            email,
        }, {
            onFinish: () => setProcessing(false),
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <>
            <Head title="Forgot Password - FreshSip" />
            
            <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
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
                            <Link href="/login" className="font-medium text-fresh-orange hover:text-fresh-dark">
                                back to login
                            </Link>
                        </p>
                    </div>

                    {(status || success) && (
                        <div className="rounded-md bg-green-50 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        {success || status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-primary">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 8 0 018 0z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : 'Send Password Reset Link'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
