"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Placements", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-white py-5"
      }`}
    >
      {/* Top Info Bar - Hidden on scroll for a cleaner look */}
      <div 
        className={`hidden md:block border-b border-gray-100 overflow-hidden transition-all duration-300 ${
          isScrolled ? "max-h-0 opacity-0 mb-0" : "max-h-10 opacity-100 mb-4"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-xs font-semibold text-slate-500 pb-2">
          <div className="flex gap-8">
            <a href="tel:+9189090864545" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Phone size={14} className="text-blue-600" />
              <span>+91 9600883379</span>
            </a>
            <a href="mailto:info@waretech.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Mail size={14} className="text-blue-600" />
              <span>info@skillqon.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-blue-600 cursor-pointer">Support</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="hover:text-blue-600 cursor-pointer">Policy</span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Container */}
        <div className="relative h-10 w-36 md:w-44 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <Image
            src="/images/Skillqon_Logo.webp"
            alt="Skillqon Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <a
                href={link.href}
                className="text-[15px] font-medium text-slate-800 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-slate-900 hover:bg-blue-600 text-white px-7 py-2.5 rounded text-sm font-bold transition-all active:scale-95 shadow-lg shadow-slate-200">
            Free Consultation
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-white z-[60] shadow-2xl transform transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <div className="relative h-8 w-32">
               <Image src="/images/Skillqon_Logo.webp" alt="Logo" fill className="object-contain object-left" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-slate-50 rounded-full"
            >
              <X size={24} className="text-slate-900" />
            </button>
          </div>

          <ul className="space-y-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-2xl font-bold text-slate-900 hover:text-blue-600 flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10 border-t border-slate-100">
             <div className="flex flex-col gap-4">
                <p className="text-sm font-medium text-slate-500">Ready to upskill?</p>
                <button className="w-full bg-blue-600 text-white py-4 rounded font-bold text-lg shadow-xl shadow-blue-100">
                  Get Started
                </button>
             </div>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;