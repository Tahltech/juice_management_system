import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Confirm Password - FreshSip" />
            
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
                        Confirm Your Password
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 text-sm text-secondary">
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </div>

                    <form onSubmit={submit}>
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
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-fresh-orange hover:bg-fresh-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fresh-orange disabled:opacity-50"
                            >
                                {processing ? 'Confirming...' : 'Confirm'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
