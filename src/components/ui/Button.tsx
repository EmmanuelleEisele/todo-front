export default function Button({
  children,
  className = '', 
  variant = 'default',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' | 'light' }) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-orange-600 text-white hover:bg-orange-700 border-none',
    ghost: 'bg-transparent text-orange-700 hover:bg-orange-100 border-none',
    light: 'bg-white text-orange-700 hover:bg-orange-50 border-2 border-orange-300',
  };
  const variantStyles = variants[variant];
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
