import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ContactProvider } from "./ContextProvider";
import { Form } from "@/components/Form";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillQon",
  description: "High-performance tech solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ContactProvider>
          <Navbar />
          <main className="pt-20 lg:pt-24 min-h-screen">
            {children}
            <Form />
          </main>
          <WhatsAppButton />
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
