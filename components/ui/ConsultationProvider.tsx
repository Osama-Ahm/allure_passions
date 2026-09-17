'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { BookingModal } from '@/components/modals/BookingModal';

type ConsultationContextValue = {
  /** Opens the enquiry, optionally with a treatment already chosen. */
  open: (treatment?: string) => void;
  close: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be called inside a ConsultationProvider');
  }
  return context;
}

/**
 * A small client island around the page. The editorial sections stay server
 * components — only the buttons that open the enquiry, and the enquiry itself,
 * ship as client code.
 */
export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<string | null>(null);

  const open = useCallback((treatment?: string) => {
    setPreselected(treatment ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} preselected={preselected} />
    </ConsultationContext.Provider>
  );
}
