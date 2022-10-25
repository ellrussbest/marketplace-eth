export default function Button({
  children,
  className,
  variant = "purple",
  ...rest
}) {

  const variants = {
    purple: "text-white bg-indigo-600 hover:text-indigo-700",
    red: "text-white bg-red-600 hover:text-red-700",
  };
  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-md border text-base font-medium ${className} ${variants[variant]} `}
    >
      {children}
    </button>
  );
}
