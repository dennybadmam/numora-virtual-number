import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { siteConfig } from '../../site.config'

export function Login() {
  const { login, isAuthed } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('demo@numora.app')
  const [password, setPassword] = useState('demo123')
  const [loading, setLoading] = useState(false)

  if (isAuthed) {
    nav('/app', { replace: true })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(email)
      setLoading(false)
      nav('/app', { replace: true })
    }, 400)
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-slate-50 px-5">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-brand shadow-sm">
            <img
              src={siteConfig.assets.logo}
              alt={siteConfig.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const el = e.target as HTMLImageElement
                el.style.display = 'none'
                el.parentElement!.innerHTML =
                  '<span class="text-xl font-bold text-white">N</span>'
              }}
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{siteConfig.tagline}</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-base font-semibold text-slate-900">Sign in</h2>
          <p className="mt-0.5 text-xs text-slate-500">Demo mode — any credentials work</p>

          <label className="mt-5 block text-xs font-medium text-slate-600">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              required
            />
          </label>

          <label className="mt-3 block text-xs font-medium text-slate-600">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="pressable mt-5 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Template for CodeCanyon · {siteConfig.supportEmail}
        </p>
      </div>
    </div>
  )
}
