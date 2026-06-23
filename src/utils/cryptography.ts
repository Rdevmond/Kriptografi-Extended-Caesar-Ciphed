export const HIMPUNAN_KARAKTER =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=? ";
//                                                                              ^-- spasi ada di sini (indeks 77)

export const TOTAL_KARAKTER = 78;
// Tipe data untuk menyimpan jejak atau langkah perhitungan setiap huruf
export interface LangkahSandi {
  hurufAsli: string;
  indeksAsli: number;
  rumusOperasi: string;
  indeksHasil: number;
  hurufHasil: string;
}

export const normalisasiKunci = (kunci: number): number => {
  return ((kunci % TOTAL_KARAKTER) + TOTAL_KARAKTER) % TOTAL_KARAKTER;
};

export const enkripsi = (pesan: string, kunci: number): { hasilPesan: string; jejakLangkah: LangkahSandi[] } => {
  const kunciNormal = normalisasiKunci(kunci);
  const jejakLangkah: LangkahSandi[] = [];
  let hasilPesan = "";

  for (const huruf of pesan) {
    const indeks = HIMPUNAN_KARAKTER.indexOf(huruf);

    if (indeks === -1) {
      hasilPesan += huruf;
      jejakLangkah.push({
        hurufAsli: huruf,
        indeksAsli: -1,
        rumusOperasi: "Karakter tidak dikenali",
        indeksHasil: -1,
        hurufHasil: huruf
      });
      continue;
    }

    const indeksBaru = (indeks + kunciNormal) % TOTAL_KARAKTER;
    const hurufBaru = HIMPUNAN_KARAKTER[indeksBaru];
    
    hasilPesan += hurufBaru;

    jejakLangkah.push({
      hurufAsli: huruf,
      indeksAsli: indeks,
      rumusOperasi: `(${indeks} + ${kunciNormal}) mod ${TOTAL_KARAKTER} = ${indeksBaru}`,
      indeksHasil: indeksBaru,
      hurufHasil: hurufBaru,
    });
  }

  return { hasilPesan, jejakLangkah };
};

export const dekripsi = (pesanSandi: string, kunci: number): { hasilPesan: string; jejakLangkah: LangkahSandi[] } => {
  const kunciNormal = normalisasiKunci(kunci);
  const jejakLangkah: LangkahSandi[] = [];
  let hasilPesan = "";

  for (const huruf of pesanSandi) {
    const indeks = HIMPUNAN_KARAKTER.indexOf(huruf);

    if (indeks === -1) {
      hasilPesan += huruf;
      jejakLangkah.push({
        hurufAsli: huruf,
        indeksAsli: -1,
        rumusOperasi: "Karakter tidak dikenali",
        indeksHasil: -1,
        hurufHasil: huruf
      });
      continue;
    }

    const indeksBaru = (indeks - kunciNormal + TOTAL_KARAKTER) % TOTAL_KARAKTER;
    const hurufBaru = HIMPUNAN_KARAKTER[indeksBaru];
    
    hasilPesan += hurufBaru;

    jejakLangkah.push({
      hurufAsli: huruf,
      indeksAsli: indeks,
      rumusOperasi: `(${indeks} - ${kunciNormal} + ${TOTAL_KARAKTER}) mod ${TOTAL_KARAKTER} = ${indeksBaru}`,
      indeksHasil: indeksBaru,
      hurufHasil: hurufBaru,
    });
  }

  return { hasilPesan, jejakLangkah };
};

export const hitungFrekuensi = (pesan: string) => {
  const daftarFrekuensi: Record<string, number> = {};
  
  // Siapkan daftarnya mulai dari 0
  HIMPUNAN_KARAKTER.split("").forEach((huruf) => (daftarFrekuensi[huruf] = 0));

  for (const huruf of pesan) {
    if (daftarFrekuensi[huruf] !== undefined) {
      daftarFrekuensi[huruf]++;
    }
  }

  // Urutkan dari yang paling sering muncul
  return Object.entries(daftarFrekuensi)
    .filter(([, jumlahMuncul]) => jumlahMuncul > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([huruf, jumlahMuncul]) => ({ huruf, jumlahMuncul }));
};

// Simulasi mencoba-coba semua kunci (Brute Force) untuk membongkar sandi
export const simulasiBruteForce = (pesanSandi: string) => {
  const daftarPercobaan = [];
  
  // Coba tebak dari kunci 1 sampai TOTAL_KARAKTER - 1
  for (let tebakanKunci = 1; tebakanKunci < TOTAL_KARAKTER; tebakanKunci++) {
    const hasilTebakan = dekripsi(pesanSandi, tebakanKunci).hasilPesan;
    
    daftarPercobaan.push({
      kunciTebakan: tebakanKunci,
      hasilTeks: hasilTebakan,
    });
  }
  
  return daftarPercobaan;
};
