"use client";

import React, { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, X, Send } from "lucide-react";
import { useContactModal } from "@/app/ContextProvider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/ui/Button";

/** * Utility: Standardized Tailwind Class Merger
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Schema ---
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  email: z.string().email("Please provide a valid business email"),
  message: z.string().min(10, "Please provide more detail").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

// --- Component: The Form ---
const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Mock API Delay
      console.log("Telemetry Payload:", data);
      onSuccess();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">
          Full Name
        </label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className={cn(
            "w-full px-4 py-3 rounded border transition-all outline-none bg-slate-50 focus:bg-white",
            errors.name
              ? "border-red-500 ring-red-50"
              : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10",
          )}
        />
        {errors.name && (
          <p className="text-xs font-bold text-red-500 leading-none">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="john@company.com"
          className={cn(
            "w-full px-4 py-3 rounded border transition-all outline-none bg-slate-50 focus:bg-white",
            errors.email
              ? "border-red-500 ring-red-50"
              : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10",
          )}
        />
        {errors.email && (
          <p className="text-xs font-bold text-red-500 leading-none">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(
            "w-full px-4 py-3 rounded border transition-all outline-none resize-none bg-slate-50 focus:bg-white",
            errors.message
              ? "border-red-500 ring-red-50"
              : "border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10",
          )}
        />
        {errors.message && (
          <p className="text-xs font-bold text-red-500 leading-none">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-center py-4">
      <Button
        type="submit"
        isLoading={isSubmitting}
        variant="primary"
        rightIcon={<Send size={18} />}
      >
        Send Inquiry
      </Button>
      </div>
    </form>
  );
};

// --- Component: The Production Modal ---
export const Form = () => {
  const { isOpen, closeModal } = useContactModal();
  const labelId = useId();

  // 1. Accessibility: Lock Scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  // 2. Accessibility: Keyboard Listeners
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop: CSS Transition via animate-in */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-300 ease-out"
      >
        <div className="p-8 sm:p-12">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <header className="mb-8">
            <h2
              id={labelId}
              className="text-4xl font-black text-slate-900 tracking-tight mb-2"
            >
              Let's talk.
            </h2>
            <p className="text-slate-500 font-medium">
              Drop your details and we'll reach out shortly.
            </p>
          </header>

          <ContactForm onSuccess={closeModal} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
