"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          Track Your Fitness Goals
        </Link>
        <nav>
          {session ? (
            <ul className="flex space-x-4">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/posts">Social Feed</Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;