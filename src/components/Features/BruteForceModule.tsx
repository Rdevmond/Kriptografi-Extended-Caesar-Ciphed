import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { useCipherContext } from '../../context/CipherContext';
import { generateBruteForce, SET_LENGTH } from '../../utils/cryptography';
import { Cpu, Play, AlertTriangle } from 'lucide-react';

export const BruteForceModule: React.FC = () => {
  const { ciphertext } = useCipherContext();
  const [results, setResults] = useState<Array<{key: number, text: string}>>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    if (!ciphertext) return;
    
    setIsSimulating(true);
    setResults([]);
    
    setTimeout(() => {
      const res = generateBruteForce(ciphertext);
      setResults(res);
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary-600" />
          Simulasi Brute Force
        </h2>
        <p className="text-slate-600">
          Menguji seluruh kemungkinan kunci (Ruang Kunci) untuk menemukan pesan asli dari ciphertext.
        </p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-2">Target Ciphertext</h3>
            <div className="bg-slate-100 p-3 rounded-lg text-sm font-mono break-all min-h-[60px] flex items-center text-slate-700">
              {ciphertext || <span className="text-slate-400 italic">Lakukan enkripsi terlebih dahulu untuk mendapatkan ciphertext.</span>}
            </div>
          </div>
          
          <Button 
            onClick={handleSimulate} 
            disabled={!ciphertext || isSimulating}
            leftIcon={<Play className="w-4 h-4" />}
            isLoading={isSimulating}
          >
            Run Brute Force
          </Button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[500px] overflow-y-auto border rounded-lg border-slate-200">
            <Table>
              <Thead className="sticky top-0 z-10 bg-slate-100">
                <Tr>
                  <Th className="w-24">Kunci</Th>
                  <Th>Hasil Dekripsi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((res) => (
                  <Tr key={res.key}>
                    <Td className="font-mono font-bold text-primary-700">
                      K = {res.key}
                    </Td>
                    <Td className="font-mono text-sm break-all text-slate-700">
                      {res.text}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
      </Card>

      <Card variant="panel" className="bg-red-50 border-red-200">
        <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-700" /> Analisis Keamanan (Brute Force)
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          Ruang kunci (Key Space) adalah himpunan semua kemungkinan kunci yang dapat digunakan untuk mengenkripsi data.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          Pada Extended Caesar Cipher ini, jumlah karakter adalah {SET_LENGTH}. Karena kunci <span className="font-mono bg-red-100 text-red-800 px-1 rounded">k = 0</span> dan <span className="font-mono bg-red-100 text-red-800 px-1 rounded">k = {SET_LENGTH}</span> tidak mengubah pesan asli, maka kemungkinan kunci valid hanya ada <strong>{SET_LENGTH - 1} kemungkinan</strong>. Komputer modern dapat mencoba 76 kemungkinan ini dalam hitungan milidetik.
        </p>
      </Card>
    </div>
  );
};
