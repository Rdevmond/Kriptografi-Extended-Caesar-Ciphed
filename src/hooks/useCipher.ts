import { useState, useCallback } from 'react';
import { enkripsi, dekripsi, type LangkahSandi, TOTAL_KARAKTER } from '../utils/cryptography';

export const useCipher = () => {
  const [pesanAsli, setPesanAsli] = useState('');
  const [pesanSandi, setPesanSandi] = useState('');
  const [kunci, setKunci] = useState<number | ''>(5);
  const [jejakLangkah, setJejakLangkah] = useState<LangkahSandi[]>([]);
  const [mode, setMode] = useState<'enkripsi' | 'dekripsi'>('enkripsi');
  const [metodePengamanan, setMetodePengamanan] = useState<'Extended Caesar Cipher' | 'Substitution' | 'Modular Sederhana'>('Extended Caesar Cipher');

  const tanganiEnkripsi = useCallback((teks: string, k: number) => {
    const { hasilPesan, jejakLangkah } = enkripsi(teks, k);
    setPesanSandi(hasilPesan);
    setJejakLangkah(jejakLangkah);
    setMode('enkripsi');
  }, []);

  const tanganiDekripsi = useCallback((teks: string, k: number) => {
    const { hasilPesan, jejakLangkah } = dekripsi(teks, k);
    setPesanAsli(hasilPesan); // Biasanya kita masukkan teks dekripsi ke kolom pesan asli
    setPesanSandi(teks);      // dan biarkan pesan sandi seperti semula
    setJejakLangkah(jejakLangkah);
    setMode('dekripsi');
  }, []);

  const jalankanProses = useCallback(() => {
    if (kunci === '') return;
    if (mode === 'enkripsi') {
      tanganiEnkripsi(pesanAsli, kunci);
    } else {
      tanganiDekripsi(pesanSandi, kunci);
    }
  }, [mode, pesanAsli, pesanSandi, kunci, tanganiEnkripsi, tanganiDekripsi]);

  const validasiKunci = (k: number) => {
    if (k < 1) return 1;
    if (k >= TOTAL_KARAKTER) return k % TOTAL_KARAKTER;
    return k;
  };

  return {
    pesanAsli, setPesanAsli,
    pesanSandi, setPesanSandi,
    kunci, setKunci,
    jejakLangkah,
    mode, setMode,
    jalankanProses,
    tanganiEnkripsi,
    tanganiDekripsi,
    validasiKunci,
    metodePengamanan, setMetodePengamanan
  };
};
