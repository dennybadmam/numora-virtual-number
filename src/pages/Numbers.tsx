import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Search } from 'lucide-react'
import {
  countries,
  otpServices,
  usaServers,
  globalServers,
  type RentedNumber,
} from '../data/mock'
import { useAuth } from '../lib/auth'
import { siteConfig } from '../../site.config'

export function Numbers() {
  const { balance, debit, addNumber, numbers } = useAuth()
  const [scope, setScope] = useState<'usa' | 'global'>('usa')
  const [server, setServer] = useState('s1')
  const [serviceId, setServiceId] = useState('')
  const [showServices, setShowServices] = useState(false)
  const [country, setCountry] = useState('US')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  const servers = scope === 'usa' ? usaServers : globalServers
  const service = otpServices.find((s) => s.id === serviceId)
  const price = service?.price ?? 0
  const sym = siteConfig.currency.symbol

  const rent = () => {
    if (!service) {
      setToast('Select a service first')
      setTimeout(() => setToast(''), 2000)
      return
    }
    if (balance < price) {
      setToast('Insufficient balance — fund your wallet')
      setTimeout(() => setToast(''), 2500)
      return
    }
    setBusy(true)
    setTimeout(() => {
      const c = countries.find((x) => x.code === country) ?? countries[0]
      const digits = Math.floor(1000000 + Math.random() * 8999999)
      const n: RentedNumber = {
        id: `n-${Date.now()}`,
        number: `${c.dial} ${String(digits).replace(/(\d{3})(\d{4})/, '$1 $2')}`,
        country: c.name,
        flag: c.flag,
        service: service.name,
        status: 'waiting',
        expiresIn: '19:45',
        price,
        createdAt: new Date().toISOString(),
      }
      debit(price, `${service.name} · ${n.number}`)
      addNumber(n)
      setBusy(false)
      setToast('Number rented — check Inbox for SMS')
      setTimeout(() => setToast(''), 2500)
    }, 600)
  }

  return (
    <div className="px-4 pt-3 pb-6">
      <div className="mb-4 flex items-center gap-3">
        <Link
          to="/app"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600" />
        </Link>
        <h1 className="text-lg font-semibold text-slate-900">Virtual Numbers</h1>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">Balance</p>
          <p className="text-sm font-semibold text-slate-900">
            {sym}
            {balance.toLocaleString()}
          </p>
        </div>
        <Link
          to="/app/wallet"
          className="pressable rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white"
        >
          + Fund
        </Link>
      </div>

      <div className="mb-3 flex rounded-xl border border-slate-200 bg-white p-1">
        <button
          type="button"
          onClick={() => {
            setScope('usa')
            setServer('s1')
          }}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
            scope === 'usa' ? 'bg-brand text-white' : 'text-slate-500'
          }`}
        >
          USA Numbers
        </button>
        <button
          type="button"
          onClick={() => {
            setScope('global')
            setServer('g1')
          }}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
            scope === 'global' ? 'bg-brand text-white' : 'text-slate-500'
          }`}
        >
          All Countries
        </button>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {servers.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setServer(s.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              server === s.id
                ? 'bg-brand text-white'
                : 'border border-slate-200 bg-white text-slate-600'
            }`}
          >
            {s.name.replace(/USA |Global /, '')}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            {servers.find((s) => s.id === server)?.name}
          </h2>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            {servers.find((s) => s.id === server)?.badge}
          </span>
        </div>
        <p className="mb-4 text-xs text-slate-500">
          {servers.find((s) => s.id === server)?.note}
        </p>

        {scope === 'global' && (
          <label className="mb-3 block text-xs font-medium text-slate-600">
            Country
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          type="button"
          onClick={() => setShowServices(true)}
          className="mb-3 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">
              {service ? service.name : 'Tap to choose service…'}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>

        {service && (
          <div className="mb-3 flex items-center justify-between rounded-xl bg-brand/5 px-3.5 py-2.5">
            <span className="text-xs text-slate-600">Price</span>
            <span className="text-sm font-semibold text-brand">
              {sym}
              {price.toLocaleString()}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={rent}
          disabled={busy}
          className="pressable w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
        >
          {busy ? 'Renting…' : 'Rent Number'}
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">My orders</h2>
          <span className="text-xs text-slate-400">{numbers.length} orders</span>
        </div>
        {numbers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-10 text-center">
            <p className="text-sm text-slate-500">No orders yet. Buy your first number above!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {numbers.map((n) => (
              <div
                key={n.id}
                className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      {n.flag} {n.service}
                    </p>
                    <p className="font-mono text-sm font-semibold text-slate-900">{n.number}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      n.status === 'received'
                        ? 'bg-emerald-50 text-emerald-700'
                        : n.status === 'waiting'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {n.status}
                  </span>
                </div>
                {n.sms && (
                  <p className="mt-2 rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-xs text-slate-700">
                    {n.sms}
                  </p>
                )}
                {n.expiresIn && n.status === 'waiting' && (
                  <p className="mt-1.5 text-[11px] text-amber-600">
                    Expires in {n.expiresIn} · auto-refund if no SMS
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showServices && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={() => setShowServices(false)}
        >
          <div
            className="max-h-[70vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Select service</h3>
              <button
                type="button"
                onClick={() => setShowServices(false)}
                className="text-xs text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="space-y-1">
              {otpServices.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setServiceId(s.id)
                    setShowServices(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-slate-50"
                >
                  <span className="text-sm font-medium text-slate-800">{s.name}</span>
                  <span className="text-xs font-semibold text-brand">
                    {sym}
                    {s.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
