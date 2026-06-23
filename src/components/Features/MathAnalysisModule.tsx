import React from 'react';
import { Card } from '../UI/Card';
import { Sigma, BookOpen } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { TOTAL_KARAKTER } from '../../utils/cryptography';

export const MathAnalysisModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-2">
          <Sigma className="w-6 h-6 text-primary-600" />
          Analisis Matematika Diskrit
        </h2>
        <p className="text-slate-600">
          Penjelasan akademis mengenai landasan teori Matematika Diskrit pada algoritma kriptografi ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
            1. Teori Himpunan (Set Theory)
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Himpunan karakter yang digunakan disimbolkan sebagai <InlineMath math="\Sigma" /> (Sigma). Berbeda dengan Caesar Cipher standar yang hanya menggunakan himpunan <InlineMath math="\Sigma = \{A, B, ..., Z\}" /> dengan kardinalitas <InlineMath math="|\Sigma| = 26" />, sistem ini menggunakan himpunan diperluas:
          </p>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg overflow-x-auto text-xs my-1">
            <BlockMath math="\Sigma = \{A..Z, a..z, 0..9, !, @, \#, \$, \%, \hat{}, \&, *, (, ), -, \_, +, =, ?, \textvisiblespace\}" />
          </div>
          <p className="text-sm text-slate-600">
            Kardinalitas dari himpunan ini adalah <InlineMath math={`|\\Sigma| = N = ${TOTAL_KARAKTER}`} />. Setiap elemen dalam himpunan dipetakan ke himpunan indeks bilangan bulat <InlineMath math={`Z_N = \\{0, 1, 2, ..., ${TOTAL_KARAKTER - 1}\\}`} />.
          </p>
        </Card>

        <Card className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
            2. Aritmatika Modulo (Number Theory)
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Aritmatika Modulo memastikan bahwa hasil pergeseran indeks selalu berada di dalam jangkauan <InlineMath math="Z_N" />. Operasi ini membentuk sebuah Grup Siklik (Cyclic Group).
          </p>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg my-1">
            <BlockMath math="E(x) = (x + k) \pmod{N}" />
            <BlockMath math="D(x) = (x - k + N) \pmod{N}" />
          </div>
          <p className="text-sm text-slate-600">
            Penambahan <InlineMath math="N" /> pada fungsi dekripsi digunakan untuk menghindari nilai negatif pada modulo, memastikan hasil pemetaan kembali ke indeks yang benar.
          </p>
        </Card>

        <Card className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
            3. Relasi dan Fungsi
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Fungsi enkripsi memetakan Domain (Plaintext) ke Kodomain (Ciphertext). Agar proses dekripsi dapat dilakukan tanpa ambiguitas, fungsi enkripsi harus bersifat <strong>Bijektif</strong>.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 ml-2">
            <li><strong className="text-slate-800">Injektif (One-to-One):</strong> <InlineMath math="\forall x_1, x_2 \in Z_N" />, jika <InlineMath math="E(x_1) = E(x_2)" /> maka <InlineMath math="x_1 = x_2" />.</li>
            <li><strong className="text-slate-800">Surjektif (Onto):</strong> <InlineMath math="\forall y \in Z_N, \exists x \in Z_N" /> sedemikian sehingga <InlineMath math="E(x) = y" />.</li>
          </ul>
          <p className="text-sm text-slate-600 mt-1">
            Karena bersifat bijektif, maka relasi ini memiliki fungsi invers yang terdefinisi dengan baik, yaitu fungsi dekripsi <InlineMath math="D(y) = E^{-1}(y)" />.
          </p>
        </Card>

        <Card className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
            4. Kombinatorika &amp; Probabilitas
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kombinatorika digunakan untuk menghitung jumlah kemungkinan kunci (Key Space). Kunci valid <InlineMath math="k" /> berada pada interval <InlineMath math="0 < k < N" />.
          </p>
          <div className="bg-primary-50 border border-primary-100 p-4 rounded-lg my-1">
            <h4 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Perbandingan Peluang Brute Force
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-600 mb-1">Caesar Standar (N=26)</p>
                <BlockMath math="P = \frac{1}{25}" />
                <p className="text-xs text-center text-slate-500 mt-1">(4%)</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 mb-1">Extended (N={TOTAL_KARAKTER})</p>
                <BlockMath math={`P = \\frac{1}{${TOTAL_KARAKTER - 1}}`} />
                <p className="text-xs text-center text-slate-500 mt-1">({(1 / (TOTAL_KARAKTER - 1) * 100).toFixed(2)}%)</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Walaupun probabilitas ditebak secara acak berkurang secara signifikan, ruang kunci sebanyak {TOTAL_KARAKTER - 1} masih sangat kecil dan mudah dipecahkan menggunakan komputasi modern.
          </p>
        </Card>
      </div>
    </div>
  );
};
