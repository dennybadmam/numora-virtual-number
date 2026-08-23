import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Building2, Bitcoin } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { siteConfig } from '../../site.config'

export function Wallet() {
  const { balance } = useAuth()
  const [tab, setTab] = useState<'bank' | 'crypto'>('bank')
  const [copied, setCopied] = useState(false)
  const va = siteConfig.demo.virtualAccount
  const sym = siteConfig.currency.symbol

  const copy = async () => {
    await navigator.clipboard.writeText(va.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="px-4 pt-3">
      <div className="mb-4 flex items-center gap-3">
        <Link
          to="/app"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600" />
        </Link>
        <h1 className="text-lg font-semibold text-slate-900">Fund Wallet</h1>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Current balance
        </p>
        <p className="mt-1 text-3xl font-semibold text-brand">
          {sym}
          {balance.toLocaleString()}
        </p>
        <p className="text-xs text-slate-400">Available</p>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('bank')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-xs font-semibold transition ${
            tab === 'bank'
              ? 'border-brand bg-brand/5 text-brand'
              : 'border-slate-200 bg-white text-slate-500'
          }`}
        >
          <Building2 className="h-4 w-4" />
          Bank transfer
        </button>
        <button
          type="button"
          onClick={() => setTab('crypto')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-xs font-semibold transition ${
            tab === 'crypto'
              ? 'border-brand bg-brand/5 text-brand'
              : 'border-slate-200 bg-white text-slate-500'
          }`}
        >
          <Bitcoin className="h-4 w-4" />
          Crypto (USDT)
        </button>
      </div>

      {tab === 'bank' ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Fund with virtual account
          </p>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Account name</dt>
              <dd className="font-medium text-slate-900">{va.accountName}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Account number</dt>
              <dd className="flex items-center gap-2">
                <span className="font-mono font-semibold text-slate-900">
                  {va.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="pressable rounded-lg bg-brand px-2 py-1 text-[11px] font-semibold text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Bank</dt>
              <dd className="font-medium text-slate-900">{va.bank}</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
            Funds paid to this virtual account are credited automatically. Transfers are
            non-refundable — pay the exact amount you intend to deposit.
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            USDT deposit
          </p>
          <p className="text-sm text-slate-600">
            Network: <span className="font-medium text-slate-900">TRC20</span>
          </p>
          <p className="mt-2 break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800">
            TXdemoNumoraWalletAddressForTemplateOnly123
          </p>
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText('TXdemoNumoraWalletAddressForTemplateOnly123')
            }
            className="pressable mt-3 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700"
          >
            Copy address
          </button>
          <p className="mt-3 text-[11px] text-slate-400">
            Demo only — wire a real payment provider in production.
          </p>
        </div>
      )}
    </div>
  )
}
