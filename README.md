# The Hidden Courtyard — Luxury Boutique Hotel & Homestay

A complete, fully functional, responsive boutique hotel website designed for **The Hidden Courtyard**, an intimate sanctuary located in Alibaug, Maharashtra.

---

## 🎨 Design Philosophy & Aesthetics

- **Color Palette:**
  - **Terracotta** (`#C86B4A`): Warm, earthy, evoking traditional clay tiles and pottery
  - **Olive Green** (`#5C6B4A`): Organic, calming, inspired by coastal orchards and foliage
  - **Soft Cream & Warm White** (`#F8F1E7` / `#FDFBF7`): Linen textures, unhurried daylight
  - **Subtle Gold Accents** (`#C9A84C`): Refined luxury and brass lantern warmth
  - **Espresso / Charcoal** (`#2C2621`): High-contrast readability and grounding tone
- **Typography:**
  - **Headings:** *Playfair Display* (Editorial luxury serif)
  - **Body Text:** *Plus Jakarta Sans* (Clean, legible modern sans-serif)
- **Visuals:** High-resolution photography of courtyards, plunge tubs, natural stone outdoor showers, organic dining, and starlit bonfires.

---

## 📁 Pages Included

1. **Home (`index.html`)**
   - Cinematic full-screen hero with property photography & atmospheric tagline
   - Interactive floating booking bar (Check-in, Check-out, Guests, Check Availability)
   - Property introduction & key heritage features
   - Featured Rooms preview with live "View Details" modal & "Book Now" actions
   - Curated Experiences preview
   - Interactive guest reviews & testimonials slider
   - Direct booking privileges CTA banner
   - Procedural Web Audio Nature Ambience Synthesizer toggle

2. **Rooms & Suites (`rooms.html`)**
   - Detailed showcase of all 4 handcrafted rooms:
     1. **Courtyard Room** (₹8,500/night)
     2. **Garden Suite** with Private Plunge Tub (₹12,500/night)
     3. **Heritage Room** with Four-Poster Teak Bed (₹10,500/night)
     4. **Family Suite** Multi-Room Villa (₹16,500/night)
   - Interactive **View Details Modal** with multi-angle gallery, specifications bar, amenities checklist, and highlights
   - Direct booking links that pre-populate the reservation engine

3. **Curated Experiences (`experiences.html`)**
   - 6 immersive guest experiences:
     1. Farm-to-Table Breakfast
     2. Guided Village Walk
     3. Yoga & Meditation Sessions
     4. Local Cooking Class
     5. Sunset Bonfire & Stargazing
     6. Spa & Ayurvedic Massage
   - Duration badges, schedules, included amenities, and direct concierge inquiry triggers

4. **Filterable Photo Gallery (`gallery.html`)**
   - 16 curated high-resolution boutique property photographs
   - Instant category filter tabs: *All, Rooms & Suites, Exterior & Courtyards, Dining & Culinary, Estate Experiences*
   - Fullscreen **Interactive Lightbox Modal** with Next/Prev arrow buttons, image counter, title captions, close button, and keyboard navigation (←, →, Esc)

5. **Location & Contact (`contact.html`)**
   - Detailed address: *Near River Bend Road, Alibaug, Maharashtra – 402201*
   - Phone (+91 98765 43212) and Email (stay@hiddencourtyard.in)
   - Operating hours (Reception, Check-in, Check-out, 24/7 Concierge)
   - **How to Reach Us** guide: Ro-Ro ferry from Mumbai (M2M Ferries), speedboats from Gateway of India, road routes from Pune, and airport distance
   - Embedded interactive map of Alibaug
   - Fully validated contact inquiry form with submission feedback

6. **Book Now Engine (`book.html`)**
   - Complete booking inquiry form with strict client-side validation
   - Fields: Full Name, Email, Phone, Check-in, Check-out, Number of Guests, Preferred Room, Special Requests
   - **Dynamic Live Pricing Sidebar**:
     - Calculates duration in nights
     - Calculates subtotal and 12% GST
     - Displays chosen room preview
     - Outlines complimentary direct-booking privileges
   - **Booking Success Modal**:
     - Generates official inquiry reference ID (e.g., `HC-849201`)
     - Displays summary of guest dates and room
     - One-click button to message concierge directly on WhatsApp with pre-filled reference number!

---

## ⚡ Interactive & Global Features

- **Sticky Navigation Bar:** Glassmorphism backdrop blur on scroll, active page indicators, and mobile drawer.
- **Mobile Menu Drawer:** Smooth slide-out from right with backdrop blur and touch-friendly links.
- **Floating WhatsApp Concierge Button:** Persistent bottom-right floating badge with hover tooltip connecting to:
  `https://wa.me/919876543212?text=Hello%20The%20Hidden%20Courtyard...`
- **Web Audio Nature Ambience Generator:** Procedural birdsong and wind whisper using the browser's native Web Audio API (zero audio file dependencies, instant playback).
- **Responsive Design:** Optimized for mobile phones (320px+), tablets, laptops, and ultra-wide desktop displays.

---

## 🚀 How to Run Locally

Because this project is built using modern standard HTML5, CSS3, and Vanilla JavaScript with no build steps or heavy node dependencies required:

1. Simply double-click **`index.html`** to open it directly in any modern web browser (Chrome, Edge, Safari, Firefox).
2. Or use any local static server of your choice:
   - VS Code "Live Server" extension
   - Or Python: `python -m http.server 8000`
   - Or Node `npx serve .`

---

© 2026 The Hidden Courtyard. All Rights Reserved.
