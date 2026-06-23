import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useCipherContext } from '../../context/CipherContext';
import { Copy, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import { TOTAL_KARAKTER } from '../../utils/cryptography';

export const Enkripsi: React.FC = () => {
  const {
    pesanAsli, setPesanAsli,
    pesanSandi, setPesanSandi,
    kunci, setKunci,
    jalankanProses,
    mode, setMode,
    validasiKunci,
    metodePengamanan, setMetodePengamanan
  } = useCipherContext();

  const [copied, setCopied] = useState(false);

  // Salin hasil ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(mode === 'enkripsi' ? pesanSandi : pesanAsli);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPesanAsli('');
    setKunci('');
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) {
      setKunci('');
      return;
    }
    // Batasi input antara 1 sampai TOTAL_KARAKTER - 1
    if (val < 1) val = 1;
    if (val >= TOTAL_KARAKTER) val = TOTAL_KARAKTER - 1;
    setKunci(val);
  };

  const kunciNormal = typeof kunci === 'number' ? validasiKunci(kunci) : '';

  // Rumus yang ditampilkan berubah sesuai mode aktif
  const formula = mode === 'enkripsi'
    ? `E(x) = (x + ${kunciNormal !== '' ? kunciNormal : 'k'}) mod ${TOTAL_KARAKTER}`
    : `D(x) = (x - ${kunciNormal !== '' ? kunciNormal : 'k'} + ${TOTAL_KARAKTER}) mod ${TOTAL_KARAKTER}`;

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
              <Button variant={mode === 'enkripsi' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('enkripsi')}>Enkripsi</Button>
              <Button variant={mode === 'dekripsi' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('dekripsi')}>Dekripsi</Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Metode Pengamanan</label>
            <select
              className="input-field"
              value={metodePengamanan}
              onChange={(e) => setMetodePengamanan(e.target.value as any)}
            >
              <option value="Extended Caesar Cipher">Extended Caesar Cipher</option>
              <option value="Substitution" disabled>Substitution (Segera Hadir)</option>
              <option value="Modular Sederhana" disabled>Modular Sederhana (Segera Hadir)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {mode === 'enkripsi' ? 'Pesan Asli (Plaintext)' : 'Pesan Sandi (Ciphertext)'}
            </label>
            <textarea
              className="input-field min-h-[150px] resize-y"
              value={mode === 'enkripsi' ? pesanAsli : pesanSandi}
              onChange={(e) => mode === 'enkripsi' ? setPesanAsli(e.target.value) : setPesanSandi(e.target.value)}
              placeholder={`Masukkan ${mode === 'enkripsi' ? 'pesan asli' : 'pesan terenkripsi'} di sini...`}
            />
          </div>

          <div className="w-1/2">
            <Input
              label={`Kunci k (1–${TOTAL_KARAKTER - 1})`}
              type="number"
              min={1}
              max={TOTAL_KARAKTER - 1}
              value={kunci}
              onChange={handleKeyChange}
              placeholder="Misal: 5"
            />
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={jalankanProses} disabled={!kunci}>
              {mode === 'enkripsi' ? 'Enkripsi' : 'Dekripsi'}
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
              {mode === 'enkripsi' ? 'Pesan Sandi (Ciphertext)' : 'Pesan Asli (Plaintext)'}
            </label>
            <div className="input-field min-h-[150px] flex-1 bg-slate-50 overflow-auto whitespace-pre-wrap break-words text-slate-800">
              {mode === 'enkripsi' ? pesanSandi : pesanAsli}
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
