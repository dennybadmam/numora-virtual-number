import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { siteConfig, type CurrencyCode } from '../../site.config'
import {
  initialNumbers,
  initialTx,
  type RentedNumber,
  type Transaction,
} from '../data/mock'

type Currency = (typeof siteConfig.currencies)[number]

type AuthState = {
  isAuthed: boolean
  username: string
  email: string
  /** Balance stored in USD base */
  balanceUsd: number
  currencyCode: CurrencyCode
  currency: Currency
  numbers: RentedNumber[]
  transactions: Transaction[]
  login: (email?: string) => void
  logout: () => void
  setCurrency: (code: CurrencyCode) => void
  addNumber: (n: RentedNumber) => void
  /** Debit amount in USD. Returns false if insufficient. */
  debit: (amountUsd: number, label: string) => boolean
  /** Format a USD amount in the user's preferred currency */
  format: (amountUsd: number) => string
}

const AuthCtx = createContext<AuthState | null>(null)

function findCurrency(code: string): Currency {
  return (
    siteConfig.currencies.find((c) => c.code === code) ??
    siteConfig.currencies[0]
  )
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setAuthed] = useState(false)
  const [username] = useState(siteConfig.demo.username)
  const [email, setEmail] = useState(siteConfig.demo.email)
  const [balanceUsd, setBalanceUsd] = useState(siteConfig.demo.balanceUsd)
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(
    siteConfig.defaultCurrency as CurrencyCode,
  )
  const [numbers, setNumbers] = useState<RentedNumber[]>(initialNumbers)
  const [transactions, setTx] = useState<Transaction[]>(initialTx)

  const currency = findCurrency(currencyCode)

  const format = (amountUsd: number) => {
    const converted = amountUsd * currency.rate
    const abs = Math.abs(converted)
    const formatted =
      currency.rate >= 100
        ? Math.round(abs).toLocaleString()
        : abs.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
    return `${currency.symbol}${formatted}`
  }

  const value = useMemo<AuthState>(
    () => ({
      isAuthed,
      username,
      email,
      balanceUsd,
      currencyCode,
      currency,
      numbers,
      transactions,
      login: (e) => {
        if (e) setEmail(e)
        setAuthed(true)
      },
      logout: () => setAuthed(false),
      setCurrency: (code) => setCurrencyCode(code),
      addNumber: (n) => setNumbers((prev) => [n, ...prev]),
      debit: (amountUsd, label) => {
        if (balanceUsd < amountUsd) return false
        setBalanceUsd((b) => b - amountUsd)
        setTx((prev) => [
          {
            id: `t-${Date.now()}`,
            type: 'purchase',
            label,
            amount: -amountUsd,
            date: new Date().toISOString(),
            status: 'success',
          },
          ...prev,
        ])
        return true
      },
      format,
    }),
    [
      isAuthed,
      username,
      email,
      balanceUsd,
      currencyCode,
      currency,
      numbers,
      transactions,
    ],
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
