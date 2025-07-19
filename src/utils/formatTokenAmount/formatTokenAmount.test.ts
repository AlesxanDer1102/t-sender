import { describe, it, expect } from 'vitest'
import { formatTokenAmount } from './formatTokenAmount'

describe('formatTokenAmount', () => {
  describe('Standard ERC20 tokens (18 decimals)', () => {
    it('should format 1 token correctly', () => {
      const weiAmount = 1000000000000000000 // 1 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.00')
    })

    it('should format 0.5 tokens correctly', () => {
      const weiAmount = 500000000000000000 // 0.5 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('0.50')
    })

    it('should format large amounts correctly', () => {
      const weiAmount = 1000000000000000000000 // 1000 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1,000.00')
    })

    it('should format very large amounts with proper comma separation', () => {
      const weiAmount = 1234567890000000000000000 // 1,234,567.89 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1,234,567.89')
    })

    it('should format small decimal amounts correctly', () => {
      const weiAmount = 123000000000000000 // 0.123 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('0.12')
    })
  })

  describe('USDC/USDT tokens (6 decimals)', () => {
    it('should format 1 USDC correctly', () => {
      const weiAmount = 1000000 // 1 * 10^6
      const decimals = 6
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.00')
    })

    it('should format 100.50 USDC correctly', () => {
      const weiAmount = 100500000 // 100.5 * 10^6
      const decimals = 6
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('100.50')
    })

    it('should format large USDC amounts correctly', () => {
      const weiAmount = 1000000000000 // 1,000,000 * 10^6
      const decimals = 6
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1,000,000.00')
    })
  })

  describe('Custom decimal tokens', () => {
    it('should handle tokens with 8 decimals (like some BTC tokens)', () => {
      const weiAmount = 100000000 // 1 * 10^8
      const decimals = 8
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.00')
    })

    it('should handle tokens with 12 decimals', () => {
      const weiAmount = 1000000000000 // 1 * 10^12
      const decimals = 12
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.00')
    })

    it('should handle tokens with 2 decimals', () => {
      const weiAmount = 150 // 1.5 * 10^2
      const decimals = 2
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.50')
    })
  })

  describe('Edge cases', () => {
    it('should handle zero amount', () => {
      const weiAmount = 0
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('0.00')
    })

    it('should handle zero decimals', () => {
      const weiAmount = 5
      const decimals = 0
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('5.00')
    })

    it('should handle very small amounts that round to 0.00', () => {
      const weiAmount = 1 // 0.000000000000000001 for 18 decimals
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('0.00')
    })

    it('should handle fractional amounts that need rounding', () => {
      const weiAmount = 1234567890000000000 // ~1.23456789 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.23')
    })
  })

  describe('Precision and rounding', () => {
    it('should round down when third decimal is less than 5', () => {
      const weiAmount = 1234000000000000000 // 1.234 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.23')
    })

    it('should round up when third decimal is 5 or greater', () => {
      const weiAmount = 1235000000000000000 // 1.235 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1.24')
    })

    it('should maintain exactly 2 decimal places for whole numbers', () => {
      const weiAmount = 5000000000000000000 // 5 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('5.00')
    })

    it('should maintain exactly 2 decimal places for numbers with 1 decimal', () => {
      const weiAmount = 5100000000000000000 // 5.1 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('5.10')
    })
  })

  describe('Locale formatting', () => {
    it('should format numbers with proper thousand separators', () => {
      const weiAmount = 12345678900000000000000 // 12,345.6789 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('12,345.68')
    })

    it('should handle millions with proper formatting', () => {
      const weiAmount = 1500000000000000000000000 // 1,500,000 * 10^18
      const decimals = 18
      const result = formatTokenAmount(weiAmount, decimals)
      expect(result).toBe('1,500,000.00')
    })
  })
})
