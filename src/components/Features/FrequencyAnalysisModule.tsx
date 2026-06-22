import React, { useMemo } from 'react';
import { Card } from '../UI/Card';
import { useCipherContext } from '../../context/CipherContext';
import { calculateFrequencies } from '../../utils/cryptography';
import { BarChart2, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const FrequencyAnalysisModule: React.FC = () => {
  const { plaintext, ciphertext } = useCipherContext();

  const data = useMemo(() => {
    const plainFreqs = calculateFrequencies(plaintext);
    const cipherFreqs = calculateFrequencies(ciphertext);
    
    // Merge for chart
    const allChars = new Set([...plainFreqs.map(f => f.char), ...cipherFreqs.map(f => f.char)]);
    
    return Array.from(allChars).map(char => {
      const p = plainFreqs.find(f => f.char === char);
      const c = cipherFreqs.find(f => f.char === char);
      return {
        name: char === ' ' ? 'Space' : char,
        Plaintext: p ? p.count : 0,
        Ciphertext: c ? c.count : 0,
      };
    }).sort((a, b) => b.Plaintext - a.Plaintext);
  }, [plaintext, ciphertext]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary-600" />
          Analisis Frekuensi
        </h2>
        <p className="text-slate-600">
          Membandingkan frekuensi kemunculan karakter pada plaintext dan ciphertext.
        </p>
      </div>

      <Card className="h-[400px]">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <BarChart2 className="w-12 h-12 mb-4 text-slate-300" />
            <p className="font-medium">Belum ada data untuk dianalisis.</p>
            <p className="text-sm text-slate-400 mt-1">Lakukan enkripsi terlebih dahulu.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="Plaintext" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Ciphertext" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card variant="panel" className="bg-amber-50 border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-700" /> Kerentanan Kriptografi
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          Grafik di atas menunjukkan bahwa distribusi frekuensi ciphertext identik dengan plaintext, hanya saja letak karakternya bergeser.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Dalam ilmu kriptanalisis, Caesar Cipher (termasuk versi Extended) sangat rentan terhadap serangan <strong>Frequency Analysis</strong>. Meskipun kita memperbesar basis menjadi 77 karakter, bentuk kurva frekuensinya tetap sama.
        </p>
      </Card>
    </div>
  );
};
