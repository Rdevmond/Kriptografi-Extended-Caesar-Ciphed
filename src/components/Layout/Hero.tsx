import React from 'react';
import { ShieldCheck, Code, BookOpen } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 px-6 sm:px-12 lg:px-24">
      {/* Decorative clean shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary-50 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-slate-50 opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6 text-sm font-semibold text-primary-700 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Matematika Diskrit Teknik Informatika</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-800 animate-slide-up">
          Aplikasi Pengamanan Data
          <br className="hidden md:block" />
          <span className="text-primary-700">Extended Caesar Cipher</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Proyek interaktif berbasis web untuk mendemonstrasikan konsep kriptografi dasar.
          Menggunakan himpunan basis 77 karakter untuk meningkatkan keamanan dan kompleksitas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-left hover:shadow-md transition-shadow">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="text-primary-700 w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Keamanan Data</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Implementasi algoritma E(x)=(x+k) mod 77 untuk mengamankan plaintext menjadi ciphertext.</p>
          </div>
          
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-left hover:shadow-md transition-shadow">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-primary-700 w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Konsep Matematika</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Penerapan teori himpunan, relasi, fungsi bijektif, dan aritmatika modulo dalam kriptografi.</p>
          </div>
          
          <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 text-left hover:shadow-md transition-shadow">
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="text-primary-700 w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Simulasi Interaktif</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Analisis frekuensi, brute force, dan pengujian sistem yang berjalan secara real-time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
