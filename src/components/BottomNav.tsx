import { NavLink } from 'react-router-dom'
import { Home, Hash, Inbox, Wallet, User } from 'lucide-react'

const tabs = [
  { to: '/app', end: true, icon: Home, label: 'Home' },
  { to: '/app/numbers', icon: Hash, label: 'Numbers' },
  { to: '/app/inbox', icon: Inbox, label: 'Inbox' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-1">
        {tabs.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-brand' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="h-5 w-5"
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span>{label}</span>
                {isActive && (
                  <span className="absolute bottom-0 h-0.5 w-6 rounded-full bg-brand" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
