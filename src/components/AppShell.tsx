import { Outlet, Navigate } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { useAuth } from '../lib/auth'

export function AppShell() {
  const { isAuthed } = useAuth()
  if (!isAuthed) return <Navigate to="/login" replace />

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-slate-50 pb-24">
      <Outlet />
      <BottomNav />
    </div>
  )
}
