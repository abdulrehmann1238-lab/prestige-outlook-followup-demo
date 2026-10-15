import { mulberry32, CITIES, PREFIXES, SUFFIXES, FIRST_NAMES, LAST_NAMES } from './generators';
import { INITIAL_PRODUCTS } from './catalog';

export type ContactStatus = 
  | 'draft_ready'
  | 'in_sequence'
  | 'replied'
  | 'needs_person'
  | 'paused'
  | 'dnc'
  | 'converted'
  | 'rep_handling';

export type ContactRoute = 'email' | 'form' | 'phone' | 'excluded';

export interface Note {
  id: string;
  author: string;
  createdAt: string;
  text: string;
}

export interface Message {
  id: string;
  sender: 'rep' | 'customer' | 'system';
  authorName: string;
  timestamp: string;
  subject: string;
  body: string;
  isDraft?: boolean;
  isSentFromOutlook?: boolean;
  approvedBy?: string;
  status?: 'queued' | 'sent' | 'cancelled_reply' | 'cancelled_dnc' | 'cancelled_takeover';
}

export interface OrderItem {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  date: string;
  shippedDate?: string;
  total: number;
  items: OrderItem[];
  status: 'shipped' | 'delivered' | 'processing';
}

export interface TimelineEvent {
  id: string;
  type: 'order_shipped' | 'email_sent' | 'email_queued' | 'email_cancelled' | 'reply_received' | 'rep_takeover' | 'note_added' | 'form_submitted' | 'paused' | 'dnc_added';
  timestamp: string;
  title: string;
  description: string;
  statusBadge?: string;
  cancelled?: boolean;
  cancellationReason?: string;
  metadata?: Record<string, any>;
}

export interface Contact {
  id: string;
  business: string;
  contactName?: string;
  email?: string;
  group: 'A' | 'B' | 'C';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  website?: string;
  contactUrl?: string;
  source?: {
    label: string;
    url: string;
    verified: 'verified' | 'partial' | 'unverified';
  };
  lastOrder?: string;
  lastOrderDaysAgo?: number;
  lastEmail?: string;
  followUpsSent: number;
  followUpsMax: number;
  status: ContactStatus;
  replied: boolean;
  repliedDate?: string;
  replySnippet?: string;
  nextFollowUp?: string;
  repId: string;
  route?: ContactRoute;
  exclusionReason?: string;
  notes: Note[];
  messages: Message[];
  orders: Order[];
  timeline: TimelineEvent[];
  wholesaleAccountStatus?: 'not_created' | 'invited' | 'active';
  wholesaleInviteExpires?: string;
  formStatus?: 'eligible' | 'needs_person' | 'not_allowed';
}

export interface Draft {
  id: string;
  contactId: string;
  recipientBusiness: string;
  recipientEmail: string;
  group: 'A' | 'B' | 'C';
  repId: string;
  scheduledTime: string;
  approach: 'brief_intro' | 'wholesale_pricing' | 'new_merchandise' | 'question';
  subject: string;
  body: string;
  groundedPhrases: { text: string; source: string }[];
  recommendationProductIds: string[];
  whyThisDraft: {
    relationshipSummary: string;
    lastPurchase: string;
    lastContact: string;
    rulesApplied: string[];
  };
  preSendChecks: {
    id: string;
    label: string;
    passed: boolean;
    reason?: string;
    fixLink?: string;
  }[];
}

export interface AttentionItem {
  id: string;
  contactId?: string;
  title: string;
  detail: string;
  tag: 'Interested' | 'CAPTCHA' | 'Blocked' | 'Bounce' | 'Review';
  type: 'reply' | 'captcha' | 'blocked_draft' | 'bounce' | 'review';
  ctaLabel: string;
  actionUrl: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  actor: 'Cedar' | 'Marcus Delgado' | 'Priya Raman' | 'Tom Eriksen' | 'System';
  action: string;
  contactBusiness: string;
  detail: string;
  type: 'sent' | 'reply' | 'pause' | 'edit' | 'opt_out' | 'form' | 'takeover';
}

