import React from 'react';
import './WhatsAppButton.css';

// Nomor WhatsApp klinik (ganti dengan nomor resmi jika berbeda).
const WA_NUMBER = '6281234567890';
const WA_MESSAGE = 'Halo, saya ingin konsultasi mengenai layanan klinik gigi.';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const WhatsAppButton = () => {
  return (
    <a
      className="wa-button"
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="34" height="34" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3.2c-7.1 0-12.86 5.76-12.86 12.86 0 2.27.6 4.48 1.74 6.43L3.2 28.8l6.55-1.72a12.8 12.8 0 0 0 6.29 1.6h.01c7.1 0 12.86-5.76 12.86-12.86 0-3.43-1.34-6.66-3.76-9.08A12.76 12.76 0 0 0 16.04 3.2zm0 23.34h-.01a10.66 10.66 0 0 1-5.43-1.49l-.39-.23-3.89 1.02 1.04-3.79-.25-.4a10.6 10.6 0 0 1-1.63-5.66c0-5.9 4.8-10.69 10.7-10.69 2.86 0 5.55 1.11 7.57 3.13a10.64 10.64 0 0 1 3.13 7.57c0 5.9-4.8 10.69-10.71 10.69zm5.87-8.01c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.49.14-.65.14-.14.32-.38.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56-.19-.01-.4-.01-.62-.01a1.19 1.19 0 0 0-.86.4c-.29.32-1.12 1.1-1.12 2.67 0 1.58 1.15 3.1 1.31 3.32.16.21 2.27 3.47 5.5 4.86.77.33 1.37.53 1.84.68.77.25 1.48.21 2.04.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.22-.61-.38z" />
      </svg>
      <span className="wa-button__label">
        <strong>Konsultasi Gratis</strong>
        <small>Buat Janji Chat via WhatsApp</small>
      </span>
    </a>
  );
};

export default WhatsAppButton;
