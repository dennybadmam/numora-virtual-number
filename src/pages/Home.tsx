import { Link } from 'react-router-dom'
import {
  Hash,
  Wallet,
  History,
  Inbox,
  CreditCard,
  Headphones,
  Copy,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { siteConfig } from '../../site.config'

const services = [
  { to: '/app/numbers', icon: Hash, label: 'Buy Numbers', color: 'bg-blue-50 text-brand' },
  { to: '/app/wallet', icon: Wallet, label: 'Fund Wallet', color: 'bg-cyan-50 text-accent' },
  { to: '/app/inbox', icon: Inbox, label: 'SMS Inbox', color: 'bg-violet-50 text-violet-600' },
  { to: '/app/history', icon: History, label: 'History', color: 'bg-amber-50 text-amber-600' },
]

const quick = [
  { to: '/app/history', icon: History, label: 'Orders' },
  { to: '/app/wallet', icon: CreditCard, label: 'Top up' },
  { to: '/app/profile', icon: Headphones, label: 'Support' },
]

export function Home() {
  const { username, balanceUsd, transactions, format, currency } = useAuth()
  const [copied, setCopied] = useState(false)
  const va = siteConfig.demo.virtualAccount

  const copy = async () => {
    await navigator.clipboard.writeText(va.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="px-4 pt-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand text-sm font-semibold text-white">
            <img
              src={siteConfig.assets.logo}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
                ;(e.target as HTMLImageElement).parentElement!.textContent =
                  username.slice(0, 1).toUpperCase()
              }}
            />
          </div>
          <div>
            <p className="text-xs text-slate-500">Welcome back</p>
            <p className="text-sm font-semibold text-slate-900">{username}</p>
          </div>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600">
          {currency.code}
        </span>
      </div>

      {/* Balance card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-blue-700 p-5 text-white shadow-md shadow-blue-500/20">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-100">
          Total balance
        </p>
        <p className="mt-1 text-3xl font-semibold tracking-tight">
          {format(balanceUsd)}
        </p>
        <p className="mt-0.5 text-xs text-blue-100">Available · {currency.name}</p>
        <Link
          to="/app/wallet"
          className="pressable absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-white/25"
        >
          Fund wallet
        </Link>
      </div>

      {/* Virtual account chip */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {va.bank}
          </p>
          <p className="font-mono text-sm font-semibold text-slate-900">{va.accountNumber}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="pressable flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Services */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map(({ to, icon: Icon, label, color }) => (
            <Link
              key={label}
              to={to}
              className="pressable flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium text-slate-800">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Quick actions</h2>
        <div className="flex gap-3">
          {quick.map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              to={to}
              className="pressable flex flex-1 flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white py-3 shadow-sm"
            >
              <Icon className="h-5 w-5 text-brand" strokeWidth={1.75} />
              <span className="text-[11px] font-medium text-slate-600">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 mb-2">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
          <Link to="/app/history" className="text-xs font-medium text-brand">
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {transactions.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-800">{t.label}</p>
                <p className="text-[11px] text-slate-400">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  t.amount >= 0 ? 'text-emerald-600' : 'text-slate-800'
                }`}
              >
                {t.amount >= 0 ? '+' : ''}
                {format(t.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
