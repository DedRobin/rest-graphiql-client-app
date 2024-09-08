"use client";

import { Component, ReactNode } from "react";
import { toast } from "react-toastify";

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
  }

  static getDerivedStateFromError() {}

  componentDidCatch(error: Error) {
    toast.error(error.message);
  }

  render() {
    return this.props.children;
  }
}
