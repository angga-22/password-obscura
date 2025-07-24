
export function rot13(str: string): string {
  return str.replace(/[a-z]/gi, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}

