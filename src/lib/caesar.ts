export function caesarCipher(text: string, shift: number): string {
  return text.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

export function caesarDecipher(text: string, shift: number): string {
  return caesarCipher(text, 26 - (shift % 26));
}
