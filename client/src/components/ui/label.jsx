export function Label({ children, className = "" }) {
    return <label className={`text-white text-lg font-semibold ${className}`}>{children}</label>;
  }
  