import React, { useState } from 'react';
import { X, BookOpen, AppWindow, ArrowRight, ShieldCheck, Key, Database, Lock, Eye } from 'lucide-react';
import { Enkripsi } from '../PanelTugas/Enkripsi';
import { Kamus } from '../PanelTugas/Kamus';
import { Relasi } from '../PanelTugas/Relasi';
import { Kalkulasi } from '../PanelTugas/Kalkulasi';
import { Bruteforce } from '../PanelTugas/Bruteforce';
import { Flowchart } from '../PanelTugas/Flowchart';
import { LaporanAkhir } from '../PanelTugas/LaporanAkhir';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'aplikasi' | 'teori'>('aplikasi');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Pusat Informasi</h2>
            <p className="text-sm text-slate-500">Pelajari aplikasi dan teori di baliknya.</p>
          </div>
          
          <div className="flex bg-slate-200/60 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('aplikasi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'aplikasi' 
                  ? 'bg-white text-primary-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <AppWindow className="w-4 h-4" /> Tentang Aplikasi
            </button>
            <button
              onClick={() => setActiveTab('teori')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'teori' 
                  ? 'bg-white text-primary-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Teori Kriptografi
            </button>
          </div>

          <button 
            onClick={onClose} 
            className="absolute top-4 right-6 sm:static p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {activeTab === 'aplikasi' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">Arsitektur Zero-Knowledge Vault</h2>
                  <p className="text-slate-600 mt-2">Bagaimana aplikasi ini mengamankan datamu secara matematis.</p>
                </div>

                <div className="prose prose-slate max-w-none text-slate-700">
                  <p>
                    Aplikasi ini dirancang menggunakan konsep <strong>Zero-Knowledge Architecture</strong>. Artinya, sistem sama sekali tidak mengetahui apa <em>Master Password</em>-mu, dan tidak menyimpan data dalam bentuk teks asli. Bahkan metadata seperti nama platform (misal: "Google") atau Username juga diacak (dienkripsi).
                  </p>
                  <p>
                    Sebagai pengaman ekstra, aplikasi ini mengimplementasikan <strong>Double Encryption (Kunci Ganda)</strong> menggunakan <em>Extended Caesar Cipher</em> untuk mencegah pembobolan data akibat <em>Key Space Collision</em>.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-6">Flowchart Proses Penyimpanan & Pengambilan Data</h3>
                
                <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 overflow-x-auto space-y-12">
                  
                  {/* ALUR 1: ENKRIPSI (SIMPAN DATA) */}
                  <div className="min-w-[700px] flex flex-col items-center gap-4">
                    <div className="w-full flex items-center justify-start gap-2 text-indigo-700 font-bold mb-2">
                      <ArrowRight className="w-5 h-5" /> 1. Alur Simpan Data (Enkripsi)
                    </div>
                    
                    {/* Level 1: Input */}
                    <div className="flex gap-12 w-full justify-center">
                      <div className="bg-white border-2 border-slate-300 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                        <Database className="w-6 h-6 text-slate-500 mb-2" />
                        <span className="font-semibold text-sm">Data Asli (Plaintext)</span>
                        <span className="text-xs text-slate-500">Ketik di Form Tambah</span>
                      </div>
                      
                      <div className="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                        <Key className="w-6 h-6 text-indigo-500 mb-2" />
                        <span className="font-semibold text-sm">Master Password</span>
                        <span className="text-xs text-indigo-500">Hash (Kunci 1)</span>
                      </div>
                      
                      <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                        <Key className="w-6 h-6 text-emerald-500 mb-2" />
                        <span className="font-semibold text-sm">Custom Key (Opsional)</span>
                        <span className="text-xs text-emerald-500">Hash (Kunci 2)</span>
                      </div>
                    </div>

                    {/* Arrows Down */}
                    <div className="flex gap-[10rem] w-full justify-center px-24 relative">
                      <div className="w-0.5 h-8 bg-slate-300"></div>
                      <div className="w-0.5 h-8 bg-indigo-300"></div>
                      <div className="w-0.5 h-8 bg-emerald-300"></div>
                    </div>

                    {/* Level 2: Proses Kunci */}
                    <div className="flex gap-4 w-full justify-center">
                      <div className="w-48"></div> {/* Spacer */}
                      <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl shadow-sm w-96 text-center flex flex-col items-center relative">
                        <span className="font-semibold text-sm">Kalkulasi Kunci Ganda</span>
                        <span className="text-xs text-amber-600 font-mono mt-1">Kunci Gabungan = (K1 + K2) Mod 78</span>
                        
                        {/* Connecting Line from Data Asli */}
                        <div className="absolute top-1/2 -left-48 w-48 h-0.5 bg-slate-300"></div>
                        <ArrowRight className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="w-0.5 h-8 bg-amber-300 relative">
                      <ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-amber-400 rotate-90" />
                    </div>

                    {/* Level 3: Enkripsi */}
                    <div className="bg-primary-50 border-2 border-primary-300 p-4 rounded-xl shadow-sm w-[600px] text-center flex flex-col items-center">
                      <Lock className="w-6 h-6 text-primary-500 mb-2" />
                      <span className="font-semibold text-sm">Mesin Enkripsi (Algoritma Maju)</span>
                      <span className="text-xs text-primary-600 mt-1">Menggeser huruf Plaintext ke kanan berdasarkan Kunci Gabungan</span>
                    </div>

                    {/* Arrow Down */}
                    <div className="w-0.5 h-8 bg-primary-300 relative">
                      <ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-primary-400 rotate-90" />
                    </div>

                    {/* Level 4: Output Storage */}
                    <div className="bg-slate-800 border-2 border-slate-900 p-4 rounded-xl shadow-sm w-[600px] text-center flex flex-col items-center relative">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                      <span className="font-semibold text-sm text-white">Local Storage (Brankas)</span>
                      <span className="text-xs text-emerald-400 mt-1">Data tersimpan sebagai Ciphertext acak yang tak bisa dibaca</span>
                    </div>
                  </div>

                  <hr className="border-slate-300 border-dashed" />

                  {/* ALUR 2: DEKRIPSI (BACA DATA) */}
                  <div className="min-w-[700px] flex flex-col items-center gap-4 mt-8">
                    <div className="w-full flex items-center justify-start gap-2 text-rose-600 font-bold mb-2">
                      <ArrowRight className="w-5 h-5" /> 2. Alur Baca Data (Dekripsi)
                    </div>

                    {/* Level 1: Dari Storage */}
                    <div className="flex gap-12 w-full justify-center">
                      <div className="bg-slate-800 border-2 border-slate-900 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                        <Database className="w-6 h-6 text-slate-400 mb-2" />
                        <span className="font-semibold text-sm text-white">Ciphertext</span>
                        <span className="text-xs text-slate-400">Dari Local Storage</span>
                      </div>
                      
                      <div className="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                        <Key className="w-6 h-6 text-indigo-500 mb-2" />
                        <span className="font-semibold text-sm">Sesi Master Password</span>
                        <span className="text-xs text-indigo-500">Kunci Utama Saat Login</span>
                      </div>
                      
                      <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-xl shadow-sm w-48 text-center flex flex-col items-center">
                        <Key className="w-6 h-6 text-emerald-500 mb-2" />
                        <span className="font-semibold text-sm">Input Custom Key</span>
                        <span className="text-xs text-emerald-500">Diketik di Tombol Mata</span>
                      </div>
                    </div>

                    {/* Arrows Down */}
                    <div className="flex gap-[10rem] w-full justify-center px-24 relative">
                      <div className="w-0.5 h-8 bg-slate-300"></div>
                      <div className="w-0.5 h-8 bg-indigo-300"></div>
                      <div className="w-0.5 h-8 bg-emerald-300"></div>
                    </div>

                    {/* Level 2: Proses Kunci */}
                    <div className="flex gap-4 w-full justify-center">
                      <div className="w-48"></div> {/* Spacer */}
                      <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl shadow-sm w-96 text-center flex flex-col items-center relative">
                        <span className="font-semibold text-sm">Verifikasi Kunci Gabungan</span>
                        <span className="text-xs text-amber-600 font-mono mt-1">Kunci Target = (K1 + K2) Mod 78</span>
                        
                        {/* Connecting Line from Ciphertext */}
                        <div className="absolute top-1/2 -left-48 w-48 h-0.5 bg-slate-300"></div>
                        <ArrowRight className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="w-0.5 h-8 bg-amber-300 relative">
                      <ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-amber-400 rotate-90" />
                    </div>

                    {/* Level 3: Dekripsi */}
                    <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-xl shadow-sm w-[600px] text-center flex flex-col items-center">
                      <Eye className="w-6 h-6 text-rose-500 mb-2" />
                      <span className="font-semibold text-sm">Mesin Dekripsi (Algoritma Mundur)</span>
                      <span className="text-xs text-rose-600 mt-1">Menggeser huruf Ciphertext ke kiri berdasarkan Kunci Gabungan</span>
                    </div>

                    {/* Step 1: Input Master Key */}
                    <div className="bg-indigo-50 border-2 border-indigo-300 p-4 rounded-xl shadow-sm w-64 text-center">
                      <Key className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                      <span className="font-semibold text-sm">Input Master Password</span>
                      <p className="text-xs text-indigo-600 mt-1">Proses Login untuk membuka Dashboard</p>
                    </div>

                    <div className="w-0.5 h-6 bg-slate-300 relative"><ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-slate-400 rotate-90" /></div>

                    {/* Input dari Storage */}
                    <div className="bg-slate-800 border-2 border-slate-900 p-4 rounded-xl shadow-sm w-96 text-center">
                      <Database className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                      <span className="font-semibold text-sm text-white">Ambil Data dari Storage</span>
                      <p className="text-xs text-slate-400">Ciphertext ditarik dari brankas lokal ke memori aplikasi</p>
                    </div>

                    <div className="w-0.5 h-6 bg-slate-300 relative"><ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-slate-400 rotate-90" /></div>

                    {/* Coba Dekripsi Judul */}
                    <div className="bg-indigo-50 border-2 border-indigo-300 p-4 rounded-xl shadow-sm w-96 text-center">
                      <Eye className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                      <span className="font-semibold text-sm">Auto-Decrypt Judul</span>
                      <p className="text-xs text-indigo-600 mt-1">Sistem mencoba dekripsi judul dengan Master Password yang diinput</p>
                    </div>

                    <div className="w-0.5 h-6 bg-slate-300 relative"><ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-slate-400 rotate-90" /></div>

                    {/* Diamond: Master Valid? */}
                    <div className="w-32 h-32 my-2 relative flex justify-center items-center">
                      <div className="absolute inset-0 bg-rose-50 border-2 border-rose-300 shadow-sm rotate-45 rounded-lg"></div>
                      <div className="relative z-10 text-center text-[10px] font-bold text-rose-800 w-24">
                        Apakah Master Password Benar?
                      </div>
                      
                      {/* Cabang Ya */}
                      <div className="absolute -bottom-12 left-1/2 w-0.5 h-12 bg-rose-300 flex justify-end items-center">
                        <span className="text-xs font-bold text-rose-600 bg-slate-50 px-1 ml-4">Ya</span>
                        <ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-rose-400 rotate-90" />
                      </div>
                      
                      {/* Cabang Tidak */}
                      <div className="absolute top-1/2 -left-32 w-32 h-0.5 bg-rose-300 flex justify-center items-start">
                        <span className="text-xs font-bold text-rose-600 bg-slate-50 px-1 -mt-4">Tidak</span>
                        <ArrowRight className="absolute -left-2 -top-1.5 w-4 h-4 text-rose-400 rotate-180" />
                      </div>
                    </div>

                    {/* Tampil di Dashboard */}
                    <div className="flex w-full justify-center relative mt-4 h-28">
                      {/* Salah */}
                      <div className="absolute right-[calc(50%+128px)] top-0 bg-slate-100 border-2 border-slate-300 p-3 rounded-xl shadow-sm w-48 text-center -translate-x-4">
                        <span className="font-semibold text-sm text-slate-700">Teks Acak</span>
                        <p className="text-[10px] text-slate-500 mt-1">Judul tetap acak & tak bisa dibaca. Data aman.</p>
                      </div>
                      
                      {/* Benar */}
                      <div className="absolute left-1/2 top-4 bg-emerald-50 border-2 border-emerald-300 p-3 rounded-xl shadow-sm w-56 text-center -translate-x-1/2">
                        <span className="font-semibold text-sm">Judul & Username Terbaca</span>
                        <p className="text-[10px] text-emerald-600 mt-1">Ditampilkan rapi di Dashboard</p>
                      </div>
                    </div>

                    {/* Lanjut ke Isi */}
                    <div className="w-0.5 h-6 bg-emerald-300 relative -mt-4"><ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-emerald-400 rotate-90" /></div>
                    
                    <div className="bg-white border-2 border-slate-300 p-3 rounded-xl shadow-sm w-64 text-center">
                      <span className="font-semibold text-sm">User Klik Tombol "Lihat Isi"</span>
                    </div>

                    <div className="w-0.5 h-6 bg-slate-300 relative"><ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-slate-400 rotate-90" /></div>

                    {/* Diamond: Custom Key? */}
                    <div className="w-32 h-32 my-2 relative flex justify-center items-center">
                      <div className="absolute inset-0 bg-amber-50 border-2 border-amber-300 shadow-sm rotate-45 rounded-lg"></div>
                      <div className="relative z-10 text-center text-[10px] font-bold text-amber-800 w-24">
                        Data Butuh Custom Key?
                      </div>
                      
                      {/* Cabang Ya */}
                      <div className="absolute top-1/2 -right-32 w-32 h-0.5 bg-amber-300 flex justify-center items-start">
                        <span className="text-xs font-bold text-amber-600 bg-slate-50 px-1 -mt-4">Ya</span>
                        <ArrowRight className="absolute -right-2 -top-1.5 w-4 h-4 text-amber-400" />
                      </div>
                      
                      {/* Cabang Tidak */}
                      <div className="absolute -bottom-12 left-1/2 w-0.5 h-12 bg-amber-300 flex justify-end items-center">
                        <span className="text-xs font-bold text-amber-600 bg-slate-50 px-1 ml-4">Tidak</span>
                        <ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-amber-400 rotate-90" />
                      </div>
                    </div>

                    {/* Proses Dekripsi */}
                    <div className="flex w-full justify-center relative mt-4 h-32">
                      {/* Punya Custom Key */}
                      <div className="absolute left-[calc(50%+128px)] top-0 bg-amber-50 border-2 border-amber-300 p-3 rounded-xl shadow-sm w-56 text-center translate-x-4">
                        <span className="font-semibold text-sm">Minta Input Custom Key</span>
                        <p className="text-[10px] text-amber-600 mt-1 mb-2">User mengetik key...</p>
                        <div className="bg-white p-1 border rounded text-[10px] text-slate-600 font-mono">
                          Auto-Decrypt: (Master+Custom)
                        </div>
                      </div>
                      
                      {/* Tidak Punya */}
                      <div className="absolute left-1/2 top-4 bg-slate-100 border-2 border-slate-300 p-3 rounded-xl shadow-sm w-48 text-center -translate-x-1/2">
                        <span className="font-semibold text-sm">Gunakan Master Password</span>
                        <p className="text-[10px] text-slate-500 mt-1 mb-2">Langsung eksekusi</p>
                        <div className="bg-white p-1 border rounded text-[10px] text-slate-600 font-mono">
                          Auto-Decrypt: Master
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-8 bg-slate-300 relative -mt-4"><ArrowRight className="absolute -bottom-2 -left-1.5 w-4 h-4 text-slate-400 rotate-90" /></div>

                    {/* Hasil Akhir */}
                    <div className="bg-white border-2 border-emerald-400 p-4 rounded-xl shadow-sm w-[500px] text-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                      <span className="font-semibold text-sm text-slate-800">Tampil di Layar (Plaintext)</span>
                      <p className="text-xs text-slate-500 mt-1">Catatan rahasia berhasil dibaca jika kunci benar!</p>
                    </div>

                  </div>

                </div>
              </section>
            </div>
          )}

          {activeTab === 'teori' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
              <section id="input-proses">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">1. Input & Proses</h2>
                  <p className="text-slate-600 mt-2">Masukkan pesan, kunci enkripsi, dan metode untuk mensimulasikan teori.</p>
                </div>
                <Enkripsi />
              </section>

              <section id="himpunan-karakter">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">2. Himpunan Karakter</h2>
                </div>
                <Kamus />
              </section>

              <section id="tabel-pemetaan">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">3. Tabel Pemetaan Huruf</h2>
                </div>
                <Relasi />
              </section>

              <section id="modulo-math">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">4. Detail Perhitungan (Modulo)</h2>
                </div>
                <Kalkulasi />
              </section>

              <section id="kemungkinan-kunci">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">5. Kemungkinan Kunci</h2>
                </div>
                <Bruteforce />
              </section>

              <section id="diagram-alur">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">6. Diagram Alur (Dasar)</h2>
                </div>
                <Flowchart />
              </section>

              <section id="laporan-akhir">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">7. Laporan Akhir</h2>
                </div>
                <LaporanAkhir />
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
