import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  // A - this method is used to render a FALLBACK UI after an error is thrown
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  // B - is used to log the error information
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  // in development mode we will always see the error - it works only in production mode of webpack
  // children here are those tags wrapped by <ErrorBoundary></ErrorBoundary>
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
