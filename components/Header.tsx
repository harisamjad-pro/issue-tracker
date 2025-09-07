import Link from "next/link";
import { TbCopyCheckFilled } from "react-icons/tb";
import React from "react";

const mainLinks = [
  { href: "/product", label: "Product", child: [] },
  { href: "/ai", label: "AI Assistant", child: [] },
  { href: "/pricing", label: "Pricing", child: [] },
  {
    href: "/resources", label: "Resources", child: [
      { href: "/docs", label: "Docs", child: [] },
      { href: "/blogs", label: "Blog", child: [] },
      { href: "/api", label: "API", child: [] },
    ]
  },
  { href: "/about", label: "About", child: [] },
  { href: "/contact", label: "Contact", child: [] },
];

export default function Header() {
  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between gap-6 px-24 py-4 text-sm font-medium bg-white">
        {/* Left Section */}
        <ul className="flex w-2/3 items-center justify-between gap-6">
          {/* Logo */}
          <li>
            <button
              className="flex items-center gap-2 text-base font-semibold text-black"
            >
              <TbCopyCheckFilled className="size-6" />
              IssueTracker
            </button>
          </li>

          {/* Main Navigation */}
          <li>
            <ul className="flex items-center gap-6 text-black">
              {mainLinks.map(({ href, label, child }) => (
                <li key={label} className="relative group">
                  <Link
                    href={href}
                    className={`hover:text-blue-600 group-hover:text-blue-600 transition-colors`}
                  >
                    {label}
                  </Link>
                  {child.length > 0 && (
                    <ul className="bg-transparent absolute left-0 z-10 w-48 rounded-xl border border-gray-200 hidden group-hover:block">
                      {child?.map(({ href, label }) => (
                        <li key={label}>
                          <Link
                            href={href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Right Section */}
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href={"signin"}
              className="hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
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
