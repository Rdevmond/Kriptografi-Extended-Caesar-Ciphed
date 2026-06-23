import React, { useMemo } from 'react';
import { Card } from '../UI/Card';
import { useCipherContext } from '../../context/CipherContext';
import { hitungFrekuensi } from '../../utils/cryptography';
import { BarChart2, ShieldAlert } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

// Membandingkan distribusi frekuensi karakter pesan asli vs sandi
// Ini membuktikan kelemahan Caesar Cipher terhadap Frequency Analysis Attack
export const FrequencyAnalysisModule: React.FC = () => {
  const { pesanAsli, pesanSandi } = useCipherContext();

  // Gabungkan frekuensi pesan asli dan pesan sandi ke satu data series
  const data = useMemo(() => {
    const plainFreqs  = hitungFrekuensi(pesanAsli);
    const cipherFreqs = hitungFrekuensi(pesanSandi);
    const allChars    = new Set([...plainFreqs.map(f => f.huruf), ...cipherFreqs.map(f => f.huruf)]);

    return Array.from(allChars)
      .map(huruf => ({
        name:       huruf === ' ' ? 'Space' : huruf,
        PesanAsli:  plainFreqs.find(f => f.huruf === huruf)?.jumlahMuncul  ?? 0,
        PesanSandi: cipherFreqs.find(f => f.huruf === huruf)?.jumlahMuncul ?? 0,
      }))
      .sort((a, b) => b.PesanAsli - a.PesanAsli);
  }, [pesanAsli, pesanSandi]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary-600" />
          Analisis Frekuensi
        </h2>
        <p className="text-slate-600">
          Frekuensi kemunculan karakter pesan asli vs pesan sandi — distribusinya identik, hanya bergeser.
        </p>
      </div>

      <Card className="h-[400px]">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <BarChart2 className="w-12 h-12 mb-4 text-slate-300" />
            <p className="font-medium">Belum ada data.</p>
            <p className="text-sm text-slate-400 mt-1">Lakukan enkripsi terlebih dahulu.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="PesanAsli"  fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="PesanSandi" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card variant="panel" className="bg-amber-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-700" /> Kerentanan: Frequency Analysis Attack
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Grafik membuktikan bahwa distribusi frekuensi pesan sandi <strong>identik</strong> dengan pesan asli —
          hanya karakter-karakternya yang bergeser sejauh k. Penyerang dapat menebak kunci dengan
          mencocokkan pola frekuensi ini tanpa mengetahui kunci sama sekali.
        </p>
      </Card>
    </div>
  );
};
