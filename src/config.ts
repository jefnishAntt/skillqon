import { Rocket, Settings, ShieldCheck } from "lucide-react";
import { Testimonial } from "./app/page";

export const SERVICES_DATA = [
  {
    title: "Digital Education",
    description: "Empowering the next generation of tech leaders through project-based learning and industry mentorship.",
    icon: Rocket,
    items: ["Full-Stack Bootcamps", "Cloud Architecture", "Data Science Tracks"],
    href: "/education" // Ready for routing
  },
  {
    title: "Strategic Consulting",
    description: "Navigating complex digital transformations with data-driven strategies and security-first frameworks.",
    icon: ShieldCheck,
    items: ["Business Intelligence", "Cybersecurity Audit", "Agile Transformation"],
    href: "/consulting"
  },
  {
    title: "Tech Solutions",
    description: "Building scalable software and infrastructure that powers modern enterprises globally.",
    icon: Settings,
    items: ["Custom SaaS Dev", "Legacy Modernization", "AI/ML Integration"],
    href: "/tech"
  }
];

export const TESTIMONIALS_DATA = [
  { name: "Sarah Chen", role: "CTO @ Nexa", content: "The scalability we achieved in three months was staggering. A total game changer for our infrastructure." },
  { name: "Marcus Thorne", role: "Founder @ Velo", content: "Architecture that actually understands modern growth. The most intuitive integration we've ever done." },
  { name: "Elena Rossi", role: "VP Engineering", content: "Beyond just a tool, it's a fundamental shift in how we handle data streaming. Exceptional support too." },
  { name: "David Wu", role: "Lead Dev", content: "Finally, a solution that doesn't sacrifice speed for security. Our benchmarks improved by 40%." },
];