# Fresh Breaks

**A one-minute break that doesn't try to keep you.**

Most well-being apps measure success in time spent in the app. Fresh Breaks does the opposite: you open it, breathe or reflect for a moment, and close it again. Every break takes under a minute.

[Try it: fresh-breaks.vercel.app](https://fresh-breaks.vercel.app)

<img width="419" height="763" alt="fresh-breaks" src="https://github.com/user-attachments/assets/f92d2809-06fd-406c-bf55-eb20484af50e" />

## Why I built it

I'm a trained digital well-being coach. I tried blocking apps, putting my phone away. But sometimes, you just want a brief distraction. So I thought, can I build an app that supports that: a healthy, brief break?

## Design decisions

| Decision | Why |
|---|---|
| Every break is 60 seconds or less | A break, not a session |
| At most 3 taps to start a break | When you're stressed, you won't dig through menus |
| No account needed | Nothing between you and the break; sign-in is optional |
| Each break ends on a "done" screen | A natural stopping point instead of an endless feed |
| No likes, shares or profiles | No social validation to come back for |

## What's in it

- **Breathing:** guided exercises with an animated breath circle
- **Reflection:** a few prompts, one at a time
- **Conversation:** one question a day to ask someone
- **Gratitude:** write a short appreciation message and share it
- **Sounds and video:** ambient audio (Freesound) and nature clips (Pexels)

## How it was built

I started with a prototype in Lovable, then rebuilt it in my own codebase in February 2026 with Claude Code, for full control over design and behavior.

Vite, React 19, TypeScript and Tailwind CSS v4. A PWA on Vercel, with optional sign-in through Supabase.

## Run it

```bash
cd app
npm install
npm run dev
```

The app runs without Supabase. Sign-in, sounds and video need your own keys in `app/.env.local`.
