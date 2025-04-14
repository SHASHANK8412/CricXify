import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg m-4">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-red-500 mb-4">We've encountered an error and our team has been notified.</p>
          <details className="text-gray-700 text-sm">
            <summary className="cursor-pointer">Error details (for developers)</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
              {this.state.error && this.state.error.toString()}
            </pre>
            {this.state.errorInfo && (
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </details>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 