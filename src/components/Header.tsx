import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] dark:border-b-gray-700 px-4 md:px-10 py-3 bg-white dark:bg-[#1a2632]">
      <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
        <div className="size-8 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined !text-3xl">school</span>
        </div>
        <Link to="/">
          <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            RUPP Payment Portal
          </h2>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link
            className="text-[#0d141b] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-[#0d141b] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
            to="/about"
          >
            About Us
          </Link>
          <a
            className="text-[#0d141b] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            Courses
          </a>
          <a
            className="text-[#0d141b] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            Contact
          </a>
        </div>
        <div className="flex gap-2">
          <Link to="/login">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
              <span className="truncate">Login</span>
            </button>
          </Link>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7edf3] dark:bg-gray-700 hover:bg-[#dbe4ef] dark:hover:bg-gray-600 text-[#0d141b] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate">Register</span>
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <span className="material-symbols-outlined cursor-pointer">menu</span>
      </div>
    </header>
  );
}
