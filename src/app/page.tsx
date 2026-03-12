"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Search,
  Menu,
  Phone,
  Mail,
  Play,
  BarChart2,
  Settings,
  LifeBuoy,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Check,
  Target,
  Eye,
  ArrowUpRight,
  LucideIcon,
  Quote,
  ChevronLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { SERVICES_DATA, TESTIMONIALS_DATA } from "@/config";

// --- Components ---

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  items,
}) => {
  return (
    <div className="group relative bg-white p-10 lg:p-14 rounded border border-slate-100 transition-all duration-700 ease-in-out hover:shadow-[0_64px_96px_-12px_rgba(2,6,23,0.08)] overflow-hidden flex flex-col h-full">
      {/* Structural Accent - Top bar replaced with a subtle corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Minimalist Icon Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-slate-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
            <Icon
              size={40}
              strokeWidth={1}
              className="relative text-slate-400 group-hover:text-blue-600 transition-colors duration-500"
            />
          </div>
          {/* Index or Category Marker */}
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            Capability
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-slate-900 mb-5 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-500 text-base leading-relaxed mb-6 font-medium">
            {description}
          </p>
        </div>

        {/* Technical Features Grid */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-400 transition-colors" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// --- New Components ---

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollMetrics = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Added a small buffer for precision
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      updateScrollMetrics();
      // Use ResizeObserver for better performance than window resize
      const resizeObserver = new ResizeObserver(updateScrollMetrics);
      resizeObserver.observe(el);
      return () => resizeObserver.disconnect();
    }
  }, [updateScrollMetrics]);

  const handleNav = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FDFDFD] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-blue-600 font-semibold border-l-4 border-blue-600 pl-3 mb-4 block uppercase text-sm tracking-widest">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1]">
              Trusted by the world's <br />
              <span className="text-slate-400 italic font-serif">
                most ambitious
              </span>{" "}
              teams.
            </h2>
          </div>

          {/* Inline Navigation for Desktop */}
          <div className="hidden md:flex gap-3 mb-2">
            <button
              onClick={() => handleNav("left")}
              disabled={!canScrollLeft}
              className={`p-4 rounded-full border border-slate-200 transition-all ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-50 active:scale-90"}`}
            >
              <ChevronLeft size={20} className="text-slate-900" />
            </button>
            <button
              onClick={() => handleNav("right")}
              disabled={!canScrollRight}
              className={`p-4 rounded-full border border-slate-200 transition-all ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-50 active:scale-90"}`}
            >
              <ChevronRight size={20} className="text-slate-900" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Subtle Edge Fades */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#FDFDFD] to-transparent transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#FDFDFD] to-transparent transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
          />

          {/* Carousel Track */}
          <div
            ref={scrollRef}
            onScroll={updateScrollMetrics}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 no-scrollbar"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE/Edge */,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* CSS to hide webkit scrollbar */}
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            {TESTIMONIALS_DATA.map((t, i) => (
              <div
                key={i}
                className="min-w-[85vw] md:min-w-[480px] snap-start bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <Quote className="size-8 text-blue-600/10 mb-8" />
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-50">
                  <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white shadow-sm">
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                      {t.name}
                    </h4>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueStrip = () => {
  const pillars = [
    {
      icon: <BarChart2 size={24} />,
      title: "Business Strategy",
      desc: "Sales consulting & digital transformation.",
    },
    {
      icon: <Rocket size={24} />,
      title: "Industry EdTech",
      desc: "Professional certifications & training.",
    },
    {
      icon: <Settings size={24} />,
      title: "Digital Dev",
      desc: "Custom software & app solutions.",
    },
  ];

  return (
    <div className="bg-blue-700 text-white py-6 md:py-8 relative overflow-hidden border-t border-blue-600">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      {/* MOBILE: Infinite Marquee (Shown only on small screens) */}
      <div className="flex md:hidden overflow-hidden select-none">
        <div className="flex animate-infinite-scroll gap-8 items-center min-w-full px-4">
          {/* We duplicate the array to create a seamless loop */}
          {[...pillars, ...pillars].map((pillar, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 shrink-0 pr-8 border-r border-white/10"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                {pillar.icon}
              </div>
              <div className="whitespace-nowrap">
                <h4 className="font-bold text-sm leading-none">
                  {pillar.title}
                </h4>
                <p className="text-blue-100/60 text-[10px]">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: Static Grid (Shown only on md screens and up) */}
      <div className="hidden md:block container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-3 gap-12">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex items-start gap-5 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-blue-700 transition-all duration-300">
                {pillar.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg leading-none mb-1.5">
                  {pillar.title}
                </h4>
                <p className="text-blue-100/70 text-xs leading-tight">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function WaretechLanding() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen pb-16 lg:pb-20 flex flex-col overflow-hidden">
        <div className="flex-grow flex items-center justify-center px-4 py-20 lg:py-10">
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 w-full">
              {/* Content Column */}
              <div className="flex-1 z-10 text-center lg:text-left">
                <header>
                  <span className="text-blue-700 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">
                    Next level automation system
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 leading-[1.1] tracking-tighter mb-6">
                    Modern Tech Support <br className="hidden lg:block" />
                    <span className="text-blue-600">
                      Built for Reliability.
                    </span>
                  </h1>
                </header>

                <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  We specialize in premium web design, high-performance hosting,
                  and custom software engineering designed to scale your
                  business infrastructure.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                  <button
                    type="button"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    Start Your Project
                  </button>

                  {/* Social Proof */}
                  <div className="flex flex-col items-center lg:items-start gap-3">
                    <div className="flex -space-x-2.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"
                        />
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                        2K+
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Trusted by 2,500+ Companies
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Column */}
              <div className="flex-1 w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[480px] lg:max-w-[550px] aspect-[4/3]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-50/50 rounded-full blur-2xl" />
                  <div className="relative z-10 w-full h-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-100">
                    <Image
                      src="/images/hero_sec_1.webp"
                      alt="Cloud computing"
                      fill
                      priority
                      className="object-cover object-bottom-left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Strip - Anchored at the bottom */}
        <div className="w-full border-t border-slate-100 bg-white/50 backdrop-blur-sm">
          <ValueStrip />
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">
          {/* Left Column: Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="relative grid grid-cols-12 gap-4 items-center">
              {/* Main Large Image (Top Left) */}
              <div className="col-span-7 h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/images/hero_sec_1.webp"
                  alt="Team Collaboration"
                  fill
                  className="object-cover"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>

              {/* Secondary Image (Bottom Right) */}
              <div className="col-span-5 h-[300px] md:h-[380px] relative rounded-2xl overflow-hidden shadow-xl mt-20 border-8 border-white">
                <Image
                  src="/images/hero_sec_1.webp"
                  alt="Digital Strategy"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-30">
                <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-800 flex items-center gap-4 min-w-[200px] backdrop-blur-sm animate-float">
                  {/* Icon/Circle Decor */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Decorative pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-blue-500/50 animate-ping opacity-20" />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black tracking-tight leading-none">
                        12+
                      </span>
                      <span className="text-blue-500 font-bold text-xs uppercase tracking-wider">
                        Years
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-none mt-1">
                      Professional Excellence
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -z-10 -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:w-1/2">
            <span className="text-blue-600 font-semibold border-l-4 border-blue-600 pl-3 mb-4 block uppercase text-sm tracking-widest">
              About Company
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              We provide digital experience services
            </h2>

            {/* Mission & Vision Tabs/Blocks */}
            <div className="space-y-6 mb-10">
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="text-blue-600" size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                    Our Mission
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed pl-8 border-l border-slate-100">
                  To bridge the gap between education and industry by developing
                  innovative solutions that empower individuals and create
                  long-term value for society.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="text-blue-600" size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-sm tracking-wider">
                    Our Vision
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed pl-8 border-l border-slate-100">
                  To become a trusted global partner in business consulting and
                  EdTech, shaping the future of work through technology-driven
                  learning solutions.
                </p>
              </div>
            </div>

            <hr className="mb-10 border-slate-100" />

            {/* Core Services Grid */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
              Our Core Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <BarChart2 size={20} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Business Consulting
                </h4>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <Rocket size={20} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  EdTech Solutions
                </h4>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <Settings size={20} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Tech Development
                </h4>
              </div>
            </div>

            <button className="mt-12 bg-slate-900 hover:bg-blue-600 text-white px-10 py-4 rounded font-bold transition-all shadow-lg active:scale-95">
              Explore All Services
            </button>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          {/* Header with better visual hierarchy */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
            <div className="max-w-3xl">
              <span className="text-blue-600 font-semibold border-l-4 border-blue-600 pl-3 mb-4 block uppercase text-sm tracking-widest">
                Our Services
              </span>
              <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 leading-[1.1] tracking-tighter">
                Integrated solutions for the <br />
                <span className="text-blue-600">digital economy.</span>
              </h2>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-slate-500 text-lg leading-relaxed border-l-2 border-slate-200 pl-6">
                We bridge the gap between academic theory and enterprise
                execution through our three-pillar framework.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Trusted By: Refined Logo Strip */}
          <div className="mt-32">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-12">
              Global Strategic Partners
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
              {/* Using text logos as placeholders - ideally use SVG images here */}
              {["ORACLE", "IBM", "INTEL", "CISCO", "SAP"].map((brand) => (
                <span
                  key={brand}
                  className="font-black text-2xl tracking-tighter text-slate-900"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Placements Section */}
      <section className="bg-white py-16 lg:py-20 border-y border-slate-100">
        <div className="container mx-auto px-4">
          {/* Header Area - Clean & Direct */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-blue-600 font-semibold border-l-4 border-blue-600 pl-3 block uppercase text-sm">
                  Career Impact
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
                Where elite talent meets <br className="hidden md:block" />
                <span className="text-slate-400">industry leaders.</span>
              </h2>
            </div>
            <div className="flex gap-12">
              <div>
                <div className="text-3xl font-bold text-slate-900">94%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Placement Rate
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">₹120k</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Avg. Package
                </div>
              </div>
            </div>
          </div>

          {/* The Grid - Minimalist approach */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Feature - Editorial style */}
            <div
              className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl
                /* Mobile: Let height be determined by aspect ratio */
                aspect-[4/5] sm:aspect-video 
                /* Desktop: Lock to a specific height for grid alignment */
                lg:h-[500px] lg:aspect-auto"
            >
              {/* Gradient Overlay: Increased opacity on mobile for better text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10 opacity-90 lg:opacity-100" />

              <Image
                src="/images/hero_sec_1.webp"
                alt="Alex Rivera - Placed at Google"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                priority
              />

              {/* Content Container: Adjusted padding and alignment for mobile */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="px-3 py-1 bg-blue-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg shadow-blue-900/20">
                    Placed at Oracle
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none">
                  Alex Rivera
                </h3>

                <p className="text-slate-300 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] mt-2 md:mt-3 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-blue-500 hidden md:block"></span>
                  Senior Software Engineer
                </p>
              </div>
            </div>

            {/* Side Content - High Information Density */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-10 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6">
                    <Rocket size={20} className="text-blue-600" />
                  </div>
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    "The curriculum was intense, but the placement support was
                    the ultimate game changer for my career trajectory."
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-300 border-2 border-white shadow-sm" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm tracking-tight">
                      Alumni Testimonial
                    </p>
                    <p className="text-xs text-slate-500 font-medium italic">
                      Class of 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Strip - Subtle & Blended */}
          <div className="mt-16 py-10 border-t border-slate-100">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-items-center justify-between items-center gap-y-10 gap-x-8 opacity-40 grayscale">
              {["MICROSOFT", "ADOBE", "META", "AMAZON"].map((logo) => (
                <span
                  key={logo}
                  className="text-xs md:text-sm font-black tracking-[0.3em] hover:opacity-100 transition-opacity cursor-default whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <Testimonials />
      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to transform your digital infrastructure?
              </h2>
              <p className="text-blue-100 text-lg mb-10">
                Join over 2,500 companies that trust Waretech for their
                mission-critical IT solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors">
                  Start Your Project
                </button>
                <button className="bg-blue-700 text-white border border-blue-500 px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
{
  /* <Head>
        <title>Waretech - IT Solutions & Technology</title>
      </Head> */
}
