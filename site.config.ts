/**
 * Numora Virtual Number — buyer customization
 * Change these values to rebrand the entire template.
 */
export const siteConfig = {
  name: 'Numora',
  tagline: 'Virtual Numbers & OTP',
  supportEmail: 'support@numora.app',
  /** Default currency code (must exist in `currencies`) */
  defaultCurrency: 'USD',
  /** Available currencies — users pick preferred one in Profile */
  currencies: [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.37 },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1600 },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83 },
    { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', rate: 15.5 },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 129 },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 18.2 },
  ],
  colors: {
    primary: '#2563EB',
    accent: '#06B6D4',
  },
  demo: {
    username: 'demo',
    email: 'demo@numora.app',
    /** Balance in USD (base). Converted by selected currency rate. */
    balanceUsd: 25,
    virtualAccount: {
      bank: 'Wema Bank',
      accountName: 'Numora / Demo User',
      accountNumber: '7829340165',
    },
  },
  /**
   * Assets — drop your files here then commit:
   *   public/logo.svg   → app logo (Login, header)
   *   public/banner.png → optional marketing banner / CodeCanyon cover
   * Upload on GitHub: https://github.com/dennybadmam/numora-virtual-number/upload/main/public
   */
  assets: {
    logo: '/logo.svg',
    banner: '/banner.png',
    favicon: '/favicon.svg',
  },
} as const

export type CurrencyCode = (typeof siteConfig.currencies)[number]['code']
