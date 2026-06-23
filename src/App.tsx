import { Hero } from './components/Layout/Hero';
import { useTheme } from './hooks/useTheme';
import { CipherProvider } from './context/CipherContext';
import { EncryptionModule } from './components/Features/EncryptionModule';
import { CharacterSetModule } from './components/Features/CharacterSetModule';
import { RelationsModule } from './components/Features/RelationsModule';
import { CalculationModule } from './components/Features/CalculationModule';
import { BruteForceModule } from './components/Features/BruteForceModule';
import { FlowchartModule } from './components/Features/FlowchartModule';
import { FinalReportModule } from './components/Features/FinalReportModule';
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
            <EncryptionModule />
          </section>

          <section id="himpunan-karakter">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">2. Himpunan Karakter</h2>
            </div>
            <CharacterSetModule />
          </section>

          <section id="tabel-pemetaan">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">3. Tabel Pemetaan Huruf</h2>
            </div>
            <RelationsModule />
          </section>

          <section id="modulo-math">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">4. Detail Perhitungan (Modulo)</h2>
            </div>
            <CalculationModule />
          </section>

          <section id="kemungkinan-kunci">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">5. Kemungkinan Kunci</h2>
            </div>
            <BruteForceModule />
          </section>

          <section id="diagram-alur">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">6. Diagram Alur (Flowchart)</h2>
            </div>
            <FlowchartModule />
          </section>

          <section id="laporan-akhir">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">7. Laporan Akhir</h2>
            </div>
            <FinalReportModule />
          </section>

        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 mt-12">
          <p>Tugas Kriptografi & Matematika Diskrit - Extended Caesar Cipher 77 Karakter</p>
        </footer>
      </div>
    </CipherProvider>
  );
}

export default App;
