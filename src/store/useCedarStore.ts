import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Contact,
  Draft,
  AttentionItem,
  ActivityEvent,
  generateFullContactList,
  INITIAL_DRAFTS,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_ACTIVITY,
  INITIAL_DNC,
} from '../data/seed';
import { INITIAL_PRODUCTS, INITIAL_PROMOTIONS, Product, Promotion } from '../data/catalog';

export interface CedarState {
  isPaused: boolean;
  currentRepId: string;
  contacts: Contact[];
  drafts: Draft[];
  attentionItems: AttentionItem[];
  activity: ActivityEvent[];
  dncList: Array<{ id: string; target: string; reason: string; dateAdded: string; addedBy: string }>;
  products: Product[];
  promotions: Promotion[];
  inactiveThreshold: number; // 90 | 180 | 240
  postOrderDays: number; // default 14
  dailyRepLimit: number; // default 30
  voicePrompt: string;
  voiceSettings: {
    noDiscounts: boolean;
    maxWords: number;
    noExclamations: boolean;
  };
  approvedExamples: Array<{ id: string; subject: string; body: string; note: string }>;
  autopilot: boolean;
  failNext: boolean;
  liveSimulatorActive: boolean;

  // Actions
  togglePause: () => void;
  setCurrentRep: (repId: string) => void;
  setInactiveThreshold: (days: number) => void;
  setPostOrderDays: (days: number) => void;
  setDailyRepLimit: (limit: number) => void;
  approveDraft: (draftId: string) => boolean;
  rejectDraft: (draftId: string, reason: string) => void;
  regenerateDraft: (draftId: string) => void;
  updateDraftBody: (draftId: string, subject: string, body: string) => void;
  switchDraftApproach: (draftId: string, approach: Draft['approach']) => void;
  saveAsExample: (draftId: string) => void;
  removeExample: (id: string) => void;
  simulateReply: (contactId: string) => void;
  takeOverContact: (contactId: string) => void;
  toggleContactPause: (contactId: string) => void;
  updateContactNextFollowUp: (contactId: string, nextFollowUp: string) => void;
  addToDnc: (target: string, reason: string) => void;
  removeFromDnc: (id: string) => void;
  markManualDone: (contactId: string) => void;
  submitEligibleForms: () => { submitted: number; needsPerson: number; notAllowed: number };
  runProspectDiscovery: () => void;
  createWholesaleAccount: (contactId: string) => string;
  revokeWholesaleAccount: (contactId: string) => void;
  toggleProductStock: (productId: string) => void;
  updateVoiceSettings: (prompt: string, settings: { noDiscounts: boolean; maxWords: number; noExclamations: boolean }) => void;
  advanceOneDay: () => void;
  resetDemoData: () => void;
  addActivityEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
  setFailNext: (val: boolean) => void;
  toggleLiveSimulator: () => void;
}

