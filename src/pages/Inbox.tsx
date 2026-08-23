import { Link } from 'react-router-dom'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../lib/auth'

export function Inbox() {
  const { numbers } = useAuth()
  const [copiedId, setCopiedId] = useState('')
  const withSms = numbers.filter((n) => n.sms || n.status === 'waiting')

  const copyCode = async (id: string, text: string) => {
    const match = text.match(/\d{4,8}/)
    await navigator.clipboard.writeText(match ? match[0] : text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(''), 1500)
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
        <h1 className="text-lg font-semibold text-slate-900">SMS Inbox</h1>
      </div>

      {withSms.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No messages yet</p>
          <p className="mt-1 text-xs text-slate-400">
            Rent a number and OTP codes will appear here
          </p>
          <Link
            to="/app/numbers"
            className="pressable mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white"
          >
            Buy number
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {withSms.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {n.flag} {n.service}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-slate-900">
                    {n.number}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    n.status === 'received'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {n.status === 'received' ? 'Received' : 'Waiting'}
                </span>
              </div>
              {n.sms ? (
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                  <p className="font-mono text-sm text-slate-800">{n.sms}</p>
                  <button
                    type="button"
                    onClick={() => copyCode(n.id, n.sms!)}
                    className="pressable shrink-0 rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-semibold text-white"
                  >
                    {copiedId === n.id ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-xs text-amber-600">
                  Waiting for SMS… expires in {n.expiresIn ?? '—'}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
