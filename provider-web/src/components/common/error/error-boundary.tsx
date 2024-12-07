import React, { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Error from "@/app/error";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return <Error error={error} />;
};

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
