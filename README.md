# EcoLight Innovations website

The site for [ecolightinnovation.com](https://www.ecolightinnovation.com): clean, affordable solar lighting for rural Zambia.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build (also type-checks and lints) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |

## Editing content

Most text lives in plain TypeScript files, so updates don't require touching page layouts:

| What | File |
| --- | --- |
| Contact details, social links, navigation | `lib/site.ts` |
| Impact stories (newest first) | `lib/content/stories.ts` |
| Team and board | `lib/content/team.ts` |
| Mission goals and values | `lib/content/mission.ts` |
| Energy-as-a-Service packages, prices, how it works, pilot, energy-gap stats | `lib/content/eaas.ts` |
| Donation details (WhatsApp link for international gifts, mobile money, bank) | `lib/content/donate.ts` |
| Impact calculator assumptions | `lib/impact.ts` |

Images go in `public/images/…` and videos in `public/videos/…`. Reference them from content files with a path
starting at `/images/…`.

To add an impact story, copy an existing entry at the top of `stories` in `lib/content/stories.ts`, give it a unique
`slug`, and fill in the fields. The Impact page and the home page preview update automatically.

## Contact form

The inquiry form posts to `app/api/contact/route.ts`, which validates the message on the server and forwards it to a
webhook. By default that's the Google Apps Script the previous site used, so messages arrive in the same place.

To send them somewhere else, set `CONTACT_WEBHOOK_URL` (see `.env.example`). The webhook receives a JSON body:
`{ name, email, subject, message }`.

## Deployment

The site is hosted on Vercel and deploys automatically:

- Every push to `main` goes live at [www.ecolightinnovation.com](https://www.ecolightinnovation.com).
- Every pull request gets its own preview link from Vercel.

The domain is registered at Namecheap (Advanced DNS), with an `A` record for `@` and a `CNAME` for `www` pointing to
Vercel. Vercel → Project → Settings → Domains shows the exact values it expects and whether the setup is valid.
The bare domain redirects to `www`.

Optional: set `CONTACT_WEBHOOK_URL` under Vercel → Project → Settings → Environment Variables.

Links to the old `.html` pages (for example `/about-us.html`) redirect to the new pages automatically.

## Project layout

```
app/                 Pages (App Router) and the /api/contact route
components/          UI, grouped by page (home, impact, donate, about, inquiry) plus shared ui/ and layout/
lib/                 Site config, content, calculator and form validation
public/              Images and video served as-is
archive/media/       Media from the old site that the new design doesn't use (not deployed)
```
