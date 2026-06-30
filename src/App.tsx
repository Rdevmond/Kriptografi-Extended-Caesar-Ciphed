import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { CipherProvider } from './context/CipherContext';
import { TOTAL_KARAKTER } from './utils/cryptography';
import { Lock } from 'lucide-react';
import { LoginScreen } from './components/Vault/LoginScreen';
import { Dashboard } from './components/Vault/Dashboard';
import { TheoryModal } from './components/Vault/TheoryModal';

function App() {
  useTheme();
  
  // State for Vault
  const [masterKey, setMasterKey] = useState<number | null>(null);
  const [masterPassword, setMasterPassword] = useState<string | null>(null);
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);

  const handleLogin = (key: number, rawPassword: string) => {
    setMasterKey(key);
    setMasterPassword(rawPassword);
  };

  const handleLogout = () => {
    setMasterKey(null);
    setMasterPassword(null);
  };

  return (
    <CipherProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary-600" />
            <span className="font-bold text-xl text-primary-900 tracking-tight">
              Caesar Vault
            </span>
          </div>
          
          {/* Header Action / Indicator */}
          {masterKey !== null && (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Vault Unlocked
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full relative">
          {masterKey === null ? (
            <LoginScreen 
              onLogin={handleLogin} 
              onShowTheory={() => setIsTheoryOpen(true)}
            />
          ) : (
            <Dashboard 
              masterKey={masterKey} 
              masterPassword={masterPassword!}
              onShowTheory={() => setIsTheoryOpen(true)}
              onLogout={handleLogout}
            />
          )}
        </main>
        
        {/* Theory Modal (Sticky FYI functionality) */}
        <TheoryModal 
          isOpen={isTheoryOpen} 
          onClose={() => setIsTheoryOpen(false)} 
        />
        
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500 mt-auto">
          <p>Powered by Extended Caesar Cipher ({TOTAL_KARAKTER} Karakter) - Local Storage Only</p>
        </footer>
      </div>
    </CipherProvider>
  );
}

export default App;
