"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "react-toastify";
import { errorMessageList } from "./constants";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ExpectedErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by Expected Error Boundary:", error, errorInfo);
    const userFrendlyMessage = errorMessageList[error.message] ?? error.message;
    toast.error(userFrendlyMessage);
  }

  render() {
    return this.props.children;
  }
}
