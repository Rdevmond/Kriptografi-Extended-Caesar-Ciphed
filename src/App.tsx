import { Hero } from './components/Layout/Hero';
import { useTheme } from './hooks/useTheme';
import { CipherProvider } from './context/CipherContext';
import { Enkripsi } from './components/PanelTugas/Enkripsi';
import { Kamus } from './components/PanelTugas/Kamus';
import { Relasi } from './components/PanelTugas/Relasi';
import { Kalkulasi } from './components/PanelTugas/Kalkulasi';
import { Bruteforce } from './components/PanelTugas/Bruteforce';
import { Flowchart } from './components/PanelTugas/Flowchart';
import { LaporanAkhir } from './components/PanelTugas/LaporanAkhir';
import { TOTAL_KARAKTER } from './utils/cryptography';
import { Lock } from 'lucide-react';

function App() {
  useTheme();

  return (
    <CipherProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-center px-4 lg:px-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary-600" />
            <span className="font-bold text-xl text-primary-900 tracking-tight">
              Tugas Kriptografi Dasar
            </span>
          </div>
        </header>

        <Hero />

        <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
          
          <section id="input-proses">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">1. Input & Proses</h2>
              <p className="text-slate-600 mt-2">Masukkan pesan, kunci enkripsi, dan metode untuk memulai.</p>
            </div>
            <Enkripsi />
          </section>

          <section id="himpunan-karakter">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">2. Himpunan Karakter</h2>
            </div>
            <Kamus />
          </section>

          <section id="tabel-pemetaan">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">3. Tabel Pemetaan Huruf</h2>
            </div>
            <Relasi />
          </section>

          <section id="modulo-math">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">4. Detail Perhitungan (Modulo)</h2>
            </div>
            <Kalkulasi />
          </section>

          <section id="kemungkinan-kunci">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">5. Kemungkinan Kunci</h2>
            </div>
            <Bruteforce />
          </section>

          <section id="diagram-alur">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">6. Diagram Alur (Flowchart)</h2>
            </div>
            <Flowchart />
          </section>

          <section id="laporan-akhir">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">7. Laporan Akhir</h2>
            </div>
            <LaporanAkhir />
          </section>

        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 mt-12">
          <p>Tugas Kriptografi & Matematika Diskrit - Extended Caesar Cipher {TOTAL_KARAKTER} Karakter</p>
        </footer>
      </div>
    </CipherProvider>
  );
}

export default App;
