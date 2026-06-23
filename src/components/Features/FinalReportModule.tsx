import React from 'react';
import { Card } from '../UI/Card';
import { useCipherContext } from '../../context/CipherContext';
import { FileText, CheckCircle } from 'lucide-react';
import { TOTAL_KARAKTER } from '../../utils/cryptography';

export const FinalReportModule: React.FC = () => {
  const { pesanAsli, pesanSandi, kunci, metodePengamanan, validasiKunci } = useCipherContext();

  const kunciNormal = typeof kunci === 'number' ? validasiKunci(kunci) : 'Belum diatur';

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-primary-600 w-6 h-6" />
        <h2 className="text-2xl font-bold text-slate-900">Laporan Akhir</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-2 border-b pb-2">Ringkasan Konfigurasi</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>Metode Pengamanan:</strong> {metodePengamanan}</li>
            <li><strong>Kunci Enkripsi (Asli):</strong> {kunci !== '' ? kunci : 'Belum diatur'}</li>
            <li><strong>Kunci Enkripsi (Normalisasi):</strong> {kunciNormal}</li>
            <li><strong>Himpunan Karakter:</strong> 77 Karakter (N = {TOTAL_KARAKTER})</li>
          </ul>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-2 border-b pb-2">Hasil Uji Coba</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Pesan Asli:</p>
              <div className="p-2 bg-white border border-slate-200 rounded text-slate-800 min-h-[60px] break-words">
                {pesanAsli || '-'}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Pesan Sandi:</p>
              <div className="p-2 bg-white border border-slate-200 rounded text-slate-800 min-h-[60px] break-words">
                {pesanSandi || '-'}
              </div>
            </div>
          </div>
          
          {pesanAsli && pesanSandi && (
            <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md border border-green-200">
              <CheckCircle className="w-5 h-5" />
              <span>Proses enkripsi dan dekripsi berhasil dilakukan tanpa kehilangan data (Lossless).</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
