import React, { useMemo } from 'react';
import { Card } from '../UI/Card';
import { useCipherContext } from '../../context/CipherContext';
import { calculateFrequencies } from '../../utils/cryptography';
import { BarChart2, ShieldAlert } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

// Membandingkan distribusi frekuensi karakter plaintext vs ciphertext
// Ini membuktikan kelemahan Caesar Cipher terhadap Frequency Analysis Attack
export const FrequencyAnalysisModule: React.FC = () => {
  const { plaintext, ciphertext } = useCipherContext();

  // Gabungkan frekuensi plaintext dan ciphertext ke satu data series
  const data = useMemo(() => {
    const plainFreqs  = calculateFrequencies(plaintext);
    const cipherFreqs = calculateFrequencies(ciphertext);
    const allChars    = new Set([...plainFreqs.map(f => f.char), ...cipherFreqs.map(f => f.char)]);

    return Array.from(allChars)
      .map(char => ({
        name:       char === ' ' ? 'Space' : char,
        Plaintext:  plainFreqs.find(f => f.char === char)?.count  ?? 0,
        Ciphertext: cipherFreqs.find(f => f.char === char)?.count ?? 0,
      }))
      .sort((a, b) => b.Plaintext - a.Plaintext);
  }, [plaintext, ciphertext]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary-600" />
          Analisis Frekuensi
        </h2>
        <p className="text-slate-600">
          Frekuensi kemunculan karakter plaintext vs ciphertext — distribusinya identik, hanya bergeser.
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
              <Bar dataKey="Plaintext"  fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Ciphertext" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card variant="panel" className="bg-amber-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-700" /> Kerentanan: Frequency Analysis Attack
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Grafik membuktikan bahwa distribusi frekuensi ciphertext <strong>identik</strong> dengan plaintext —
          hanya karakter-karakternya yang bergeser sejauh k. Penyerang dapat menebak kunci dengan
          mencocokkan pola frekuensi ini tanpa mengetahui kunci sama sekali.
        </p>
      </Card>
    </div>
  );
};
