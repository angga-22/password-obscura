export interface SymbolMapConfig {
  [key: string]: string;
}

export const DEFAULT_SYMBOL_MAP: SymbolMapConfig = {
  // Lowercase letters
  a: "🔥",
  b: "⭐",
  c: "🌟",
  d: "💫",
  e: "✨",
  f: "🌈",
  g: "🌊",
  h: "🌪️",
  i: "❄️",
  j: "🌙",
  k: "☀️",
  l: "🌸",
  m: "🌺",
  n: "🌻",
  o: "🌷",
  p: "🌹",
  q: "🌱",
  r: "🍀",
  s: "🌿",
  t: "🌾",
  u: "🍄",
  v: "🌵",
  w: "🌴",
  x: "🎋",
  y: "🌲",
  z: "🌳",

  // Uppercase letters
  A: "🚀",
  B: "⚡",
  C: "💎",
  D: "🎯",
  E: "🎪",
  F: "🎭",
  G: "🎨",
  H: "🎵",
  I: "🎸",
  J: "🎺",
  K: "🎻",
  L: "🥁",
  M: "🎤",
  N: "🎧",
  O: "🎮",
  P: "🕹️",
  Q: "🎲",
  R: "🃏",
  S: "🎊",
  T: "🎁",
  U: "🎈",
  V: "🎀",
  W: "💍",
  X: "👑",
  Y: "🔱",
  Z: "⚔️",

  // Numbers
  "0": "🔴",
  "1": "🟠",
  "2": "🟡",
  "3": "🟢",
  "4": "🔵",
  "5": "🟣",
  "6": "🟤",
  "7": "⚫",
  "8": "⚪",
  "9": "🔶",
};

export function symbolMapEncode(
  text: string,
  symbolMap: SymbolMapConfig = DEFAULT_SYMBOL_MAP
): string {
  return text
    .split("")
    .map((char) => symbolMap[char] || char)
    .join("");
}

export function symbolMapDecode(
  text: string,
  symbolMap: SymbolMapConfig = DEFAULT_SYMBOL_MAP
): string {
  // Create reverse mapping
  const reverseMap: SymbolMapConfig = {};
  Object.entries(symbolMap).forEach(([char, symbol]) => {
    reverseMap[symbol] = char;
  });

  // Use Array.from to properly handle Unicode characters and emojis
  const chars = Array.from(text);
  return chars.map((char) => reverseMap[char] || char).join("");
}
