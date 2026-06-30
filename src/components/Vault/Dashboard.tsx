import React, { useState } from 'react';
import type { VaultEntry } from '../../hooks/useVault';
import { useVault } from '../../hooks/useVault';
import { KeyRound, StickyNote, Eye, EyeOff, Trash2, Plus, Lock, Info, Key } from 'lucide-react';
import { dekripsi, masterPasswordToKey } from '../../utils/cryptography';
import { AddEntryModal } from './AddEntryModal';

interface DashboardProps {
  masterKey: number;
  masterPassword: string;
  onShowTheory: () => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ masterKey, masterPassword, onShowTheory, onLogout }) => {
  const { entries, isLoaded, addEntry, removeEntry } = useVault();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState<'password' | 'note'>('password');
  const [showMasterPassword, setShowMasterPassword] = useState(false);

  if (!isLoaded) return <div className="p-8 text-center text-slate-500">Loading vault...</div>;

  const passwords = entries.filter(e => e.type === 'password');
  const notes = entries.filter(e => e.type === 'note');

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Lock className="w-8 h-8 text-primary-600" />
            CriptoGraphCaesarVault
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-slate-500">Sesi Aktif: </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
              <span className="font-mono font-medium text-slate-800 text-sm">
                {showMasterPassword ? masterPassword : '•'.repeat(masterPassword.length)}
              </span>
              <button 
                onClick={() => setShowMasterPassword(!showMasterPassword)}
                className="text-slate-400 hover:text-slate-600"
                title={showMasterPassword ? "Sembunyikan" : "Tampilkan"}
              >
                {showMasterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onShowTheory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-sm"
          >
            <Info className="w-4 h-4 text-primary-500" /> Teori Kriptografi
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
          >
            Lock Vault
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Passwords Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-500" /> Passwords ({passwords.length})
            </h2>
            <button
              onClick={() => {
                setModalInitialType('password');
                setIsModalOpen(true);
              }}
              className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium pr-3"
            >
              <Plus className="w-4 h-4" /> Tambah
            </button>
          </div>
          
          <div className="space-y-3">
            {passwords.map(entry => (
              <EntryCard 
                key={entry.id} 
                entry={entry} 
                masterKey={masterKey}
                realMasterPassword={masterPassword}
                onRemove={() => removeEntry(entry.id)}
              />
            ))}
            {passwords.length === 0 && (
              <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                Belum ada password tersimpan
              </div>
            )}
          </div>
        </div>

        {/* Notes Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-amber-500" /> Secure Notes ({notes.length})
            </h2>
            <button
              onClick={() => {
                setModalInitialType('note');
                setIsModalOpen(true);
              }}
              className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium pr-3"
            >
              <Plus className="w-4 h-4" /> Tambah
            </button>
          </div>
          
          <div className="space-y-3">
            {notes.map(entry => (
              <EntryCard 
                key={entry.id} 
                entry={entry} 
                masterKey={masterKey}
                realMasterPassword={masterPassword}
                onRemove={() => removeEntry(entry.id)}
              />
            ))}
            {notes.length === 0 && (
              <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                Belum ada catatan rahasia
              </div>
            )}
          </div>
        </div>

      </div>

      <AddEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addEntry}
        masterKey={masterKey}
        initialType={modalInitialType}
      />
    </div>
  );
};

interface EntryCardProps {
  entry: VaultEntry;
  masterKey: number;
  realMasterPassword: string;
  onRemove: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, masterKey, realMasterPassword, onRemove }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [customPassword, setCustomPassword] = useState('');
  
  // Delete verification state
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  // Always decrypt metadata using the session's masterKey
  const displayTitle = dekripsi(entry.title, masterKey).hasilPesan;
  const displayUsername = entry.username ? dekripsi(entry.username, masterKey).hasilPesan : undefined;

  // Dynamically calculate decrypted data
  const currentCombinedKey = (entry.hasCustomKey && customPassword) 
    ? masterKey + masterPasswordToKey(customPassword)
    : masterKey;
    
  const displayData = isRevealed 
    ? dekripsi(entry.encryptedData, currentCombinedKey).hasilPesan 
    : entry.encryptedData;

  const handleRevealToggle = () => {
    setIsRevealed(!isRevealed);
    if (isRevealed) {
      // Reset custom password when hiding
      setCustomPassword('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayData);
  };
  
  const handleDeleteAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteInput === realMasterPassword) {
      onRemove();
    } else {
      setDeleteError(true);
      setTimeout(() => setDeleteError(false), 2000);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      
      {/* Delete Verification UI */}
      {isDeleting ? (
        <div className="mb-3 flex flex-col gap-2 bg-rose-50 border border-rose-100 p-3 rounded-lg animate-in fade-in zoom-in-95">
          <div className="text-xs font-semibold text-rose-700">Verifikasi Master Password untuk Hapus</div>
          <form onSubmit={handleDeleteAttempt} className="flex gap-2">
            <input 
              type="password" 
              placeholder="Master Password..." 
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className={`flex-1 text-xs px-2 py-1.5 rounded bg-white border ${deleteError ? 'border-rose-500' : 'border-rose-200'} outline-none focus:border-rose-500`}
              autoFocus
            />
            <button type="submit" className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded transition-colors">
              Hapus
            </button>
            <button type="button" onClick={() => { setIsDeleting(false); setDeleteInput(''); setDeleteError(false); }} className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded transition-colors">
              Batal
            </button>
          </form>
          {deleteError && <div className="text-[10px] text-rose-600 mt-1">Password salah!</div>}
        </div>
      ) : null}

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-slate-900 break-all pr-4">
            {displayTitle}
          </h3>
          {displayUsername && (
            <p className="text-sm text-slate-500 break-all pr-4">
              {displayUsername}
            </p>
          )}
        </div>
        <button 
          onClick={() => setIsDeleting(true)}
          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
          title="Hapus"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 relative">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 pr-10 whitespace-pre-wrap break-words text-sm font-mono text-slate-800">
          {displayData}
        </div>

        <button
          onClick={handleRevealToggle}
          className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors bg-slate-50"
          title={isRevealed ? "Sembunyikan" : "Dekripsi & Tampilkan"}
        >
          {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Kunci Ganda Input - Shown BELOW data when revealed */}
      {entry.hasCustomKey && isRevealed && (
        <div className="mt-3 flex flex-col gap-2 bg-indigo-50/50 border border-indigo-100 p-2.5 rounded-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
            <Key className="w-3.5 h-3.5" /> Data ini dilindungi Kunci Ganda
          </div>
          <input 
            type="password" 
            placeholder="Masukkan Custom Key untuk membaca teks di atas..." 
            value={customPassword}
            onChange={(e) => setCustomPassword(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-md bg-white border border-indigo-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            autoFocus
          />
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
        <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
        {isRevealed && (
          <button onClick={handleCopy} className="text-primary-600 hover:underline font-medium">
            Copy Text
          </button>
        )}
      </div>
    </div>
  );
};
