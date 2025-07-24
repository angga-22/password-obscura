/**
 * Atbash cipher - maps each letter to its mirror position in the alphabet
 * A ↔ Z, B ↔ Y, C ↔ X, etc.
 */
export function atbashCipher(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    if (char >= "a" && char <= "z") {
      // For lowercase: a=0, z=25, so mirror is 25-position
      return String.fromCharCode(25 - (char.charCodeAt(0) - 97) + 97);
    } else {
      // For uppercase: A=0, Z=25, so mirror is 25-position
      return String.fromCharCode(25 - (char.charCodeAt(0) - 65) + 65);
    }
  });
}

// Atbash is symmetric - encoding and decoding are the same operation
export const atbashDecipher = atbashCipher;
