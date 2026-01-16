import { describe, it, expect } from 'vitest';
import { obscure, reveal, DEFAULT_TABLES } from '../../index';

// --- Test Data ---
const testCases = {
    simple: ["hello", "world", "test123", "ABC"],
    complex: [
        "Hello World!",
        "Secret123@#$",
        "Advanced Cipher Test",
        "Multiple Tables Rock!",
        "Mixed-CASE with Numbers123 and Symbols!@#",
    ],
    edge: [
        "",
        " ",
        "   ",
        "123456",
        "!@#$%^&*()",
        "aA1!",
        "z",
        "Z",
        "The quick brown fox jumps over the lazy dog 1234567890",
    ],
};

describe('🔐 Password Obscura', () => {

    // ==========================================
    // 1. Caesar Cipher
    // ==========================================
    describe('1. Caesar Cipher', () => {
        it.each(testCases.simple)('should encode and decode "%s" with default shift', (input) => {
            const encoded = obscure(input, { method: 'caesar' });
            const decoded = reveal(encoded, { method: 'caesar' });
            expect(decoded).toBe(input);
            expect(encoded).not.toBe(input);
        });

        it.each([1, 5, 13, 25])('should handle custom shift: %i', (shift) => {
            const input = testCases.simple[0];
            const encoded = obscure(input, { method: 'caesar', shift });
            const decoded = reveal(encoded, { method: 'caesar', shift });
            expect(decoded).toBe(input);
        });
    });

    // ==========================================
    // 2. ROT13 Cipher
    // ==========================================
    describe('2. ROT13 Cipher', () => {
        it.each(testCases.simple)('should encode and decode "%s"', (input) => {
            const encoded = obscure(input, { method: 'rot13' });
            const decoded = reveal(encoded, { method: 'rot13' });
            expect(decoded).toBe(input);
        });
    });

    // ==========================================
    // 3. Mirror (Atbash) Cipher
    // ==========================================
    describe('3. Mirror (Atbash) Cipher', () => {
        it.each(testCases.simple)('should encode and decode "%s"', (input) => {
            const encoded = obscure(input, { method: 'mirror' });
            const decoded = reveal(encoded, { method: 'mirror' });
            expect(decoded).toBe(input);
        });
    });

    // ==========================================
    // 4. Multi-Table Cipher
    // ==========================================
    describe('4. Multi-Table Cipher', () => {

        it('should handle Even-Odd Pattern', () => {
            const config = {
                tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
                shiftPattern: "even-odd" as const,
                baseShift: 3,
            };

            testCases.complex.slice(0, 3).forEach(input => {
                const encoded = obscure(input, { method: 'multiTable', tableConfig: config });
                const decoded = reveal(encoded, { method: 'multiTable', tableConfig: config });
                expect(decoded).toBe(input);
            });
        });

        it('should handle Fibonacci Pattern', () => {
            const config = {
                tables: DEFAULT_TABLES,
                shiftPattern: "fibonacci" as const,
                baseShift: 2,
            };
            const input = testCases.complex[0];
            const encoded = obscure(input, { method: 'multiTable', tableConfig: config });
            expect(reveal(encoded, { method: 'multiTable', tableConfig: config })).toBe(input);
        });

        it('should handle Prime Pattern', () => {
            const config = {
                tables: ["abcdefghijklmnopqrstuvwxyz"],
                shiftPattern: "prime" as const,
                baseShift: 1,
            };
            const input = "test";
            const encoded = obscure(input, { method: 'multiTable', tableConfig: config });
            expect(reveal(encoded, { method: 'multiTable', tableConfig: config })).toBe(input);
        });

        it('should handle Progressive Pattern', () => {
            const config = {
                tables: ["abcdefghijklmnopqrstuvwxyz", "nopqrstuvwxyzabcdefghijklm"],
                shiftPattern: "progressive" as const,
                baseShift: 1,
            };
            const input = "test";
            const encoded = obscure(input, { method: 'multiTable', tableConfig: config });
            expect(reveal(encoded, { method: 'multiTable', tableConfig: config })).toBe(input);
        });

        it('should handle Custom Shifts Pattern', () => {
            const config = {
                tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
                shiftPattern: "custom" as const,
                baseShift: 1,
                customShifts: [1, 3, 5, 7, 2, 4, 6, 8, 9, 11],
            };
            const input = "test";
            const encoded = obscure(input, { method: 'multiTable', tableConfig: config });
            expect(reveal(encoded, { method: 'multiTable', tableConfig: config })).toBe(input);
        });
    });

    // ==========================================
    // 5. Polyalphabetic Cipher
    // ==========================================
    describe('5. Polyalphabetic Cipher', () => {
        it.each(["SECRET", "CIPHER", "KEY"])('should work with keyword "%s"', (keyword) => {
            const input = "ComplexTestString123";
            const polyConfig = { keyword };
            const encoded = obscure(input, { method: 'polyalphabetic', polyConfig });
            const decoded = reveal(encoded, { method: 'polyalphabetic', polyConfig });
            expect(decoded).toBe(input);
        });

        it('should handle text longer than keyword', () => {
            const longText = "The quick brown fox jumps over the lazy dog";
            const polyConfig = { keyword: "ABC" };
            const encoded = obscure(longText, { method: 'polyalphabetic', polyConfig });
            expect(reveal(encoded, { method: 'polyalphabetic', polyConfig })).toBe(longText);
        });
    });

    // ==========================================
    // 6. Advanced Multi-Layer Cipher
    // ==========================================
    describe('6. Advanced Multi-Layer', () => {
        it('should work with default layers', () => {
            testCases.complex.slice(0, 3).forEach(input => {
                const encoded = obscure(input, { method: 'advanced' });
                expect(reveal(encoded, { method: 'advanced' })).toBe(input);
            });
        });

        it('should work with Custom Layer 1 (Shift + Reverse + Shift)', () => {
            const layers = [
                { type: "shift", config: { shift: 5 } },
                { type: "reverse" },
                { type: "shift", config: { shift: 3 } },
            ];
            const input = "Hello World";
            // @ts-ignore - Assuming layers type matches implementation
            const encoded = obscure(input, { method: 'advanced', layers });
            // @ts-ignore
            expect(reveal(encoded, { method: 'advanced', layers })).toBe(input);
        });
    });

    // ==========================================
    // 7. Edge Cases
    // ==========================================
    describe('7. Edge Cases', () => {
        it.each(testCases.edge)('should survive edge case input: "%s"', (input) => {
            const encoded = obscure(input, { method: 'caesar' });
            const decoded = reveal(encoded, { method: 'caesar' });
            expect(decoded).toBe(input);
        });

        it('should handle number/symbol only strings', () => {
            const input = "123!@#";
            const encoded = obscure(input, { method: 'mirror' });
            expect(reveal(encoded, { method: 'mirror' })).toBe(input);
        });
    });

    // ==========================================
    // 8. Error Handling
    // ==========================================
    describe('8. Validation', () => {
        it('should throw error for invalid method', () => {
            // @ts-ignore - Testing invalid input
            expect(() => obscure("test", { method: "invalid" })).toThrow();
        });

        it('should throw error if polyConfig is missing for polyalphabetic', () => {
            expect(() => obscure("test", { method: "polyalphabetic" })).toThrow();
        });
    });
});