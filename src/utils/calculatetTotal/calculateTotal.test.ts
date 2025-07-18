import { calculateTotal } from './calculateTotal';
import { describe, it, expect } from 'vitest';

describe('calculateTotal', () => {
    describe('Basic functionality', () => {
        it('should calculate total from comma-separated amounts', () => {
            expect(calculateTotal('10, 20, 30')).toBe(60);
        });

        it('should calculate total from newline-separated amounts', () => {
            expect(calculateTotal('10\n20\n30')).toBe(60);
        });

        it('should calculate total from mixed separators', () => {
            expect(calculateTotal('10, 20\n30, 40')).toBe(100);
        });

        it('should handle empty string', () => {
            expect(calculateTotal('')).toBe(0);
        });

        it('should handle single amount', () => {
            expect(calculateTotal('25')).toBe(25);
        });
    });

    describe('Edge cases', () => {
        it('should ignore empty values', () => {
            expect(calculateTotal('10, , 20, , 30')).toBe(60);
        });

        it('should handle decimal amounts', () => {
            expect(calculateTotal('10.5, 20.25, 30.75')).toBe(61.5);
        });

        it('should ignore invalid amounts', () => {
            expect(calculateTotal('10, abc, 20, xyz, 30')).toBe(60);
        });

        it('should handle whitespace around amounts', () => {
            expect(calculateTotal('  10  ,  20  ,  30  ')).toBe(60);
        });

        it('should handle zero amounts', () => {
            expect(calculateTotal('0, 10, 0, 20')).toBe(30);
        });

        it('should handle negative amounts', () => {
            expect(calculateTotal('10, -5, 20')).toBe(25);
        });

        it('should return 0 for all invalid amounts', () => {
            expect(calculateTotal('abc, xyz, def')).toBe(0);
        });
    });

    describe('Number formats', () => {
        it('should handle very large numbers', () => {
            expect(calculateTotal('1000000, 2000000, 3000000')).toBe(6000000);
        });

        it('should handle very small decimal numbers', () => {
            expect(calculateTotal('0.001, 0.002, 0.003')).toBeCloseTo(0.006);
        });

        it('should handle scientific notation', () => {
            expect(calculateTotal('1e2, 2e2, 3e2')).toBe(600);
        });

        it('should handle numbers with leading zeros', () => {
            expect(calculateTotal('010, 020, 030')).toBe(60);
        });

        it('should handle numbers with plus sign', () => {
            expect(calculateTotal('+10, +20, +30')).toBe(60);
        });

        it('should handle numbers with trailing dots', () => {
            expect(calculateTotal('10., 20., 30.')).toBe(60);
        });

        it('should handle numbers with leading dots', () => {
            expect(calculateTotal('.5, .25, .75')).toBe(1.5);
        });

        it('should handle exponential notation with negative exponents', () => {
            expect(calculateTotal('1e-2, 2e-2, 3e-2')).toBeCloseTo(0.06);
        });
    });

    describe('Special values', () => {
        it('should handle Infinity values', () => {
            expect(calculateTotal('10, Infinity, 20')).toBe(Infinity);
        });

        it('should handle -Infinity values', () => {
            expect(calculateTotal('10, -Infinity, 20')).toBe(-Infinity);
        });

        it('should handle mixed case infinity', () => {
            expect(calculateTotal('10, INFINITY, 20')).toBe(30);
        });

        it('should handle floating point precision issues', () => {
            expect(calculateTotal('0.1, 0.2, 0.3')).toBeCloseTo(0.6);
        });

        it('should handle mixed negative and positive decimals', () => {
            expect(calculateTotal('-10.5, 20.25, -5.75')).toBe(4);
        });
    });

    describe('Invalid inputs', () => {
        it('should handle hexadecimal strings as NaN', () => {
            expect(calculateTotal('0x10, 0x20, 30')).toBe(30);
        });

        it('should handle parentheses as invalid', () => {
            expect(calculateTotal('(10), 20, (30)')).toBe(20);
        });

        it('should handle boolean string values', () => {
            expect(calculateTotal('true, false, 10')).toBe(10);
        });

        it('should handle null and undefined strings', () => {
            expect(calculateTotal('null, undefined, 10')).toBe(10);
        });


        it('should handle empty array-like string', () => {
            expect(calculateTotal('[]')).toBe(0);
        });

        it('should handle object-like string', () => {
            expect(calculateTotal('{10}, {20}, 30')).toBe(30);
        });
    });

    describe('Separators and whitespace', () => {
        it('should handle strings with only commas', () => {
            expect(calculateTotal(', , ,')).toBe(0);
        });

        it('should handle strings with only newlines', () => {
            expect(calculateTotal('\n\n\n')).toBe(0);
        });

        it('should handle multiple consecutive separators', () => {
            expect(calculateTotal('10,,,20\n\n\n30')).toBe(60);
        });

        it('should handle tab characters as whitespace', () => {
            expect(calculateTotal('\t10\t,\t20\t,\t30\t')).toBe(60);
        });

        it('should handle empty lines in multiline string', () => {
            expect(calculateTotal('10\n\n20\n\n30')).toBe(60);
        });

        it('should handle only whitespace string', () => {
            expect(calculateTotal('   \t   \n   ')).toBe(0);
        });

        it('should handle mixed separators with extra whitespace', () => {
            expect(calculateTotal('10 , \n 20 \n, 30')).toBe(60);
        });

        it('should handle carriage return characters', () => {
            expect(calculateTotal('10\r\n20\r\n30')).toBe(60);
        });

    });


    describe('Performance tests', () => {
        it('should handle very long string of numbers', () => {
            const longString = Array.from({ length: 1000 }, (_, i) => i + 1).join(', ');
            expect(calculateTotal(longString)).toBe(500500);
        });
    });
});