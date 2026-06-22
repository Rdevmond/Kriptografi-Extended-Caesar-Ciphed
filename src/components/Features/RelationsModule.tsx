import React, { useMemo } from 'react';
import { Card } from '../UI/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { CHARACTER_SET, SET_LENGTH } from '../../utils/cryptography';
import { ArrowRightLeft, BookOpen, CheckCircle2 } from 'lucide-react';

export const RelationsModule: React.FC = () => {
  const { key, validateKey } = useCipherContext();
  
  const normalizedKey = useMemo(() => {
    if (typeof key !== 'number') return 0;
    return validateKey(key);
  }, [key, validateKey]);

  const mappingData = useMemo(() => {
    const chars = CHARACTER_SET.split('');
    return chars.map((char, index) => {
      const resultIndex = (index + normalizedKey) % SET_LENGTH;
      return {
        originalIndex: index,
        originalChar: char,
        resultIndex,
        resultChar: CHARACTER_SET[resultIndex]
      };
    });
  }, [normalizedKey]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-primary-600" />
          Relasi &amp; Fungsi Bijektif
        </h2>
        <p className="text-slate-600">
          Melihat pemetaan karakter dari Domain (Plaintext) ke Kodomain (Ciphertext) menggunakan kunci {normalizedKey}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Tabel Pemetaan (Mapping)</h3>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <Table>
                <Thead className="sticky top-0 z-10 bg-slate-100">
                  <Tr>
                    <Th>Indeks Asli (x)</Th>
                    <Th>Karakter Asli</Th>
                    <Th>Fungsi</Th>
                    <Th>Indeks Hasil</Th>
                    <Th>Karakter Hasil</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mappingData.map((row) => (
                    <Tr key={row.originalIndex}>
                      <Td className="font-mono">{row.originalIndex}</Td>
                      <Td className="font-bold text-primary-700">{row.originalChar}</Td>
                      <Td className="text-xs text-slate-500">
                        ({row.originalIndex} + {normalizedKey}) mod {SET_LENGTH}
                      </Td>
                      <Td className="font-mono">{row.resultIndex}</Td>
                      <Td className="font-bold text-blue-700">{row.resultChar}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="panel" className="bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Analisis Fungsi
            </h3>
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              Fungsi enkripsi Caesar Cipher <span className="font-mono bg-blue-100 text-blue-800 px-1 rounded">E(x) = (x + k) mod N</span> adalah sebuah <strong>Fungsi Bijektif</strong>.
            </p>
            
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Injektif (One-to-One):</strong>
                  <p className="text-slate-600 mt-0.5">Setiap karakter plaintext (domain) dipetakan ke karakter ciphertext (kodomain) yang berbeda.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Surjektif (Onto):</strong>
                  <p className="text-slate-600 mt-0.5">Setiap karakter dalam kodomain memiliki pasangan di domain. Seluruh {SET_LENGTH} kemungkinan karakter dapat dihasilkan.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Invertible (Dapat Dibalik):</strong>
                  <p className="text-slate-600 mt-0.5">Karena bersifat bijektif, fungsi ini memiliki invers yang valid: <span className="font-mono bg-blue-100 text-blue-800 px-1 rounded">D(x) = (x - k + N) mod N</span>.</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
