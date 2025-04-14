export function Button({ children, type = "button", className = "", onClick }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition shadow-md hover:shadow-lg ${className}`}
      >
        {children}
      </button>
    );
  }
  