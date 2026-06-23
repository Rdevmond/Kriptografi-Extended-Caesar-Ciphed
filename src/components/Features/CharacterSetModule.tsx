import React from 'react';
import { Card } from '../UI/Card';
import { CHARACTER_SET, N } from '../../utils/cryptography';
import { Type, Info } from 'lucide-react';

// Menampilkan himpunan Σ lengkap beserta indeks tiap karakter
export const CharacterSetModule: React.FC = () => {
  const chars = CHARACTER_SET.split('');

  const stats = {
    uppercase: chars.filter(c => /[A-Z]/.test(c)).length,
    lowercase: chars.filter(c => /[a-z]/.test(c)).length,
    numbers:   chars.filter(c => /[0-9]/.test(c)).length,
    symbols:   chars.filter(c => /[^A-Za-z0-9]/.test(c)).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <Type className="w-6 h-6 text-primary-600" />
          Himpunan Karakter Σ — |Σ| = N = {N}
        </h2>
        <p className="text-slate-600">
          Basis cipher ini menggunakan {N} karakter: huruf besar, huruf kecil, angka, dan simbol.
          Tiap karakter dipetakan ke indeks 0–{N - 1}.
        </p>
      </div>

      {/* Statistik komposisi himpunan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="panel" className="text-center">
          <div className="text-3xl font-bold text-primary-700">{stats.uppercase}</div>
          <div className="text-sm text-slate-600 mt-1">Huruf Besar (A–Z)</div>
        </Card>
        <Card variant="panel" className="text-center">
          <div className="text-3xl font-bold text-blue-700">{stats.lowercase}</div>
          <div className="text-sm text-slate-600 mt-1">Huruf Kecil (a–z)</div>
        </Card>
        <Card variant="panel" className="text-center">
          <div className="text-3xl font-bold text-emerald-700">{stats.numbers}</div>
          <div className="text-sm text-slate-600 mt-1">Angka (0–9)</div>
        </Card>
        <Card variant="panel" className="text-center">
          <div className="text-3xl font-bold text-purple-700">{stats.symbols}</div>
          <div className="text-sm text-slate-600 mt-1">Simbol Spesial</div>
        </Card>
      </div>

      {/* Tabel indeks — setiap kotak = satu elemen himpunan Σ */}
      <Card>
        <div className="flex items-center gap-2 mb-4 text-slate-800">
          <Info className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-lg">Tabel Indeks Karakter (Σ)</h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-2">
          {chars.map((char, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-primary-400 hover:bg-primary-50 transition-colors cursor-default"
            >
              {/* Indeks = nilai x dalam fungsi E(x) dan D(x) */}
              <span className="text-xs text-slate-500 mb-1">{index}</span>
              <span className="text-lg font-mono font-bold text-slate-800">{char}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
