import CryptoJS from "crypto-js";

// Decryption Key (IPO Trend API Key)
const DECRYPT_KEY = process.env.NEXT_PUBLIC_VITE_APP_DECRYPT || "c1f9f40ab75bc5f9f63e25a92cbd1cd7";

export const decryptApiResponse = (encryptedText: any): any => {
  // If data is already an object or empty
  if (!encryptedText || typeof encryptedText === "object") {
    return encryptedText;
  }

  try {
    const data = CryptoJS.enc.Base64.parse(encryptedText);
    const iv = CryptoJS.lib.WordArray.create(data.words.slice(0, 4)); // First 16 bytes = IV
    const ciphertext = CryptoJS.lib.WordArray.create(data.words.slice(4));
    const key = CryptoJS.enc.Utf8.parse(DECRYPT_KEY.trim());

    const decrypted = CryptoJS.AES.decrypt({ ciphertext } as any, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedStr ? JSON.parse(decryptedStr) : encryptedText;
  } catch (error) {
    console.error("Decryption Error:", error);
    return encryptedText;
  }
};
