export default function Button({
  children,
  className,
  variant = "purple",
  hoverable = true,
  ...rest
}) {
  const variants = {
    purple: `text-white bg-indigo-600 ${hoverable && "hover:text-indigo-700"}`,
    green: `text-white bg-green-600 ${hoverable && "hover:text-green-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:text-red-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && "hover:text-indigo-200"
    }`,
    white: `text-black bg-white`,
  };
  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed p-2 sm:px-8 xs:py-3 rounded-md border text-base font-medium ${className} ${variants[variant]} `}
    >
      {children}
    </button>
  );
}
