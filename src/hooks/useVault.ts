import { useState, useEffect } from 'react';

export type VaultEntryType = 'password' | 'note';

export interface VaultEntry {
  id: string;
  type: VaultEntryType;
  title: string; // Encrypted
  username?: string; // Encrypted
  encryptedData: string; // Encrypted
  hasCustomKey?: boolean;
  createdAt: number;
}

export const useVault = () => {
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('caesar_vault_entries');
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse vault entries", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveEntries = (newEntries: VaultEntry[]) => {
    localStorage.setItem('caesar_vault_entries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const addEntry = (entry: Omit<VaultEntry, 'id' | 'createdAt'>) => {
    const newEntry: VaultEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    saveEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
  };

  return { entries, isLoaded, addEntry, removeEntry };
};
