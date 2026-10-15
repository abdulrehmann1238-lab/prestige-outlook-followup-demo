import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  Pause,
  Play,
  UserX,
  FileText,
  Clock,
  ArrowUpDown,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Contact, ContactStatus } from '../../data/seed';
import { StatusPill } from '../../components/ui/StatusPill';
import { GroupDot } from '../../components/ui/GroupDot';
import { Button } from '../../components/ui/Button';
import { exportContactsToCsv, exportContactsToExcel } from '../../api/exporters';
import { useToast } from '../../components/ui/Toast';
import { ContactDetailDrawer } from './ContactDetail';

export const PipelinePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    contacts,
    inactiveThreshold,
    setInactiveThreshold,
    postOrderDays,
    setPostOrderDays,
    updateContactNextFollowUp,
    toggleContactPause,
    addToDnc,
  } = useCedarStore();
  const { showToast } = useToast();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Tab: 'ALL' | 'A' | 'B' | 'C'
  const activeTab = searchParams.get('group') || 'ALL';
  const selectedContactId = searchParams.get('id');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [repFilter, setRepFilter] = useState<string>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Sorting
  const [sortField, setSortField] = useState<keyof Contact>('business');
  const [sortAsc, setSortAsc] = useState(true);

  // Focus search with '/' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered contacts calculation
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      // Tab group filter
      if (activeTab !== 'ALL' && c.group !== activeTab) return false;

      // Group A threshold filter (simulate dynamic recalculation)
      if (activeTab === 'A' && c.lastOrderDaysAgo !== undefined) {
        if (c.lastOrderDaysAgo < inactiveThreshold) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.business.toLowerCase().includes(q);
        const matchesContact = c.contactName?.toLowerCase().includes(q) || false;
        const matchesCity = c.city.toLowerCase().includes(q);
        const matchesEmail = c.email?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesContact && !matchesCity && !matchesEmail) return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;

      // Rep filter
      if (repFilter !== 'ALL' && c.repId !== repFilter) return false;

      return true;
    });
  }, [contacts, activeTab, inactiveThreshold, searchQuery, statusFilter, repFilter]);

  // Sorted contacts
  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      const valA = a[sortField] || '';
      const valB = b[sortField] || '';
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredContacts, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedContacts.length / pageSize) || 1;
  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleTabChange = (tab: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tab === 'ALL') next.delete('group');
      else next.set('group', tab);
      return next;
    });
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleSort = (field: keyof Contact) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedContacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCsv = () => {
    exportContactsToCsv(filteredContacts, `prestige_pipeline_${activeTab.toLowerCase()}.csv`);
    showToast({
      type: 'success',
      message: `Exported ${filteredContacts.length} rows to CSV.`,
    });
  };

  const handleExportExcel = () => {
    exportContactsToExcel(filteredContacts, `prestige_pipeline_${activeTab.toLowerCase()}.xlsx`);
    showToast({
      type: 'success',
      message: `Exported ${filteredContacts.length} rows to Excel.`,
    });
  };

  // Group counts for tabs
  const countAll = contacts.length;
  const countA = contacts.filter((c) => c.group === 'A').length;
  const countB = contacts.filter((c) => c.group === 'B').length;
  const countC = contacts.filter((c) => c.group === 'C').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Pipeline
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Full relationship ledger across inactive accounts, recent buyers, and verified retail prospects
          </p>
        </div>

        {/* Export Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCsv}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV ({filteredContacts.length})
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportExcel}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between border-b border-[#E2DACB] gap-4 overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { id: 'ALL', label: 'All Accounts', count: countAll },
            { id: 'A', label: 'A · Inactive', count: countA, dot: 'A' },
            { id: 'B', label: 'B · Recent', count: countB, dot: 'B' },
            { id: 'C', label: 'C · Prospects', count: countC, dot: 'C' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-[13.5px] font-medium border-b-2 transition-all duration-120 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#2F4A3F] text-[#2F4A3F] font-semibold bg-[#E3EBE5]/30'
                  : 'border-transparent text-[#5E5249] hover:text-[#2A211B] hover:bg-[#EFE9DD]/50'
              }`}
            >
              {tab.dot && <GroupDot group={tab.dot as any} size="sm" />}
              <span>{tab.label}</span>
              <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded-full bg-[#EFE9DD] text-[#766A5E] tabular-nums">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Inactive After Threshold Slider for Tab A (PRD Requirement #1) */}
        {activeTab === 'A' && (
          <div className="flex items-center gap-2 py-1 px-3 bg-[#EFE4CF] rounded-[8px] border border-[#DFCBB0] text-[12.5px] text-[#7A4E2D] shrink-0">
            <span className="font-semibold">Inactive after:</span>
            {[90, 180, 240].map((days) => (
              <button
                key={days}
                onClick={() => {
                  setInactiveThreshold(days);
                  showToast({
                    type: 'info',
                    message: `Group A recalculated: ${days} days threshold applied.`,
                  });
                }}
                className={`px-2 py-0.5 rounded-[4px] text-[12px] font-semibold transition-colors ${
                  inactiveThreshold === days
                    ? 'bg-[#7A4E2D] text-white'
                    : 'bg-white/80 hover:bg-white text-[#7A4E2D]'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        )}

        {/* Tab B Post-order delay control (PRD Requirement #4) */}
        {activeTab === 'B' && (
          <div className="flex items-center gap-2 py-1 px-3 bg-[#E2F0E7] rounded-[8px] border border-[#C1DEC9] text-[12.5px] text-[#1F5333] shrink-0">
            <span className="font-semibold">Follow-up after shipment:</span>
            {[10, 14, 21].map((days) => (
              <button
                key={days}
                onClick={() => {
                  setPostOrderDays(days);
                  showToast({
                    type: 'info',
                    message: `Group B interval updated to ${days} days post-shipment.`,
                  });
                }}
                className={`px-2 py-0.5 rounded-[4px] text-[12px] font-semibold transition-colors ${
                  postOrderDays === days
                    ? 'bg-[#3F7D58] text-white'
                    : 'bg-white/80 hover:bg-white text-[#1F5333]'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FFFFFF] p-3 rounded-[10px] border border-[#E2DACB]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#766A5E] absolute left-3 top-2.5" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search business, buyer name, city... (Press / to focus)"
            className="w-full bg-[#EFE9DD] border border-[#CFC5B2] rounded-[8px] pl-9 pr-3 py-1.5 text-[13.5px] text-[#2A211B] placeholder-[#766A5E] outline-none focus:border-[#2F4A3F]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] px-2.5 py-1.5 text-[13px] text-[#2A211B] outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="draft_ready">Draft Ready</option>
            <option value="in_sequence">In Sequence</option>
            <option value="replied">Replied (Hot)</option>
            <option value="needs_person">Needs Person</option>
            <option value="paused">Paused</option>
            <option value="dnc">Do Not Contact</option>
          </select>

          {/* Rep filter */}
          <select
            value={repFilter}
            onChange={(e) => {
              setRepFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] px-2.5 py-1.5 text-[13px] text-[#2A211B] outline-none"
          >
            <option value="ALL">All Reps</option>
            <option value="marcus">Marcus Delgado</option>
            <option value="priya">Priya Raman</option>
            <option value="tom">Tom Eriksen</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar (Slides up when rows selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-[#2F4A3F] text-white px-4 py-2.5 rounded-[10px] flex items-center justify-between shadow-md animate-in fade-in slide-in-from-bottom-2 duration-160">
          <div className="text-[13.5px] font-medium">
            <strong>{selectedIds.length}</strong> accounts selected
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => {
                selectedIds.forEach((id) => toggleContactPause(id));
                setSelectedIds([]);
                showToast({ type: 'info', message: 'Toggled pause status for selected accounts.' });
              }}
              icon={<Pause className="w-3.5 h-3.5" />}
            >
              Toggle Pause
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                selectedIds.forEach((id) => {
                  const c = contacts.find((item) => item.id === id);
                  if (c?.email) addToDnc(c.email, 'Bulk suppression by sales rep');
                });
                setSelectedIds([]);
                showToast({ type: 'warning', message: 'Suppressed selected accounts across all queues.' });
              }}
              icon={<UserX className="w-3.5 h-3.5" />}
            >
              Add to Do-Not-Contact
            </Button>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(42,33,27,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead>
              <tr className="bg-[#EFE9DD] border-b border-[#E2DACB] text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider select-none">
                <th className="py-2.5 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={
                      paginatedContacts.length > 0 &&
                      paginatedContacts.every((c) => selectedIds.includes(c.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-[#CFC5B2]"
                  />
                </th>
                <th
                  onClick={() => handleSort('business')}
                  className="py-2.5 px-3 cursor-pointer hover:text-[#2A211B]"
                >
                  <span className="flex items-center gap-1">
                    <span>Business</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="py-2.5 px-3">City / State</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Last Order</th>
                <th className="py-2.5 px-3">Follow-ups</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Replied</th>
                <th className="py-2.5 px-3">Next Send</th>
                <th className="py-2.5 px-3">Rep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DACB]/70">
              {paginatedContacts.map((contact) => {
                const isSelected = selectedIds.includes(contact.id);

                return (
                  <tr
                    key={contact.id}
                    className={`hover:bg-[#EFE9DD]/50 transition-colors duration-120 cursor-pointer ${
                      isSelected ? 'bg-[#E3EBE5]/50' : ''
                    }`}
                    onClick={() => {
                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);
                        next.set('id', contact.id);
                        return next;
                      });
                    }}
                  >
                    <td
                      className="py-2.5 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(contact.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-[#CFC5B2]"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#2A211B] flex items-center gap-1.5">
                        <span>{contact.business}</span>
                        {contact.wholesaleAccountStatus === 'active' && (
                          <span className="text-[10px] bg-[#E3EBE5] text-[#1E3129] px-1 rounded font-bold">
                            DEALER
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#766A5E] truncate max-w-[200px]">
                        {contact.contactName ? `${contact.contactName} · ` : ''}
                        {contact.email || contact.phone || 'No direct email'}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-[#5E5249]">
                      {contact.city}, {contact.state}
                    </td>
                    <td className="py-2.5 px-3">
                      <GroupDot group={contact.group} showLabel />
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-[#5E5249]">
                      {contact.lastOrder ? (
                        <div>
                          <div>{contact.lastOrder}</div>
                          <div className="text-[11px] text-[#766A5E]">
                            {contact.lastOrderDaysAgo}d ago
                          </div>
                        </div>
                      ) : (
                        <span className="text-[#766A5E]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 tabular-nums text-[#5E5249]">
                      {contact.followUpsSent} of {contact.followUpsMax}
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusPill status={contact.status} />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {contact.replied ? (
                        <span className="inline-flex p-1 rounded-full bg-[#E2F0E7] text-[#3F7D58]">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      ) : (
                        <span className="text-[#766A5E]">—</span>
                      )}
                    </td>
                    <td
                      className="py-2.5 px-3 tabular-nums text-[#5E5249]"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newDate = window.prompt(
                          'Edit Next Follow-up Date (YYYY-MM-DD):',
                          contact.nextFollowUp || '2026-10-18'
                        );
                        if (newDate) {
                          updateContactNextFollowUp(contact.id, newDate);
                          showToast({ type: 'success', message: 'Next follow-up date updated.' });
                        }
                      }}
                    >
                      <span className="hover:underline hover:text-[#2F4A3F] font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#766A5E]" />
                        <span>{contact.nextFollowUp || 'Unscheduled'}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 capitalize text-[#5E5249] font-medium">
                      {contact.repId}
                    </td>
                  </tr>
                );
              })}

              {paginatedContacts.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#766A5E] text-[13.5px]">
                    No accounts match the active filter criteria. Try clearing search or switching groups.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="px-4 py-3 bg-[#FBF9F4] border-t border-[#E2DACB] flex items-center justify-between text-[13px] text-[#5E5249]">
          <div>
            Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong>{Math.min(currentPage * pageSize, filteredContacts.length)}</strong> of{' '}
            <strong>{filteredContacts.length}</strong> accounts
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Previous
            </Button>
            <span className="px-2 text-[12px] font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="secondary"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Detail Drawer */}
      <ContactDetailDrawer
        contactId={selectedContactId}
        onClose={() => {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete('id');
            return next;
          });
        }}
      />
    </div>
  );
};
