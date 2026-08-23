/**
 * Numora Virtual Number — buyer customization
 * Change these values to rebrand the entire template.
 */
export const siteConfig = {
  name: 'Numora',
  tagline: 'Virtual Numbers & OTP',
  supportEmail: 'official@vernex.com.ng',
  currency: {
    code: 'NGN',
    symbol: '₦',
  },
  colors: {
    primary: '#2563EB',
    accent: '#06B6D4',
  },
  demo: {
    username: 'demo',
    email: 'demo@numora.app',
    balance: 12500,
    virtualAccount: {
      bank: 'Wema Bank',
      accountName: 'Numora / Demo User',
      accountNumber: '7829340165',
    },
  },
} as const
