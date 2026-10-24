# Thinkverses Solutions website

Next.js 16 (App Router, Cache Components) + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/app/page.tsx` – home page, assembled from `src/components/sections/*`
- `src/app/articles/<slug>/page.tsx` – the Dubai & UAE Digital Twin article (content in `src/lib/article.ts`)
- `src/app/solutions/[service]/[region]` – Digital Twin / RPA / IoT location pages for the UAE and GCC
- `src/lib/content.ts` – all site copy, contact details, FAQs, industries
- `src/lib/locations.ts` – services, regions and 301 redirects from the old WordPress URLs
- Design tokens live in `src/app/globals.css` (`@theme`)

## Before launch

- **Forms**: set `FORMS_WEBHOOK_URL` (Zapier, Make, a CRM or email service endpoint). Contact and newsletter
  submissions are POSTed there as JSON. Without it, production returns a clear error instead of dropping messages.
- **Social links**: `socials` in `src/lib/content.ts` currently point to each network's home page (as on the
  current site). Replace them with the company's own profile URLs.
- **Photos** in `public/images` are from Unsplash (free licence). Swap in project photography when available.
