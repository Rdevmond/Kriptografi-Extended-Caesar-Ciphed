import { useState } from 'react';
import { Hero } from './components/Layout/Hero';
import { Sidebar, type TabId } from './components/Layout/Sidebar';
import { Menu } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { CipherProvider } from './context/CipherContext';
import { EncryptionModule } from './components/Features/EncryptionModule';
import { CharacterSetModule } from './components/Features/CharacterSetModule';
import { RelationsModule } from './components/Features/RelationsModule';
import { CalculationModule } from './components/Features/CalculationModule';
import { FrequencyAnalysisModule } from './components/Features/FrequencyAnalysisModule';
import { BruteForceModule } from './components/Features/BruteForceModule';
import { FlowchartModule } from './components/Features/FlowchartModule';
import { TestingModule } from './components/Features/TestingModule';
import { MathAnalysisModule } from './components/Features/MathAnalysisModule';
import { ReportModule } from './components/Features/ReportModule';

function App() {
  useTheme(); // ensures dark class is stripped from document root
  const [activeTab, setActiveTab] = useState<TabId>('encryption');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CipherProvider>
      <div className="min-h-screen bg-slate-50 transition-colors duration-200">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-slate-100 text-slate-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-lg hidden sm:block text-primary-900 tracking-tight">
              Extended Caesar Cipher 77
            </span>
          </div>
        </header>

        <Hero />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
          />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
            {activeTab === 'encryption' && <EncryptionModule />}
            {activeTab === 'charset' && <CharacterSetModule />}
            {activeTab === 'relations' && <RelationsModule />}
            {activeTab === 'calculations' && <CalculationModule />}
            {activeTab === 'frequency' && <FrequencyAnalysisModule />}
            {activeTab === 'bruteforce' && <BruteForceModule />}
            {activeTab === 'flowchart' && <FlowchartModule />}
            {activeTab === 'testing' && <TestingModule />}
            {activeTab === 'math' && <MathAnalysisModule />}
            {activeTab === 'report' && <ReportModule />}
          </main>
        </div>
      </div>
    </CipherProvider>
  );
}

export default App;
