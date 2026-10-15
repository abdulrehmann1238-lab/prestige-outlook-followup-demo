import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Pause, Download, UserPlus, FileText, CheckCircle2 } from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { useHotkeys } from '../../hooks/useHotkeys';
import { exportContactsToCsv } from '../../api/exporters';
import { useToast } from '../ui/Toast';

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { contacts, isPaused, togglePause } = useCedarStore();
  const { showToast } = useToast();

  useHotkeys('Escape', () => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredContacts = query.trim()
    ? contacts
        .filter(
          (c) =>
            c.business.toLowerCase().includes(query.toLowerCase()) ||
            c.contactName?.toLowerCase().includes(query.toLowerCase()) ||
            c.city.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const actions = [
    {
      id: 'act-pause',
      label: isPaused ? 'Resume all sending' : 'Pause all sending (Emergency)',
      icon: Pause,
      category: 'Actions',
      run: () => {
        togglePause();
        showToast({
          type: isPaused ? 'success' : 'error',
          message: isPaused ? 'Sending resumed across all mailboxes' : 'Emergency pause activated',
        });
        onClose();
      },
    },
    {
      id: 'act-export-a',
      label: 'Export Group A Inactive accounts (CSV)',
      icon: Download,
      category: 'Exports',
      run: () => {
        const groupA = contacts.filter((c) => c.group === 'A');
        exportContactsToCsv(groupA, 'Group_A_Inactive.csv');
        showToast({ type: 'success', message: 'Downloaded Group A CSV export' });
        onClose();
      },
    },
    {
      id: 'act-review',
      label: 'Go to Review Queue',
      icon: FileText,
      category: 'Navigation',
      run: () => {
        navigate('/app/review');
        onClose();
      },
    },
    {
      id: 'act-prospects',
      label: 'Run Prospect Discovery',
      icon: Search,
      category: 'Actions',
      run: () => {
        navigate('/app/prospects');
        onClose();
      },
    },
    {
      id: 'act-dnc',
      label: 'Add to Do Not Contact (Compliance)',
      icon: UserPlus,
      category: 'Compliance',
      run: () => {
        navigate('/app/compliance');
        onClose();
      },
    },
  ];

  const filteredActions = query.trim()
    ? actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
    : actions;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#2A211B]/40 backdrop-blur-[1px]">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[560px] bg-[#FFFFFF] border border-[#CFC5B2] rounded-[12px] shadow-[0_16px_40px_rgba(42,33,27,0.18)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-160">
        <div className="flex items-center px-4 py-3 border-b border-[#E2DACB] bg-[#FBF9F4]">
          <Search className="w-4 h-4 text-[#766A5E] shrink-0 mr-2.5" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search accounts, or screen..."
            className="w-full bg-transparent text-[14.5px] text-[#2A211B] placeholder-[#766A5E] outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[11px] font-mono text-[#766A5E] bg-[#EFE9DD] border border-[#CFC5B2] rounded-[4px]">
            ESC
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2 divide-y divide-[#E2DACB]/60">
          {filteredContacts.length > 0 && (
            <div className="py-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#766A5E] px-3 py-1">
                Accounts
              </div>
              {filteredContacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    navigate(`/app/pipeline/${c.id}`);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-[6px] hover:bg-[#EFE9DD] flex items-center justify-between text-[13.5px] text-[#2A211B]"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.business}</span>
                    <span className="text-[12px] text-[#766A5E]">
                      ({c.city}, {c.state})
                    </span>
                  </div>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#E3EBE5] text-[#2F4A3F] font-medium">
                    Group {c.group}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="py-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#766A5E] px-3 py-1">
              Actions & Navigation
            </div>
            {filteredActions.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={act.run}
                  className="w-full text-left px-3 py-2 rounded-[6px] hover:bg-[#EFE9DD] flex items-center justify-between text-[13.5px] text-[#2A211B]"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#2F4A3F]" />
                    <span>{act.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#766A5E]" />
                </button>
              );
            })}
          </div>

          {filteredContacts.length === 0 && filteredActions.length === 0 && (
            <div className="p-6 text-center text-[13px] text-[#766A5E]">
              No results found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
