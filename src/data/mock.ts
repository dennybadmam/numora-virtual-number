export type ServiceOption = {
  id: string
  name: string
  /** Price in USD (base). Display converts via selected currency. */
  price: number
  icon?: string
}

export type Country = {
  code: string
  name: string
  flag: string
  dial: string
}

export type RentedNumber = {
  id: string
  number: string
  country: string
  flag: string
  service: string
  status: 'waiting' | 'received' | 'expired'
  sms?: string
  expiresIn?: string
  /** Price paid in USD base */
  price: number
  createdAt: string
}

export type Transaction = {
  id: string
  type: 'deposit' | 'purchase' | 'refund'
  label: string
  /** Amount in USD base (positive = credit, negative = debit) */
  amount: number
  date: string
  status: 'success' | 'pending' | 'failed'
}

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dial: '+234' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dial: '+52' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dial: '+1' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dial: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dial: '+33' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dial: '+91' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dial: '+55' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dial: '+63' },
]

/** Service prices in USD */
export const otpServices: ServiceOption[] = [
  { id: 'whatsapp', name: 'WhatsApp', price: 1.2 },
  { id: 'telegram', name: 'Telegram', price: 0.95 },
  { id: 'google', name: 'Google', price: 0.85 },
  { id: 'facebook', name: 'Facebook', price: 1.05 },
  { id: 'instagram', name: 'Instagram', price: 1.1 },
  { id: 'twitter', name: 'X / Twitter', price: 0.9 },
  { id: 'tiktok', name: 'TikTok', price: 1.0 },
  { id: 'amazon', name: 'Amazon', price: 1.35 },
  { id: 'paypal', name: 'PayPal', price: 1.5 },
  { id: 'other', name: 'Other / Any', price: 0.75 },
]

export const usaServers = [
  { id: 's1', name: 'USA Server 1', badge: 'Instant', note: 'Fast delivery · Any area code' },
  { id: 's2', name: 'USA Server 2', badge: 'Premium', note: '20 min window · Auto-refund if no SMS' },
]

export const globalServers = [
  { id: 'g1', name: 'Global Server 1', badge: 'Standard', note: 'Wide country coverage' },
  { id: 'g2', name: 'Global Server 2', badge: 'Fast', note: 'Priority routing' },
]

export const initialNumbers: RentedNumber[] = [
  {
    id: 'n1',
    number: '+1 415 829 1043',
    country: 'United States',
    flag: '🇺🇸',
    service: 'WhatsApp',
    status: 'received',
    sms: 'Your WhatsApp code is 847291',
    price: 1.2,
    createdAt: '2026-08-22T14:20:00Z',
  },
  {
    id: 'n2',
    number: '+44 7700 900218',
    country: 'United Kingdom',
    flag: '🇬🇧',
    service: 'Telegram',
    status: 'waiting',
    expiresIn: '12:48',
    price: 0.95,
    createdAt: '2026-08-23T10:05:00Z',
  },
]

export const initialTx: Transaction[] = [
  {
    id: 't1',
    type: 'deposit',
    label: 'Wallet top-up · Bank transfer',
    amount: 30,
    date: '2026-08-21T09:12:00Z',
    status: 'success',
  },
  {
    id: 't2',
    type: 'purchase',
    label: 'WhatsApp · +1 415 829 1043',
    amount: -1.2,
    date: '2026-08-22T14:20:00Z',
    status: 'success',
  },
  {
    id: 't3',
    type: 'purchase',
    label: 'Telegram · +44 7700 900218',
    amount: -0.95,
    date: '2026-08-23T10:05:00Z',
    status: 'success',
  },
]
