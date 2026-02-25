import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function ResetPassword({ token, email, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Reset Password - FreshSip" />
            
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
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-secondary">
                        Or{' '}
                        <Link href="/login" className="font-medium text-fresh-orange hover:text-fresh-dark">
                            back to login
                        </Link>
                    </p>
                </div>

                {status && (
                    <div className="rounded-md bg-green-50 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {status}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div>
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
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-primary">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-primary placeholder-tertiary text-primary rounded-md focus:outline-none focus:ring-fresh-orange focus:border-fresh-orange sm:text-sm"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
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
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                        {errors.password_confirmation && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fresh-orange hover:bg-fresh-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fresh-orange disabled:opacity-50"
                        >
                            {processing ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