// 22 Curated Hero Records
export const HERO_CONTACTS: Contact[] = [
  // 1. Old Ember Cigar Lounge (Hero Record #1: Austin, TX, Group A)
  {
    id: 'contact-old-ember',
    business: 'Old Ember Cigar Lounge',
    contactName: 'Daniela Ortiz',
    email: 'daniela@oldembercigars.example',
    group: 'A',
    address: '412 Congress Ave',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    phone: '(512) 555-0192',
    website: 'https://oldembercigars.example',
    lastOrder: '2026-03-12',
    lastOrderDaysAgo: 215,
    lastEmail: '2026-10-09',
    followUpsSent: 1,
    followUpsMax: 4,
    status: 'replied',
    replied: true,
    repliedDate: '2026-10-13T09:41:00-04:00',
    replySnippet: 'Yes, send me the new cabinet pricing',
    nextFollowUp: '2026-10-16',
    repId: 'marcus',
    route: 'email',
    notes: [
      {
        id: 'n-1',
        author: 'Marcus Delgado',
        createdAt: '2026-03-12',
        text: 'Met Daniela at TPE trade show. Loves our Spanish cedar build quality. Focuses on premium boutique sticks.'
      }
    ],
    messages: [
      {
        id: 'm-1',
        sender: 'rep',
        authorName: 'Marcus Delgado',
        timestamp: '2026-10-09 10:14 AM',
        subject: 'Checking in on the Oak humidors',
        body: "Hi Daniela,\n\nIt's Marcus at Prestige. It's been a while since your March order of the Oak 150-ct humidors and the Ember cabinet, and I wanted to see how they've been doing on your floor. Are they still selling well for you?\n\nWe also have a new line of Ember cabinets arriving that pairs well with what you ordered, and I'm happy to send the wholesale price sheet if you'd like to take a look.\n\nBest,\nMarcus",
        isSentFromOutlook: true,
        approvedBy: 'Marcus Delgado',
        status: 'sent'
      },
      {
        id: 'm-2',
        sender: 'customer',
        authorName: 'Daniela Ortiz',
        timestamp: '2026-10-13 09:41 AM',
        subject: 'Re: Checking in on the Oak humidors',
        body: 'Hi Marcus,\n\nGood to hear from you. The Oak humidors moved fast during Father\'s Day, and we have one cabinet left on the display floor. Yes, send me the new cabinet pricing—we might need 2 more before November.\n\nThanks,\nDaniela',
        status: 'sent'
      }
    ],
    orders: [
      {
        id: 'ord-4128',
        invoiceNumber: 'INV-4128',
        date: '2026-03-12',
        shippedDate: '2026-03-14',
        total: 710.00,
        status: 'delivered',
        items: [
          { sku: 'HM-150-OAK', name: 'Oak 150-ct Humidor', qty: 2, price: 185.00 },
          { sku: 'EC-040-EMB', name: 'Ember 40-ct Electronic Cabinet', qty: 1, price: 340.00 }
        ]
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        type: 'order_shipped',
        timestamp: '2026-03-14 02:30 PM',
        title: 'QuickBooks Invoice #4128 Shipped',
        description: '2 × Oak 150-ct Humidor, 1 × Ember 40-ct Electronic Cabinet ($710.00)'
      },
      {
        id: 'tl-2',
        type: 'email_sent',
        timestamp: '2026-10-09 10:14 AM',
        title: 'Email 1 Sent from Outlook (Marcus)',
        description: 'Personalized reactivation referencing March order and Ember cabinets'
      },
      {
        id: 'tl-3',
        type: 'reply_received',
        timestamp: '2026-10-13 09:41 AM',
        title: 'Customer Replied (Hot Lead)',
        description: '"Yes, send me the new cabinet pricing" — Sequence halted automatically',
        statusBadge: 'Hot Lead'
      },
      {
        id: 'tl-4',
        type: 'email_cancelled',
        timestamp: '2026-10-13 09:41 AM',
        title: 'Follow-up Step 2 Cancelled',
        description: 'Stopped: customer replied. No further automated emails will be sent.',
        cancelled: true,
        cancellationReason: 'customer_replied'
      },
      {
        id: 'tl-5',
        type: 'email_cancelled',
        timestamp: '2026-10-13 09:41 AM',
        title: 'Follow-up Step 3 Cancelled',
        description: 'Stopped: customer replied.',
        cancelled: true,
        cancellationReason: 'customer_replied'
      }
    ],
    wholesaleAccountStatus: 'active'
  },

  // 2. Hartwell & Finch Tobacconists (Savannah, GA, Group A - Fails check)
  {
    id: 'contact-hartwell',
    business: 'Hartwell & Finch Tobacconists',
    contactName: 'Graham Hartwell',
    email: 'graham@hartwellfinch.example',
    group: 'A',
    address: '18 Bull St',
    city: 'Savannah',
    state: 'GA',
    zip: '31401',
    phone: '(912) 555-0144',
    website: 'https://hartwellfinch.example',
    lastOrder: '2026-01-29',
    lastOrderDaysAgo: 257,
    lastEmail: '2026-01-29',
    followUpsSent: 0,
    followUpsMax: 4,
    status: 'draft_ready',
    replied: false,
    nextFollowUp: '2026-10-13',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [
      {
        id: 'ord-3992',
        invoiceNumber: 'INV-3992',
        date: '2026-01-29',
        shippedDate: '2026-01-31',
        total: 420.00,
        status: 'delivered',
        items: [
          { sku: 'TC-025-SBL', name: 'Sable 25-ct Travel Case', qty: 10, price: 42.00 }
        ]
      }
    ],
    timeline: [
      {
        id: 'tl-hf-1',
        type: 'order_shipped',
        timestamp: '2026-01-31 11:00 AM',
        title: 'QuickBooks Invoice #3992 Delivered',
        description: '10 × Sable 25-ct Travel Case ($420.00)'
      },
      {
        id: 'tl-hf-2',
        type: 'email_queued',
        timestamp: '2026-10-13 08:30 AM',
        title: 'Draft Generated by Cedar (Blocked)',
        description: 'Pre-send check flagged unapproved discount text (10% off). Approval blocked.'
      }
    ]
  },

  // 3. Cedar Row Cigars (Louisville, KY, Group A)
  {
    id: 'contact-cedar-row',
    business: 'Cedar Row Cigars',
    contactName: 'Julian Vance',
    email: 'julian@cedarrowcigars.example',
    group: 'A',
    address: '734 W Main St',
    city: 'Louisville',
    state: 'KY',
    zip: '40202',
    phone: '(502) 555-0188',
    lastOrder: '2026-04-22',
    lastOrderDaysAgo: 174,
    lastEmail: '2026-10-06',
    followUpsSent: 2,
    followUpsMax: 4,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-16',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [
      {
        id: 'ord-4190',
        invoiceNumber: 'INV-4190',
        date: '2026-04-22',
        shippedDate: '2026-04-24',
        total: 570.00,
        status: 'delivered',
        items: [
          { sku: 'HM-150-OAK', name: 'Oak 150-ct Humidor', qty: 2, price: 185.00 },
          { sku: 'AC-HYG-BRS', name: 'Digital Brass Hygrometer', qty: 10, price: 20.00 }
        ]
      }
    ],
    timeline: [
      {
        id: 'tl-cr-1',
        type: 'email_sent',
        timestamp: '2026-10-06 11:20 AM',
        title: 'Step 1 Sent from Outlook',
        description: 'Reactivation touchpoint referencing April order'
      },
      {
        id: 'tl-cr-2',
        type: 'email_queued',
        timestamp: '2026-10-16 10:30 AM',
        title: 'Step 2 Scheduled',
        description: 'Next follow-up in sequence'
      }
    ]
  },

  // 4. Marlow's Pipe & Leaf (Richmond, VA, Group A - Paused)
  {
    id: 'contact-marlows',
    business: "Marlow's Pipe & Leaf",
    contactName: 'Arthur Marlow',
    email: 'arthur@marlowspipe.example',
    group: 'A',
    address: '112 E Franklin St',
    city: 'Richmond',
    state: 'VA',
    zip: '23219',
    phone: '(804) 555-0131',
    lastOrder: '2026-01-09',
    lastOrderDaysAgo: 277,
    followUpsSent: 1,
    followUpsMax: 4,
    status: 'paused',
    replied: false,
    repId: 'priya',
    route: 'email',
    notes: [
      {
        id: 'n-mp-1',
        author: 'Priya Raman',
        createdAt: '2026-10-10',
        text: 'Paused temporarily while Arthur is renovating their downtown humidor room.'
      }
    ],
    messages: [],
    orders: [],
    timeline: [
      {
        id: 'tl-mp-1',
        type: 'paused',
        timestamp: '2026-10-10 03:15 PM',
        title: 'Sequence Paused by Priya',
        description: 'Manual pause initiated by rep'
      }
    ]
  },

  // 5. Blackwater Cigar Co. (Tampa, FL, Group B - Ready 14 days after shipment)
  {
    id: 'contact-blackwater',
    business: 'Blackwater Cigar Co.',
    contactName: 'Ray Delgado',
    email: 'ray@blackwatercigar.example',
    group: 'B',
    address: '1604 E 7th Ave',
    city: 'Tampa',
    state: 'FL',
    zip: '33605',
    phone: '(813) 555-0199',
    lastOrder: '2026-09-29',
    lastOrderDaysAgo: 14,
    followUpsSent: 0,
    followUpsMax: 2,
    status: 'draft_ready',
    replied: false,
    nextFollowUp: '2026-10-13',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [
      {
        id: 'ord-4311',
        invoiceNumber: 'INV-4311',
        date: '2026-09-29',
        shippedDate: '2026-09-29',
        total: 285.00,
        status: 'delivered',
        items: [
          { sku: 'HM-075-GLT', name: 'Cedar Glass-Top 75-ct', qty: 3, price: 95.00 }
        ]
      }
    ],
    timeline: [
      {
        id: 'tl-bw-1',
        type: 'order_shipped',
        timestamp: '2026-09-29 04:00 PM',
        title: 'QuickBooks Invoice #4311 Shipped',
        description: '3 × Cedar Glass-Top 75-ct ($285.00)'
      },
      {
        id: 'tl-bw-2',
        type: 'email_queued',
        timestamp: '2026-10-13 08:30 AM',
        title: 'Day 14 Post-Order Check-in Drafted',
        description: 'Checking on Glass-Top shipment arrival with Spanish Cedar divider recommendations'
      }
    ]
  },

  // 6. Bishop & Sons Tobacco (Columbus, OH, Group B)
  {
    id: 'contact-bishop',
    business: 'Bishop & Sons Tobacco',
    contactName: 'Evan Bishop',
    email: 'evan@bishopandsonstobacco.example',
    group: 'B',
    address: '240 N High St',
    city: 'Columbus',
    state: 'OH',
    zip: '43215',
    phone: '(614) 555-0122',
    lastOrder: '2026-10-02',
    lastOrderDaysAgo: 11,
    followUpsSent: 0,
    followUpsMax: 2,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-16',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [
      {
        id: 'ord-4320',
        invoiceNumber: 'INV-4320',
        date: '2026-10-02',
        shippedDate: '2026-10-02',
        total: 510.00,
        status: 'delivered',
        items: [
          { sku: 'EC-040-EMB', name: 'Ember 40-ct Electronic Cabinet', qty: 1, price: 340.00 },
          { sku: 'HM-150-OAK', name: 'Oak 150-ct Humidor', qty: 1, price: 170.00 }
        ]
      }
    ],
    timeline: [
      {
        id: 'tl-bs-1',
        type: 'order_shipped',
        timestamp: '2026-10-02 02:00 PM',
        title: 'Shipped from Doral Warehouse',
        description: 'Invoice #4320 delivered Oct 4'
      }
    ]
  },

  // 7. Harbor Light Smoke Shop (Portland, ME, Group B)
  {
    id: 'contact-harbor-light',
    business: 'Harbor Light Smoke Shop',
    contactName: 'Nate Sterling',
    email: 'nate@harborlightsmokes.example',
    group: 'B',
    address: '88 Commercial St',
    city: 'Portland',
    state: 'ME',
    zip: '04101',
    phone: '(207) 555-0176',
    lastOrder: '2026-10-06',
    lastOrderDaysAgo: 7,
    followUpsSent: 0,
    followUpsMax: 2,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-20',
    repId: 'priya',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 8. Lone Star Humidor Room (San Antonio, TX, Group C - Draft Ready)
  {
    id: 'contact-lone-star',
    business: 'Lone Star Humidor Room',
    contactName: 'Carlos Morales',
    email: 'carlos@lonestarhumidor.example',
    group: 'C',
    address: '315 E Commerce St',
    city: 'San Antonio',
    state: 'TX',
    zip: '78205',
    phone: '(210) 555-0193',
    website: 'https://lonestarhumidor.example',
    source: {
      label: 'Business Website & TX Retail Directory',
      url: 'https://lonestarhumidor.example/about',
      verified: 'verified'
    },
    followUpsSent: 0,
    followUpsMax: 3,
    status: 'draft_ready',
    replied: false,
    nextFollowUp: '2026-10-13',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: [
      {
        id: 'tl-ls-1',
        type: 'email_queued',
        timestamp: '2026-10-13 08:30 AM',
        title: 'Prospect Discovered & Verified',
        description: 'Retailer confirmed via public commercial listing. Intro draft generated.'
      }
    ],
    wholesaleAccountStatus: 'not_created'
  },

  // 9. Brightleaf Smoke & Vape (Nashville, TN, Group C - Needs Person CAPTCHA)
  {
    id: 'contact-brightleaf',
    business: 'Brightleaf Smoke & Vape',
    contactName: 'Harrison Cole',
    group: 'C',
    address: '1410 4th Ave S',
    city: 'Nashville',
    state: 'TN',
    zip: '37210',
    phone: '(615) 555-0182',
    website: 'https://brightleafsmokevape.example',
    contactUrl: 'https://brightleafsmokevape.example/contact-us',
    source: {
      label: 'Google Places / State Commercial Registry',
      url: 'https://brightleafsmokevape.example',
      verified: 'partial'
    },
    followUpsSent: 0,
    followUpsMax: 1,
    status: 'needs_person',
    replied: false,
    repId: 'marcus',
    route: 'form',
    formStatus: 'needs_person',
    notes: [],
    messages: [],
    orders: [],
    timeline: [
      {
        id: 'tl-bl-1',
        type: 'form_submitted',
        timestamp: '2026-10-13 09:15 AM',
        title: 'Form Submission Blocked: CAPTCHA Detected',
        description: 'Routed strictly to daily manual list for human completion. No automated bypass attempted.'
      }
    ],
    wholesaleAccountStatus: 'not_created'
  },

  // 10. Copper Kettle Hookah (Phoenix, AZ, Group C)
  {
    id: 'contact-copper-kettle',
    business: 'Copper Kettle Hookah & Cigars',
    contactName: 'Samir Haddad',
    email: 'samir@copperkettleaz.example',
    group: 'C',
    address: '4218 N 7th Ave',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85013',
    phone: '(602) 555-0118',
    website: 'https://copperkettleaz.example',
    source: {
      label: 'AZ Secretary of State Retail Licenses',
      url: 'https://copperkettleaz.example',
      verified: 'partial'
    },
    followUpsSent: 1,
    followUpsMax: 3,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-17',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 11. Summit Tobacco (Denver, CO, Group C - Bounce)
  {
    id: 'contact-summit',
    business: 'Summit Tobacco & Fine Smokes',
    contactName: 'Kyle Vance',
    email: 'kyle@summittobaccodenver.example',
    group: 'C',
    address: '1540 Blake St',
    city: 'Denver',
    state: 'CO',
    zip: '80202',
    phone: '(303) 555-0167',
    website: 'https://summittobaccodenver.example',
    source: {
      label: 'Public Directory',
      url: 'https://summittobaccodenver.example',
      verified: 'partial'
    },
    followUpsSent: 1,
    followUpsMax: 3,
    status: 'needs_person',
    replied: false,
    repId: 'tom',
    route: 'email',
    notes: [
      {
        id: 'n-sum-1',
        author: 'Tom Eriksen',
        createdAt: '2026-10-13',
        text: '550 Recipient mailbox not found. Calling store number to verify correct buyer address.'
      }
    ],
    messages: [],
    orders: [],
    timeline: [
      {
        id: 'tl-st-1',
        type: 'email_sent',
        timestamp: '2026-10-12 02:14 PM',
        title: 'Email 1 Sent from Outlook',
        description: 'Intro message'
      },
      {
        id: 'tl-st-2',
        type: 'email_cancelled',
        timestamp: '2026-10-13 08:00 AM',
        title: 'Bounced: 550 Mailbox Not Found',
        description: 'Sequence halted. Raised to Attention queue for phone verification or suppression.'
      }
    ]
  },

  // 12. Redwood Cigar Merchants (Sacramento, CA, Group C - Excluded)
  {
    id: 'contact-redwood',
    business: 'Redwood Cigar Merchants',
    contactName: 'Marcus Wood',
    email: 'orders@redwoodcigars.example',
    group: 'C',
    address: '1014 K St',
    city: 'Sacramento',
    state: 'CA',
    zip: '95814',
    phone: '(916) 555-0153',
    website: 'https://redwoodcigars.example',
    source: {
      label: 'CA Tobacco Retailers Web Index',
      url: 'https://redwoodcigars.example',
      verified: 'verified'
    },
    followUpsSent: 0,
    followUpsMax: 0,
    status: 'paused',
    replied: false,
    repId: 'priya',
    route: 'excluded',
    exclusionReason: 'Existing customer in QuickBooks (Account #CUST-1049)',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 13. Blue Ridge Ash & Leaf (Asheville, NC, Group A)
  {
    id: 'contact-blueridge',
    business: 'Blue Ridge Ash & Leaf',
    contactName: 'Warren Boyd',
    email: 'warren@blueridgeash.example',
    group: 'A',
    address: '34 Biltmore Ave',
    city: 'Asheville',
    state: 'NC',
    zip: '28801',
    phone: '(828) 555-0129',
    lastOrder: '2026-02-18',
    lastOrderDaysAgo: 237,
    followUpsSent: 1,
    followUpsMax: 4,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-15',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 14. Crescent City Tobacconists (New Orleans, LA, Group A)
  {
    id: 'contact-crescent',
    business: 'Crescent City Tobacconists',
    contactName: 'Andre Leblanc',
    email: 'andre@crescentcitysmokes.example',
    group: 'A',
    address: '520 Decatur St',
    city: 'New Orleans',
    state: 'LA',
    zip: '70130',
    phone: '(504) 555-0185',
    lastOrder: '2026-04-05',
    lastOrderDaysAgo: 191,
    followUpsSent: 0,
    followUpsMax: 4,
    status: 'draft_ready',
    replied: false,
    nextFollowUp: '2026-10-14',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 15. Ironwood Smoke & Spirits (Birmingham, AL, Group A)
  {
    id: 'contact-ironwood',
    business: 'Ironwood Smoke & Spirits',
    contactName: 'Clint Harris',
    email: 'clint@ironwoodsmoke.example',
    group: 'A',
    address: '2019 1st Ave N',
    city: 'Birmingham',
    state: 'AL',
    zip: '35203',
    phone: '(205) 555-0112',
    lastOrder: '2026-05-10',
    lastOrderDaysAgo: 156,
    followUpsSent: 2,
    followUpsMax: 4,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-19',
    repId: 'priya',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 16. Palmetto Humidors (Charleston, SC, Group B)
  {
    id: 'contact-palmetto',
    business: 'Palmetto Humidors & Fine Cigars',
    contactName: 'Bradley Vance',
    email: 'brad@palmettohumidors.example',
    group: 'B',
    address: '189 Meeting St',
    city: 'Charleston',
    state: 'SC',
    zip: '29401',
    phone: '(843) 555-0149',
    lastOrder: '2026-09-30',
    lastOrderDaysAgo: 13,
    followUpsSent: 0,
    followUpsMax: 2,
    status: 'draft_ready',
    replied: false,
    nextFollowUp: '2026-10-14',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 17. Magnolia Leaf & Pipe (Memphis, TN, Group B)
  {
    id: 'contact-magnolia',
    business: 'Magnolia Leaf & Pipe',
    contactName: 'Travis Campbell',
    email: 'travis@magnolialeaf.example',
    group: 'B',
    address: '119 S Main St',
    city: 'Memphis',
    state: 'TN',
    zip: '38103',
    phone: '(901) 555-0177',
    lastOrder: '2026-10-01',
    lastOrderDaysAgo: 12,
    followUpsSent: 0,
    followUpsMax: 2,
    status: 'in_sequence',
    replied: false,
    nextFollowUp: '2026-10-15',
    repId: 'priya',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 18. Piedmont Cigar Exchange (Raleigh, NC, Group C - Form eligible)
  {
    id: 'contact-piedmont',
    business: 'Piedmont Cigar Exchange',
    contactName: 'Douglas Ross',
    group: 'C',
    address: '320 Fayetteville St',
    city: 'Raleigh',
    state: 'NC',
    zip: '27601',
    phone: '(919) 555-0126',
    website: 'https://piedmontcigarexchange.example',
    contactUrl: 'https://piedmontcigarexchange.example/contact',
    source: {
      label: 'NC Business Registry',
      url: 'https://piedmontcigarexchange.example',
      verified: 'verified'
    },
    followUpsSent: 0,
    followUpsMax: 1,
    status: 'draft_ready',
    replied: false,
    repId: 'marcus',
    route: 'form',
    formStatus: 'eligible',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 19. Foundry Cigar Den (Dallas, TX, Group C - Verified Public Email)
  {
    id: 'contact-foundry',
    business: 'Foundry Cigar Den',
    contactName: 'Logan Meyer',
    email: 'logan@foundrycigarden.example',
    group: 'C',
    address: '2604 Main St',
    city: 'Dallas',
    state: 'TX',
    zip: '75226',
    phone: '(214) 555-0190',
    website: 'https://foundrycigarden.example',
    source: {
      label: 'Dallas Morning News Directory',
      url: 'https://foundrycigarden.example/contact',
      verified: 'verified'
    },
    followUpsSent: 0,
    followUpsMax: 3,
    status: 'draft_ready',
    replied: false,
    nextFollowUp: '2026-10-13',
    repId: 'marcus',
    route: 'email',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 20. St. James Humidors & Accessories (Atlanta, GA, Group C - Form eligible)
  {
    id: 'contact-stjames',
    business: 'St. James Humidors & Accessories',
    contactName: 'Oliver Vance',
    group: 'C',
    address: '3344 Peachtree Rd NE',
    city: 'Atlanta',
    state: 'GA',
    zip: '30326',
    phone: '(404) 555-0163',
    website: 'https://stjameshumidors.example',
    contactUrl: 'https://stjameshumidors.example/inquiry',
    source: {
      label: 'GA Retailers List',
      url: 'https://stjameshumidors.example',
      verified: 'verified'
    },
    followUpsSent: 0,
    followUpsMax: 1,
    status: 'draft_ready',
    replied: false,
    repId: 'marcus',
    route: 'form',
    formStatus: 'eligible',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 21. Smoky Mountain Smoke Shop (Knoxville, TN, Group C - CAPTCHA)
  {
    id: 'contact-smoky-mtn',
    business: 'Smoky Mountain Smoke Shop',
    contactName: 'Brett Collins',
    group: 'C',
    address: '502 S Gay St',
    city: 'Knoxville',
    state: 'TN',
    zip: '37902',
    phone: '(865) 555-0155',
    website: 'https://smokymtnpipe.example',
    contactUrl: 'https://smokymtnpipe.example/contact',
    source: {
      label: 'TN Department of Revenue Public List',
      url: 'https://smokymtnpipe.example',
      verified: 'partial'
    },
    followUpsSent: 0,
    followUpsMax: 1,
    status: 'needs_person',
    replied: false,
    repId: 'marcus',
    route: 'form',
    formStatus: 'needs_person',
    notes: [],
    messages: [],
    orders: [],
    timeline: []
  },

  // 22. Heritage Leaf & Barrel (Houston, TX, Group C - DNC)
  {
    id: 'contact-heritage-leaf',
    business: 'Heritage Leaf & Barrel',
    contactName: 'Victor Navarro',
    email: 'victor@heritageleafbarrel.example',
    group: 'C',
    address: '1902 Washington Ave',
    city: 'Houston',
    state: 'TX',
    zip: '77007',
    phone: '(713) 555-0171',
    website: 'https://heritageleafbarrel.example',
    source: {
      label: 'Public Directory',
      url: 'https://heritageleafbarrel.example',
      verified: 'partial'
    },
    followUpsSent: 1,
    followUpsMax: 3,
    status: 'dnc',
    replied: false,
    repId: 'tom',
    route: 'email',
    notes: [
      {
        id: 'n-hl-1',
        author: 'System',
        createdAt: '2026-10-11',
        text: 'Recipient clicked one-click opt out. Automatically added to Do-Not-Contact list.'
      }
    ],
    messages: [],
    orders: [],
    timeline: [
      {
        id: 'tl-hl-1',
        type: 'dnc_added',
        timestamp: '2026-10-11 04:12 PM',
        title: 'Opted Out: Added to DNC',
        description: 'All queued sends suppressed immediately across the system.'
      }
    ]
  }
];

// Procedural generator for exactly 1,736 accounts total:
// Group A: 412 accounts
// Group B: 38 accounts
// Group C: 1,286 accounts
export function generateFullContactList(): Contact[] {
  const rng = mulberry32(4128);
  const result: Contact[] = [...HERO_CONTACTS];

  const currentA = HERO_CONTACTS.filter(c => c.group === 'A').length;
  const currentB = HERO_CONTACTS.filter(c => c.group === 'B').length;
  const currentC = HERO_CONTACTS.filter(c => c.group === 'C').length;

  const targetA = 412;
  const targetB = 38;
  const targetC = 1286;

  const reps = ['marcus', 'priya', 'tom'];

  // Generate remainder of Group A (412 total)
  for (let i = currentA; i < targetA; i++) {
    const cityObj = CITIES[Math.floor(rng() * CITIES.length)];
    const prefix = PREFIXES[Math.floor(rng() * PREFIXES.length)];
    const suffix = SUFFIXES[Math.floor(rng() * SUFFIXES.length)];
    const firstName = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
    const business = `${prefix} ${suffix} #${i + 1}`;
    const domain = `${prefix.toLowerCase().replace(/[^a-z]/g, '')}${suffix.toLowerCase().replace(/[^a-z]/g, '')}${i}.example`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    const daysAgo = Math.floor(95 + rng() * 190); // 95 to 285 days
    const rep = reps[Math.floor(rng() * reps.length)];
    const statusRoll = rng();
    const status: ContactStatus = statusRoll < 0.25 ? 'draft_ready' : statusRoll < 0.65 ? 'in_sequence' : statusRoll < 0.85 ? 'replied' : 'paused';

    result.push({
      id: `gen-a-${i}`,
      business,
      contactName: `${firstName} ${lastName}`,
      email,
      group: 'A',
      address: `${Math.floor(100 + rng() * 8900)} Commerce Way`,
      city: cityObj.city,
      state: cityObj.state,
      zip: cityObj.zip,
      phone: `(${Math.floor(200 + rng() * 700)}) 555-${Math.floor(1000 + rng() * 9000)}`,
      website: `https://${domain}`,
      lastOrder: new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0],
      lastOrderDaysAgo: daysAgo,
      lastEmail: new Date(Date.now() - Math.floor(rng() * 14) * 86400000).toISOString().split('T')[0],
      followUpsSent: Math.floor(rng() * 3),
      followUpsMax: 4,
      status,
      replied: status === 'replied',
      nextFollowUp: '2026-10-16',
      repId: rep,
      route: 'email',
      notes: [],
      messages: [],
      orders: [],
      timeline: []
    });
  }

  // Generate remainder of Group B (38 total)
  for (let i = currentB; i < targetB; i++) {
    const cityObj = CITIES[Math.floor(rng() * CITIES.length)];
    const prefix = PREFIXES[Math.floor(rng() * PREFIXES.length)];
    const suffix = SUFFIXES[Math.floor(rng() * SUFFIXES.length)];
    const firstName = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
    const business = `${prefix} ${suffix} Studio ${i + 1}`;
    const domain = `recent${prefix.toLowerCase().replace(/[^a-z]/g, '')}${i}.example`;
    const email = `buyer@${domain}`;
    const daysAgo = Math.floor(4 + rng() * 20); // 4 to 24 days post-shipment
    const rep = reps[Math.floor(rng() * reps.length)];
    const status: ContactStatus = daysAgo >= 14 ? 'draft_ready' : 'in_sequence';

    result.push({
      id: `gen-b-${i}`,
      business,
      contactName: `${firstName} ${lastName}`,
      email,
      group: 'B',
      address: `${Math.floor(100 + rng() * 8900)} Warehouse Ave`,
      city: cityObj.city,
      state: cityObj.state,
      zip: cityObj.zip,
      phone: `(${Math.floor(200 + rng() * 700)}) 555-${Math.floor(1000 + rng() * 9000)}`,
      website: `https://${domain}`,
      lastOrder: new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0],
      lastOrderDaysAgo: daysAgo,
      followUpsSent: 0,
      followUpsMax: 2,
      status,
      replied: false,
      nextFollowUp: daysAgo >= 14 ? '2026-10-13' : '2026-10-18',
      repId: rep,
      route: 'email',
      notes: [],
      messages: [],
      orders: [],
      timeline: []
    });
  }

  // Generate remainder of Group C (1,286 total)
  for (let i = currentC; i < targetC; i++) {
    const cityObj = CITIES[Math.floor(rng() * CITIES.length)];
    const prefix = PREFIXES[Math.floor(rng() * PREFIXES.length)];
    const suffix = SUFFIXES[Math.floor(rng() * SUFFIXES.length)];
    const business = `${prefix} ${suffix} Retail ${i + 1}`;
    const domain = `prospect${prefix.toLowerCase().replace(/[^a-z]/g, '')}${i}.example`;
    const rep = reps[Math.floor(rng() * reps.length)];
    const routeRoll = rng();
    const route: ContactRoute = routeRoll < 0.65 ? 'email' : routeRoll < 0.88 ? 'form' : routeRoll < 0.95 ? 'phone' : 'excluded';
    const email = route === 'email' ? `info@${domain}` : undefined;
    const formStatus = route === 'form' ? (rng() < 0.65 ? 'eligible' : 'needs_person') : undefined;
    const status: ContactStatus = route === 'excluded' ? 'paused' : (formStatus === 'needs_person' ? 'needs_person' : (rng() < 0.4 ? 'draft_ready' : 'in_sequence'));

    result.push({
      id: `gen-c-${i}`,
      business,
      contactName: rng() < 0.5 ? `${FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)]}` : undefined,
      email,
      group: 'C',
      address: `${Math.floor(100 + rng() * 8900)} Retail Blvd`,
      city: cityObj.city,
      state: cityObj.state,
      zip: cityObj.zip,
      phone: `(${Math.floor(200 + rng() * 700)}) 555-${Math.floor(1000 + rng() * 9000)}`,
      website: `https://${domain}`,
      contactUrl: route === 'form' ? `https://${domain}/contact` : undefined,
      source: {
        label: rng() < 0.5 ? 'Public Business Registry' : 'Commercial Directory',
        url: `https://${domain}`,
        verified: rng() < 0.7 ? 'verified' : 'partial'
      },
      followUpsSent: 0,
      followUpsMax: 3,
      status,
      replied: false,
      nextFollowUp: '2026-10-15',
      repId: rep,
      route,
      formStatus,
      exclusionReason: route === 'excluded' ? 'Existing wholesale customer record or duplicate registry ID' : undefined,
      notes: [],
      messages: [],
      orders: [],
      timeline: []
    });
  }

  return result;
}

// Initial Review Queue Drafts (12 waiting)
export const INITIAL_DRAFTS: Draft[] = [
  // Draft 1: Old Ember Cigar Lounge (Group A)
  {
    id: 'draft-1',
    contactId: 'contact-old-ember',
    recipientBusiness: 'Old Ember Cigar Lounge',
    recipientEmail: 'daniela@oldembercigars.example',
    group: 'A',
    repId: 'marcus',
    scheduledTime: 'Today 11:18 AM',
    approach: 'new_merchandise',
    subject: 'Checking in on the Oak humidors',
    body: "Hi Daniela,\n\nIt's Marcus at Prestige. It's been a while since your March order of the Oak 150-ct humidors and the Ember cabinet, and I wanted to see how they've been doing on your floor. Are they still selling well for you?\n\nWe also have a new line of Ember cabinets arriving that pairs well with what you ordered, and I'm happy to send the wholesale price sheet if you'd like to take a look.\n\nBest,\nMarcus",
    groundedPhrases: [
      { text: "March order of the Oak 150-ct humidors and the Ember cabinet", source: "QuickBooks Invoice #4128 (Mar 12, 2026)" },
      { text: "new line of Ember cabinets arriving", source: "Approved Promotion: 'New Ember cabinet line announced'" },
      { text: "wholesale price sheet", source: "Catalog: Ember 40-ct Wholesale Price ($340.00)" }
    ],
    recommendationProductIds: ['prod-1', 'prod-2', 'prod-5'],
    whyThisDraft: {
      relationshipSummary: "Customer since 2024. Last purchased in March 2026 ($710.00). Focuses on electronic cabinets & classic oak desktop humidors.",
      lastPurchase: "Invoice #4128 on Mar 12, 2026 (215 days ago)",
      lastContact: "18 days ago via Marcus's Outlook",
      rulesApplied: [
        "No unapproved discount language",
        "Avoided repeating Oak 150 suggestion as primary push",
        "Kept message under 90 words with single call-to-action question"
      ]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 2: Hartwell & Finch (Group A - Blocked: fails unapproved offer check!)
  {
    id: 'draft-2',
    contactId: 'contact-hartwell',
    recipientBusiness: 'Hartwell & Finch Tobacconists',
    recipientEmail: 'graham@hartwellfinch.example',
    group: 'A',
    repId: 'marcus',
    scheduledTime: 'Today 11:35 AM',
    approach: 'wholesale_pricing',
    subject: 'Restocking travel cases for autumn',
    body: "Hi Graham,\n\nIt's Marcus from Prestige. We appreciated your January order of the Sable 25-ct travel cases. As your autumn retail season picks up, I wanted to see if your inventory is holding up.\n\nWe have a special 10% off promotion running this week on all travel humidor cases if you place a carton order.\n\nWould you like me to send over our updated wholesale sheet?\n\nBest,\nMarcus",
    groundedPhrases: [
      { text: "January order of the Sable 25-ct travel cases", source: "QuickBooks Invoice #3992 (Jan 29, 2026)" },
      { text: "special 10% off promotion", source: "FLAGGED: Unapproved discount! Not in approved promotions." }
    ],
    recommendationProductIds: ['prod-4', 'prod-5'],
    whyThisDraft: {
      relationshipSummary: "Savannah boutique retailer. Ordered 10 travel cases in January 2026 (257 days ago).",
      lastPurchase: "Invoice #3992 on Jan 29, 2026",
      lastContact: "257 days ago",
      rulesApplied: [
        "Rule violation detected: Prompt rule 'Never mention discounts unless approved' violated by unverified 10% claim."
      ]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: false, reason: "Draft mentions unapproved '10% off' claim. Edit draft or remove offer.", fixLink: 'edit' },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 3: Blackwater Cigar Co. (Group B - Post-order check-in 14 days after shipment)
  {
    id: 'draft-3',
    contactId: 'contact-blackwater',
    recipientBusiness: 'Blackwater Cigar Co.',
    recipientEmail: 'ray@blackwatercigar.example',
    group: 'B',
    repId: 'marcus',
    scheduledTime: 'Today 11:52 AM',
    approach: 'question',
    subject: 'Checking in on your Glass-Top humidor delivery',
    body: "Hi Ray,\n\nMarcus here from Prestige. QuickBooks shows your three Cedar Glass-Top 75-ct humidors were delivered to Ybor City two weeks ago. I wanted to make sure everything arrived in mint condition and your display shelves are set up well.\n\nSeveral retailers pair these with our Spanish cedar divider sets and digital brass hygrometers on the floor. Would you like me to tuck a sample divider into your next order?\n\nBest regards,\nMarcus",
    groundedPhrases: [
      { text: "three Cedar Glass-Top 75-ct humidors", source: "QuickBooks Invoice #4311 (Shipped Sep 29, 2026)" },
      { text: "delivered to Ybor City two weeks ago", source: "FedEx Freight Delivery Confirmed Oct 1, 2026" },
      { text: "Spanish cedar divider sets and digital brass hygrometers", source: "Catalog: Complementary in-stock accessories" }
    ],
    recommendationProductIds: ['prod-6', 'prod-5', 'prod-3'],
    whyThisDraft: {
      relationshipSummary: "Recent wholesale order #4311 shipped 14 days ago on Sep 29. Post-order check-in rule triggered.",
      lastPurchase: "Invoice #4311 on Sep 29, 2026 ($285.00)",
      lastContact: "14 days ago (shipping notification)",
      rulesApplied: [
        "14-day post-shipment interval obeyed",
        "Duplicate post-order prevention: 60-day lockout enforced",
        "Only in-stock accessories recommended (Humidification gel omitted due to out-of-stock)"
      ]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 4: Lone Star Humidor Room (Group C - Intro outreach)
  {
    id: 'draft-4',
    contactId: 'contact-lone-star',
    recipientBusiness: 'Lone Star Humidor Room',
    recipientEmail: 'carlos@lonestarhumidor.example',
    group: 'C',
    repId: 'marcus',
    scheduledTime: 'Today 12:15 PM',
    approach: 'brief_intro',
    subject: 'Wholesale humidors and electronic cabinets for Lone Star',
    body: "Hi Carlos,\n\nI came across Lone Star Humidor Room while looking at premier cigar lounges in San Antonio. I'm Marcus with Prestige Import Group—we're an established US wholesale distributor of Spanish cedar humidors, electronic climate cabinets, and accessories.\n\nWe supply retail tobacconists across Texas with direct commercial pricing and guaranteed Florida warehouse stock. Would it be useful if I sent over our current wholesale catalog and retailer terms?\n\nBest regards,\nMarcus Delgado",
    groundedPhrases: [
      { text: "Lone Star Humidor Room while looking at premier cigar lounges in San Antonio", source: "Verified Public Web Listing & TX Retail Registry" },
      { text: "Spanish cedar humidors, electronic climate cabinets, and accessories", source: "Prestige Import Group core catalog" }
    ],
    recommendationProductIds: ['prod-1', 'prod-2', 'prod-4'],
    whyThisDraft: {
      relationshipSummary: "New prospect discovered via Texas lounge directory. Verified business domain. Deduplicated against existing QuickBooks database.",
      lastPurchase: "None (New prospect)",
      lastContact: "None",
      rulesApplied: [
        "Brief intro tone without aggressive pitch",
        "No fictitious claims made about store",
        "Strict compliance footer with one-click opt out"
      ]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 5: Crescent City Tobacconists (Group A)
  {
    id: 'draft-5',
    contactId: 'contact-crescent',
    recipientBusiness: 'Crescent City Tobacconists',
    recipientEmail: 'andre@crescentcitysmokes.example',
    group: 'A',
    repId: 'marcus',
    scheduledTime: 'Today 12:40 PM',
    approach: 'question',
    subject: 'Display humidors for the French Quarter rush',
    body: "Hi Andre,\n\nIt's Marcus at Prestige. We appreciated your spring order of desktop humidors for your Decatur Street shop. With the cooler months approaching, I wanted to see how your floor displays are holding up.\n\nWe've stocked up on our 75-ct and 150-ct Spanish cedar humidors in Doral with quick freight to New Orleans. Are you thinking of restocking displays before November?\n\nBest regards,\nMarcus",
    groundedPhrases: [
      { text: "spring order of desktop humidors", source: "QuickBooks Invoice #4167 (Apr 5, 2026)" },
      { text: "75-ct and 150-ct Spanish cedar humidors", source: "Catalog stock verified in Doral warehouse" }
    ],
    recommendationProductIds: ['prod-1', 'prod-3'],
    whyThisDraft: {
      relationshipSummary: "New Orleans retailer. Inactive for 191 days.",
      lastPurchase: "Apr 5, 2026 ($540.00)",
      lastContact: "191 days ago",
      rulesApplied: ["Personalized grounding", "No unsolicited discounts", "Single clear question"]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 6: Palmetto Humidors (Group B)
  {
    id: 'draft-6',
    contactId: 'contact-palmetto',
    recipientBusiness: 'Palmetto Humidors & Fine Cigars',
    recipientEmail: 'brad@palmettohumidors.example',
    group: 'B',
    repId: 'marcus',
    scheduledTime: 'Today 01:10 PM',
    approach: 'new_merchandise',
    subject: 'Following up on your humidor shipment',
    body: "Hi Bradley,\n\nMarcus here from Prestige. Following up on your humidor shipment delivered to Meeting Street two weeks ago. I wanted to verify the shipment arrived in perfect order and see if your clients are loving the glass tops.\n\nIf you need additional cedar partitions or hygrometers, we have fresh stock ready to ship same-day from Florida. Would a quick accessories restock help right now?\n\nBest,\nMarcus",
    groundedPhrases: [
      { text: "shipment delivered to Meeting Street two weeks ago", source: "QuickBooks Invoice #4315 (Delivered Oct 2, 2026)" }
    ],
    recommendationProductIds: ['prod-6', 'prod-5'],
    whyThisDraft: {
      relationshipSummary: "Charleston shop. Shipped 13 days ago.",
      lastPurchase: "Sep 30, 2026 ($390.00)",
      lastContact: "13 days ago",
      rulesApplied: ["Post-order follow-up check", "Duplicate prevention"]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 7: Foundry Cigar Den (Group C)
  {
    id: 'draft-7',
    contactId: 'contact-foundry',
    recipientBusiness: 'Foundry Cigar Den',
    recipientEmail: 'logan@foundrycigarden.example',
    group: 'C',
    repId: 'marcus',
    scheduledTime: 'Today 01:35 PM',
    approach: 'wholesale_pricing',
    subject: 'Wholesale humidor lines for Foundry Cigar Den',
    body: "Hi Logan,\n\nI hope your week is off to a great start in Dallas. I'm Marcus with Prestige Import Group. We supply cigar lounges with commercial-grade humidors, electronic climate-controlled cabinets, and retail accessories.\n\nGiven your focus on premium stick preservation, I wanted to reach out and share our direct wholesale catalog. Would you be open to reviewing our wholesale price sheet this week?\n\nSincerely,\nMarcus Delgado",
    groundedPhrases: [
      { text: "Foundry Cigar Den in Dallas", source: "Verified business site (Deep Ellum)" }
    ],
    recommendationProductIds: ['prod-2', 'prod-1'],
    whyThisDraft: {
      relationshipSummary: "New prospect discovered via Dallas business index.",
      lastPurchase: "None",
      lastContact: "None",
      rulesApplied: ["Compliant B2B intro", "Commercial opt-out included"]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Draft 8: St. James Humidors (Group C - Form submission)
  {
    id: 'draft-8',
    contactId: 'contact-stjames',
    recipientBusiness: 'St. James Humidors & Accessories',
    recipientEmail: 'contact-form-submission',
    group: 'C',
    repId: 'marcus',
    scheduledTime: 'Today 02:05 PM',
    approach: 'brief_intro',
    subject: 'Wholesale partnership inquiry from Prestige Import Group',
    body: "Hello St. James Team,\n\nMy name is Marcus Delgado with Prestige Import Group in Florida. We are a direct wholesale importer of Spanish cedar humidors, electronic humidor cabinets, and cigar accessories for retail lounges.\n\nWe would love to share our 2026 wholesale catalog and retail dealer pricing with your purchasing team. If interested, please reply or visit prestigeimport.example.\n\nBest regards,\nMarcus Delgado · Prestige Import Group",
    groundedPhrases: [
      { text: "St. James Humidors in Atlanta", source: "Verified web contact form URL" }
    ],
    recommendationProductIds: ['prod-1', 'prod-4'],
    whyThisDraft: {
      relationshipSummary: "Retailer with contact form only. Evaluated as eligible for clean direct submission.",
      lastPurchase: "None",
      lastContact: "None",
      rulesApplied: ["No CAPTCHA detected", "Clean contact form format", "Honors terms of service"]
    },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },

  // Drafts 9, 10, 11, 12 to make 12 total in Review queue
  {
    id: 'draft-9',
    contactId: 'gen-a-10',
    recipientBusiness: 'Vintage Pipe & Leaf #11',
    recipientEmail: 'buyer@vintagepipe10.example',
    group: 'A',
    repId: 'marcus',
    scheduledTime: 'Today 02:30 PM',
    approach: 'question',
    subject: 'Checking back in on humidor stock',
    body: "Hi Thomas,\n\nIt's Marcus at Prestige. Checking in to see how your humidor stock has been performing over the summer. We have fresh shipments of our 150-ct Oak desktop humidors ready in Florida.\n\nWould you like me to send our updated price list?\n\nMarcus",
    groundedPhrases: [{ text: "150-ct Oak desktop humidors", source: "Catalog" }],
    recommendationProductIds: ['prod-1'],
    whyThisDraft: { relationshipSummary: "Inactive 185 days", lastPurchase: "Apr 2026", lastContact: "Apr 2026", rulesApplied: ["Standard check"] },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },
  {
    id: 'draft-10',
    contactId: 'gen-a-15',
    recipientBusiness: 'Heritage Cigar Lounge #16',
    recipientEmail: 'info@heritagecigars15.example',
    group: 'A',
    repId: 'marcus',
    scheduledTime: 'Today 03:00 PM',
    approach: 'new_merchandise',
    subject: 'New electronic cabinets for your lounge floor',
    body: "Hi Robert,\n\nMarcus here from Prestige. Following up on your previous cabinet purchase to share that our updated Ember electronic series is now in stock. Would you like the spec sheet?\n\nBest,\nMarcus",
    groundedPhrases: [{ text: "Ember electronic series", source: "Catalog" }],
    recommendationProductIds: ['prod-2'],
    whyThisDraft: { relationshipSummary: "Inactive 210 days", lastPurchase: "Mar 2026", lastContact: "Mar 2026", rulesApplied: ["Standard check"] },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },
  {
    id: 'draft-11',
    contactId: 'gen-c-35',
    recipientBusiness: 'Royal Tobacco Merchants Retail 36',
    recipientEmail: 'info@royaltobacco35.example',
    group: 'C',
    repId: 'marcus',
    scheduledTime: 'Today 03:25 PM',
    approach: 'brief_intro',
    subject: 'Wholesale cigar accessories from Prestige Import Group',
    body: "Hi there,\n\nI noticed Royal Tobacco Merchants while looking at prominent retail shops in Atlanta. We distribute quality Spanish cedar humidors and accessories directly to retailers. Would a wholesale catalog be helpful for your store?\n\nMarcus Delgado",
    groundedPhrases: [{ text: "Royal Tobacco Merchants in Atlanta", source: "Directory" }],
    recommendationProductIds: ['prod-4', 'prod-5'],
    whyThisDraft: { relationshipSummary: "New verified prospect", lastPurchase: "None", lastContact: "None", rulesApplied: ["Verified listing"] },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  },
  {
    id: 'draft-12',
    contactId: 'gen-c-40',
    recipientBusiness: 'Briar & Ash Fine Smokes Retail 41',
    recipientEmail: 'inquiries@briarash40.example',
    group: 'C',
    repId: 'marcus',
    scheduledTime: 'Today 03:50 PM',
    approach: 'question',
    subject: 'Humidor inventory for Briar & Ash',
    body: "Hi there,\n\nReaching out from Prestige Import Group. We supply tobacconists across the Southeast with commercial humidors and digital hygrometers. Are you currently reviewing supplier options for the upcoming holiday season?\n\nBest,\nMarcus Delgado",
    groundedPhrases: [{ text: "commercial humidors and digital hygrometers", source: "Catalog" }],
    recommendationProductIds: ['prod-1', 'prod-5'],
    whyThisDraft: { relationshipSummary: "New verified prospect", lastPurchase: "None", lastContact: "None", rulesApplied: ["Verified listing"] },
    preSendChecks: [
      { id: 'c-1', label: 'Not on Do-Not-Contact list', passed: true },
      { id: 'c-2', label: 'No duplicate send in last 30 days', passed: true },
      { id: 'c-3', label: 'Within rep daily limit (18 of 30 sent)', passed: true },
      { id: 'c-4', label: 'No unapproved offer or discount claim', passed: true },
      { id: 'c-5', label: 'Physical business address & opt-out footer present', passed: true }
    ]
  }
];

// Initial Attention Items (4 items)
export const INITIAL_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    contactId: 'contact-old-ember',
    title: "Old Ember Cigar Lounge replied: 'Yes, send me the new cabinet pricing'",
    detail: "Hot lead: customer responded to reactivation message. Automated sequence halted. Ready for rep takeover.",
    tag: 'Interested',
    type: 'reply',
    ctaLabel: 'Open hot reply',
    actionUrl: '/app/pipeline/contact-old-ember'
  },
  {
    id: 'att-2',
    title: '6 prospects need a manual contact form',
    detail: 'Forms contain CAPTCHA verification requiring human completion. Prepared messages ready to copy.',
    tag: 'CAPTCHA',
    type: 'captcha',
    ctaLabel: 'Open manual list',
    actionUrl: '/app/prospects/manual'
  },
  {
    id: 'att-3',
    contactId: 'contact-hartwell',
    title: 'Draft for Hartwell & Finch failed a pre-send check',
    detail: 'Contains unapproved 10% discount text. Approval blocked until resolved.',
    tag: 'Blocked',
    type: 'blocked_draft',
    ctaLabel: 'Fix draft',
    actionUrl: '/app/review'
  },
  {
    id: 'att-4',
    contactId: 'contact-summit',
    title: 'Bounce: Summit Tobacco & Fine Smokes',
    detail: 'Mailbox not found (550). Suggested action: verify phone or add to Do-Not-Contact.',
    tag: 'Bounce',
    type: 'bounce',
    ctaLabel: 'Update contact',
    actionUrl: '/app/pipeline/contact-summit'
  }
];

// Initial Activity Log (Immutable audit trail)
export const INITIAL_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-1',
    timestamp: '10:18 AM',
    actor: 'Marcus Delgado',
    action: 'Approved draft',
    contactBusiness: 'Old Ember Cigar Lounge',
    detail: 'Approved reactivation email referencing Invoice #4128 and Ember cabinets',
    type: 'sent'
  },
  {
    id: 'act-2',
    timestamp: '09:41 AM',
    actor: 'Cedar',
    action: 'Reply detected',
    contactBusiness: 'Old Ember Cigar Lounge',
    detail: 'Inbound message from Daniela Ortiz: "Yes, send me the new cabinet pricing". Sequence halted.',
    type: 'reply'
  },
  {
    id: 'act-3',
    timestamp: '09:15 AM',
    actor: 'Cedar',
    action: 'CAPTCHA detected',
    contactBusiness: 'Brightleaf Smoke & Vape',
    detail: 'Automated submission blocked by site CAPTCHA. Routed to manual rep queue.',
    type: 'form'
  },
  {
    id: 'act-4',
    timestamp: '08:45 AM',
    actor: 'Cedar',
    action: 'Pre-send check flagged',
    contactBusiness: 'Hartwell & Finch Tobacconists',
    detail: 'Draft contains unapproved discount language ("10% off"). Blocked from sending.',
    type: 'edit'
  },
  {
    id: 'act-5',
    timestamp: '08:30 AM',
    actor: 'Cedar',
    action: 'Daily schedule spread',
    contactBusiness: 'Marcus Delgado Outlook',
    detail: 'Spread 30 sends between 09:00 and 17:00 ET (intervals 12–18 mins).',
    type: 'sent'
  },
  {
    id: 'act-6',
    timestamp: 'Yesterday 04:30 PM',
    actor: 'Priya Raman',
    action: 'Paused contact',
    contactBusiness: "Marlow's Pipe & Leaf",
    detail: 'Rep manually paused outreach during retail floor renovation.',
    type: 'pause'
  },
  {
    id: 'act-7',
    timestamp: 'Yesterday 02:15 PM',
    actor: 'Cedar',
    action: 'Opt-out processed',
    contactBusiness: 'Heritage Leaf & Barrel',
    detail: 'One-click unsubscribe received. Added to DNC and 2 queued messages cancelled.',
    type: 'opt_out'
  },
  {
    id: 'act-8',
    timestamp: 'Yesterday 11:20 AM',
    actor: 'Tom Eriksen',
    action: 'Exported contacts',
    contactBusiness: 'Group A Inactive (412 rows)',
    detail: 'Downloaded CSV export for sales review.',
    type: 'sent'
  }
];

// Initial Do Not Contact (DNC) list
export const INITIAL_DNC = [
  { id: 'dnc-1', target: 'victor@heritageleafbarrel.example', reason: 'Unsubscribed (one-click link)', dateAdded: '2026-10-11', addedBy: 'System (Cedar)' },
  { id: 'dnc-2', target: 'kyle@summittobaccodenver.example', reason: 'Hard bounce (550 User unknown)', dateAdded: '2026-10-13', addedBy: 'System (Cedar)' },
  { id: 'dnc-3', target: 'donotcontact@smokersbay.example', reason: 'Asked to stop via email reply', dateAdded: '2026-09-18', addedBy: 'Marcus Delgado' },
  { id: 'dnc-4', target: 'spam-flagged@badretailer.example', reason: 'Manual addition (Closed business)', dateAdded: '2026-08-22', addedBy: 'Priya Raman' },
];
