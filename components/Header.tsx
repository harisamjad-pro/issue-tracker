import Link from "next/link";
import { TbCopyCheckFilled } from "react-icons/tb";
import React from "react";

const mainLinks = [
  { href: "/features", label: "Features" },
  { href: "/ai", label: "AI Magic" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg">
      <nav className="flex items-center justify-between gap-6 px-24 py-4 text-sm font-medium bg-white">
        {/* Left Section */}
        <ul className="flex w-2/3 items-center justify-between gap-6">
          {/* Logo */}
          <li>
            <button
              className="flex items-center gap-2 text-xl font-semibold text-black"
            >
              <TbCopyCheckFilled className="size-8" />
              trako
            </button>
          </li>

          {/* Main Navigation */}
          <li>
            <ul className="flex items-center gap-6 rounded-full bg-black/5 px-8 py-3 text-black">
              {mainLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Right Section */}
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/"
              className="rounded-full bg-blue-600/90 px-6 py-3 text-white transition-colors hover:bg-blue-600"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