export const useCedarStore = create<CedarState>()(
  persist(
    (set, get) => ({
      isPaused: false,
      currentRepId: 'marcus',
      contacts: generateFullContactList(),
      drafts: INITIAL_DRAFTS,
      attentionItems: INITIAL_ATTENTION_ITEMS,
      activity: INITIAL_ACTIVITY,
      dncList: INITIAL_DNC,
      products: INITIAL_PRODUCTS,
      promotions: INITIAL_PROMOTIONS,
      inactiveThreshold: 180,
      postOrderDays: 14,
      dailyRepLimit: 30,
      voicePrompt:
        'Write like a friendly, experienced sales rep at a family-run importer. Short paragraphs. One question per email. Never invent offers, availability or personal details.',
      voiceSettings: {
        noDiscounts: true,
        maxWords: 120,
        noExclamations: true,
      },
      approvedExamples: [
        {
          id: 'ex-1',
          subject: 'Checking in on the Oak humidors',
          body: "Hi Daniela,\n\nIt's Marcus at Prestige. It's been a while since your March order of the Oak 150-ct humidors and the Ember cabinet, and I wanted to see how they've been doing on your floor. Are they still selling well for you?\n\nWe also have a new line of Ember cabinets arriving that pairs well with what you ordered, and I'm happy to send the wholesale price sheet if you'd like to take a look.\n\nBest,\nMarcus",
          note: 'Learned: prefers short direct questions and explicit QuickBooks past-order citations.',
        },
      ],
      autopilot: false,
      failNext: false,
      liveSimulatorActive: true,

      togglePause: () => {
        const next = !get().isPaused;
        set({ isPaused: next });
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: next ? 'Emergency sending pause enabled' : 'Sending resumed across all mailboxes',
          contactBusiness: 'Global Mailboxes (Marcus, Priya, Tom)',
          detail: next
            ? 'All automated sending frozen. No queued messages will be dispatched.'
            : 'Outbox unpaused. Normal schedule resumed.',
          type: 'pause',
        });
      },

      setCurrentRep: (repId: string) => set({ currentRepId: repId }),

      setInactiveThreshold: (days: number) => {
        set({ inactiveThreshold: days });
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Updated Group A threshold',
          contactBusiness: 'Pipeline Config',
          detail: `Recalculated inactive account window to ${days} days.`,
          type: 'edit',
        });
      },

      setPostOrderDays: (days: number) => {
        set({ postOrderDays: days });
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Updated Group B shipment interval',
          contactBusiness: 'Pipeline Config',
          detail: `Post-order check-in set to ${days} days after delivery.`,
          type: 'edit',
        });
      },

      setDailyRepLimit: (limit: number) => {
        set({ dailyRepLimit: limit });
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Adjusted Outlook send limit',
          contactBusiness: 'Marcus Delgado Mailbox',
          detail: `Daily send quota set to ${limit} emails spread across 9:00–17:00 ET.`,
          type: 'edit',
        });
      },

      approveDraft: (draftId: string) => {
        if (get().isPaused) return false;
        const draft = get().drafts.find((d) => d.id === draftId);
        if (!draft) return false;

        const hasFailingCheck = draft.preSendChecks.some((c) => !c.passed);
        if (hasFailingCheck) return false;

        // Remove from drafts
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== draftId),
          contacts: state.contacts.map((c) => {
            if (c.id === draft.contactId) {
              return {
                ...c,
                status: 'in_sequence',
                followUpsSent: c.followUpsSent + 1,
                lastEmail: new Date().toISOString().split('T')[0],
                timeline: [
                  {
                    id: `tl-appr-${Date.now()}`,
                    type: 'email_sent',
                    timestamp: draft.scheduledTime,
                    title: `Sent via Outlook (${draft.repId})`,
                    description: `Subject: "${draft.subject}"`,
                  },
                  ...c.timeline,
                ],
              };
            }
            return c;
          }),
        }));

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Approved & scheduled draft',
          contactBusiness: draft.recipientBusiness,
          detail: `Subject: "${draft.subject}" (Scheduled for ${draft.scheduledTime})`,
          type: 'sent',
        });

        return true;
      },

      rejectDraft: (draftId: string, reason: string) => {
        const draft = get().drafts.find((d) => d.id === draftId);
        if (!draft) return;
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== draftId),
        }));
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Rejected draft',
          contactBusiness: draft.recipientBusiness,
          detail: `Draft rejected with reason: "${reason}". Kept for AI reinforcement learning.`,
          type: 'edit',
        });
      },

      regenerateDraft: (draftId: string) => {
        const products = get().products.filter((p) => p.availability !== 'out_of_stock');
        const randomProduct = products[Math.floor(Math.random() * products.length)];

        set((state) => ({
          drafts: state.drafts.map((d) => {
            if (d.id === draftId) {
              const updatedBody =
                d.group === 'A'
                  ? `Hi Daniela,\n\nIt's Marcus at Prestige. Reaching back out regarding your display humidors. We have fresh inventory of the ${randomProduct?.name || 'Oak Humidor'} available in Florida ready for same-day freight.\n\nWould you like me to send over our autumn wholesale availability sheet?\n\nBest,\nMarcus`
                  : d.group === 'B'
                  ? `Hi Ray,\n\nMarcus here following up on your recent shipment delivery. Our clients frequently pair these humidors with our ${randomProduct?.name || 'Brass Hygrometer'}.\n\nWould it be helpful if I had our warehouse include a sample set in your next order?\n\nBest regards,\nMarcus`
                  : `Hi Carlos,\n\nMarcus Delgado here with Prestige Import Group. We supply cigar lounges across the country with commercial humidors including our popular ${randomProduct?.name || 'Spanish Cedar'} line.\n\nCould I send over a quick wholesale price list for your review?\n\nBest,\nMarcus Delgado`;

              // Clear failing check if regenerating
              return {
                ...d,
                body: updatedBody,
                subject: `Wholesale update: ${randomProduct?.name || 'Catalog restock'}`,
                preSendChecks: d.preSendChecks.map((check) => ({
                  ...check,
                  passed: true,
                  reason: undefined,
                })),
              };
            }
            return d;
          }),
        }));

        get().addActivityEvent({
          actor: 'Cedar',
          action: 'Regenerated draft variant',
          contactBusiness: 'Draft Workspace',
          detail: 'Regenerated copy using grounded catalog availability and voice guidelines.',
          type: 'edit',
        });
      },

      updateDraftBody: (draftId: string, subject: string, body: string) => {
        set((state) => ({
          drafts: state.drafts.map((d) => {
            if (d.id === draftId) {
              const containsBadDiscount = /10%|discount|special offer/i.test(body);
              return {
                ...d,
                subject,
                body,
                preSendChecks: d.preSendChecks.map((c) =>
                  c.id === 'c-4'
                    ? {
                        ...c,
                        passed: !containsBadDiscount,
                        reason: containsBadDiscount ? 'Unapproved discount claim detected.' : undefined,
                      }
                    : c
                ),
              };
            }
            return d;
          }),
        }));
      },

      switchDraftApproach: (draftId: string, approach: Draft['approach']) => {
        set((state) => ({
          drafts: state.drafts.map((d) => {
            if (d.id === draftId) {
              let subject = d.subject;
              let body = d.body;
              if (approach === 'brief_intro') {
                subject = `Wholesale humidors & accessories for ${d.recipientBusiness}`;
                body = `Hi there,\n\nI'm Marcus Delgado with Prestige Import Group. We are a direct wholesale distributor of Spanish cedar humidors and electronic cabinets.\n\nWould it be useful if I shared our dealer catalog for your retail store?\n\nBest,\nMarcus`;
              } else if (approach === 'wholesale_pricing') {
                subject = `Dealer wholesale pricing for ${d.recipientBusiness}`;
                body = `Hi there,\n\nMarcus here from Prestige Import Group. We supply tobacconists across the region with volume pricing on handcrafted humidors.\n\nCould I email you our current wholesale tier sheet?\n\nBest regards,\nMarcus Delgado`;
              } else if (approach === 'new_merchandise') {
                subject = `New Ember electronic humidor cabinets arrived`;
                body = `Hello,\n\nMarcus from Prestige. We just received our new container of Ember electronic climate cabinets at our Doral warehouse.\n\nWould you like to see the retailer spec sheet?\n\nSincerely,\nMarcus`;
              } else {
                subject = `Quick question about your humidor floor displays`;
                body = `Hi,\n\nMarcus with Prestige Import Group. Are you looking to restock desktop humidor displays for the upcoming season?\n\nLet me know if a price sheet would help.\n\nBest,\nMarcus`;
              }
              return { ...d, approach, subject, body };
            }
            return d;
          }),
        }));
      },

      saveAsExample: (draftId: string) => {
        const draft = get().drafts.find((d) => d.id === draftId);
        if (!draft) return;
        set((state) => ({
          approvedExamples: [
            ...state.approvedExamples,
            {
              id: `ex-${Date.now()}`,
              subject: draft.subject,
              body: draft.body,
              note: `Approved by rep for ${draft.recipientBusiness} (${draft.approach})`,
            },
          ],
        }));
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Saved voice example',
          contactBusiness: draft.recipientBusiness,
          detail: 'Added approved email draft to Cedar voice knowledge bank.',
          type: 'edit',
        });
      },

      removeExample: (id: string) => {
        set((state) => ({
          approvedExamples: state.approvedExamples.filter((ex) => ex.id !== id),
        }));
      },

      // Centerpiece Wow Moment #2: Simulate customer reply
      simulateReply: (contactId: string) => {
        const contact = get().contacts.find((c) => c.id === contactId);
        if (!contact) return;

        const replySnippet = 'Yes, send me the new cabinet pricing';

        set((state) => ({
          contacts: state.contacts.map((c) => {
            if (c.id === contactId) {
              return {
                ...c,
                status: 'replied',
                replied: true,
                repliedDate: 'Just now',
                replySnippet,
                timeline: [
                  {
                    id: `tl-reply-${Date.now()}`,
                    type: 'reply_received',
                    timestamp: 'Just now',
                    title: 'Customer Replied (Hot Lead)',
                    description: `"${replySnippet}" — Sequence stopped automatically.`,
                    statusBadge: 'Hot Lead',
                  },
                  {
                    id: `tl-stop-${Date.now()}`,
                    type: 'email_cancelled',
                    timestamp: 'Just now',
                    title: 'Queued Steps Cancelled',
                    description: 'Stopped: customer replied. Automation halted.',
                    cancelled: true,
                    cancellationReason: 'customer_replied',
                  },
                  ...c.timeline,
                ],
                messages: [
                  ...c.messages,
                  {
                    id: `msg-reply-${Date.now()}`,
                    sender: 'customer',
                    authorName: c.contactName || c.business,
                    timestamp: 'Just now',
                    subject: `Re: Follow up`,
                    body: `Hi Marcus,\n\n${replySnippet}. We are considering restocking our front lounge displays.\n\nThanks,\n${c.contactName || c.business}`,
                    status: 'sent',
                  },
                ],
              };
            }
            return c;
          }),
          attentionItems: [
            {
              id: `att-reply-${Date.now()}`,
              contactId: contact.id,
              title: `${contact.business} replied: '${replySnippet}'`,
              detail: 'Hot lead: customer responded. Automated sequence halted. Ready for rep takeover.',
              tag: 'Interested',
              type: 'reply',
              ctaLabel: 'Open hot reply',
              actionUrl: `/app/pipeline/${contact.id}`,
            },
            ...state.attentionItems.filter((item) => item.contactId !== contactId),
          ],
        }));

        get().addActivityEvent({
          actor: 'Cedar',
          action: 'Customer reply detected',
          contactBusiness: contact.business,
          detail: `Inbound reply: "${replySnippet}". All queued follow-up steps halted.`,
          type: 'reply',
        });
      },

      takeOverContact: (contactId: string) => {
        const contact = get().contacts.find((c) => c.id === contactId);
        if (!contact) return;

        set((state) => ({
          contacts: state.contacts.map((c) => {
            if (c.id === contactId) {
              return {
                ...c,
                status: 'rep_handling',
                timeline: [
                  {
                    id: `tl-takeover-${Date.now()}`,
                    type: 'rep_takeover',
                    timestamp: 'Just now',
                    title: 'Rep Took Over Conversation',
                    description: 'Marcus Delgado locked thread for direct personal handling. Cedar automation halted.',
                    statusBadge: 'Rep Handling',
                  },
                  ...c.timeline,
                ],
              };
            }
            return c;
          }),
          attentionItems: state.attentionItems.filter((i) => i.contactId !== contactId),
        }));

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Took over thread',
          contactBusiness: contact.business,
          detail: 'Automation permanently disengaged for this contact.',
          type: 'takeover',
        });
      },

      toggleContactPause: (contactId: string) => {
        const contact = get().contacts.find((c) => c.id === contactId);
        if (!contact) return;
        const nextStatus = contact.status === 'paused' ? 'in_sequence' : 'paused';

        set((state) => ({
          contacts: state.contacts.map((c) => {
            if (c.id === contactId) {
              return {
                ...c,
                status: nextStatus,
                timeline: [
                  {
                    id: `tl-pause-${Date.now()}`,
                    type: 'paused',
                    timestamp: 'Just now',
                    title: nextStatus === 'paused' ? 'Manually Paused by Rep' : 'Sequence Resumed by Rep',
                    description: nextStatus === 'paused' ? 'Sending temporarily paused.' : 'Sending active.',
                  },
                  ...c.timeline,
                ],
              };
            }
            return c;
          }),
        }));

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: nextStatus === 'paused' ? 'Paused account' : 'Resumed account',
          contactBusiness: contact.business,
          detail: `Status changed to ${nextStatus}.`,
          type: 'pause',
        });
      },

      updateContactNextFollowUp: (contactId: string, nextFollowUp: string) => {
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === contactId ? { ...c, nextFollowUp } : c)),
        }));
      },

      addToDnc: (target: string, reason: string) => {
        const newEntry = {
          id: `dnc-${Date.now()}`,
          target,
          reason,
          dateAdded: new Date().toISOString().split('T')[0],
          addedBy: 'Marcus Delgado',
        };

        set((state) => ({
          dncList: [newEntry, ...state.dncList],
          // Suppress matching contacts
          contacts: state.contacts.map((c) => {
            if (c.email?.toLowerCase() === target.toLowerCase() || c.business.toLowerCase().includes(target.toLowerCase())) {
              return {
                ...c,
                status: 'dnc',
                timeline: [
                  {
                    id: `tl-dnc-${Date.now()}`,
                    type: 'dnc_added',
                    timestamp: 'Just now',
                    title: 'Added to Do-Not-Contact',
                    description: `Suppressed: ${reason}`,
                  },
                  ...c.timeline,
                ],
              };
            }
            return c;
          }),
          // Remove from draft queue
          drafts: state.drafts.filter((d) => d.recipientEmail.toLowerCase() !== target.toLowerCase()),
        }));

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Added to Do-Not-Contact',
          contactBusiness: target,
          detail: `Address suppressed across all mailboxes: ${reason}. Queued messages cancelled.`,
          type: 'opt_out',
        });
      },

      removeFromDnc: (id: string) => {
        set((state) => ({
          dncList: state.dncList.filter((item) => item.id !== id),
        }));
      },

      markManualDone: (contactId: string) => {
        const contact = get().contacts.find((c) => c.id === contactId);
        if (!contact) return;

        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === contactId ? { ...c, status: 'in_sequence' } : c)),
          attentionItems: state.attentionItems.filter((i) => i.contactId !== contactId),
        }));

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Manual form completed',
          contactBusiness: contact.business,
          detail: `Rep completed form submission with verified CAPTCHA on ${contact.website || 'website'}.`,
          type: 'form',
        });
      },

      submitEligibleForms: () => {
        let submitted = 0;
        let needsPerson = 0;
        let notAllowed = 0;

        const currentC = get().contacts.filter((c) => c.group === 'C' && c.route === 'form');
        currentC.forEach((c) => {
          if (c.formStatus === 'eligible') submitted++;
          else if (c.formStatus === 'needs_person') needsPerson++;
          else notAllowed++;
        });

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Submitted eligible forms',
          contactBusiness: 'Group C Form Prospects',
          detail: `Dispatched ${submitted} eligible contact forms. ${needsPerson} flagged with CAPTCHA routed to manual list.`,
          type: 'form',
        });

        return { submitted, needsPerson, notAllowed };
      },

      runProspectDiscovery: () => {
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Executed Prospect Discovery',
          contactBusiness: 'Texas Retail Tobacconists & Lounges',
          detail: '184 found · 29 duplicates merged · 6 existing customers excluded · 118 with public email · 31 form only · 0 sent without review.',
          type: 'sent',
        });
      },

      createWholesaleAccount: (contactId: string) => {
        const token = Math.random().toString(36).substring(2, 10).toUpperCase();
        const link = `https://prestigeimport.example/activate/${token}`;

        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === contactId
              ? {
                  ...c,
                  wholesaleAccountStatus: 'invited',
                  wholesaleInviteExpires: 'Expires in 7 days',
                  timeline: [
                    {
                      id: `tl-wh-${Date.now()}`,
                      type: 'note_added',
                      timestamp: 'Just now',
                      title: 'Wholesale Account Invitation Created',
                      description: `Expiring activation link generated: ${link}`,
                    },
                    ...c.timeline,
                  ],
                }
              : c
          ),
        }));

        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Created wholesale account invite',
          contactBusiness: get().contacts.find((c) => c.id === contactId)?.business || 'Prospect',
          detail: `Requested activation link from prestigeimport.example store. Link expires in 7 days.`,
          type: 'edit',
        });

        return link;
      },

      revokeWholesaleAccount: (contactId: string) => {
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === contactId
              ? { ...c, wholesaleAccountStatus: 'not_created', wholesaleInviteExpires: undefined }
              : c
          ),
        }));
      },

      toggleProductStock: (productId: string) => {
        set((state) => {
          const nextProducts = state.products.map((p) => {
            if (p.id === productId) {
              const nextAvail = p.availability === 'out_of_stock' ? 'in_stock' : 'out_of_stock';
              return {
                ...p,
                availability: nextAvail as Product['availability'],
                includeInSuggestions: nextAvail !== 'out_of_stock',
              };
            }
            return p;
          });

          // Check if any draft references this now-out-of-stock product
          return { products: nextProducts };
        });

        const prod = get().products.find((p) => p.id === productId);
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Updated catalog availability',
          contactBusiness: prod?.name || 'Product',
          detail: `Stock set to ${prod?.availability}. AI suggestions updated immediately.`,
          type: 'edit',
        });
      },

      updateVoiceSettings: (prompt, settings) => {
        set({ voicePrompt: prompt, voiceSettings: settings });
        get().addActivityEvent({
          actor: 'Marcus Delgado',
          action: 'Updated voice & tone instructions',
          contactBusiness: 'AI Prompt Directives',
          detail: 'Adjusted length restrictions and offer safeguards in system prompt.',
          type: 'edit',
        });
      },

      advanceOneDay: () => {
        set((state) => ({
          contacts: state.contacts.map((c) => {
            if (c.status === 'draft_ready') {
              return { ...c, status: 'in_sequence', followUpsSent: c.followUpsSent + 1 };
            }
            return c;
          }),
        }));
        get().addActivityEvent({
          actor: 'System',
          action: 'Advanced demo day +1',
          contactBusiness: 'Schedule Simulation',
          detail: 'Date shifted to Wednesday. Queued drafts marked as sent.',
          type: 'sent',
        });
      },

      resetDemoData: () => {
        localStorage.removeItem('cedar-demo-v1');
        set({
          isPaused: false,
          currentRepId: 'marcus',
          contacts: generateFullContactList(),
          drafts: INITIAL_DRAFTS,
          attentionItems: INITIAL_ATTENTION_ITEMS,
          activity: INITIAL_ACTIVITY,
          dncList: INITIAL_DNC,
          products: INITIAL_PRODUCTS,
          promotions: INITIAL_PROMOTIONS,
          inactiveThreshold: 180,
          postOrderDays: 14,
          dailyRepLimit: 30,
        });
      },

      addActivityEvent: (event) => {
        const newEvent: ActivityEvent = {
          id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: 'Just now',
          ...event,
        };
        set((state) => ({
          activity: [newEvent, ...state.activity.slice(0, 49)],
        }));
      },

      setFailNext: (val: boolean) => set({ failNext: val }),
      toggleLiveSimulator: () => set((state) => ({ liveSimulatorActive: !state.liveSimulatorActive })),
    }),
    {
      name: 'cedar-demo-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isPaused: state.isPaused,
        currentRepId: state.currentRepId,
        inactiveThreshold: state.inactiveThreshold,
        postOrderDays: state.postOrderDays,
        dailyRepLimit: state.dailyRepLimit,
        voicePrompt: state.voicePrompt,
        voiceSettings: state.voiceSettings,
        approvedExamples: state.approvedExamples,
        autopilot: state.autopilot,
        liveSimulatorActive: state.liveSimulatorActive,
      }),
    }
  )
);
