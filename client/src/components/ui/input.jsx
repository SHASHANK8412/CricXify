export function Input({ type = "text", name, value, onChange, className = "", ...props }) {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-gray-800 border-gray-500 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 shadow-md ${className}`}
        {...props}
      />
    );
  }
  