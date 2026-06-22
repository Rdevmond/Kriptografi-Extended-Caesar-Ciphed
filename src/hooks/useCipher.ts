import { useState, useCallback } from 'react';
import { encrypt, decrypt, type CipherStep, SET_LENGTH } from '../utils/cryptography';

export const useCipher = () => {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState<number | ''>(5);
  const [steps, setSteps] = useState<CipherStep[]>([]);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleEncrypt = useCallback((text: string, k: number) => {
    const { result, steps } = encrypt(text, k);
    setCiphertext(result);
    setSteps(steps);
    setMode('encrypt');
  }, []);

  const handleDecrypt = useCallback((text: string, k: number) => {
    const { result, steps } = decrypt(text, k);
    setPlaintext(result); // Usually we set the decrypted text to plaintext
    setCiphertext(text);  // and keep ciphertext as is
    setSteps(steps);
    setMode('decrypt');
  }, []);

  const execute = useCallback(() => {
    if (key === '') return;
    if (mode === 'encrypt') {
      handleEncrypt(plaintext, key);
    } else {
      handleDecrypt(ciphertext, key);
    }
  }, [mode, plaintext, ciphertext, key, handleEncrypt, handleDecrypt]);

  const validateKey = (k: number) => {
    if (k < 1) return 1;
    if (k >= SET_LENGTH) return k % SET_LENGTH;
    return k;
  };

  return {
    plaintext,
    setPlaintext,
    ciphertext,
    setCiphertext,
    key,
    setKey,
    steps,
    mode,
    setMode,
    execute,
    handleEncrypt,
    handleDecrypt,
    validateKey
  };
};
