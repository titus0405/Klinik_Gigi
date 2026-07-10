import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';
import BotIcon from '../assets/Bot.svg';

// Small intent-based FAQ engine. No backend/API key required.
const FAQ = [
  {
    keywords: ['boking', 'booking', 'janji', 'appointment', 'reservasi', 'daftar antrean', 'buat janji'],
    answer:
      'Untuk membuat janji temu, buka menu "Appointment" lalu pilih tanggal, waktu, dan dokter gigi yang Anda inginkan. Setelah login, Anda bisa melihat dan membatalkan janji di halaman profil.',
    suggestions: ['Jam buka?', 'Biaya konsultasi?', 'Cara daftar?'],
  },
  {
    keywords: ['jam', 'buka', 'operasional', 'jam berapa', 'tutup', 'hari', 'schedule', 'hours'],
    answer:
      'Klinik kami buka Senin-Sabtu pukul 08.00-20.00. Hari Minggu dan hari besar kami tutup, kecuali untuk kasus darurat.',
    suggestions: ['Buat janji', 'Lokasi klinik?', 'Nomor telepon?'],
  },
  {
    keywords: ['lokasi', 'alamat', 'dimana', 'di mana', 'maps', 'alamatnya', 'location', 'berada'],
    answer:
      'Klinik berada di pusat kota, dekat dengan stasiun utama. Anda bisa menemukannya di halaman "Contact" yang menyertakan peta dan petunjuk arah.',
    suggestions: ['Nomor telepon?', 'Jam buka?'],
  },
  {
    keywords: ['telepon', 'nomor', 'hp', 'wa', 'whatsapp', 'hubungi', 'kontak', 'phone', 'call'],
    answer:
      'Anda dapat menghubungi kami di (021) 1234-5678 atau melalui WhatsApp di 0812-3456-7890 untuk pertanyaan cepat.',
    suggestions: ['Jam buka?', 'Lokasi klinik?'],
  },
  {
    keywords: ['biaya', 'harga', 'tarif', 'price', 'cost', 'berapa', 'mahal', 'bpjs', 'asuransi', 'bayar'],
    answer:
      'Konsultasi awal mulai dari Rp50.000. Perawatan seperti cabut gigi, scaling, atau behel memiliki tarif berbeda. Kami menerima tunai, debit/kredit, dan beberapa asuransi. Untuk estimasi pasti, silakan konsultasi langsung.',
    suggestions: ['Buat janji', 'Layanan apa saja?'],
  },
  {
    keywords: ['layanan', 'service', 'treatment', 'perawatan', 'apa saja', 'pendaftaran', 'behel', 'kawat', 'bleaching', 'pemutih', 'scaling', 'cabut', 'tambal'],
    answer:
      'Layanan kami meliputi pemeriksaan & konsultasi, scaling, tambal gigi, cabut gigi, perawatan saluran akar (root canal), pemutihan (bleaching), dan pemasangan kawat gigi (behel).',
    suggestions: ['Biaya?', 'Buat janji'],
  },
  {
    keywords: ['sakit', 'nyeri', 'ngilu', 'gigi berlubang', 'sakit gigi', 'pain', 'emergency', 'darurat', 'bengkak', 'patah'],
    answer:
      'Jika Anda mengalami nyeri hebat, bengkak, atau gigi patah, segera hubungi nomor darurat kami di 0812-3456-7890. Sambil menunggu, bilas mulut dengan air hangat dan hindari makanan yang terlalu panas/dingin. Jangan tunda penanganan.',
    suggestions: ['Nomor telepon?', 'Buat janji'],
  },
  {
    keywords: ['daftar', 'register', 'registrasi', 'akun', 'sign up', 'buat akun', 'login', 'masuk'],
    answer:
      'Klik "Register" di menu untuk membuat akun dengan data diri Anda, lalu "Login" untuk masuk. Akun memudahkan Anda mengelola janji temu secara mandiri.',
    suggestions: ['Buat janji', 'Lupa password?'],
  },
  {
    keywords: ['password', 'lupa', 'reset', 'ganti sandi', 'forgot'],
    answer:
      'Jika lupa password, silakan hubungi resepsionis kami di (021) 1234-5678 agar akun Anda diverifikasi dan direset dengan aman.',
    suggestions: ['Nomor telepon?', 'Daftar akun'],
  },
  {
    keywords: ['anak', 'kids', 'balita', 'bayi', 'pediatric', 'gigi susu'],
    answer:
      'Kami melayani pasien anak, termasuk perawatan gigi susu dan edukasi menyikat gigi. Suasana klinik kami ramah anak untuk kenyamanan mereka.',
    suggestions: ['Layanan apa saja?', 'Buat janji'],
  },
  {
    keywords: ['covid', 'protokol', 'sehat', 'steril', 'kebersihan', 'hygiene'],
    answer:
      'Kami menerapkan protokol kebersihan ketat: alat steril sekali pakai, penyemprotan disinfektan antar pasien, dan physical distancing di ruang tunggu.',
    suggestions: ['Jam buka?', 'Lokasi klinik?'],
  },
  {
    keywords: ['halo', 'hai', 'hi', 'hello', 'assalam', 'selamat', 'apa kabar', 'bot'],
    answer:
      'Halo! Saya asisten virtual Klinik Gigi. Saya bisa membantu seputar janji temu, layanan, jam buka, dan lokasi. Ada yang bisa saya bantu?',
    suggestions: ['Buat janji', 'Jam buka?', 'Layanan apa saja?'],
  },
];

