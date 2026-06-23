import React, { useMemo } from 'react';
import { Card } from '../UI/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { CHARACTER_SET, N } from '../../utils/cryptography';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';

// Menampilkan tabel pemetaan Domain → Kodomain untuk kunci yang aktif
export const RelationsModule: React.FC = () => {
  const { key, validateKey } = useCipherContext();

  const k = useMemo(
    () => (typeof key === 'number' ? validateKey(key) : 0),
    [key, validateKey]
  );

  // Hitung pemetaan E(x) = (x + k) mod N untuk seluruh Σ
  const mappingData = useMemo(() =>
    CHARACTER_SET.split('').map((char, x) => {
      const Ex = (x + k) % N;
      return { x, char, Ex, resultChar: CHARACTER_SET[Ex] };
    }),
    [k]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-primary-600" />
          Relasi &amp; Fungsi Bijektif
        </h2>
        <p className="text-slate-600">
          Pemetaan lengkap Domain (Plaintext) → Kodomain (Ciphertext) dengan kunci k = {k}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Tabel Pemetaan ── */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
              Tabel Pemetaan — E(x) = (x + {k}) mod {N}
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <Table>
                <Thead className="sticky top-0 z-10 bg-slate-100">
                  <Tr>
                    <Th>Indeks x</Th>
                    <Th>Karakter Asal</Th>
                    <Th>Operasi</Th>
                    <Th>Indeks E(x)</Th>
                    <Th>Karakter Hasil</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mappingData.map(({ x, char, Ex, resultChar }) => (
                    <Tr key={x}>
                      <Td className="font-mono">{x}</Td>
                      <Td className="font-bold text-primary-700">{char}</Td>
                      <Td className="text-xs text-slate-500 font-mono">
                        ({x} + {k}) mod {N}
                      </Td>
                      <Td className="font-mono">{Ex}</Td>
                      <Td className="font-bold text-blue-700">{resultChar}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </Card>
        </div>

        {/* ── Analisis Sifat Fungsi ── */}
        <Card variant="panel" className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Analisis Fungsi</h3>
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            <span className="font-mono bg-blue-100 text-blue-800 px-1 rounded">E(x) = (x + k) mod N</span> adalah fungsi <strong>Bijektif</strong>.
          </p>

          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Injektif (One-to-One):</strong>
                <p className="text-slate-600 mt-0.5">Setiap karakter plaintext dipetakan ke satu karakter ciphertext yang unik — tidak ada yang bentrok.</p>
              </div>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Surjektif (Onto):</strong>
                <p className="text-slate-600 mt-0.5">Seluruh {N} karakter kodomain dapat dihasilkan — tidak ada yang tidak terpakai.</p>
              </div>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Invertible:</strong>
                <p className="text-slate-600 mt-0.5">
                  Karena bijektif, ada fungsi invers yang valid:{' '}
                  <span className="font-mono bg-blue-100 text-blue-800 px-1 rounded">D(x) = (x - k + N) mod N</span>.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
