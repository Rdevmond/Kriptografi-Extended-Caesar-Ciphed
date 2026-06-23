import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { simulasiBruteForce, TOTAL_KARAKTER } from '../../utils/cryptography';
import { Cpu, Play, AlertTriangle } from 'lucide-react';

// Mencoba semua kunci dari 1 sampai TOTAL_KARAKTER - 1 untuk membongkar sandi
export const Bruteforce: React.FC = () => {
  const { pesanSandi } = useCipherContext();
  const [hasilSimulasi, setHasilSimulasi] = useState<{ kunciTebakan: number; hasilTeks: string }[]>([]);
  const [sedangBerjalan, setSedangBerjalan] = useState(false);

  const jalankanSimulasi = () => {
    if (!pesanSandi) return;
    setSedangBerjalan(true);
    setHasilSimulasi([]);

    // Memberi sedikit jeda efek loading
    setTimeout(() => {
      setHasilSimulasi(simulasiBruteForce(pesanSandi));
      setSedangBerjalan(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary-600" />
          Simulasi Brute Force
        </h2>
        <p className="text-slate-600">
          Menguji seluruh {TOTAL_KARAKTER - 1} kemungkinan kunci untuk menemukan pesan asli (plaintext) dari pesan sandi (ciphertext).
        </p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-2">Target Pesan Sandi</h3>
            <div className="bg-slate-100 p-3 rounded-lg text-sm font-mono break-all min-h-[60px] flex items-center text-slate-700">
              {pesanSandi || <span className="text-slate-400 italic">Lakukan enkripsi terlebih dahulu.</span>}
            </div>
          </div>
          <Button onClick={jalankanSimulasi} disabled={!pesanSandi || sedangBerjalan} leftIcon={<Play className="w-4 h-4" />} isLoading={sedangBerjalan}>
            Jalankan Brute Force
          </Button>
        </div>

        {hasilSimulasi.length > 0 && (
          <div className="max-h-[500px] overflow-y-auto border rounded-lg border-slate-200">
            <Table>
              <Thead className="sticky top-0 z-10 bg-slate-100">
                <Tr>
                  <Th className="w-24">Kunci k</Th>
                  <Th>Hasil Dekripsi D(x) = (x - k + {TOTAL_KARAKTER}) mod {TOTAL_KARAKTER}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hasilSimulasi.map(({ kunciTebakan, hasilTeks }) => (
                  <Tr key={kunciTebakan}>
                    <Td className="font-mono font-bold text-primary-700">k = {kunciTebakan}</Td>
                    <Td className="font-mono text-sm break-all text-slate-700">{hasilTeks}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
      </Card>

      <Card variant="panel" className="bg-red-50 border-red-200">
        <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-700" /> Analisis Keamanan
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          Karena kita hanya memiliki <strong>{TOTAL_KARAKTER - 1} kemungkinan kunci</strong>, keamanan algoritma ini sangat rendah jika kuncinya tidak diketahui.
          Sistem komputer modern dapat menebak semua kemungkinan tersebut dalam waktu kurang dari satu detik!
        </p>
      </Card>
    </div>
  );
};
