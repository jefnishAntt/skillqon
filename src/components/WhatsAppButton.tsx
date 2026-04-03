import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  // Use digits only for the phone number URL
  const phoneNumber = "+919600883379";
  const message = "Hello! I'm interested in your tech solutions.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        /* Layout & Positioning */
        fixed z-50 flex items-center justify-center 
        
        /* Mobile: Smaller size, closer to corner */
        bottom-4 right-4 w-12 h-12 
        
        /* Desktop (lg): Larger size, more breathing room */
        lg:bottom-8 lg:right-8 lg:w-16 lg:h-16 
        
        /* Styling */
        bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] 
        
        /* Interactions */
        active:scale-95 hover:scale-110 transition-all duration-300
      "
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8" />
    </a>
  );
}