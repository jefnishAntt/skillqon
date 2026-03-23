import {
  ChevronRight,
  Rocket,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Upper Footer: Brand & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="relative block h-10 w-32 md:w-40 transition-opacity hover:opacity-80 mb-2"
            >
              <Image
                src="/images/logo_text.png"
                alt="Skillqon Logo"
                fill
                className="object-contain object-left invert" // object-left keeps it aligned with your text below
                priority
                sizes="(max-width: 768px) 128px, 160px" // Helps Next.js optimize loading
              />
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              Empowering businesses through next-generation automation,
              strategic consulting, and elite digital education.
            </p>
            <div className="flex gap-4">
              {[
                { name: "LinkedIn", icon: <Linkedin size={18} />, href: "#" },
                { name: "X", icon: <Twitter size={18} />, href: "#" }, // Use Twitter icon for X
                { name: "Instagram", icon: <Instagram size={18} />, href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group text-slate-500 hover:text-white"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                Solutions
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Cloud Architecture
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    AI Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Cyber Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                Company
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Placement Cell
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Replaced Newsletter with Address */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                Our Office
              </h4>
              <div className="flex gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-1" />
                <address className="not-italic text-sm text-slate-400 leading-relaxed">
                  23-74/5, DJS Building,
                  <br />
                  First Floor, Muttaicadu,
                  <br />
                  Kumarapuram Post,
                  <br />
                  Kanyakumari District – 629164,
                  <br />
                  Tamil Nadu, India.
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer: Copyright */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-xs font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © {currentYear} Skillqon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
