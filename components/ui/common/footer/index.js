export default function Footer() {
  return (
    <footer className="bg-indigo-900 pt-1 w-full rounded-md mt-4">
      <div className="container mx-auto px-6">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-4">
            <p className="mb-6 text-white text-sm text-primary-2 font-bold">
              &copy;{new Date().getFullYear()} Mimi Market
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
