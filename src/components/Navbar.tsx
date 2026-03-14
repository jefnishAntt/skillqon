"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Use Next.js Link for better routing

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Lock Body Scroll when Mobile Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // More robust for mobile
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    // { name: "Home", href: "" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Placements", href: "#placements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2"
            : "bg-white py-4"
        }`}
      >
        {/* --- Top Info Bar --- */}
        <div
          className={`hidden md:block border-b border-gray-100 transition-all duration-300 origin-top ${
            isScrolled
              ? "scale-y-0 opacity-0 h-0"
              : "scale-y-100 opacity-100 h-10 mb-2"
          }`}
        >
          <div className="container mx-auto px-6 flex justify-between items-center text-xs font-semibold text-slate-500">
            <div className="flex gap-8">
              <a
                href="tel:+919600883379"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Phone size={14} className="text-blue-600" />
                <span>+91 9600883379</span>
              </a>
              <a
                href="mailto:info@skillqon.com"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Mail size={14} className="text-blue-600" />
                <span>info@skillqon.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/support" className="hover:text-blue-600">
                Support
              </Link>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <Link href="/policy" className="hover:text-blue-600">
                Policy
              </Link>
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-10 w-36 md:w-44 transition-transform active:scale-95"
          >
            <Image
              src="/images/Skillqon_Logo.webp"
              alt="Skillqon Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-[15px] font-medium text-slate-700 hover:text-blue-600 transition-colors py-2"
                >
                  {link.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* CTA & Burger */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm">
              Free Consultation
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* --- Mobile Sidebar (Moved outside header for z-index containment) --- */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-[60] ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <div className="relative h-8 w-32">
              <Image
                src="/images/Skillqon_Logo.webp"
                alt="Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-slate-100 text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li
                key={link.name}
                style={{
                  transitionDelay: isOpen ? `${i * 50 + 100}ms` : "0ms",
                  transform: isOpen ? "translateX(0)" : "translateX(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
                className="transition-all duration-300"
              >
                <Link
                  href={link.href}
                  className="text-xl font-semibold text-slate-800 hover:text-blue-600 flex items-center justify-between py-4 border-b border-slate-50 group"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ArrowRight
                    size={20}
                    className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-sm font-semibold text-slate-600 mb-1">
                Talk to an expert
              </p>
              <p className="text-lg font-bold text-slate-900">+91 9600883379</p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]">
              Get Started Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
