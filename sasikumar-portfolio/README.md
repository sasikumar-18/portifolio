# Sasikumar · Developer Portfolio

React 18 + Vite 5 + TypeScript + Tailwind CSS 3 + Framer Motion 11 + Lucide icons.
Dark by default with a light-mode toggle, reduced-motion support, and no backend required.

## 1. Run it locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck    # optional: TypeScript check
npm run build        # production build into /dist
npm run preview      # serve the production build locally
```

## 2. Replace your details

Everything personal lives in two files:

| File | What to edit |
| --- | --- |
| `src/data/profile.ts` | Email, GitHub, LinkedIn, resume path, role text |
| `src/data/content.ts` | Skills, projects (demo/repo links, features, results), timeline |

Any link that still contains `your-` or `example.com` is shown as a **disabled** button, so a visitor never hits a dead link. Once you paste the real URL, it becomes a normal link automatically.

**Resume:** put your PDF in `public/` and name it `Sasikumar_Resume.pdf` (or change `resume` in `profile.ts`).

**Project links:** fill `demo` and `repo` for each project in `content.ts`.

**Social preview image:** add a 1200×630 `public/og-image.png`, then replace `your-portfolio.vercel.app` in `index.html` with your real domain (4 places).

### Keep it honest (recruiters check)
- Review each project's `features` and `contribution` and edit them to match what you actually built.
- `results` for House Price Prediction is empty on purpose. Add real metrics (for example R² on a test split) only after you measure them.
- Medicine Safety Assistant lists `planned` features. Move items into `implemented` as you finish them.
- Add Flask/Django to Backend skills only after you have built something with them. Add certifications only after verifying them.

## 3. Make the contact form deliver messages

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT=<your endpoint>`.
3. On Vercel, add the same variable under **Project → Settings → Environment Variables**.

Without an endpoint, the form opens the visitor's email app with the message pre-filled and tells them it is not sent until they press send. It never claims delivery it can't guarantee. (Formspree endpoints are meant to be public; never put private API keys in `VITE_` variables.)

## 4. Deploy to Vercel

**Option A: GitHub (recommended)**
1. Push this folder to a new GitHub repository.
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`). Add `VITE_FORM_ENDPOINT`, then **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## 5. Project structure

```
src/
  components/   Hero, About, Skills, Projects, Journey, Resume, Contact, Footer,
                Navbar, Background, Cursor, ScrollProgress, BackToTop, Thumb, SmartLink, Reveal
  data/         profile.ts, content.ts   <- edit these
  hooks/        useTyping, useTheme, useActiveSection
```

## 6. Final checklist before sharing the link
- [ ] Real email, GitHub, LinkedIn in `profile.ts`
- [ ] Resume PDF added to `public/`
- [ ] Demo/repo links added for each project (or leave blank to show disabled buttons)
- [ ] `VITE_FORM_ENDPOINT` set on Vercel, and a test message received
- [ ] Domain and `og-image.png` updated in `index.html`
- [ ] Lighthouse run on the deployed URL (mobile)
