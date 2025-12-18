import Link from 'next/link';

export default function TarBar() {
  return (
    <nav className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
}
