import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

import App from "./app/app";
import { ErrorFallback } from "./util/ErrorFallback";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById("root")
);
