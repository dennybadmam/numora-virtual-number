import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { siteConfig } from '../../site.config'

export function Profile() {
  const { username, email, logout } = useAuth()
  const nav = useNavigate()

  return (
    <div className="px-4 pt-3">
      <div className="mb-4 flex items-center gap-3">
        <Link
          to="/app"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600" />
        </Link>
        <h1 className="text-lg font-semibold text-slate-900">Profile</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Account information
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-[11px] text-slate-400">Username</p>
            <p className="text-sm font-medium text-slate-900">{username}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Email</p>
            <p className="text-sm font-medium text-slate-900">{email}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Support</p>
            <p className="text-sm font-medium text-brand">{siteConfig.supportEmail}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          logout()
          nav('/login', { replace: true })
        }}
        className="pressable mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-3 text-sm font-semibold text-red-600"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  )
}
