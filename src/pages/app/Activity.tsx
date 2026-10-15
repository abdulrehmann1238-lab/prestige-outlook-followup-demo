import React, { useState } from 'react';
import {
  History,
  Download,
  Filter,
  Search,
  Send,
  MessageSquare,
  Pause,
  FileEdit,
  UserX,
  ClipboardList,
  UserCheck,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export const ActivityPage: React.FC = () => {
  const { activity } = useCedarStore();
  const { showToast } = useToast();

  const [actorFilter, setActorFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivity = activity.filter((item) => {
    if (actorFilter !== 'ALL' && item.actor !== actorFilter) return false;
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.action.toLowerCase().includes(q) ||
        item.contactBusiness.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleExportActivity = () => {
    const headers = ['Timestamp', 'Actor', 'Action', 'Target Account', 'Details'];
    const rows = filteredActivity.map((a) => [
      `"${a.timestamp}"`,
      `"${a.actor}"`,
      `"${a.action}"`,
      `"${a.contactBusiness.replace(/"/g, '""')}"`,
      `"${a.detail.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cedar_activity_audit_log.csv';
    link.click();
    showToast({ type: 'success', message: 'Activity audit log exported to CSV.' });
  };

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F7D58] bg-[#E2F0E7] px-2 py-0.5 rounded">
            <Send className="w-3 h-3" />
            <span>Sent</span>
          </span>
        );
      case 'reply':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3F7D58] bg-[#E2F0E7] px-2 py-0.5 rounded">
            <MessageSquare className="w-3 h-3" />
            <span>Reply</span>
          </span>
        );
      case 'pause':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A63D2F] bg-[#F6E0DC] px-2 py-0.5 rounded">
            <Pause className="w-3 h-3" />
            <span>Pause</span>
          </span>
        );
      case 'opt_out':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A63D2F] bg-[#F6E0DC] px-2 py-0.5 rounded">
            <UserX className="w-3 h-3" />
            <span>Opt-Out</span>
          </span>
        );
      case 'takeover':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F4A3F] bg-[#E3EBE5] px-2 py-0.5 rounded">
            <UserCheck className="w-3 h-3" />
            <span>Takeover</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#766A5E] bg-[#EFE9DD] px-2 py-0.5 rounded">
            <FileEdit className="w-3 h-3" />
            <span>System</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Activity History & Audit Trail
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Permanent, immutable ledger of all email drafts, send events, replies, pauses, and approvals
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleExportActivity}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Export Log (CSV)
        </Button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FFFFFF] p-3 rounded-[10px] border border-[#E2DACB]">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#766A5E] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action or business..."
            className="w-full bg-[#EFE9DD] border border-[#CFC5B2] rounded-[8px] pl-9 pr-3 py-1.5 text-[13.5px] text-[#2A211B] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={actorFilter}
            onChange={(e) => setActorFilter(e.target.value)}
            className="bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] px-2.5 py-1.5 text-[13px] outline-none"
          >
            <option value="ALL">All Actors</option>
            <option value="Cedar">Cedar (Automated Engine)</option>
            <option value="Marcus Delgado">Marcus Delgado</option>
            <option value="Priya Raman">Priya Raman</option>
            <option value="Tom Eriksen">Tom Eriksen</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] px-2.5 py-1.5 text-[13px] outline-none"
          >
            <option value="ALL">All Event Types</option>
            <option value="sent">Dispatched Sends</option>
            <option value="reply">Detected Replies</option>
            <option value="pause">Emergency Pauses</option>
            <option value="opt_out">Opt-Outs & DNC</option>
            <option value="takeover">Rep Takeovers</option>
          </select>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px]">
            <thead>
              <tr className="bg-[#EFE9DD] border-b border-[#E2DACB] text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
                <th className="py-2.5 px-3 w-28">Timestamp</th>
                <th className="py-2.5 px-3 w-40">Actor</th>
                <th className="py-2.5 px-3 w-32">Event Type</th>
                <th className="py-2.5 px-3 w-56">Account / Target</th>
                <th className="py-2.5 px-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DACB]/60">
              {filteredActivity.map((item) => (
                <tr key={item.id} className="hover:bg-[#FBF9F4]">
                  <td className="py-2.5 px-3 text-[#766A5E] tabular-nums whitespace-nowrap">
                    {item.timestamp}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#2A211B]">{item.actor}</td>
                  <td className="py-2.5 px-3">{getActionBadge(item.type)}</td>
                  <td className="py-2.5 px-3 font-medium text-[#2A211B]">
                    {item.contactBusiness}
                  </td>
                  <td className="py-2.5 px-3 text-[#5E5249] leading-relaxed">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
