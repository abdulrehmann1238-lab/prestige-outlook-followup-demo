export const COPY = {
  hero: {
    h1: 'Every dormant account, followed up like a rep who remembers them.',
    support: "Cedar works inside your reps' own Outlook. It reads QuickBooks history, writes in your voice, stops the moment a customer replies, and never sends anything you haven't approved.",
    primaryCta: 'Open the live demo',
    secondaryCta: 'Watch a reply stop a sequence ↓',
  },
  proof: [
    { value: 30, suffix: ' / day', label: 'per rep, adjustable across business hours' },
    { value: 0, suffix: '', label: 'sends after a customer replies' },
    { value: 100, suffix: '%', label: 'drafts human-reviewable before send' },
    { value: 1, suffix: ' click', label: 'universal emergency pause for all sending' },
  ],
  section3: {
    title: 'Three groups. One quiet system.',
    subtitle: 'Built around the exact workflows of a wholesale humidor distributor.',
    steps: [
      {
        id: 'A',
        name: 'Group A: Inactive Accounts',
        badge: 'Reactivate Dormant Accounts',
        description: 'Pulls QuickBooks order history across 90, 180, or 240 days. Drafts personalized check-ins referencing past cabinet and humidor purchases, stopping instantly when the customer responds.',
      },
      {
        id: 'B',
        name: 'Group B: Recent Customers',
        badge: '14-Day Post-Order Care',
        description: 'Triggers automatically ~14 days after warehouse shipment. Confirms arrival, suggests complementary catalog accessories (dividers, hygrometers), and prevents repeat or duplicate touches.',
      },
      {
        id: 'C',
        name: 'Group C: New Retail Prospects',
        badge: 'Verified US Lounges & Tobacconists',
        description: 'Discovers verified US brick-and-mortar retail lounges, deduplicates against existing customers, routes to email or prepares contact forms—routing CAPTCHAs to a human morning list.',
      },
    ],
  },
  section4: {
    title: 'Written like a rep. Checked before it leaves.',
    subtitle: 'Every claim is grounded in QuickBooks, your real catalog, or verified business listings.',
  },
  safeguards: {
    title: 'Built to protect your reputation.',
    subtitle: 'Commercial tobacco-adjacent wholesale requires strict compliance and deliberate boundaries.',
    cards: [
      {
        title: 'Daily Rep Limits',
        description: 'Default 30 sends per day per rep, paced across 9:00 to 17:00 ET with randomized intervals.',
      },
      {
        title: 'Instant Stop on Reply',
        description: 'The moment an inbox receives a customer response, the automation halts and notifies the salesperson.',
      },
      {
        title: 'Universal Do-Not-Contact',
        description: 'One-click opt-outs and manual DNC entries immediately suppress all queued sends across every mailbox.',
      },
      {
        title: 'Emergency Pause Button',
        description: 'A single, persistent master button freezes every mailbox and queue in one click with zero data loss.',
      },
      {
        title: 'CAPTCHAs Go to a Person',
        description: 'Never bypasses or scripts CAPTCHAs. Forms requiring human attention are placed on a clean morning list.',
      },
      {
        title: 'Permanent Audit Trail',
        description: 'Immutable activity log of every generated draft, approval, sent email, and opt-out for full accountability.',
      },
    ],
  },
  architecture: {
    title: 'The simplest stack that stays reliable.',
    subtitle: 'No heavy enterprise CRM overhead. Runs on an office computer or lightweight private cloud.',
    components: [
      {
        name: 'QuickBooks Connector',
        tech: 'Read-only API / Desktop SDK',
        description: 'Reads customers, order dates, invoices, and shipment status. Never writes to accounting books.',
        cost: '$0 / mo (Uses existing account)',
      },
      {
        name: 'Cedar Worker',
        tech: 'Python 3.11 + FastAPI',
        description: 'Handles sequence scheduling, prompt grounding against catalog, and multi-layer pre-send checks.',
        cost: '$15 – $25 / mo (VPS or local PC)',
      },
      {
        name: 'Database & Audit Store',
        tech: 'Supabase (PostgreSQL)',
        description: 'Stores contacts, conversation threads, draft queues, DNC lists, and immutable activity logs.',
        cost: '$0 – $25 / mo (Generous tier)',
      },
      {
        name: 'Microsoft Graph (Outlook)',
        tech: 'Delegated OAuth 2.0',
        description: 'Sends legitimate emails through each rep’s real Outlook mailbox. All sent items appear in Sent folder.',
        cost: '$0 / mo (Included in M365)',
      },
      {
        name: 'n8n Scheduler (Optional)',
        tech: 'Self-hosted Workflow Engine',
        description: 'Visual cron triggers and Slack/email notifications for hot replies and daily review digests.',
        cost: '$0 / mo (Self-hosted open source)',
      },
      {
        name: 'GitHub Repository',
        tech: 'Private Git Repo',
        description: 'You own 100% of the clean, documented source code with setup guide and deployment scripts.',
        cost: '$0 / mo',
      },
    ],
  },
  delivery: {
    title: 'What you receive upon installation.',
    subtitle: 'A turnkey system installed on your hardware, not an ungrounded prototype.',
    items: [
      'Fully installed and tested system operating through your real Outlook accounts',
      'Direct read connection to your QuickBooks customer and invoice history',
      'Complete private source code repository in your own GitHub account',
      'Step-by-step administrator and sales rep documentation in plain English',
      'Live 1-on-1 staff training session for reps Marcus, Priya, and Tom',
      '30 days of direct post-launch monitoring, tuning, and prompt adjustments',
    ],
    phases: [
      { step: '01', title: 'Connect & Ground', desc: 'Link Outlook OAuth and read-only QuickBooks history.' },
      { step: '02', title: 'Review Mode', desc: 'Reps review 100% of generated drafts before sending.' },
      { step: '03', title: 'Pilot Run', desc: 'Reps approve drafts in under 5 minutes each morning.' },
      { step: '04', title: 'Controlled Autopilot', desc: 'Trusted templates send with pre-send checks and manual takeover.' },
    ],
  },
  emptyStates: {
    review: 'All caught up. Cedar will draft the next batch at 7:30 tomorrow.',
    pipelineSearch: 'No accounts match your search query. Try clearing filters.',
    attention: 'Nothing needs your attention right now. Next scheduled send is in 7 minutes.',
    manualList: "That's everyone for today. All manual contact forms have been completed.",
    activity: 'No activity matches the selected filters.',
  },
  toasts: {
    approved: 'Approved. Scheduled to send from Outlook (demo).',
    paused: 'Sending paused for all mailboxes. Nothing will go out until resumed.',
    resumed: 'Sending resumed across active mailboxes.',
    replied: "Daniela Ortiz replied: 'Yes, send me the new cabinet pricing' (Hot lead)",
    takeover: "You're handling this contact. Cedar stopped all automated messages.",
    dncAdded: 'Added to Do-Not-Contact. Queued messages suppressed immediately.',
    timingSaved: 'Sequence timing updated successfully.',
    voiceSaved: 'Voice instructions and prompt safeguards updated.',
  },
} as const;
