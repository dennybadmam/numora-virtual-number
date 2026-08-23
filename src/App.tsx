import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { AppShell } from './components/AppShell'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Numbers } from './pages/Numbers'
import { Inbox } from './pages/Inbox'
import { Wallet } from './pages/Wallet'
import { History } from './pages/History'
import { Profile } from './pages/Profile'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="numbers" element={<Numbers />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
