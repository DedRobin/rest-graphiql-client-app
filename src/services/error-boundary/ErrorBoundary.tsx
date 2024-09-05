"use client";

import { Component, ReactNode } from "react";
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
  }

  static getDerivedStateFromError() {}

  componentDidCatch(error: Error) {
    const userFrendlyMessage = errorMessageList[error.message] ?? error.message;
    toast.error(userFrendlyMessage);
  }

  render() {
    return this.props.children;
  }
}
