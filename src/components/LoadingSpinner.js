const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
      ></path>
    </svg>
  </div>
);

export default LoadingSpinner;
