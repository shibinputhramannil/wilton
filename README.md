# Wilton Restaurant & Hotel

A modern, mobile-first website for Wilton Restaurant & Hotel in Sultan Bathery, Wayanad, Kerala. The site uses the Wilton palette—deep maroon, warm cream, brass gold, charcoal and spice orange—and keeps menu, offers, gallery, facilities, rooms and business details editable as JSON.

## Run locally

```bash
pnpm install
pnpm dev:static
```

The Preview server runs on port `3000`. For a production static build:

```bash
pnpm check
pnpm build:static
```

The build output is written to `dist/public`.

## Edit business details and links

Edit `client/src/data/site.json` to change the business name, NAP, hours, phone numbers, WhatsApp destination, email address, map embed URL and social links. Replace the `#` placeholders for Facebook, Instagram, YouTube and TripAdvisor with Wilton's confirmed URLs. Replace the `.example` email before enabling customer email handoff in production.

The following contact values are currently wired into the UI:

| Purpose | Value |
| --- | --- |
| Main line | `04936 226 444` |
| Take Away / order WhatsApp | `7902 564 444` |
| Room reservation | `7902 534 444` |
| Address | `Dhottappankulam, National Highway 212, Sultan Bathery, Kerala 673592` |
| Hours | `7 AM – 11 PM daily` |

## Edit food content and prices

- `client/src/data/menu.json` contains the full menu. Each item has `id`, `category`, `name`, `description`, `price`, `tag`, `veg`, and `image`.
- `client/src/data/offers.json` controls the eight Home-page offer cards and their proposed prices. Wilton should confirm these prices before publication.
- `client/src/data/categories.json` controls the Home category-card names, descriptions and imagery.
- `client/src/data/facilities.json` controls the Why Wilton / facilities grid. The `icon` value maps to a Lucide icon in `Home.tsx`.
- `client/src/data/rooms.json` controls the room teaser and Rooms page cards.

Prices are rendered in Indian rupees and are intentionally data-driven so a content update does not require component changes.

## Edit gallery and images

`client/src/data/gallery.json` contains the 16-photo gallery entries. Each entry has `src`, `alt`, and `caption`. Keep meaningful alt text for accessibility. The gallery page lazy-loads images and opens them in the keyboard-friendly lightbox. Home intentionally uses only the first six entries as a preview.

The current images are original Wilton visual assets delivered through Manus project storage. To replace an image, upload the new asset to project storage and update only the relevant JSON `src` value.

## Order and reservation behavior

The cart is stored in browser `localStorage` under `wilton-cart`, so it survives refreshes without a database. The cart drawer supports quantity changes, subtotal, checkout fields and the exact delivery note: **Delivery within Sultan Bathery only.**

When a customer places an order, the browser opens a WhatsApp message to `+91 7902 564 444` and prepares a matching `mailto:` draft to the `site.json` email value. Room reserve buttons open WhatsApp to `7902 534 444` with a prefilled enquiry. There is no payment gateway.

## Routes and SEO

- `/` — Home
- `/menu` — searchable category menu with veg markers and cart actions
- `/about` — family story
- `/rooms` — rooms, facilities and WhatsApp enquiry form
- `/gallery` — 16-photo masonry gallery and lightbox
- `/contact` — NAP, feedback form, social links and map

`client/public/manus-routes.json` declares the route set for Webdev. `client/public/sitemap.xml` and `client/public/robots.txt` support crawler discovery. Restaurant and Hotel JSON-LD is emitted in `client/src/App.tsx`; the HTML template contains the title, description and Open Graph defaults.

## Design notes

- Headings use Playfair Display; body/UI uses Poppins.
- Primary colors: `#7A1E1E`, `#C9A24B`, `#FBF6EC`, `#2B2420`, `#D9622B`.
- Avoid adding old Google+ or generic Twitter links, or legacy typo variants such as “Hotel Witon” and “Sulthan Batheri”.
- Validate new content at 375px, 768px and 1280px before checkpointing.
