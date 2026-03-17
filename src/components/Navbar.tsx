"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/Button";

// 1. Custom Hook for Scroll Logic (Senior Pattern: Decoupling)
const useScroll = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
  return isScrolled;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScroll();

  // 2. Body Lock (Senior Pattern: Using robust overflow management)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Placements", href: "#placements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] py-3"
            : "bg-white py-5"
        }`}
      >
        {/* --- Top Info Bar: Modern Collapsible Logic --- */}
        <div
          className={`hidden md:grid transition-all duration-500 ease-in-out overflow-hidden ${
            isScrolled
              ? "grid-rows-[0fr] opacity-0"
              : "grid-rows-[1fr] opacity-100 mb-4"
          }`}
        >
          <div className="min-h-0 container mx-auto px-6 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <div className="flex gap-10">
              <a
                href="tel:+919600883379"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Phone size={12} className="text-blue-600" /> +91 9600883379
              </a>
              <a
                href="mailto:info@skillqon.com"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Mail size={12} className="text-blue-600" /> info@skillqon.com
              </a>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/support" className="hover:text-blue-600">
                Support
              </Link>
              <Link href="/policy" className="hover:text-blue-600">
                Policy
              </Link>
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-6 flex justify-between items-center">
          {/* Brand Identity */}
          <Link
            href="/"
            className="relative h-9 w-32 md:w-40 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/Skillqon_Logo.webp"
              alt="Skillqon Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation: Geometric Precision */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-semibold text-slate-600 hover:text-blue-600 transition-all relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            <Button onClick={() => console.log("clicked")}>Consultation</Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2.5 bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-100 transition-all"
            aria-label="Toggle Navigation"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* --- Mobile Sidebar System --- */}
      <div
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-500 lg:hidden z-[60] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 w-[90%] max-w-[400px] h-full bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transform transition-transform duration-500 cubic-bezier(0.4,0,0.2,1) lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="relative h-7 w-28">
              <Image
                src="/images/Skillqon_Logo.webp"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 bg-slate-950 text-white rounded-full hover:rotate-90 transition-all duration-300 shadow-xl"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li key={link.name} className="overflow-hidden">
                <Link
                  href={link.href}
                  className={`text-2xl font-bold text-slate-900 flex items-center justify-between py-5 border-b border-slate-50 group transition-all duration-500 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 75}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="group-hover:text-blue-600 group-hover:pl-2 transition-all">
                    {link.name}
                  </span>
                  <ArrowRight
                    size={22}
                    className="text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                Systems Support
              </p>
              <p className="text-xl font-bold text-slate-900">+91 9600883379</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-200 active:scale-[0.98] transition-all">
              Initialize Project
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
