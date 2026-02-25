import React from 'react';
import { useToast } from './ToastProvider';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log error to console for debugging
        console.error('Error caught by boundary:', error, errorInfo);

        // Show toast notification to user
        if (this.props.showToast) {
            // Import toast here to avoid circular dependency
            import('./ToastProvider').then(({ toast }) => {
                toast.error('Something went wrong. Please refresh the page and try again.', {
                    autoClose: 5000,
                });
            });
        }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Something went wrong
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                We encountered an unexpected error. Please refresh the page and try again.
                            </p>
                        </div>
                        <div className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Refresh Page
                                </button>
                            </div>
                            <div className="text-center">
                                <a href="/" className="font-medium text-green-600 hover:text-green-500">
                                    Go to Homepage
                                </a>
                            </div>
                        </div>
                        
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-6 p-4 bg-red-50 rounded-md">
                                <h3 className="text-sm font-medium text-red-800">Error Details (Development Only):</h3>
                                <pre className="mt-2 text-xs text-red-700 overflow-auto">
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
