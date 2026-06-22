import React, { useRef, useState } from 'react';
import { Button } from '../UI/Button';
import { FileText, Download, CheckCircle } from 'lucide-react';
import { SET_LENGTH } from '../../utils/cryptography';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const ReportModule: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff' // Force white background for PDF
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Laporan_Extended_Caesar_Cipher.pdf');
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-500" />
            Generator Laporan
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Hasilkan ringkasan otomatis untuk dilampirkan pada laporan proyek Matematika Diskrit.
          </p>
        </div>
        
        <Button 
          onClick={generatePDF} 
          isLoading={isGenerating}
          leftIcon={isSuccess ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
          className={isSuccess ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
        >
          {isSuccess ? 'Berhasil Diunduh!' : 'Download PDF'}
        </Button>
      </div>

      <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-xl overflow-x-auto">
        {/* The report to be exported */}
        <div 
          ref={reportRef} 
          className="bg-white text-slate-800 p-10 mx-auto" 
          style={{ width: '210mm', minHeight: '297mm', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
        >
          <div className="text-center mb-8 border-b-2 border-slate-800 pb-6">
            <h1 className="text-2xl font-bold mb-2 uppercase">Laporan Analisis Kriptografi</h1>
            <h2 className="text-xl font-semibold text-slate-600">Extended Caesar Cipher (Basis {SET_LENGTH})</h2>
            <p className="text-sm text-slate-500 mt-2">Mata Kuliah Matematika Diskrit</p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-justify">
            <section>
              <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3">1. Pendahuluan</h3>
              <p>
                Algoritma Caesar Cipher klasik menggunakan 26 huruf alfabet sebagai basis kriptografinya. Proyek ini 
                mengimplementasikan <strong>Extended Caesar Cipher</strong> yang memperluas himpunan karakter (Domain & Kodomain) 
                menjadi <strong>{SET_LENGTH} karakter</strong>, mencakup huruf besar (A-Z), huruf kecil (a-z), angka (0-9), 
                serta 15 simbol spesial. Perluasan ini bertujuan untuk meningkatkan kompleksitas ruang kunci (Key Space).
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3">2. Landasan Matematika Diskrit</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Himpunan (Set):</strong> Kardinalitas himpunan karakter <span className="font-mono">|Σ| = N = {SET_LENGTH}</span>.</li>
                <li><strong>Aritmatika Modulo:</strong> Enkripsi dioperasikan dalam field bilangan bulat <span className="font-mono">Z_{SET_LENGTH}</span> menggunakan modulo {SET_LENGTH}.</li>
                <li><strong>Fungsi Bijektif:</strong> Fungsi pemetaan bersifat Injektif (tidak ada karakter yang terpetakan ke hasil yang sama) dan Surjektif (seluruh anggota kodomain terpetakan). Sifat ini menjamin fungsi Invertible (dapat didekripsi).</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3">3. Formulasi Algoritma</h3>
              <div className="bg-slate-50 p-4 rounded-lg my-3 border border-slate-200">
                <p><strong>Fungsi Enkripsi:</strong> <span className="font-mono text-base ml-2">E(x) = (x + k) mod {SET_LENGTH}</span></p>
                <p className="mt-2"><strong>Fungsi Dekripsi:</strong> <span className="font-mono text-base ml-2">D(x) = (x - k + {SET_LENGTH}) mod {SET_LENGTH}</span></p>
                <p className="text-xs text-slate-500 mt-2">* x = Indeks plaintext, k = kunci rahasia</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3">4. Analisis Keamanan (Kriptanalisis)</h3>
              <p>
                Walaupun jumlah kemungkinan kunci meningkat dari 25 menjadi <strong>{SET_LENGTH - 1} kemungkinan</strong>, sistem ini 
                masih sangat rentan terhadap serangan:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li><strong>Brute Force Attack:</strong> Mengingat ruang kunci yang terbatas (hanya 76 kunci valid), algoritma komputer dapat menguji seluruh kemungkinan kunci dalam waktu kurang dari satu detik (O(N)).</li>
                <li><strong>Frequency Analysis:</strong> Sifat cipher substitusi monoalfabetik membuat distribusi frekuensi karakter pada ciphertext tetap sama persis dengan plaintext aslinya. Pola kemunculan karakter tidak disembunyikan.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-bold border-b border-slate-300 pb-1 mb-3">5. Kesimpulan</h3>
              <p>
                Extended Caesar Cipher dengan basis {SET_LENGTH} karakter berhasil mendemonstrasikan implementasi konsep-konsep 
                Matematika Diskrit, meliputi pemetaan fungsi bijektif, operasi himpunan, kombinatorika, dan aritmatika modulo. 
                Namun secara akademis dan praktis, metode ini tidak memenuhi standar keamanan modern karena rentan terhadap 
                serangan komputasi sederhana.
              </p>
            </section>
            
            <div className="mt-16 pt-8 border-t border-slate-800 text-right">
              <p className="mb-12">Dihasilkan oleh Aplikasi Extended Caesar Cipher</p>
              <p className="font-bold border-b border-slate-800 inline-block px-12 pb-1 text-transparent">Tanda Tangan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
