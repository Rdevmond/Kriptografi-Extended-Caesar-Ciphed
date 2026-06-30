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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] px-4 gap-8 max-w-5xl mx-auto py-12">
      
      {/* Petunjuk Penggunaan (Instructions) */}
      <div className="w-full md:w-1/2 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
        <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
          Cara Kerja Vault
        </h2>
        <div className="space-y-5 text-indigo-800 text-sm">
          <div className="flex gap-3 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div>
              <p className="font-bold text-base mb-1">Masuk (Buka/Buat Vault)</p>
              <p className="text-slate-600 leading-relaxed">
                Ketik password apa saja di form sebelah kanan. Jika ini pertama kali, ia akan menjadi <strong>Kunci Utama</strong>. Jika salah ketik saat masuk lagi nanti, data lama akan terlihat sebagai <strong>teks acak</strong> yang aman.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div>
              <p className="font-bold text-base mb-1">Tambah Data (Zero-Knowledge)</p>
              <p className="text-slate-600 leading-relaxed">
                Klik tombol "Tambah" di Dashboard. <strong>Judul & Username</strong> akan dienkripsi menggunakan Master Password. Sistem tidak menyimpan teks aslinya!
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div>
              <p className="font-bold text-base mb-1">Kunci Ganda (Opsional & Ekstra Aman)</p>
              <p className="text-slate-600 leading-relaxed">
                Saat menyimpan, isi kolom <strong>Custom Key</strong>. Isi catatanmu akan dilindungi 2 lapis kunci <em>(Master + Custom)</em>. Sangat ampuh mencegah pencurian data walau kunci Master bocor!
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">4</span>
            <div>
              <p className="font-bold text-base mb-1">Baca Data (Live Auto-Decrypt)</p>
              <p className="text-slate-600 leading-relaxed">
                Klik ikon <strong>Mata</strong> untuk membaca. Jika data memakai Kunci Ganda, ketikkan kuncinya di kolom yang muncul. Teks sandi akan <strong>berubah seketika secara live</strong> menjadi teks asli saat kuncinya tepat.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold bg-indigo-200 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">5</span>
            <div>
              <p className="font-bold text-base mb-1">Keamanan Penghapusan Data</p>
              <p className="text-slate-600 leading-relaxed">
                Menghapus data (ikon Tong Sampah) mewajibkanmu mengetik ulang <strong>Master Password</strong>. Ini untuk mencegah salah klik atau intervensi pihak tak berwenang.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-indigo-200/60">
          <button 
            onClick={onShowTheory}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-sm shadow-indigo-600/20"
          >
            <ShieldCheck className="w-5 h-5" />
            Lihat Arsitektur Lengkap & Flowchart
          </button>
        </div>
      </div>

      {/* Login Box */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <LockKeyhole className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
          Masuk ke Vault
        </h1>
        <p className="text-center text-slate-500 mb-8 text-sm">
          Masukkan Master Password untuk membuka atau membuat vault baru.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Dienkripsi dengan Extended Caesar Cipher</span>
        </div>
      </div>
    </div>
  );
};
