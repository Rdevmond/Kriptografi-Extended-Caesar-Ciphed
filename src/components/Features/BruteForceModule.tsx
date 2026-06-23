import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { generateBruteForce, N } from '../../utils/cryptography';
import { Cpu, Play, AlertTriangle } from 'lucide-react';

// Mencoba semua k ∈ {1, ..., N-1} untuk mendekripsi ciphertext
// Mendemonstrasikan bahwa ruang kunci yang kecil = mudah dipecahkan
export const BruteForceModule: React.FC = () => {
  const { ciphertext } = useCipherContext();
  const [results, setResults] = useState<{ key: number; text: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleSimulate = () => {
    if (!ciphertext) return;
    setIsRunning(true);
    setResults([]);

    // setTimeout singkat untuk memberi efek "loading" agar terasa ada proses
    setTimeout(() => {
      setResults(generateBruteForce(ciphertext)); // O(N × |teks|)
      setIsRunning(false);
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
          Menguji seluruh {N - 1} kemungkinan kunci untuk menemukan plaintext dari ciphertext.
        </p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-2">Target Ciphertext</h3>
            <div className="bg-slate-100 p-3 rounded-lg text-sm font-mono break-all min-h-[60px] flex items-center text-slate-700">
              {ciphertext || <span className="text-slate-400 italic">Lakukan enkripsi terlebih dahulu.</span>}
            </div>
          </div>
          <Button onClick={handleSimulate} disabled={!ciphertext || isRunning} leftIcon={<Play className="w-4 h-4" />} isLoading={isRunning}>
            Run Brute Force
          </Button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[500px] overflow-y-auto border rounded-lg border-slate-200">
            <Table>
              <Thead className="sticky top-0 z-10 bg-slate-100">
                <Tr>
                  <Th className="w-24">Kunci k</Th>
                  <Th>Hasil Dekripsi D(x) = (x - k + {N}) mod {N}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map(({ key, text }) => (
                  <Tr key={key}>
                    <Td className="font-mono font-bold text-primary-700">k = {key}</Td>
                    <Td className="font-mono text-sm break-all text-slate-700">{text}</Td>
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
          Ruang kunci (Key Space) hanya <strong>{N - 1} kemungkinan</strong> (k = 0 dan k = {N} tidak mengubah pesan).
          Komputer modern dapat mencoba seluruh kemungkinan ini dalam hitungan <strong>milidetik</strong> — O(N).
        </p>
      </Card>
    </div>
  );
};
