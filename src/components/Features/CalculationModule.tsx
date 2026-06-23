import React from 'react';
import { Card } from '../UI/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { ListOrdered, AlertCircle } from 'lucide-react';

// Menampilkan langkah-langkah perhitungan E(x)/(D(x)) per karakter
export const CalculationModule: React.FC = () => {
  const { jejakLangkah, mode } = useCipherContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <ListOrdered className="w-6 h-6 text-primary-600" />
          Detail Perhitungan
        </h2>
        <p className="text-slate-600">
          Langkah operasi matematika tiap karakter saat proses{' '}
          {mode === 'enkripsi' ? 'enkripsi E(x) = (x + k) mod N' : 'dekripsi D(x) = (x - k + N) mod N'}.
        </p>
      </div>

      <Card>
        {jejakLangkah.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <AlertCircle className="w-12 h-12 mb-4 text-slate-300" />
            <p className="font-medium">Belum ada data.</p>
            <p className="text-sm text-slate-400 mt-1">Lakukan enkripsi atau dekripsi terlebih dahulu.</p>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <Thead className="sticky top-0 z-10 bg-slate-100">
                <Tr>
                  <Th>No</Th>
                  <Th>Karakter Asli</Th>
                  <Th>Indeks Asli</Th>
                  {/* Kolom ini menampilkan inti perhitungan modulo */}
                  <Th>Rumus Operasi</Th>
                  <Th>Indeks Hasil</Th>
                  <Th>Karakter Hasil</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jejakLangkah.map((langkah, indeks) => (
                  <Tr key={indeks} className={langkah.indeksAsli === -1 ? 'bg-red-50' : ''}>
                    <Td>{indeks + 1}</Td>
                    <Td className="font-bold text-slate-800">
                      {langkah.hurufAsli === ' ' ? '(spasi)' : langkah.hurufAsli}
                    </Td>
                    <Td>{langkah.indeksAsli !== -1 ? langkah.indeksAsli : '–'}</Td>
                    {/* Menampilkan operasi, misal: "(5 + 3) mod 77 = 8" */}
                    <Td className="font-mono text-xs text-slate-600">{langkah.rumusOperasi}</Td>
                    <Td>{langkah.indeksHasil !== -1 ? langkah.indeksHasil : '–'}</Td>
                    <Td className="font-bold text-primary-700">
                      {langkah.hurufHasil === ' ' ? '(spasi)' : langkah.hurufHasil}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};
