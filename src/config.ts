import { Briefcase, Rocket, Settings, ShieldCheck } from "lucide-react";
import { Testimonial } from "./app/page";

export const SERVICES_DATA = [
  {
    title: "EdTech Solutions",
    description: "Delivering modern, industry-relevant education and professional training programs designed for real-world career readiness.",
    icon: Rocket, // Keeping Rocket for the "launching careers" vibe
    items: [
      "Professional Skill Development",
      "Industry-Oriented Training",
      "Certification & Corporate Programs",
      "Tech-Based Learning Solutions"
    ],
    href: "/education"
  },
  {
    title: "Technology Development",
    description: "Developing modern digital solutions and software that support businesses through every stage of their digital transformation journey.",
    icon: Settings,
    items: [
      "Website & App Development",
      "Custom Software Solutions",
      "Digital Platform Engineering",
      "Technology Integration"
    ],
    href: "/tech"
  },
  {
    title: "Placement & Career Support",
    description: "Connecting students and professionals with industry opportunities through dedicated guidance and skill-to-employment programs.",
    icon: Briefcase, // Suggested icon change from ShieldCheck to better fit "Placement"
    items: [
      "Career Guidance & Internships",
      "Industry Placement Assistance",
      "Skill-to-Employment Tracks",
      "Professional Networking"
    ],
    href: "/careers"
  }
];

export const TESTIMONIALS_DATA = [
  { name: "Sarah Chen", role: "CTO @ Nexa", content: "The scalability we achieved in three months was staggering. A total game changer for our infrastructure." },
  { name: "Marcus Thorne", role: "Founder @ Velo", content: "Architecture that actually understands modern growth. The most intuitive integration we've ever done." },
  { name: "Elena Rossi", role: "VP Engineering", content: "Beyond just a tool, it's a fundamental shift in how we handle data streaming. Exceptional support too." },
  { name: "David Wu", role: "Lead Dev", content: "Finally, a solution that doesn't sacrifice speed for security. Our benchmarks improved by 40%." },
];