import React from 'react';
import { cn } from '../../utils/cn';
import { 
  Lock, 
  Type, 
  ArrowRightLeft, 
  ListOrdered, 
  BarChart2, 
  Cpu, 
  GitBranch, 
  CheckSquare, 
  Sigma, 
  FileText 
} from 'lucide-react';

export type TabId = 
  | 'encryption' 
  | 'charset' 
  | 'relations' 
  | 'calculations' 
  | 'frequency' 
  | 'bruteforce' 
  | 'flowchart' 
  | 'testing' 
  | 'math' 
  | 'report';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'encryption', label: 'Enkripsi & Dekripsi', icon: <Lock className="w-5 h-5" /> },
    { id: 'charset', label: 'Himpunan Karakter', icon: <Type className="w-5 h-5" /> },
    { id: 'relations', label: 'Relasi & Fungsi', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { id: 'calculations', label: 'Detail Perhitungan', icon: <ListOrdered className="w-5 h-5" /> },
    { id: 'frequency', label: 'Analisis Frekuensi', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'bruteforce', label: 'Simulasi Brute Force', icon: <Cpu className="w-5 h-5" /> },
    { id: 'flowchart', label: 'Flowchart Sistem', icon: <GitBranch className="w-5 h-5" /> },
    { id: 'testing', label: 'Pengujian Sistem', icon: <CheckSquare className="w-5 h-5" /> },
    { id: 'math', label: 'Analisis Matematika', icon: <Sigma className="w-5 h-5" /> },
    { id: 'report', label: 'Generator Laporan', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside 
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-[calc(100vh-4rem)] w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col shadow-lg lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="font-bold text-slate-800 flex items-center gap-2">
            <Lock className="text-primary-600 w-5 h-5" />
            <span>Navigasi Modul</span>
          </div>
          <button 
            className="lg:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left font-medium text-sm",
                activeTab === item.id 
                  ? "bg-primary-50 text-primary-700 font-semibold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className={cn("flex-shrink-0", activeTab === item.id ? "text-primary-600" : "text-slate-400")}>
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-100 text-xs text-center text-slate-500 bg-slate-50">
          Tugas Mata Kuliah<br/>Matematika Diskrit
        </div>
      </aside>
    </>
  );
};
