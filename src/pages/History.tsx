import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../lib/auth'

export function History() {
  const { transactions, format } = useAuth()

  return (
    <div className="px-4 pt-3">
      <div className="mb-4 flex items-center gap-3">
        <Link
          to="/app"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600" />
        </Link>
        <h1 className="text-lg font-semibold text-slate-900">Transaction History</h1>
      </div>

      <div className="mb-4 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-500">
        <div className="flex justify-between">
          <span>Total records</span>
          <span className="font-semibold text-slate-800">{transactions.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">{t.label}</p>
              <p className="text-[11px] text-slate-400">
                {new Date(t.date).toLocaleString()} · {t.status}
              </p>
            </div>
            <p
              className={`text-sm font-semibold ${
                t.amount >= 0 ? 'text-emerald-600' : 'text-slate-900'
              }`}
            >
              {t.amount >= 0 ? '+' : ''}
              {format(t.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
