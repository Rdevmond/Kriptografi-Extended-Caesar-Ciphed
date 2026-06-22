import React from 'react';
import { Card } from '../UI/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { ListOrdered, AlertCircle } from 'lucide-react';

export const CalculationModule: React.FC = () => {
  const { steps, mode } = useCipherContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <ListOrdered className="w-6 h-6 text-primary-600" />
          Detail Perhitungan
        </h2>
        <p className="text-slate-600">
          Melihat langkah demi langkah operasi matematika yang terjadi pada setiap karakter selama proses {mode === 'encrypt' ? 'enkripsi' : 'dekripsi'}.
        </p>
      </div>

      <Card>
        {steps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <AlertCircle className="w-12 h-12 mb-4 text-slate-300" />
            <p className="font-medium">Belum ada data perhitungan.</p>
            <p className="text-sm text-slate-400 mt-1">Silakan lakukan enkripsi atau dekripsi terlebih dahulu.</p>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <Thead className="sticky top-0 z-10 bg-slate-100">
                <Tr>
                  <Th>No</Th>
                  <Th>Karakter Asli</Th>
                  <Th>Indeks Asli</Th>
                  <Th>Operasi Matematika</Th>
                  <Th>Indeks Hasil</Th>
                  <Th>Karakter Hasil</Th>
                </Tr>
              </Thead>
              <Tbody>
                {steps.map((step, idx) => (
                  <Tr key={idx} className={step.originalIndex === -1 ? "bg-red-50" : ""}>
                    <Td>{idx + 1}</Td>
                    <Td className="font-bold text-slate-800">{step.originalChar === ' ' ? '(spasi)' : step.originalChar}</Td>
                    <Td>{step.originalIndex !== -1 ? step.originalIndex : '-'}</Td>
                    <Td className="font-mono text-xs text-slate-600">{step.operation}</Td>
                    <Td>{step.resultIndex !== -1 ? step.resultIndex : '-'}</Td>
                    <Td className="font-bold text-primary-700">
                      {step.resultChar === ' ' ? '(spasi)' : step.resultChar}
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
