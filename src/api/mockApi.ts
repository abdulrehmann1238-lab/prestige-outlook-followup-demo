import { delay } from './delay';
import { useCedarStore } from '../store/useCedarStore';
import { Contact, Draft } from '../data/seed';

export const mockApi = {
  async getContacts(): Promise<Contact[]> {
    await delay(200, 400);
    return useCedarStore.getState().contacts;
  },

  async getDrafts(): Promise<Draft[]> {
    await delay(250, 450);
    return useCedarStore.getState().drafts;
  },

  async approveDraft(draftId: string): Promise<boolean> {
    const store = useCedarStore.getState();
    if (store.failNext) {
      store.setFailNext(false);
      await delay(400, 700);
      throw new Error('Simulated network error: Could not reach Outlook Graph endpoint. Please retry.');
    }
    await delay(400, 650);
    return store.approveDraft(draftId);
  },

  async regenerateDraft(draftId: string): Promise<void> {
    await delay(600, 900);
    useCedarStore.getState().regenerateDraft(draftId);
  },

  async runDiscovery(scope: { state: string; category: string }): Promise<{
    found: number;
    duplicates: number;
    excluded: number;
    publicEmail: number;
    formOnly: number;
  }> {
    await delay(2800, 3400); // 3+ seconds simulated research run
    useCedarStore.getState().runProspectDiscovery();
    return {
      found: 184,
      duplicates: 29,
      excluded: 6,
      publicEmail: 118,
      formOnly: 31,
    };
  },
};
