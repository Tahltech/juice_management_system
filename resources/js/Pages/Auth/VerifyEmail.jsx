import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Email Verification - FreshSip" />
            
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
                        Verify Your Email
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 text-sm text-secondary">
                        Thanks for signing up! Before getting started, could you verify
                        your email address by clicking on the link we just emailed to
                        you? If you didn't receive the email, we will gladly send you
                        another.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-sm font-medium text-green-800">
                                A new verification link has been sent to the email address
                                you provided during registration.
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-fresh-orange hover:bg-fresh-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fresh-orange disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Resend Verification Email'}
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="ml-4 text-sm text-secondary underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-fresh-orange focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
