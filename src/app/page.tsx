"use client";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
  ArrowRight,
  Plus,
  Hash,
} from "lucide-react";
import Image from "next/image";
import { SERVICES_DATA, TESTIMONIALS_DATA } from "@/config";
import { Button } from "@/ui/Button";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useContactModal } from "./ContextProvider";

// --- Components ---

interface ServiceCardProps {
  title: string;
  description: string;
  items: string[];
  index: number;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

// --- Sub Components ---

const ServiceRow = ({ title, description, items, index }: ServiceCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Memoized toggle to prevent recreation on every render
  const toggleOpen = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    [],
  );

  // Desktop hover guard
  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) setIsOpen(false);
  };

  return (
    <section
      className="group relative border-b border-slate-100 transition-colors duration-500 ease-in-out hover:bg-slate-50/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Background Accent - Optimized with will-change */}
      <div
        className={`absolute inset-0 bg-blue-600/3 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] -z-10 will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      />

      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        className="w-full text-left py-6 lg:py-12 px-4 lg:px-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-start lg:items-center gap-4 lg:gap-8 relative z-10">
          {/* Index & Mobile Title */}
          <div className="flex items-center justify-between w-full lg:contents">
            <div className="flex items-center gap-4 lg:col-span-1">
              <span className="font-mono text-[11px] text-blue-600 font-bold tabular-nums">
                {index.toString().padStart(2, "0")}
              </span>
              <h3 className="lg:hidden text-xl font-bold text-slate-900 uppercase tracking-tight">
                {title}
              </h3>
            </div>

            {/* Desktop Title */}
            <div className="hidden lg:block lg:col-span-5">
              <h3
                className={`text-4xl font-bold text-slate-900 tracking-tight uppercase transition-transform duration-500 ease-out ${isOpen ? "translate-x-3" : "translate-x-0"}`}
              >
                {title}
              </h3>
            </div>

            {/* Mobile Chevron */}
            <div className="lg:hidden">
              <ChevronRight
                size={20}
                className={`transition-transform duration-500 text-slate-400 ${isOpen ? "rotate-90 text-blue-600" : ""}`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-4">
            <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed max-w-prose">
              {description}
            </p>
          </div>

          {/* Icon */}
          <div
            className={`hidden lg:flex w-12 h-12 items-center justify-center rounded-full border transition-all duration-500 ${
              isOpen
                ? "bg-slate-900 border-slate-900 text-white scale-110"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <ChevronRight
              size={18}
              className={`transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* 2. Expanded Pane - Using Grid for True 0 -> Auto Transition */}
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-10"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="lg:ml-[8.33%] pt-8 border-t border-slate-100 px-4 lg:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-y-4 gap-x-12">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-700 delay-[${i * 50}ms] ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  // align: "center" is the key for that premium "focus" feel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: false, // Set to false for cleaner "snap" to center
    containScroll: false, // Allow partial visibility of outer cards
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnEnabled(api.canScrollPrev());
    setNextBtnEnabled(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-slate-50 overflow-hidden border-t border-slate-100 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header remains the same... */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-950 leading-[0.9] tracking-tighter uppercase italic">
            Built for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">
              Ambitious.
            </span>
          </h2>
        </div>

        <div className="relative group/carousel">
          {/* Desktop Navigation - Hidden pointer events so they don't block the cards */}
          <div className="hidden xl:flex absolute top-1/2 -translate-y-1/2 -left-8 -right-8 justify-between pointer-events-none z-30 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
             <NavButton onClick={scrollPrev} disabled={!prevBtnEnabled} icon={<ChevronLeft />} className="pointer-events-auto" />
             <NavButton onClick={scrollNext} disabled={!nextBtnEnabled} icon={<ChevronRight />} className="pointer-events-auto" />
          </div>

          <div className="embla overflow-visible" ref={emblaRef}>
            <div className="embla__container flex -ml-4 lg:-ml-12">
              {TESTIMONIALS_DATA.map((t, i) => {
                const isActive = selectedIndex === i;
                
                return (
                  <div
                    key={i}
                    className="embla__slide flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_45%] pl-4 lg:pl-12 min-w-0"
                  >
                    <article 
                      className={`
                        relative h-full flex flex-col bg-white p-8 lg:p-14 rounded-xl border border-slate-100 
                        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
                        ${isActive 
                          ? "opacity-100 scale-100 shadow-2xl shadow-blue-900/10" 
                          : "opacity-30 scale-[0.9] grayscale-[0.5] blur-[1px]"
                        }
                      `}
                    >
                      <Quote className={`absolute top-10 right-10 size-12 transition-colors duration-700 ${isActive ? 'text-blue-50' : 'text-slate-50'}`} />

                      <div className="relative z-10 flex-grow">
                        <p className={`text-xl lg:text-2xl leading-relaxed font-light mb-12 transition-colors duration-700 ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                          &ldquo;{t.content}&rdquo;
                        </p>
                      </div>

                      <footer className="flex items-center gap-5 pt-8 border-t border-slate-50">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden" />
                        <div className="flex flex-col">
                          <cite className="not-italic font-black text-slate-900 text-[11px] uppercase tracking-widest">
                            {t.name}
                          </cite>
                          <span className="text-[10px] font-bold text-blue-600/50 uppercase tracking-[0.15em] mt-1.5">
                            {t.role}
                          </span>
                        </div>
                      </footer>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Pagination (Simplified dots or buttons) */}
          <div className="flex justify-center gap-2 mt-12">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${selectedIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NavButton = memo(({ onClick, disabled, icon, className = "" }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center w-14 h-14 rounded-full 
      bg-white border border-slate-200 text-slate-900
      transition-all duration-300 ease-out
      hover:bg-slate-900 hover:text-white hover:border-slate-900
      disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white
      focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
      ${className}
    `}
    aria-label="Carousel navigation"
  >
    {icon}
  </button>
));

NavButton.displayName = "NavButton";


// --- Main Components ---
export default function Home() {
  const { openModal } = useContactModal();
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col justify-between overflow-hidden bg-white">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-radial-gradient from-blue-50/40 to-transparent opacity-60" />

        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-24">
          <div className="grid lg:grid-cols-12 items-center gap-12">
            {/* Content Column - Spans 7/12 for better visual balance */}
            <div className="lg:col-span-7 z-10 text-center lg:text-left">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-[0.15em] font-mono px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                Built for Your Business
              </span>

              <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 leading-[1.05] tracking-tight mt-6 mb-8">
                Modern Tech Support <br className="hidden xl:block" />
                <span className="text-slate-400 font-light">Refined for </span>
                <span className="text-blue-600">Reliability.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                High-performance hosting, bespoke web design, and custom
                software engineering architected to scale your digital
                infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
                <Button onClick={openModal}>
                  Start Your Project
                </Button>

                {/* Refined Social Proof */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="relative w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 overflow-hidden"
                      >
                        <Image
                          src={`/images/user-${i}.webp`} // Replace with your actual path
                          alt={`Team member ${i}`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 leading-none">
                      2,500+
                    </div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Trusted Partners
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Column - Spans 5/12 */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] lg:aspect-square group">
                {/* Clean, architectural shadow and border */}
                <div className="absolute -inset-4 bg-blue-50/50 rounded-[2rem] blur-2xl group-hover:bg-blue-100/50 transition-colors duration-500" />

                <div className="relative h-full w-full rounded-3xl border border-slate-200/60 bg-white p-3 shadow-2xl overflow-hidden">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden bg-slate-50">
                    <Image
                      src="/images/hero_sec_1.webp"
                      alt="Cloud computing architecture"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Floating "Stat" Card - Adds a senior UI touch */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-float">
                  <div className="text-sm text-slate-400 mb-1">Uptime</div>
                  <div className="text-2xl font-bold text-blue-600">99.99%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-24 flex flex-col lg:flex-row gap-16">
          {/* Left Column: Image Grid */}
          <div className="lg:w-1/2 relative order-2 lg:order-1">
            <div className="relative grid grid-cols-12 gap-4 items-center">
              {/* Main Large Image (Top Left) */}
              <div className="col-span-7 h-[400px] md:h-[500px] relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/images/hero_sec_1.webp"
                  alt="Team Collaboration"
                  fill
                  className="object-cover"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent" />
              </div>

              {/* Secondary Image (Bottom Right) */}
              <div className="col-span-5 h-[300px] md:h-[380px] relative rounded-lg overflow-hidden shadow-xl mt-20 border-4 border-white">
                <Image
                  src="/images/hero_sec_1.webp"
                  alt="Digital Strategy"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:-bottom-6 md:left-8 md:translate-x-0 z-30 group">
                {/* Container with High-End Glassmorphism */}
                <div className="relative flex items-center gap-5 p-5 pr-8 rounded-md bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-blue-500/30">
                  {/* Visual Indicator: Complex Icon Stack */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center overflow-hidden">
                      {/* Inner Glow */}
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* The Icon */}
                      <div className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Senior Motion Detail: Triple Pulse */}
                    <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[ping_3s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-full border border-blue-400/10 animate-[ping_3s_linear_infinite_1s]" />
                  </div>

                  {/* Numeric Content */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tighter text-white tabular-nums leading-none">
                        12
                        <span className="text-blue-500 font-light ml-0.5">
                          +
                        </span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] self-end mb-1">
                        Years
                      </span>
                    </div>

                    <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent my-1.5" />

                    <p className="text-[9px] text-slate-500 font-medium uppercase tracking-[0.25em] whitespace-nowrap">
                      Professional{" "}
                      <span className="text-slate-300">Excellence</span>
                    </p>
                  </div>

                  {/* Sophisticated Corner Decoration */}
                  <div className="absolute top-0 right-0 p-1 opacity-20">
                    <div className="w-2 h-2 border-t border-r border-blue-400 rounded-tr-sm" />
                  </div>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -z-10 -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:w-1/2 flex flex-col justify-center order-1 lg:order-2">
            {/* 01. Section Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-blue-600/30" />
              <span className="text-blue-600 font-mono text-[11px] uppercase tracking-[0.4em] font-bold">
                Established // 2026
              </span>
            </div>

            {/* 02. Heading Hierarchy - Improved Visual Weight */}
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-[0.85] tracking-tighter uppercase">
              Digital{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-200 to-slate-400">
                Evolution.
              </span>
            </h2>

            {/* Paragraph - Improved Readability with a "Quiet" Border */}
            <p className="text-slate-500 font-light leading-relaxed mb-12 max-w-lg border-l-2 border-blue-600/10 pl-8">
              We architect high-performance infrastructures that bridge the gap
              between{" "}
              <span className="text-slate-900 font-medium italic underline underline-offset-4 decoration-blue-600/20">
                academic theory
              </span>{" "}
              and
              <span className="text-slate-900 font-medium">
                {" "}
                industrial execution.
              </span>
            </p>

            {/* 03. Mission/Vision - Enhanced Card Logic */}
            <div className="flex flex-col mb-12 border-y border-slate-100/80">
              {[
                {
                  icon: <Target size={18} />,
                  title: "Our Mission",
                  text: "Empowering global talent by deploying innovative solutions at the intersection of industry and education.",
                },
                {
                  icon: <Eye size={18} />,
                  title: "Our Vision",
                  text: "To lead as the premier architect for the future of work through technology-driven learning ecosystems.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col md:flex-row items-start gap-6 md:gap-12 py-4 px-4 -mx-4 transition-all duration-500 hover:bg-slate-50 cursor-default"
                >
                  <div className="flex items-center gap-4 md:w-1/3 shrink-0">
                    <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow text-slate-400 group-hover:text-blue-600 transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <div className="md:w-2/3">
                    <p className="text-slate-500 text-[16px] leading-relaxed font-light group-hover:text-slate-800 transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 04. Tactical CTA - Enhanced Interactive State */}
            <div className="flex items-center">
              <Link
                href="#services"
                className="group relative inline-flex items-center gap-6 text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 rounded-full transition-all"
                aria-label="Explore all services"
              >
                {/* Icon Container */}
                <div className="relative w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
                  <ArrowUpRight
                    size={22}
                    className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>

                {/* Text Label Container */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/60 mb-1 group-hover:text-blue-600 transition-colors">
                    Next Step
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.15em] group-hover:translate-x-1 transition-transform duration-300">
                    Explore All Services
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="bg-[#FFFFFF]">
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-24">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-12 mb-24">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black">
                  Our_Services
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[0.85] tracking-tighter uppercase">
                Core <br />
                <span className="text-slate-200">Capabilities.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <p className="text-slate-400 text-lg font-light leading-relaxed border-l border-slate-100 pl-8">
                Discarding the unnecessary to focus on the essential. We
                architect{" "}
                <span className="text-slate-900">bespoke ecosystems</span>{" "}
                designed to function with absolute clarity and refined
                reliability.
              </p>
            </div>
          </div>

          {/* The Service Stack */}
          <div className="border-t border-slate-900/5">
            {SERVICES_DATA.map((service, index) => (
              <ServiceRow key={index} {...service} index={index + 1} />
            ))}
          </div>
        </div>
      </section>
      {/* Placements Section */}
      {/* <section
        id="placements"
        className="bg-white py-16 lg:py-20 border-y border-slate-100"
      >
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div
              className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl
                aspect-[4/5] sm:aspect-video 
                lg:h-[500px] lg:aspect-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10 opacity-90 lg:opacity-100" />

              <Image
                src="/images/hero_sec_1.webp"
                alt="Alex Rivera - Placed at Google"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                priority
              />

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
      </section> */}
      {/* Testimonials Section */}
      <Testimonials />
      {/* Final CTA Section */}
      <section id="contact" className="bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-24">
          <div className="relative overflow-hidden bg-blue-600 rounded-xl p-10 md:p-16 lg:p-24 text-center text-white shadow-2xl shadow-blue-900/20">
            {/* Refined Background Accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
              {/* Tagline */}
              <span className="inline-block font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-blue-200 mb-6">
                Deployment Terminal
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.05] tracking-tight text-balance">
                Ready to transform your <br className="hidden md:block" />{" "}
                digital infrastructure?
              </h2>

              <p className="text-blue-100 text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                Join over{" "}
                <span className="text-white font-semibold">
                  2,500 companies
                </span>{" "}
                that trust our framework for mission-critical IT architecture.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Button className="bg-white text-blue-600 hover:bg-blue-200" onClick={openModal} >Start Your Project</Button>

                <Button variant="outline" className="bg-blue-700/50 text-white border border-blue-400/30 hover:bg-blue-600" onClick={openModal} >Contact Sales</Button>
              </div>

              {/* Subtle Footer Link */}
              <p className="mt-10 text-blue-300/60 text-[10px] uppercase tracking-widest font-medium">
                Response time: &lt; 24 Hours
              </p>
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
