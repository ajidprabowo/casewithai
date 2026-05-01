# CaseWithAI Clone — Full-Stack Next.js App

AI-powered consulting case interview preparation platform.
Built with **Next.js 14**, **Tailwind CSS**, and **Google Gemini AI**.

---

## Project Structure

```
casewithai/
├── src/
│   ├── app/                         ← Next.js App Router
│   │   ├── api/
│   │   │   ├── chat/route.ts        ← API: AI Chat (Gemini, server-side)
│   │   │   └── assessment/route.ts  ← API: Session Scoring (Gemini)
│   │   ├── assessment/page.tsx      ← Free 3-question diagnostic
│   │   ├── cases/
│   │   │   ├── page.tsx             ← Case library with filters
│   │   │   └── [id]/page.tsx        ← Live AI mock interview session
│   │   ├── course/page.tsx          ← 14-module structured course
│   │   ├── dashboard/page.tsx       ← Progress tracker & recommendations
│   │   ├── drill/page.tsx           ← Targeted skill drills
│   │   ├── login/page.tsx           ← Auth (login / signup)
│   │   ├── pricing/page.tsx         ← Pricing + FAQ
│   │   ├── globals.css              ← Global styles + Tailwind
│   │   ├── layout.tsx               ← Root layout + metadata
│   │   └── page.tsx                 ← Landing page
│   ├── components/
│   │   ├── Navbar.tsx               ← Responsive top navigation
│   │   ├── MarkdownRenderer.tsx     ← Renders Gemini AI markdown responses
│   │   └── ScoreCard.tsx            ← Post-session score display
│   ├── data/
│   │   ├── cases.ts                 ← 6 case scenarios with firm-specific prompts
│   │   ├── drills.ts                ← 14 targeted drill questions
│   │   ├── course.ts                ← 14-module course curriculum
│   │   └── pricing.ts               ← Pricing plan definitions
│   ├── lib/
│   │   ├── gemini.ts                ← Gemini API helper (server only)
│   │   └── utils.ts                 ← Utility functions (cn, formatScore, etc.)
│   └── types/
│       └── index.ts                 ← TypeScript type definitions
├── .env.example                     ← Environment variable template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Get Gemini API Key (FREE)
1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the API key

### 3. Create `.env.local`
```bash
cp .env.example .env.local
```

Fill in `.env.local`:
```
GEMINI_API_KEY=paste_your_key_here
GEMINI_MODEL=gemini-3-flash-preview
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=CaseWithAI
```

### 4. Run development server
```bash
npm run dev
```

Open **http://localhost:3000**

---

## Deploy to Vercel

1. Push project to GitHub
2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add Environment Variables:
   - `GEMINI_API_KEY` = your Gemini API key
   - `GEMINI_MODEL` = `gemini-3-flash-preview`
5. Click **Deploy** ✅

---

## Features

| Page | Features |
|------|----------|
| 🏠 Landing | Hero, mock UI, process steps, toolkit, testimonials, pricing preview, CTA |
| 🔍 Assessment | 3-question free diagnostic, AI-scored with strengths/weaknesses report |
| 💬 Cases | Case library with filters (firm/type/difficulty), full AI mock interview session, real-time chat with Gemini |
| 🎯 Drills | 14 drills across 5 categories, timed practice, AI feedback |
| 📚 Course | 14-module curriculum, free + premium, progress tracking |
| 📊 Dashboard | Score history, dimension breakdown, AI recommendations |
| 💰 Pricing | 3 plans, comparison table, FAQ accordion, billing toggle |
| 🔐 Login | Login/Signup form with Google OAuth UI |

---

## API Security

✅ `GEMINI_API_KEY` lives only in server-side API routes  
✅ Never exposed to the browser  
✅ `.env.local` excluded from Git via `.gitignore`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini 2.0 Flash |
| Font | Sora + DM Serif Display |
| Icons | Lucide React |
| Deploy | Vercel |
