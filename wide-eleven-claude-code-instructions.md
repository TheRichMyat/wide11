# Wide-Eleven Website — Claude Code Instructions
# Read this ENTIRE document before making any changes.
# Project location: C:\Users\User\OneDrive\Desktop\wide-eleven

## PROJECT CONTEXT
This is a Next.js 14 website for Wide-Eleven Co., Ltd., an interior design & construction company in Bangkok, Thailand. 
- Frontend: Single React component at `components/Website.js` (all UI lives here)
- Backend: Next.js API routes at `app/api/*` connecting to Supabase (PostgreSQL)
- Auth: Supabase Auth with JWT tokens
- Email: Resend API (but contact form is being removed)
- Image uploads: Supabase Storage bucket called "images"
- Colors: Primary yellow `#ffc300`, fonts: Playfair Display (headings) + DM Sans (body)
- Translations: English + Thai stored in `TX` object in Website.js
- Admin access: via URL `/?panel=w11secure`, login with Supabase Auth email/password

---

## CHANGES NEEDED (in priority order)

### ⚠️ START WITH #11 (Auth Fix) — this blocks all admin operations.
### Then do the rest in order.

### 1. UPDATE SERVICES LIST (5 instead of 7)
**File:** `components/Website.js`
**What:** In the `TX` translations object, update `svc.items` for BOTH `en` and `th`:

English services should be exactly these 5:
1. Design (Perspective & Shop Drawing) & Space Planning — "Perspective & shop drawings, space planning and design consultation tailored to your vision."
2. Interior Fitting Out — "Full interior fit-out services for residential, commercial, hospitality and retail spaces."
3. Refurnishing Works — "Professional refurnishing and upgrading works to breathe new life into existing spaces."
4. MEP Works (Mechanical, Electrical, Plumbing) — "Mechanical, electrical and plumbing works carried out by trained in-house specialists."
5. Consultation & Budget Estimation — "Expert consultation, advice, and accurate budget estimation for renovation and construction projects of any scale."

Thai services should be the Thai translations of the same 5 services above. The current Thai translations for items 1, 3, 5, 6, 7 can be adapted. Remove "Costing" and "Building Maintenance" from both languages.

### 2. UPDATE PROJECT CATEGORIES
**File:** Run this SQL in Supabase SQL Editor to update categories:
```sql
DELETE FROM categories;
INSERT INTO categories (name) VALUES 
  ('Hotel Projects'),
  ('Office Projects'),
  ('Fitness Center Extension Projects');
```

**File:** `components/Website.js`
Update `DEF_CATS` array:
```javascript
const DEF_CATS = ["Hotel Projects", "Office Projects", "Fitness Center Extension Projects"];
```

### 3. REMOVE CONTACT FORM — REPLACE WITH CONTACT INFO ONLY
**File:** `components/Website.js`
In the Contact section (search for `id="contact"`):
- Remove the `CForm` component entirely from the contact section
- Remove the 2-column grid layout
- Instead, display contact info centered:
  - Office address: 8/110 Soi Thian Talay 7 (Soi Tientalay 7), Bang Khun Thian, Bangkok 10150
  - Phone: 02-409-2308
  - Email: wide11bangkok@gmail.com
- Style it clean and centered, matching the minimalist design
- The `CForm` function can remain in the code (unused) or be deleted
- Also remove or keep the `app/api/contact/route.js` file — it won't be used anymore

Update both EN and TH translations in the `ct` object to remove form-related labels (fn, fe, fp, fm, sn, st, sg).

