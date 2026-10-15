import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  RotateCw,
  ThumbsUp,
  Package,
  Tag,
  ShieldCheck,
  Check,
  AlertTriangle,
  Plus,
  Trash2,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { useToast } from '../../components/ui/Toast';
import { Product, Promotion } from '../../data/catalog';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

export const VoicePage: React.FC = () => {
  const {
    voicePrompt,
    voiceSettings,
    updateVoiceSettings,
    approvedExamples,
    removeExample,
    products,
    toggleProductStock,
    promotions,
  } = useCedarStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'voice' | 'examples' | 'catalog' | 'promotions'>('voice');
  const [promptText, setPromptText] = useState(voicePrompt);
  const [settings, setSettings] = useState(voiceSettings);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [previewSample, setPreviewSample] = useState(
    "Hi Daniela,\n\nIt's Marcus at Prestige. It's been a while since your March order of the Oak 150-ct humidors and the Ember cabinet, and I wanted to see how they've been doing on your floor. Are they still selling well for you?\n\nWe also have a new line of Ember cabinets arriving that pairs well with what you ordered, and I'm happy to send the wholesale price sheet if you'd like to take a look.\n\nBest,\nMarcus"
  );

  const [addPromoOpen, setAddPromoOpen] = useState(false);
  const [newPromoName, setNewPromoName] = useState('');
  const [newPromoTerms, setNewPromoTerms] = useState('');

  const handleSaveVoice = () => {
    updateVoiceSettings(promptText, settings);
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setPreviewSample(
        "Hi Daniela,\n\nIt's Marcus at Prestige. Reaching back out regarding your humidor displays. We have fresh inventory of Spanish cedar humidors available at our Florida warehouse.\n\nWould you like me to send over our updated dealer spec sheet?\n\nBest,\nMarcus"
      );
      showToast({ type: 'success', message: 'Voice rules saved and live sample refreshed.' });
    }, 750);
  };

  const handleToggleProduct = (id: string, name: string) => {
    toggleProductStock(id);
    const updated = products.find((p) => p.id === id);
    const isNowOut = updated?.availability === 'in_stock';
    showToast({
      type: 'info',
      message: `${name} marked as ${isNowOut ? 'Out of Stock' : 'In Stock'}. Suggestions updated.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Voice & Catalog Guardrails
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Govern how Cedar writes, manage approved promotions, and prevent recommending unavailable inventory
          </p>
        </div>

        <Button onClick={handleSaveVoice} icon={<Check className="w-3.5 h-3.5" />}>
          Save Instructions
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2DACB] pb-2">
        {[
          { id: 'voice', label: 'AI Voice & Rules' },
          { id: 'examples', label: `Approved Examples (${approvedExamples.length})` },
          { id: 'catalog', label: `Catalog Availability (${products.length})` },
          { id: 'promotions', label: `Approved Promotions (${promotions.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-3 text-[13.5px] rounded-[8px] font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#2F4A3F] text-white font-semibold'
                : 'bg-white text-[#5E5249] border border-[#CFC5B2] hover:bg-[#EFE9DD]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Voice & Rules */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-[0_1px_2px_rgba(42,33,27,0.06)] space-y-4">
            <div className="space-y-1.5">
              <label className="font-serif text-[16px] text-[#2A211B] font-medium">
                System Prompt Directives: How should Cedar write?
              </label>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={5}
                className="w-full bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] p-3 text-[14px] leading-relaxed text-[#2A211B] outline-none focus:border-[#2F4A3F]"
              />
            </div>

            {/* Hard Safeguard Toggles */}
            <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3">
              <h4 className="font-semibold text-[13.5px] text-[#2A211B]">
                Strict Commercial Boundaries:
              </h4>

              <Toggle
                checked={settings.noDiscounts}
                onChange={(checked) => setSettings({ ...settings, noDiscounts: checked })}
                label="Never invent offers or mention discounts unless approved"
                description="Drafts mentioning unauthorized price reductions will fail pre-send checks."
              />

              <Toggle
                checked={settings.noExclamations}
                onChange={(checked) => setSettings({ ...settings, noExclamations: checked })}
                label="Avoid exclamation marks & hype marketing jargon"
                description="Maintains calm, ledger-like tone typical of established distributors."
              />

              <Toggle
                checked={settings.maxWords <= 120}
                onChange={(checked) => setSettings({ ...settings, maxWords: checked ? 120 : 200 })}
                label="Enforce concise emails (Max 120 words per draft)"
                description="Respects busy retail buyers with short paragraphs and a single question."
              />
            </div>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-5 bg-[#FBF9F4] border border-[#E2DACB] rounded-[12px] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2DACB] pb-2">
              <span className="font-serif text-[15px] text-[#2A211B] font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B08D57]" />
                <span>Live Voice Preview</span>
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSaveVoice}
                loading={isRegenerating}
                icon={<RotateCw className="w-3 h-3" />}
              >
                Regenerate
              </Button>
            </div>

            <div className="p-4 bg-white border border-[#E2DACB] rounded-[8px] text-[13.5px] text-[#2A211B] leading-relaxed whitespace-pre-line shadow-xs">
              {previewSample}
            </div>

            <p className="text-[11.5px] text-[#766A5E] leading-relaxed">
              When reps click "Thumbs up" in the Review Queue, drafts are automatically appended to Cedar's learned voice model.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Approved Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedExamples.map((ex) => (
              <div
                key={ex.id}
                className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[12px] text-[#766A5E] pb-1 border-b border-[#E2DACB]">
                    <span className="font-semibold text-[#3F7D58] flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Approved by Sales Rep</span>
                    </span>
                    <button
                      onClick={() => removeExample(ex.id)}
                      className="text-[#A63D2F] hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-[14px] text-[#2A211B] mt-2">{ex.subject}</h4>
                  <p className="text-[13px] text-[#5E5249] whitespace-pre-line mt-1.5 leading-relaxed">
                    {ex.body}
                  </p>
                </div>
                <div className="p-2 bg-[#EFE4CF]/60 rounded text-[11.5px] text-[#7A4E2D] font-medium">
                  {ex.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Catalog Availability (PRD Wow Moment #3: Out of stock toggle) */}
      {activeTab === 'catalog' && (
        <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] overflow-hidden shadow-xs space-y-3 p-4">
          <div className="flex items-center justify-between border-b border-[#E2DACB] pb-3">
            <div>
              <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
                Catalog Inventory & AI Suggestion Guard
              </h3>
              <p className="text-[12.5px] text-[#766A5E]">
                Toggle an item "Out of stock": Cedar will swap it out of all prepared follow-ups immediately.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="bg-[#EFE9DD] border-b border-[#E2DACB] text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Wholesale Price</th>
                  <th className="py-2.5 px-3">Availability Status</th>
                  <th className="py-2.5 px-3">Include in AI Suggestions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DACB]/60">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FBF9F4]">
                    <td className="py-2.5 px-3 font-semibold text-[#2A211B]">{prod.name}</td>
                    <td className="py-2.5 px-3 font-mono text-[12px] text-[#766A5E]">{prod.sku}</td>
                    <td className="py-2.5 px-3 text-[#5E5249]">{prod.category}</td>
                    <td className="py-2.5 px-3 tabular-nums font-semibold text-[#2A211B]">
                      ${prod.wholesalePrice.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3">
                      <button
                        onClick={() => handleToggleProduct(prod.id, prod.name)}
                        className={`px-2.5 py-1 rounded-[6px] text-[12px] font-semibold cursor-pointer border ${
                          prod.availability === 'in_stock'
                            ? 'bg-[#E2F0E7] text-[#1F5333] border-[#C1DEC9]'
                            : prod.availability === 'low_stock'
                            ? 'bg-[#F7EAD0] text-[#7D5010] border-[#E8D1A8]'
                            : 'bg-[#F6E0DC] text-[#75261B] border-[#E8BCB4]'
                        }`}
                      >
                        {prod.availability === 'in_stock'
                          ? 'In Stock'
                          : prod.availability === 'low_stock'
                          ? 'Low Stock'
                          : 'Out of Stock (Click to Toggle)'}
                      </button>
                    </td>
                    <td className="py-2.5 px-3">
                      {prod.includeInSuggestions ? (
                        <span className="text-[12px] text-[#3F7D58] font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Eligible for Suggestion</span>
                        </span>
                      ) : (
                        <span className="text-[12px] text-[#A63D2F] font-medium">
                          Omitted (Out of stock)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Promotions */}
      {activeTab === 'promotions' && (
        <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2DACB] pb-3">
            <div>
              <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
                Approved Wholesale Promotions
              </h3>
              <p className="text-[12.5px] text-[#766A5E]">
                Cedar is strictly prohibited from mentioning any discount or term not listed on this ledger.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setAddPromoOpen(true)}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Promotion
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[14px] text-[#2A211B]">{promo.name}</span>
                  <span className="text-[11px] font-bold bg-[#E2F0E7] text-[#1F5333] px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <p className="text-[13px] text-[#5E5249] leading-relaxed">{promo.terms}</p>
                <div className="text-[11.5px] text-[#766A5E] pt-1 border-t border-[#E2DACB]/60 flex justify-between">
                  <span>
                    Valid: {promo.startDate} to {promo.endDate}
                  </span>
                  <span>Applies to: Groups {promo.appliesToGroups.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Promotion Modal */}
      <Modal
        isOpen={addPromoOpen}
        onClose={() => setAddPromoOpen(false)}
        title="Add Approved Promotion"
        subtitle="Authorize a seasonal offer that Cedar may mention in drafts"
      >
        <div className="space-y-3">
          <Input
            label="Promotion Name"
            placeholder="e.g. Winter Showcase Restock"
            value={newPromoName}
            onChange={(e) => setNewPromoName(e.target.value)}
          />
          <Input
            label="Terms & Authorized Language"
            placeholder="e.g. Free display divider with any 4 humidors ordered"
            value={newPromoTerms}
            onChange={(e) => setNewPromoTerms(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setAddPromoOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newPromoName) {
                  promotions.push({
                    id: `promo-${Date.now()}`,
                    name: newPromoName,
                    terms: newPromoTerms,
                    startDate: '2026-10-15',
                    endDate: '2026-12-31',
                    appliesToGroups: ['A', 'B'],
                    active: true,
                  });
                  setAddPromoOpen(false);
                  showToast({ type: 'success', message: 'Promotion added to approved ledger.' });
                }
              }}
            >
              Authorize Promotion
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
