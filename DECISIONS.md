# Cedar Implementation Decisions & Alignment

This document records key decisions made in implementing the Cedar demo for Prestige Import Group, aligned with Section 3 and Section 4 of the PRD.

1. **Brand & Identity**:
   - Product name: "Cedar" (reflecting Spanish cedar lining cigar humidors).
   - Client name: "Prestige Import Group" presented with an understated, typographic wordmark (Fraunces + brass dot).
   - Domain: `.example` fictional TLD used for all email addresses to guarantee safety.

2. **Design System & Visual Language**:
   - Direction: "A well-run tobacconist's back office."
   - Colors: Parchment background (`#F6F2EA`), Cedar Green primary (`#2F4A3F`), Brass accent (`#B08D57`), Tobacco secondary (`#7A4E2D`), Sunken canvas (`#EFE9DD`), Raised surfaces (`#FFFFFF`).
   - Group identity colors: Group A Inactive (`#7A4E2D`), Group B Recent (`#3F7D58`), Group C Prospects (`#3D6A8A`).
   - Strict ban on neon, purple/blue tech gradients, glassmorphism, floating blobs, and dark mode (out of scope per brief).
   - Fonts: Google Fonts `Fraunces` (headings, display, KPI digits) and `Instrument Sans` (body and UI labels).

3. **State & Mock Backend**:
   - Local state engine: Zustand with `localStorage` persistence under key `cedar-demo-v1`.
   - Seeded deterministic generation using mulberry32 (seed 4128) for 1,736 accounts (412 Group A, 38 Group B, 1,286 Group C) plus 22 hand-curated hero records.
   - Paced async mock API with realistic latency (350–900ms) simulating Outlook OAuth, QuickBooks sync, and discovery runs.
   - Fail-next and network error simulation via Demo Controls.

4. **Safety & Guardrails**:
   - Pre-send checks: Do-Not-Contact check, 30-day duplicate send guard, daily rep limits, non-approved discount detector, opt-out footer check.
   - Reply detection halts sequence and triggers rep takeover.
   - Contact form automation detects CAPTCHAs and routes them strictly to the daily manual human list—no automated CAPTCHA bypassing.
   - Persistent Emergency Pause control in top navigation freezing all sending queues.
