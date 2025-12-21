import Link from 'next/link';

export default function TopBar() {
  return (
    <nav className="flex w-full items-center justify-center space-x-4 border-b bg-zinc-50 font-sans dark:bg-black">
      <Link href="/" className="text-sm text-gray-300 hover:text-white">
        Home
      </Link>
      <Link href="/login" className="text-sm text-gray-300 hover:text-white">
        Login
      </Link>
      <Link href="/projects" className="text-sm text-gray-300 hover:text-white">
        Projects
      </Link>
    </nav>
  );
}
