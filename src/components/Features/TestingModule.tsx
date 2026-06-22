import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Table, Thead, Tbody, Tr, Th, Td } from '../UI/Table';
import { encrypt, decrypt } from '../../utils/cryptography';
import { CheckSquare, Plus, Check, X } from 'lucide-react';

interface TestCase {
  id: number;
  plaintext: string;
  key: number;
  expectedCipher: string;
}

const initialTestCases: TestCase[] = [
  { id: 1, plaintext: "Informatika", key: 5, expectedCipher: "Nsktwrfynpf" },
  { id: 2, plaintext: "Sistem Keamanan", key: 10, expectedCipher: "c!CDOwUoKwKwXkX" },
  { id: 3, plaintext: "Data_Rahasia123", key: 77, expectedCipher: "Data_Rahasia123" },
  { id: 4, plaintext: "Ujian Akhir!", key: 3, expectedCipher: "XmldqcDnklu$" },
];

export const TestingModule: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const [newPlaintext, setNewPlaintext] = useState('');
  const [newKey, setNewKey] = useState<number | ''>('');

  const handleAddTest = () => {
    if (!newPlaintext || newKey === '') return;
    
    const expectedCipher = encrypt(newPlaintext, newKey).result;
    
    setTestCases([
      ...testCases,
      { id: Date.now(), plaintext: newPlaintext, key: newKey, expectedCipher }
    ]);
    
    setNewPlaintext('');
    setNewKey('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-primary-600" />
          Pengujian Sistem
        </h2>
        <p className="text-slate-600">
          Skenario pengujian untuk memverifikasi keakuratan algoritma enkripsi dan dekripsi.
        </p>
      </div>

      <Card>
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex-1 w-full">
            <Input 
              label="Plaintext Uji" 
              value={newPlaintext} 
              onChange={(e) => setNewPlaintext(e.target.value)} 
              placeholder="Masukkan teks..."
            />
          </div>
          <div className="w-full md:w-32">
            <Input 
              label="Kunci" 
              type="number" 
              value={newKey} 
              onChange={(e) => setNewKey(e.target.value ? parseInt(e.target.value) : '')} 
              placeholder="Angka"
            />
          </div>
          <Button 
            onClick={handleAddTest}
            disabled={!newPlaintext || newKey === ''}
            leftIcon={<Plus className="w-4 h-4" />}
            className="w-full md:w-auto"
          >
            Tambah Uji
          </Button>
        </div>

        <div className="overflow-x-auto border rounded-lg border-slate-200">
          <Table>
            <Thead className="bg-slate-100">
              <Tr>
                <Th>No</Th>
                <Th>Plaintext</Th>
                <Th>Kunci</Th>
                <Th>Ciphertext (Enkripsi)</Th>
                <Th>Hasil Dekripsi</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {testCases.map((tc, index) => {
                const encResult = encrypt(tc.plaintext, tc.key).result;
                const decResult = decrypt(encResult, tc.key).result;
                const isSuccess = encResult === tc.expectedCipher && decResult === tc.plaintext;

                return (
                  <Tr key={tc.id}>
                    <Td>{index + 1}</Td>
                    <Td className="font-mono text-sm text-slate-800">{tc.plaintext}</Td>
                    <Td className="text-slate-700">{tc.key}</Td>
                    <Td className="font-mono text-sm text-slate-700">{encResult}</Td>
                    <Td className="font-mono text-sm text-slate-700">{decResult}</Td>
                    <Td>
                      {isSuccess ? (
                        <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                          <Check className="w-4 h-4" /> Berhasil
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-700 font-semibold">
                          <X className="w-4 h-4" /> Gagal
                        </div>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