const GREETING = {
  from: 'bot',
  text:
    'Halo! Saya asisten virtual Klinik Gigi. Tanyakan seputar janji temu, layanan, jam buka, atau lokasi kami.',
  suggestions: ['Buat janji', 'Jam buka?', 'Layanan apa saja?', 'Biaya?'],
};

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

function findAnswer(text) {
  const q = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const item of FAQ) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw.toLowerCase())) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  if (best) return best;
  return {
    answer:
      'Maaf, saya belum menangkap pertanyaannya. Coba tanyakan seputar janji temu, layanan, jam buka, lokasi, biaya, atau keluhan darurat ya.',
    suggestions: ['Buat janji', 'Jam buka?', 'Layanan apa saja?'],
  };
}

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [pos, setPos] = useState(null);
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef = useRef(null);
  const movedRef = useRef(false);

  const FAB_SIZE = 160;

  const onPointerDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: rect.left,
      origY: rect.top,
    };
    movedRef.current = false;
    setPos({ x: rect.left, y: rect.top });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
    const x = Math.min(
      Math.max(0, dragRef.current.origX + dx),
      window.innerWidth - FAB_SIZE
    );
    const y = Math.min(
      Math.max(0, dragRef.current.origY + dy),
      window.innerHeight - FAB_SIZE
    );
    setPos({ x, y });
  };

  const onPointerUp = () => {
    if (!movedRef.current) setOpen((o) => !o);
    dragRef.current = null;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (text) => {
    const value = (text ?? input).trim();
    if (!value) return;
    const userMsg = { from: 'user', text: value };
    const { answer, suggestions } = findAnswer(value);
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: answer, suggestions }]);
    }, 600 + Math.random() * 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <div
      className="ai-chatbot"
      style={
        pos
          ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
          : undefined
      }
    >
      {open && (
        <div className="ai-chatbot__panel" role="dialog" aria-label="Asisten virtual klinik gigi">
          <div className="ai-chatbot__header">
            <div className="ai-chatbot__title">
              <span className="ai-chatbot__avatar">AI</span>
              <div>
                <strong>Asisten Klinik</strong>
                <small>Online - Siap membantu</small>
              </div>
            </div>
            <button
              className="ai-chatbot__close"
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
            >
              &times;
            </button>
          </div>

          <div className="ai-chatbot__messages">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`ai-chatbot__row ai-chatbot__row--${msg.from}`}>
                  <div className={`ai-chatbot__bubble ai-chatbot__bubble--${msg.from}`}>
                    {msg.text}
                  </div>
                </div>
                {msg.suggestions && (
                  <div className="ai-chatbot__suggestions">
                    {msg.suggestions.map((s, j) => (
                      <button key={j} onClick={() => send(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="ai-chatbot__row ai-chatbot__row--bot">
                <div className="ai-chatbot__bubble ai-chatbot__bubble--bot ai-chatbot__typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chatbot__input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              aria-label="Pesan"
            />
            <button type="submit" aria-label="Kirim">
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <button
        className="ai-chatbot__fab"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        aria-label={open ? 'Tutup asisten' : 'Buka asisten virtual'}
      >
        <img src={BotIcon} alt="" className="ai-chatbot__fab-icon" />
      </button>
    </div>
  );
};

export default AIChatbot;
