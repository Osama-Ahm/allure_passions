import React from 'react';
import { CLINIC_INFO } from '../data/treatmentData';

// Branded ink curtain that sweeps across the screen between pages.
// phase: 'idle' | 'cover' | 'reveal' (driven by App's handleNavigate).
export default function PageCurtain({ phase }) {
  return (
    <div className={`ap-curtain ap-curtain--${phase}`} aria-hidden="true">
      <span className="ap-curtain__mark">{CLINIC_INFO.name}</span>
    </div>
  );
}
