# Wilton Restaurant & Hotel — Implementation Todo

## Gate 1 — Home page for approval

- [x] Create a modern, fast, mobile-first Wilton Restaurant & Hotel website for Sultan Bathery, Wayanad, Kerala, using Wilton's own content, branding, colors, and original imagery; do not copy Paragon logos, text, or images.
- [x] Use the warm Wilton palette: deep maroon `#7A1E1E`, gold `#C9A24B`, cream `#FBF6EC`, charcoal `#2B2420`, and spice orange `#D9622B`; use Playfair Display for headings and Poppins for body text; use pill buttons, rounded 12px cards, soft shadows, fade-up reveals, and gold underline ornaments.
- [x] Implement the top utility strip with Take Away `7902 564 444` and Room Reservation `7902 534 444`; implement transparent-on-hero and solid-cream-after-scroll header behavior; include Menu, About, Rooms, Gallery, Contact, Order Now, and cart count; include a sticky mobile bottom bar with Call, Order Now, and Book Room.
- [x] Implement an accessible 5-slide hero carousel with 5-second autoplay, progress bar, dark gradient overlay, pause/next/previous controls, reduced-motion behavior, and these CTAs: “We Have Recipes In Our DNA” → About; “Mandi, Biriyani & Beyond” → Menu; “Dine on Our Rooftop” → Gallery; “Stay With Us in Sultan Bathery” → Rooms; “Take Away in Minutes” → Order.
- [x] Include floating quick buttons for Order Now, Reserve a Room, and Contact.
- [x] Implement the About section with image left, text right, heading “Recipes in Our DNA”, the condensed family legacy story referencing late Neeliyath Hassan Haji, Thoufeeq Hotel Meenangadi, and two decades as a top restaurant in Sultan Bathery, plus a “Read Our Story” link to `/about`.
- [x] Implement editable Special Offers data and a horizontal card slider with image, name, proposed price, and Add to Cart for Mezze Platter `260`, Chicken Mandi (Half) `340`, Mutton Mandi (Half) `410`, Chicken Biriyani `150`, Tandoori Chicken (Qtr) `130`, Vegetable Fried Rice `140`, Honey Glazed Chicken `290`, and Navratan Pulao `200`; mark prices as proposed until Wilton confirms them.
- [x] Implement the menu-category card grid with hover zoom and overlay links for Mandi, Biriyani & Rice, Tandoor & Grills, Arabic & Mezze, Chinese, Kerala Specials, Veg, and Desserts & Beverages.
- [x] Implement the Why Wilton / Facilities icon grid for Private Party/Celebration Area, Roof Top Restaurant, Multi-Cuisine Restaurant, A/c Rooms, 24-hour Check-In/Out, Free High-Speed Wi-Fi, On-site Covered Parking, and 24-hour Security.
- [x] Implement the rooms teaser with three room cards, Reserve buttons that open WhatsApp to `7902 534 444` with a prefilled message, and a simple enquiry form.
- [x] Implement a lazy-loaded gallery preview with lightbox-ready behavior, a testimonials/TripAdvisor strip with three labelled placeholders and badge/link placeholder, a Contact section with feedback fields, map embed area, hours, and click-to-call numbers, and a maroon footer with quick links, menu links, NAP, social icons for Facebook/Instagram/YouTube/TripAdvisor only, and `© Wilton Restaurant`.
- [x] Implement browser-persisted cart state, cart count, item quantity controls, subtotal, grand total, and a slide-in cart drawer; do not add a payment gateway.
- [x] Ensure the checkout experience shows exactly “Delivery within Sultan Bathery only.” and collects name, phone, Sultan Bathery address, and notes.
- [x] Implement order handoff that opens a formatted WhatsApp message to `+91 7902 564 444` and a matching email draft; keep restaurant email/social URLs in editable configuration placeholders until Wilton supplies real values.

## Gate 2 — Remaining site and quality

- [x] Add `/menu` with category tabs, search, veg/non-veg marker, price, and Add to Cart; add `/about`, `/rooms`, `/gallery`, and `/contact` routes.
- [x] Add full menu, offers, gallery, facilities, rooms, and site content as JSON files for easy editing; include README instructions for editing menu, offers, gallery, facilities, social links, email, and prices.
- [x] Add the full 16-photo lazy-loaded masonry gallery with accessible lightbox.
- [x] Add Restaurant and Hotel schema.org JSON-LD, Open Graph tags, sitemap, robots behavior, descriptive alt text, and Google Business-friendly NAP.
- [x] Remove old typo variants such as “Hotel Witon” and “Sulthan Batheri”; do not include old Google+ or generic Twitter links.
- [x] Keep the public site static/SSR-ready and optimize images for Core Web Vitals with compressed WebP/AVIF assets and lazy loading below the fold.
- [x] Verify responsive behavior at 375px, 768px, and 1280px, including accessible carousel and forms, no overflow, readable hero copy, functional mobile bottom bar, cart persistence, quantity updates, WhatsApp/email payloads, and room reservation prefill.
- [x] Add and keep `/manus-routes.json` synchronized with all routes before starting the dev server.
- [x] Set a quoted project-root `logoUrl` literal in `app.config.ts` before checkpointing; checkpoint intended changes to the canonical Webdev Git remote; publish only if explicitly requested later.
