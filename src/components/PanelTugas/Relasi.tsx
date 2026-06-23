import React, { useMemo } from 'react';
import { Card } from '../UI/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { HIMPUNAN_KARAKTER, TOTAL_KARAKTER } from '../../utils/cryptography';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';

// Menampilkan tabel pemetaan Domain → Kodomain untuk kunci yang aktif
export const Relasi: React.FC = () => {
  const { kunci, validasiKunci, mode } = useCipherContext();

  const k = useMemo(
    () => (typeof kunci === 'number' ? validasiKunci(kunci) : 0),
    [kunci, validasiKunci]
  );

  const sedangDekripsi = mode === 'dekripsi';

  // Hitung pemetaan berdasarkan mode yang aktif:
  // Enkripsi → E(x) = (x + k) mod N
  // Dekripsi → D(x) = (x - k + N) mod N
  const dataPemetaan = useMemo(() =>
    HIMPUNAN_KARAKTER.split('').map((huruf, indeks) => {
      const indeksHasil = sedangDekripsi
        ? (indeks - k + TOTAL_KARAKTER) % TOTAL_KARAKTER
        : (indeks + k) % TOTAL_KARAKTER;
      const rumusPerBarisan = sedangDekripsi
        ? `(${indeks} - ${k} + ${TOTAL_KARAKTER}) mod ${TOTAL_KARAKTER}`
        : `(${indeks} + ${k}) mod ${TOTAL_KARAKTER}`;
      return { indeks, huruf, indeksHasil, hurufHasil: HIMPUNAN_KARAKTER[indeksHasil], rumusPerBarisan };
    }),
    [k, sedangDekripsi]
  );

  const judulRumus = sedangDekripsi
    ? `D(x) = (x - ${k} + ${TOTAL_KARAKTER}) mod ${TOTAL_KARAKTER}`
    : `E(x) = (x + ${k}) mod ${TOTAL_KARAKTER}`;

  const labelKolom = sedangDekripsi
    ? { hurufAsal: 'Huruf Sandi', hurufHasil: 'Huruf Asli' }
    : { hurufAsal: 'Huruf Asli', hurufHasil: 'Huruf Sandi' };

  const deskripsiPemetaan = sedangDekripsi
    ? `Pemetaan kebalikan: Huruf Sandi → Huruf Asli (Dekripsi) dengan kunci k = ${k}.`
    : `Pemetaan lengkap: Huruf Asli → Huruf Sandi (Enkripsi) dengan kunci k = ${k}.`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-primary-600" />
          Relasi &amp; Fungsi Bijektif
        </h2>
        <p className="text-slate-600">{deskripsiPemetaan}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Tabel Pemetaan ── */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
              Tabel Pemetaan — {judulRumus}
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <Table>
                <Thead className="sticky top-0 z-10 bg-slate-100">
                  <Tr>
                    <Th>Indeks Asli</Th>
                    <Th>{labelKolom.hurufAsal}</Th>
                    <Th>Rumus Operasi</Th>
                    <Th>Indeks Hasil</Th>
                    <Th>{labelKolom.hurufHasil}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataPemetaan.map(({ indeks, huruf, indeksHasil, hurufHasil, rumusPerBarisan }) => (
                    <Tr key={indeks}>
                      <Td className="font-mono">{indeks}</Td>
                      <Td className="font-bold text-primary-700">{huruf}</Td>
                      <Td className="text-xs text-slate-500 font-mono">
                        {rumusPerBarisan}
                      </Td>
                      <Td className="font-mono">{indeksHasil}</Td>
                      <Td className="font-bold text-blue-700">{hurufHasil}</Td>
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
            <span className="font-mono bg-blue-100 text-blue-800 px-1 rounded">
              {sedangDekripsi
                ? `D(x) = (x - k + ${TOTAL_KARAKTER}) mod ${TOTAL_KARAKTER}`
                : `E(x) = (x + k) mod ${TOTAL_KARAKTER}`}
            </span>{' '}
            adalah fungsi <strong>Bijektif</strong>.
          </p>

          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Injektif (Satu-Satu):</strong>
                <p className="text-slate-600 mt-0.5">Setiap huruf dipetakan ke satu huruf lain yang unik — tidak ada yang bertabrakan.</p>
              </div>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Surjektif (Pada):</strong>
                <p className="text-slate-600 mt-0.5">Seluruh {TOTAL_KARAKTER} karakter kodomain memiliki pasangan — tidak ada karakter yang tersisa tak terpakai.</p>
              </div>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Bisa Dibalik (Invertible):</strong>
                <p className="text-slate-600 mt-0.5">
                  Karena bijektif, ada fungsi kebalikan yang valid:{' '}
                  <span className="font-mono bg-blue-100 text-blue-800 px-1 rounded">
                    {sedangDekripsi
                      ? `E(x) = (x + k) mod ${TOTAL_KARAKTER}`
                      : `D(x) = (x - k + ${TOTAL_KARAKTER}) mod ${TOTAL_KARAKTER}`}
                  </span>.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
