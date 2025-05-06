export function Card({ children, className = "" }) {
    return (
      <div className={`text-white rounded-lg shadow-lg p-6 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
