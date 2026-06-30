import React, { useState, useEffect } from 'react';
import { X, KeyRound, StickyNote, Save } from 'lucide-react';
import type { VaultEntryType } from '../../hooks/useVault';
import { enkripsi, masterPasswordToKey } from '../../utils/cryptography';
import { clsx } from 'clsx';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: { type: VaultEntryType; title: string; username?: string; encryptedData: string; hasCustomKey?: boolean }) => void;
  masterKey: number;
  initialType?: VaultEntryType;
}

export const AddEntryModal: React.FC<AddEntryModalProps> = ({ isOpen, onClose, onSave, masterKey, initialType = 'password' }) => {
  const [type, setType] = useState<VaultEntryType>(initialType);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [secretData, setSecretData] = useState('');
  const [customPassword, setCustomPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setTitle('');
      setUsername('');
      setSecretData('');
      setCustomPassword('');
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !secretData) return;

    // Calculate final key for Secret Data (Double Encryption if custom password exists)
    const combinedKey = customPassword 
      ? masterKey + masterPasswordToKey(customPassword)
      : masterKey;

    // Encrypt Metadata with MasterKey ONLY
    const encTitle = enkripsi(title, masterKey).hasilPesan;
    const encUsername = username ? enkripsi(username, masterKey).hasilPesan : undefined;
    
    // Encrypt Secret Data with CombinedKey
    const encData = enkripsi(secretData, combinedKey).hasilPesan;

    onSave({
      type,
      title: encTitle,
      username: encUsername,
      encryptedData: encData,
      hasCustomKey: !!customPassword
    });

    // Reset form
    setTitle('');
    setUsername('');
    setSecretData('');
    setCustomPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Tambah Entri Baru</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type Selector */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setType('password')}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors",
                type === 'password' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <KeyRound className="w-4 h-4" /> Password
            </button>
            <button
              type="button"
              onClick={() => setType('note')}
              className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors",
                type === 'note' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <StickyNote className="w-4 h-4" /> Secure Note
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {type === 'password' ? 'Platform / Website' : 'Judul Catatan'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                placeholder={type === 'password' ? 'Netflix, Google, dll' : 'Ide Bisnis...'}
              />
            </div>

            {type === 'password' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username / Email</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="user@example.com"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {type === 'password' ? 'Password Rahasia' : 'Isi Catatan Rahasia'}
              </label>
              {type === 'password' ? (
                <input
                  type="password"
                  required
                  value={secretData}
                  onChange={(e) => setSecretData(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="Masukkan password asli..."
                />
              ) : (
                <textarea
                  required
                  value={secretData}
                  onChange={(e) => setSecretData(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                  placeholder="Tuliskan catatan rahasia di sini..."
                />
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kunci Khusus / Custom Key (Opsional)
            </label>
            <p className="text-xs text-slate-500 mb-2">Jika diisi, entri ini menggunakan Kunci Ganda (Master + Custom). Orang yang tahu Master Password tetap tidak bisa membuka ini tanpa Custom Key.</p>
            <input
              type="password"
              value={customPassword}
              onChange={(e) => setCustomPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="Kosongkan untuk pakai Master Password saja"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" /> Simpan & Enkripsi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
