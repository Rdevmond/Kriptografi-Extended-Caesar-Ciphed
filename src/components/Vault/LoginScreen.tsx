import React, { useState } from 'react';
import { LockKeyhole, ArrowRight, ShieldCheck } from 'lucide-react';
import { masterPasswordToKey } from '../../utils/cryptography';

interface LoginScreenProps {
  onLogin: (masterKey: number, rawPassword: string) => void;
  onShowTheory: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onShowTheory }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      const key = masterPasswordToKey(password);
      onLogin(key, password);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-4rem)] px-4 gap-6 max-w-5xl mx-auto py-4">
      
      {/* Petunjuk Penggunaan (Instructions) */}
      <div className="w-full md:w-1/2 bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
        <h2 className="text-base font-bold text-indigo-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Cara Kerja Vault
        </h2>
        <div className="space-y-2.5 text-indigo-800 text-xs">
          <div className="flex gap-2.5 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px]">1</span>
            <div>
              <p className="font-bold text-sm mb-0.5">Masuk (Buka/Buat Vault)</p>
              <p className="text-slate-600 leading-snug">
                Ketik password di form kanan. Password pertama akan menjadi <strong>Kunci Utama</strong>. Jika salah ketik, data akan tampil sebagai <strong>teks acak</strong> yang aman.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px]">2</span>
            <div>
              <p className="font-bold text-sm mb-0.5">Tambah Data (Zero-Knowledge)</p>
              <p className="text-slate-600 leading-snug">
                Klik "Tambah" di Dashboard. <strong>Judul & Username</strong> dienkripsi dengan Master Password. Sistem tidak menyimpan teks aslinya!
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px]">3</span>
            <div>
              <p className="font-bold text-sm mb-0.5">Kunci Ganda (Opsional & Ekstra Aman)</p>
              <p className="text-slate-600 leading-snug">
                Tambahkan <strong>Custom Key</strong> saat menyimpan untuk perlindungan 2 lapis <em>(Master + Custom)</em>.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px]">4</span>
            <div>
              <p className="font-bold text-sm mb-0.5">Baca Data (Live Auto-Decrypt)</p>
              <p className="text-slate-600 leading-snug">
                Klik ikon <strong>Mata</strong>. Jika ada Kunci Ganda, ketikkan — teks akan <strong>berubah live</strong> saat kunci tepat.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px]">5</span>
            <div>
              <p className="font-bold text-sm mb-0.5">Keamanan Penghapusan Data</p>
              <p className="text-slate-600 leading-snug">
                Menghapus data wajib verifikasi ulang <strong>Master Password</strong>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-indigo-200/60">
          <button 
            onClick={onShowTheory}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-indigo-600/20"
          >
            <ShieldCheck className="w-4 h-4" />
            Lihat Arsitektur Lengkap & Flowchart
          </button>
        </div>
      </div>

      {/* Login Box */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
            <LockKeyhole className="w-7 h-7 text-primary-600" />
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-center text-slate-900 mb-1">
          Masuk ke Vault
        </h1>
        <p className="text-center text-slate-500 mb-6 text-sm">
          Masukkan Master Password untuk membuka atau membuat vault baru.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="masterPassword" className="block text-sm font-medium text-slate-700 mb-2">
              Master Password
            </label>
            <div className="relative">
              <input
                id="masterPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                placeholder="Kata sandi rahasia..."
                autoFocus
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Dienkripsi dengan Extended Caesar Cipher</span>
        </div>
      </div>
    </div>
  );
};
