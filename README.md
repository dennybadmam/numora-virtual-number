# Numora Virtual Number

Professional virtual number / OTP dashboard template for CodeCanyon & Gumroad.

## Features

- Mobile-first dashboard (Home, Numbers, Inbox, Wallet, History, Profile)
- **Multi-currency** — USD default; users pick preferred currency (EUR, GBP, NGN, INR, …)
- USA + All Countries number rental with server tabs
- SMS inbox with one-tap OTP copy
- Wallet funding UI (bank virtual account + crypto)
- Transaction history
- Demo auth (any credentials)
- Rebrand via `site.config.ts`
- Logo + banner ready (`public/logo.svg`, `public/banner.png`)

## Stack

Vite · React 19 · TypeScript · Tailwind CSS 4 · React Router · Lucide icons

## Quick start

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Import this repo  
2. Framework preset: **Vite**  
3. Build command: `npm run build`  
4. Output: `dist`  

SPA rewrites are in `vercel.json`.

## Customize

### Branding & currency
Edit `site.config.ts`:

- `name`, `tagline`, `supportEmail`
- `defaultCurrency` (default `USD`)
- `currencies` list (code, symbol, name, rate vs USD)
- `demo.balanceUsd`, virtual account details
- `assets.logo` / `assets.banner` paths

### Logo & banner
Upload files here:

**https://github.com/dennybadmam/numora-virtual-number/upload/main/public**

| File | Use |
|------|-----|
| `public/logo.svg` (or `.png`) | Login screen + header |
| `public/banner.png` | CodeCanyon cover / marketing |

A placeholder blue “N” logo is included until you replace it.

### Prices
Service prices are in **USD** (`src/data/mock.ts`). Display converts automatically using the selected currency rate.

## License

For sale as a digital product template. No real telephony APIs included — wire your own provider in production.
