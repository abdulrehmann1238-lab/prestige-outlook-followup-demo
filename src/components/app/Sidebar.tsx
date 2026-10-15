import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Calendar,
  Layers,
  FileCheck,
  Search,
  ClipboardList,
  GitFork,
  Sliders,
  Mail,
  ShieldCheck,
  History,
  BarChart3,
  Cpu,
  Settings as SettingsIcon,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { BRAND } from '../../config/brand';
import { useToast } from '../ui/Toast';

export const Sidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { drafts, attentionItems, resetDemoData } = useCedarStore();
  const { showToast } = useToast();

  const handleReset = () => {
    if (window.confirm('Reset all demo state to original seeded database?')) {
      resetDemoData();
      showToast({ type: 'info', message: 'Demo data restored to initial state.' });
      onCloseMobile?.();
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3 py-2 rounded-[8px] text-[13.5px] font-medium transition-all duration-120 ${
      isActive
        ? 'bg-[#E3EBE5] text-[#1E3129] border-l-2 border-[#2F4A3F] pl-2.5 font-semibold'
        : 'text-[#5E5249] hover:bg-[#EFE9DD] hover:text-[#2A211B]'
    }`;

  return (
    <aside className="w-60 h-screen bg-[#FBF9F4] border-r border-[#E2DACB] flex flex-col justify-between select-none shrink-0 overflow-y-auto">
      {/* Top Header */}
      <div>
        <div className="h-16 px-5 border-b border-[#E2DACB] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-serif text-[24px] text-[#2A211B] font-medium tracking-tight">
              Cedar
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mt-1"></span>
            <span className="text-[10px] font-mono uppercase bg-[#EFE9DD] text-[#766A5E] px-1.5 py-0.5 rounded ml-1 border border-[#CFC5B2]">
              Demo
            </span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-6">
          {/* Work Group */}
          <div>
            <div className="px-3 mb-1.5 text-[11px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Work
            </div>
            <ul className="space-y-0.5">
              <li>
                <NavLink to="/app/today" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Today</span>
                  </span>
                  {attentionItems.length > 0 && (
                    <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#F7EAD0] text-[#7D5010] font-semibold">
                      {attentionItems.length}
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/pipeline" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Pipeline</span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/review" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Review Queue</span>
                  </span>
                  {drafts.length > 0 && (
                    <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#EFE4CF] text-[#7A4E2D] font-bold">
                      {drafts.length}
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/prospects" end className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Prospects</span>
                  </span>
                </NavLink>
              </li>
              <li className="pl-6">
                <NavLink to="/app/prospects/manual" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2">
                    <ClipboardList className="w-3.5 h-3.5 text-[#B7791F]" />
                    <span className="text-[12.5px]">Manual CAPTCHAs</span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Configure Group */}
          <div>
            <div className="px-3 mb-1.5 text-[11px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Configure
            </div>
            <ul className="space-y-0.5">
              <li>
                <NavLink to="/app/sequences" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <GitFork className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Sequences</span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/voice" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Voice & Catalog</span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/outlook" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Outlook Accounts</span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/compliance" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Compliance & DNC</span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Insight Group */}
          <div>
            <div className="px-3 mb-1.5 text-[11px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Insight
            </div>
            <ul className="space-y-0.5">
              <li>
                <NavLink to="/app/activity" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <History className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Activity History</span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/reports" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4 text-[#2F4A3F]" />
                    <span>Reports & Exports</span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/architecture" className={navLinkClass} onClick={onCloseMobile}>
                  <span className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-[#B08D57]" />
                    <span>Architecture</span>
                  </span>
                  <span className="text-[10px] bg-[#EFE4CF] text-[#7A4E2D] px-1 rounded font-medium">RE</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom Fixed Section */}
      <div className="p-3 border-t border-[#E2DACB] space-y-1 bg-[#FBF9F4]">
        <NavLink to="/app/settings" className={navLinkClass} onClick={onCloseMobile}>
          <span className="flex items-center gap-2.5">
            <SettingsIcon className="w-4 h-4 text-[#766A5E]" />
            <span>Settings</span>
          </span>
        </NavLink>

        <button
          onClick={handleReset}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-[8px] text-[12.5px] text-[#766A5E] hover:text-[#A63D2F] hover:bg-[#F6E0DC]/60 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <Link
          to="/"
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-[8px] text-[12.5px] text-[#766A5E] hover:text-[#2A211B] hover:bg-[#EFE9DD] transition-colors"
        >
          <span>Back to Landing</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};
