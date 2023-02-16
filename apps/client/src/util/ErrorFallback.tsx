
interface ErrorFallbackProps  {
    error: Error
}

const resetErrorBoundary = () => {
    window.location.href = '/'
}

export const ErrorFallback = ({ error } : ErrorFallbackProps) => {
    return (
 <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={() => resetErrorBoundary()}>Try again</button>
      </div>
       
    )
}