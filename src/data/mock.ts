export type ServiceOption = {
  id: string
  name: string
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
  price: number
  createdAt: string
}

export type Transaction = {
  id: string
  type: 'deposit' | 'purchase' | 'refund'
  label: string
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

export const otpServices: ServiceOption[] = [
  { id: 'whatsapp', name: 'WhatsApp', price: 450 },
  { id: 'telegram', name: 'Telegram', price: 380 },
  { id: 'google', name: 'Google', price: 320 },
  { id: 'facebook', name: 'Facebook', price: 400 },
  { id: 'instagram', name: 'Instagram', price: 420 },
  { id: 'twitter', name: 'X / Twitter', price: 350 },
  { id: 'tiktok', name: 'TikTok', price: 390 },
  { id: 'amazon', name: 'Amazon', price: 500 },
  { id: 'paypal', name: 'PayPal', price: 550 },
  { id: 'other', name: 'Other / Any', price: 300 },
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
    price: 450,
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
    price: 380,
    createdAt: '2026-08-23T10:05:00Z',
  },
]

export const initialTx: Transaction[] = [
  {
    id: 't1',
    type: 'deposit',
    label: 'Wallet top-up · Bank transfer',
    amount: 15000,
    date: '2026-08-21T09:12:00Z',
    status: 'success',
  },
  {
    id: 't2',
    type: 'purchase',
    label: 'WhatsApp · +1 415 829 1043',
    amount: -450,
    date: '2026-08-22T14:20:00Z',
    status: 'success',
  },
  {
    id: 't3',
    type: 'purchase',
    label: 'Telegram · +44 7700 900218',
    amount: -380,
    date: '2026-08-23T10:05:00Z',
    status: 'success',
  },
]
