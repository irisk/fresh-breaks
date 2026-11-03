# Fresh Breaks

A micro-intervention wellness app: short moments of calm or reflection that take under a minute. It's built to be anti-addictive. Success means quick relief and then closing the app, not time on the device.

Breaks include breathing exercises, reflection prompts, a daily conversation question, gratitude messages, ambient sounds and nature video. No account needed.

<img width="419" height="763" alt="fresh-breaks" src="https://github.com/user-attachments/assets/f92d2809-06fd-406c-bf55-eb20484af50e" />


## How it was built

I started with a prototype in Lovable, then moved to my own codebase in February 2026 for full control, built with Claude Code. The prototype isn't in this repo.

- Vite, React 19, TypeScript, Tailwind CSS v4
- Supabase for optional sign-in
- PWA, deployed on Vercel
- Content from the Pexels and Freesound APIs

## Run it

```bash
cd app
npm install
npm run dev
```

The app runs without Supabase. Sign-in, sounds and video need your own keys in `app/.env.local`.
