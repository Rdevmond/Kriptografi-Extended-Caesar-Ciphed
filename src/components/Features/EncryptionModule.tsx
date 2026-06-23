import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useCipherContext } from '../../context/CipherContext';
import { Copy, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import { N } from '../../utils/cryptography';

export const EncryptionModule: React.FC = () => {
  const {
    plaintext, setPlaintext,
    ciphertext, setCiphertext,
    key, setKey,
    execute,
    mode, setMode,
    validateKey,
    securityMethod, setSecurityMethod
  } = useCipherContext();

  const [copied, setCopied] = useState(false);

  // Salin hasil ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(mode === 'encrypt' ? ciphertext : plaintext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPlaintext('');
    setKey('');
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) {
      setKey('');
      return;
    }
    // Batasi input antara 1 sampai N - 1 (76)
    if (val < 1) val = 1;
    if (val >= N) val = N - 1;
    setKey(val);
  };

  const normalizedKey = typeof key === 'number' ? validateKey(key) : '';

  // Rumus yang ditampilkan berubah sesuai mode aktif
  const formula = mode === 'encrypt'
    ? `E(x) = (x + ${normalizedKey !== '' ? normalizedKey : 'k'}) mod ${N}`
    : `D(x) = (x - ${normalizedKey !== '' ? normalizedKey : 'k'} + ${N}) mod ${N}`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900">Enkripsi &amp; Dekripsi</h2>
        <p className="text-slate-600">
          Masukkan pesan dan kunci numerik untuk mengamankan data menggunakan Extended Caesar Cipher.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Panel Input ── */}
        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800">Input</h3>
            <div className="flex items-center gap-2">
              <Button variant={mode === 'encrypt' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('encrypt')}>Enkripsi</Button>
              <Button variant={mode === 'decrypt' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('decrypt')}>Dekripsi</Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Metode Pengamanan</label>
            <select
              className="input-field"
              value={securityMethod}
              onChange={(e) => setSecurityMethod(e.target.value as any)}
            >
              <option value="Extended Caesar Cipher">Extended Caesar Cipher</option>
              <option value="Substitution" disabled>Substitution (Segera Hadir)</option>
              <option value="Modular Sederhana" disabled>Modular Sederhana (Segera Hadir)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
            </label>
            <textarea
              className="input-field min-h-[150px] resize-y"
              value={mode === 'encrypt' ? plaintext : ciphertext}
              onChange={(e) => mode === 'encrypt' ? setPlaintext(e.target.value) : setCiphertext(e.target.value)}
              placeholder={`Masukkan ${mode === 'encrypt' ? 'pesan asli' : 'pesan terenkripsi'} di sini...`}
            />
          </div>

          <div className="w-1/2">
            <Input
              label={`Kunci k (1–${N - 1})`}
              type="number"
              min={1}
              max={N - 1}
              value={key}
              onChange={handleKeyChange}
              placeholder="Misal: 5"
            />
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={execute} disabled={!key}>
              {mode === 'encrypt' ? 'Enkripsi' : 'Dekripsi'}
            </Button>
            <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />} onClick={handleClear}>Clear</Button>
          </div>
        </Card>

        {/* ── Panel Output ── */}
        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800">Proses & Output</h3>
            <Button variant="ghost" size="sm" leftIcon={<Copy className="w-4 h-4" />} onClick={handleCopy}>
              {copied ? 'Tersalin!' : 'Copy'}
            </Button>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}
            </label>
            <div className="input-field min-h-[150px] flex-1 bg-slate-50 overflow-auto whitespace-pre-wrap break-words text-slate-800">
              {mode === 'encrypt' ? ciphertext : plaintext}
            </div>
          </div>
        </Card>
      </div>

      {/* ── Rumus Aktif ── */}
      <Card variant="panel" className="bg-primary-50 border-primary-200">
        <h4 className="font-semibold text-primary-800 mb-2 flex items-center gap-2">
          <ArrowRight className="w-4 h-4" /> Rumus yang digunakan
        </h4>
        <p className="text-sm text-slate-700 font-mono">{formula}</p>
      </Card>
    </div>
  );
};
