import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';

import App from './app/app';
import { ErrorFallback } from './util/ErrorFallback';

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
