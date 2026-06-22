export const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=?";
export const SET_LENGTH = 77;

export interface CipherStep {
  originalChar: string;
  originalIndex: number;
  operation: string;
  resultIndex: number;
  resultChar: string;
}

export const normalizeKey = (key: number): number => {
  return ((key % SET_LENGTH) + SET_LENGTH) % SET_LENGTH;
};

export const encrypt = (text: string, key: number): { result: string; steps: CipherStep[] } => {
  const normalizedKey = normalizeKey(key);
  const steps: CipherStep[] = [];
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const originalIndex = CHARACTER_SET.indexOf(char);

    if (originalIndex === -1) {
      result += char;
      steps.push({
        originalChar: char,
        originalIndex: -1,
        operation: "Not in set",
        resultIndex: -1,
        resultChar: char,
      });
      continue;
    }

    const resultIndex = (originalIndex + normalizedKey) % SET_LENGTH;
    const resultChar = CHARACTER_SET[resultIndex];
    result += resultChar;

    steps.push({
      originalChar: char,
      originalIndex,
      operation: `(${originalIndex} + ${normalizedKey}) mod ${SET_LENGTH}`,
      resultIndex,
      resultChar,
    });
  }

  return { result, steps };
};

export const decrypt = (text: string, key: number): { result: string; steps: CipherStep[] } => {
  const normalizedKey = normalizeKey(key);
  const steps: CipherStep[] = [];
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const originalIndex = CHARACTER_SET.indexOf(char);

    if (originalIndex === -1) {
      result += char;
      steps.push({
        originalChar: char,
        originalIndex: -1,
        operation: "Not in set",
        resultIndex: -1,
        resultChar: char,
      });
      continue;
    }

    const resultIndex = (originalIndex - normalizedKey + SET_LENGTH) % SET_LENGTH;
    const resultChar = CHARACTER_SET[resultIndex];
    result += resultChar;

    steps.push({
      originalChar: char,
      originalIndex,
      operation: `(${originalIndex} - ${normalizedKey} + ${SET_LENGTH}) mod ${SET_LENGTH}`,
      resultIndex,
      resultChar,
    });
  }

  return { result, steps };
};

export const calculateFrequencies = (text: string) => {
  const freqs: Record<string, number> = {};
  CHARACTER_SET.split("").forEach((char) => {
    freqs[char] = 0;
  });

  for (const char of text) {
    if (freqs[char] !== undefined) {
      freqs[char]++;
    }
  }

  return Object.entries(freqs)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([char, count]) => ({ char, count }));
};

export const generateBruteForce = (ciphertext: string) => {
  const results = [];
  for (let k = 1; k < SET_LENGTH; k++) {
    results.push({
      key: k,
      text: decrypt(ciphertext, k).result,
    });
  }
  return results;
};