### 4. ADD FLOATING CHAT WIDGET (LINE + WhatsApp)
**File:** `components/Website.js`
Add a floating chat widget at the bottom-right corner of the screen. It should:
- Show a small circular button (chat icon) at bottom-right
- When clicked, expand to show 2 options: LINE and WhatsApp
- Each option has an icon and label
- LINE button: links to `https://line.me/ti/p/PLACEHOLDER_LINE_ID` (will be updated later with real LINE URL/QR)
- WhatsApp button: links to `https://wa.me/6624092308` (company phone with Thailand country code)
- The widget should float above everything (high z-index)
- Use the yellow (#ffc300) accent color
- Smooth open/close animation
- Must work on both mobile and desktop
- Should appear on ALL pages (home, portfolio, project detail) but NOT on admin panel

Add this as a new component (e.g., `ChatWidget`) and include it in the main App return, outside the page-specific content but inside the wrapper div. Do NOT show it when `page === "admin"`.

### 5. ADD "PERIOD" FIELD TO PROJECTS
**File:** `components/Website.js`
- Add `period` field to project data model
- In the admin form, add a "Period" input field (e.g., "Jan 2023 — Mar 2023") after the Year field
- Display period in the project detail page meta grid
- Display period in portfolio cards
- Add translations: EN: "Period", TH: "ระยะเวลา"
- Update `startNew` default to include `period: ""`

**File:** `app/api/projects/route.js` and `app/api/projects/[id]/route.js`
- Add `period` to the insert and update fields

**Database:** Run in Supabase SQL Editor:
```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS period TEXT DEFAULT '';
```

### 6. BEFORE/AFTER IMAGE FEATURE FOR PROJECTS
**File:** `components/Website.js`
The client wants before/after comparison images in project galleries. 

Add to the project admin form:
- A new section "Before/After Images" below the gallery
- Two upload slots per pair: "Before" image and "After" image
- Support up to 5 before/after pairs
- Store as an array field `before_after` in the project: `[{before: "url", after: "url"}, ...]`

Add to the project detail page:
- Below the main gallery, show a "Before & After" section
- Display each pair as a side-by-side comparison OR an interactive slider where the user can drag left/right to reveal before vs after
- A simple side-by-side with labels "Before" and "After" is acceptable if the slider is too complex

**Database:** Run in Supabase SQL Editor:
```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS before_after JSONB DEFAULT '[]';
```

**Files:** `app/api/projects/route.js` and `app/api/projects/[id]/route.js`
- Add `before_after` to insert and update operations

### 7. FIX: LOGO SIZE ON MOBILE
**File:** `components/Website.js`
Find the nav logo text (search for `WIDE-ELEVEN CO., LTD.` in the nav section). 
The logo text is currently `fontSize: "1.1rem"` with the W at `fontSize: "1.35rem"`.
Add a responsive style or reduce it for mobile. 

The simplest fix: wrap the logo text and add a CSS class, then in the media query reduce font size. OR use `clamp()`:
```javascript
fontSize: "clamp(0.75rem, 2.5vw, 1.1rem)"
```
And for the large W:
```javascript
fontSize: "clamp(0.9rem, 3vw, 1.35rem)"
```

### 8. FIX: REMOVE 12+ YEARS BADGE FROM ABOUT SECTION
**File:** `components/Website.js`
In the About section, find the gold badge overlay on the about image:
```javascript
<div style={{ position: "absolute", bottom: "-1.2rem", right: "-1.2rem", background: YELLOW, padding: "1.2rem 1.8rem", borderRadius: 10 }}>
```
Delete this entire `<div>` block (the badge with "12+" and "Years of Excellence"). Both the div and its children.

Also remove the `position: "relative"` from the parent wrapper of the about image if it's only there for the badge positioning. Actually, keep `position: "relative"` — it doesn't hurt.

### 9. FIX: PROJECT DETAIL GALLERY — FULL-WIDTH IMAGES WITH SLIDER
**File:** `components/Website.js`
In the `ProjDetail` component, the current gallery shows:
- A main image at fixed height (420px) with `objectFit: "cover"` — this crops images
- Thumbnail strip below

Replace with:
- Main image should be `width: "100%"`, `height: "auto"`, NO fixed height, so the full image is visible
- Add left/right arrow buttons overlaid on the main image for navigation
- Arrow buttons: semi-transparent black circles with white arrows, positioned at vertical center
- Clicking left/right changes the active image
- On mobile: also support swipe gestures if possible (optional, arrows are sufficient)
- Keep the thumbnail strip below but make it horizontally scrollable on mobile
- Remove the `borderRadius: 10` on the main image for a cleaner full-width look, OR keep a small radius — your choice

### 10. FIX: PORTFOLIO CARDS NOT CENTERED ON MOBILE
**File:** `components/Website.js`
In the `AllProjects` component, the portfolio grid uses:
```javascript
gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
```
On mobile screens narrower than 300px, this can cause alignment issues. Change to:
```javascript
gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))"
```

Also check the same grid in the homepage portfolio section (the 3-card grid with className `pgr`). Make sure the responsive class `.pgr` in the CSS/media query forces `grid-template-columns: 1fr !important` on mobile. This should already exist in `app/globals.css` — verify it's there.

### 11. FIX: ADMIN "UNAUTHORIZED" ERROR (CRITICAL — DO THIS FIRST)
The admin panel returns "Unauthorized" when trying to create/edit clients, projects, or upload images. The root cause is in `lib/auth.js` — the `verifyAdmin` function uses `createServerClient()` (service role) to call `getUser(token)`, but this doesn't validate JWT tokens properly.

**File:** `lib/auth.js`
Replace the ENTIRE file contents with:
```javascript
import { createClient } from '@supabase/supabase-js';

export async function verifyAdmin(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  
  // Use anon key client to verify the user's JWT token
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
```

This creates a Supabase client with the user's JWT token injected as the auth header, then calls `getUser()` which properly validates the token against Supabase Auth.

**Also check:** `lib/api-client.js` — make sure the `getToken()` function reads from the correct localStorage key `we_session`. Open browser DevTools > Application > Local Storage and verify that after admin login, a `we_session` key exists with an `access_token` property.

### 12. FIX: MOBILE ALIGNMENT — CONTENT TOO LEFT-ALIGNED
**File:** `components/Website.js`
Multiple sections have `padding: "0 4%"` or `padding: "5.5rem 4%"` which on small mobile screens (320px-375px) leaves very little left padding and text appears pushed to the left edge.

**Fix ALL section padding** — search for every instance of `4%` in padding values and change to `6%`:
- Hero section: `padding: "0 6%"` 
- Stats section: `padding: "4rem 6%"`
- About section: `padding: "5.5rem 6%"`
- Clients section: `padding: "4.5rem 6%"`
- Services section: `padding: "5.5rem 6%"`
- Portfolio section: `padding: "5.5rem 6%"`
- Contact section: `padding: "5.5rem 6%"`
- Footer: `padding: "3rem 6% 1.5rem"`
- Nav: `padding: "0.7rem 6%"`
- AllProjects page: all `padding: "0 6%"` instances
- ProjDetail page: `padding: "7rem 6% 4rem"`

**Additionally**, for the hero text and about text, on mobile the text should be centered. Add to `app/globals.css`:
```css
@media (max-width: 768px) {
  #home > div:nth-child(2) {
    text-align: center;
    padding-top: 3rem;
  }
  #home h1, #home p {
    text-align: center;
  }
  #home button {
    margin: 0 auto;
  }
}
```

**Also ensure** that all text in sections has adequate left/right padding on mobile. The grid sections (about, contact) should stack to single column on mobile — verify that the CSS class `.hgr`, `.cgr` etc. have `grid-template-columns: 1fr !important` in the mobile media query in `app/globals.css`.

### 12. CLIENT SLIDESHOW — SMOOTH MARQUEE
**File:** `components/Website.js`
The current `Carousel` component uses a page-based slideshow. Replace it with a smooth infinite marquee:

Replace the entire `function Carousel` with:
```javascript
function Carousel({ clients, c }) {
  if (!clients.length) return null;
  const doubled = [...clients, ...clients];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div style={{
        display: "flex", gap: "2.5rem",
        animation: "marquee " + (clients.length * 4) + "s linear infinite",
        width: "max-content"
      }}>
        {doubled.map((cl, i) => (
          <div key={cl.id + "-" + i} style={{ flex: "0 0 180px", textAlign: "center" }}>
            <div style={{
              height: 80, border: "1px solid " + c.border, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: ".8rem", background: c.bg2, overflow: "hidden"
            }}>
              <img src={cl.logo} alt={cl.name} style={{
                maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
                filter: "grayscale(100%)", transition: "filter .3s"
              }}
                onMouseEnter={e => { e.target.style.filter = "none"; }}
                onMouseLeave={e => { e.target.style.filter = "grayscale(100%)"; }}
                onError={e => { e.target.style.display = "none"; }}
              />
            </div>
            <div style={{
              fontSize: "0.65rem", color: c.text3, marginTop: ".4rem",
              letterSpacing: "1px", textTransform: "uppercase"
            }}>{cl.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

NOTE: This `<style>` tag inside the Carousel might cause hydration errors in Next.js. If it does, move the `@keyframes marquee` rule into `app/globals.css` instead and remove the `<style>` tag from the component.

---

## IMPORTANT NOTES FOR CLAUDE CODE

1. **Do NOT delete or modify** the following files unless specifically instructed:
   - `lib/supabase-server.js`
   - `lib/supabase-browser.js`
   - `lib/auth.js`
   - `middleware.js`
   - `.env.local`
   - `scripts/*`

2. **All UI changes** are in `components/Website.js` — this is the single main component file.

3. **API routes** are in `app/api/*/route.js` — only modify these for adding new fields (period, before_after).

4. **Translations** — every text change must be updated in BOTH English (`TX.en`) and Thai (`TX.th`) inside `components/Website.js`.

5. **Test after each change** — run `npm run dev` and check `http://localhost:3000` after each major change.

6. **Database changes** — any new columns must be added via Supabase SQL Editor (provide the SQL to the user). Claude Code cannot directly modify the Supabase database.

7. **The admin panel** is accessed via `http://localhost:3000/?panel=w11secure` — there is NO admin link on the public website.

8. **Hydration errors** — do NOT use `<style>` tags inside React components. Put all CSS in `app/globals.css` instead.

9. When the user mentions the floating chat widget LINE URL, use `https://line.me/ti/p/PLACEHOLDER` as placeholder until they provide the real one.
