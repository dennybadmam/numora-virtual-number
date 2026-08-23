import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { siteConfig } from '../../site.config'
import {
  initialNumbers,
  initialTx,
  type RentedNumber,
  type Transaction,
} from '../data/mock'

type AuthState = {
  isAuthed: boolean
  username: string
  email: string
  balance: number
  numbers: RentedNumber[]
  transactions: Transaction[]
  login: (email?: string) => void
  logout: () => void
  addNumber: (n: RentedNumber) => void
  debit: (amount: number, label: string) => boolean
}

const AuthCtx = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setAuthed] = useState(false)
  const [username] = useState(siteConfig.demo.username)
  const [email, setEmail] = useState(siteConfig.demo.email)
  const [balance, setBalance] = useState(siteConfig.demo.balance)
  const [numbers, setNumbers] = useState<RentedNumber[]>(initialNumbers)
  const [transactions, setTx] = useState<Transaction[]>(initialTx)

  const value = useMemo<AuthState>(
    () => ({
      isAuthed,
      username,
      email,
      balance,
      numbers,
      transactions,
      login: (e) => {
        if (e) setEmail(e)
        setAuthed(true)
      },
      logout: () => setAuthed(false),
      addNumber: (n) => setNumbers((prev) => [n, ...prev]),
      debit: (amount, label) => {
        if (balance < amount) return false
        setBalance((b) => b - amount)
        setTx((prev) => [
          {
            id: `t-${Date.now()}`,
            type: 'purchase',
            label,
            amount: -amount,
            date: new Date().toISOString(),
            status: 'success',
          },
          ...prev,
        ])
        return true
      },
    }),
    [isAuthed, username, email, balance, numbers, transactions],
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
