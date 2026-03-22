"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface ContactContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen]);

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

export const useContactModal = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContactModal must be used within ContactProvider");
  return context;
};