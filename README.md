# Cedar — Outlook-Native AI Sales Assistant for Prestige Import Group

Cedar is a high-fidelity, fully interactive frontend demo of an Outlook-native AI sales assistant custom-designed for **Prestige Import Group** (wholesale distributor of cigar humidors, electronic humidor cabinets, and cigar accessories selling to US retail stores).

---

## 🎯 The Three Core Workflows

1. **Group A: Inactive Customer Reactivation (90 / 180 / 240 Days)**
   - Reads historical QuickBooks order history (invoices, SKUs, and past quantities).
   - Generates personalized touchpoints referencing specific past purchases without mass-marketing jargon.
   - **Instant Stop on Reply:** Automatically halts the sequence the moment a customer responds.

2. **Group B: Post-Order Customer Care (~14 Days Post-Shipment)**
   - Triggers automatically ~14 days after warehouse shipment arrival.
   - Verifies condition and suggests complementary, in-stock catalog accessories (Spanish cedar dividers, digital brass hygrometers).
   - Enforces a 60-day lockout to prevent duplicate touches.

3. **Group C: Verified Retail Prospect Discovery**
   - Discovers US brick-and-mortar cigar lounges and tobacconists.
   - Deduplicates records against the active QuickBooks customer database.
   - Routes public email addresses into the Review Queue.
   - **Zero CAPTCHA Bypass:** Routes websites requiring CAPTCHAs to a clean daily manual list for 15-second human completion.

---

## 🛡️ Trust & Safety Controls

- **Official Microsoft Integration:** Direct Microsoft Graph delegated OAuth (never browser scraping). All sent messages originate from reps' real Outlook addresses and appear permanently in Sent Items.
- **Human Review-Before-Send Queue:** Every draft is presented with data provenance citations. A multi-layer pre-send validator blocks approval if unapproved discounts, duplicate sends, or DNC violations are detected.
- **Universal Emergency Pause:** Persistent top-bar control freezes all automated queues in one click.
- **Universal Do-Not-Contact (DNC):** One-click opt-outs and manual blacklist entries immediately suppress future touches across all reps.
- **Audit Ledger:** Immutable, reverse-chronological activity log recording every draft, send, reply, pause, and approval.

---

## 💻 Tech Stack & Architecture

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **State & Local Persistence:** Zustand with `localStorage` (`cedar-demo-v1`)
- **Real File Exports:** Dynamic CSV generation & lazy-loaded Excel (`.xlsx`) via SheetJS
- **Production Architecture (Recommended):**
  - Microsoft Graph API (Delegated OAuth per rep)
  - QuickBooks Connector (Read-only orders & invoices)
  - Cedar Python Worker (FastAPI background scheduler)
  - Supabase PostgreSQL (Audit ledger & contact database)
  - Optional n8n Workflow Engine

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

---

## 🌐 Netlify Deployment

This repository includes `netlify.toml` and `public/_redirects` configured for single-page application routing (`/* -> /index.html 200`).

- **Build command:** `npm run build`
- **Publish directory:** `dist`
