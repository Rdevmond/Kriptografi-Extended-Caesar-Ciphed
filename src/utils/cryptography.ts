// ============================================================
// HIMPUNAN KARAKTER — 77 elemen (basis cipher)
// Σ = {A..Z, a..z, 0..9, simbol}  →  |Σ| = N = 77
// ============================================================
export const CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=?";

export const N = 77; // kardinalitas himpunan  |Σ|

// Alias untuk kompatibilitas komponen lama
export const SET_LENGTH = N;

// ============================================================
// TIPE DATA — satu langkah perhitungan per karakter
// ============================================================
export interface CipherStep {
  originalChar: string;
  originalIndex: number; // x   : indeks dalam Σ  (-1 jika tidak ada)
  operation: string;     // teks operasi, misal "(5 + 3) mod 77"
  resultIndex: number;   // E(x): indeks hasil
  resultChar: string;    // karakter hasil
}

// ============================================================
// NORMALISASI KUNCI
// Menjamin k ∈ {0, 1, ..., N-1}
// ============================================================
export const normalizeKey = (key: number): number =>
  ((key % N) + N) % N;

// ============================================================
// FUNGSI ENKRIPSI
// E(x) = (x + k) mod N
// ============================================================
export const encrypt = (
  text: string,
  key: number
): { result: string; steps: CipherStep[] } => {
  const k = normalizeKey(key);
  const steps: CipherStep[] = [];
  let result = "";

  for (const char of text) {
    const x = CHARACTER_SET.indexOf(char);

    // Karakter di luar himpunan Σ → lewati tanpa diubah
    if (x === -1) {
      result += char;
      steps.push({ originalChar: char, originalIndex: -1, operation: "Tidak dalam Σ", resultIndex: -1, resultChar: char });
      continue;
    }

    // INTI MATEMATIKA: E(x) = (x + k) mod N
    const Ex = (x + k) % N;
    result += CHARACTER_SET[Ex];

    steps.push({
      originalChar: char,
      originalIndex: x,
      operation: `(${x} + ${k}) mod ${N} = ${Ex}`,
      resultIndex: Ex,
      resultChar: CHARACTER_SET[Ex],
    });
  }

  return { result, steps };
};

// ============================================================
// FUNGSI DEKRIPSI
// D(x) = (x - k + N) mod N
// +N sebelum mod untuk menghindari nilai negatif
// ============================================================
export const decrypt = (
  text: string,
  key: number
): { result: string; steps: CipherStep[] } => {
  const k = normalizeKey(key);
  const steps: CipherStep[] = [];
  let result = "";

  for (const char of text) {
    const x = CHARACTER_SET.indexOf(char);

    if (x === -1) {
      result += char;
      steps.push({ originalChar: char, originalIndex: -1, operation: "Tidak dalam Σ", resultIndex: -1, resultChar: char });
      continue;
    }

    // INTI MATEMATIKA: D(x) = (x - k + N) mod N
    const Dx = (x - k + N) % N;
    result += CHARACTER_SET[Dx];

    steps.push({
      originalChar: char,
      originalIndex: x,
      operation: `(${x} - ${k} + ${N}) mod ${N} = ${Dx}`,
      resultIndex: Dx,
      resultChar: CHARACTER_SET[Dx],
    });
  }

  return { result, steps };
};

// ============================================================
// ANALISIS FREKUENSI
// Menghitung frekuensi tiap karakter Σ pada teks
// ============================================================
export const calculateFrequencies = (text: string) => {
  const freqs: Record<string, number> = {};
  CHARACTER_SET.split("").forEach((c) => (freqs[c] = 0));

  for (const char of text) {
    if (freqs[char] !== undefined) freqs[char]++;
  }

  return Object.entries(freqs)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([char, count]) => ({ char, count }));
};

// ============================================================
// BRUTE FORCE — mencoba semua k ∈ {1, ..., N-1}
// Kompleksitas: O(N × |teks|)
// ============================================================
export const generateBruteForce = (ciphertext: string) =>
  Array.from({ length: N - 1 }, (_, i) => ({
    key: i + 1,
    text: decrypt(ciphertext, i + 1).result,
  }));
