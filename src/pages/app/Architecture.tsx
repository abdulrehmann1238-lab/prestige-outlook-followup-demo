import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Database,
  Mail,
  GitBranch,
  Server,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Info,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ArchitecturePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('worker');
  const [deploymentTarget, setDeploymentTarget] = useState<'office_pc' | 'cloud_vps'>('office_pc');

  const nodes = [
    {
      id: 'quickbooks',
      name: 'QuickBooks Connector',
      category: 'Accounting Source',
      tech: 'Read-Only QuickBooks API / Desktop Connector',
      cost: '$0 / mo (Existing accounting software)',
      description:
        'Reads customer accounts, order dates, line items, and shipping status. Strictly read-only: never modifies books, invoices, or ledgers.',
      details: [
        'Syncs once every morning at 7:00 AM ET',
        'Extracts last order date and purchased SKUs for grounding',
        'Detects new shipments for 14-day Group B triggers',
      ],
    },
    {
      id: 'worker',
      name: 'Cedar Automation Worker',
      category: 'Core AI Engine',
      tech: 'Python 3.11 + FastAPI + Background Scheduler',
      cost: '$15 – $25 / mo (or $0 on local PC)',
      description:
        'The brains of the system. Runs sequence scheduling, checks catalog stock availability, calls LLM for draft generation, and enforces the 5 pre-send checks.',
      details: [
        'Local SQLite / Postgres connection',
        'Deterministic rule grounding against approved catalog & promotions',
        'Pre-send validation: verifies DNC, limits, discounts, and footer',
      ],
    },
    {
      id: 'supabase',
      name: 'Database & Audit Store',
      category: 'Data Storage',
      tech: 'Supabase (PostgreSQL) + Row Level Security',
      cost: '$0 – $25 / mo (Generous free tier)',
      description:
        'Stores prospect records, conversation threads, draft approval queues, Do-Not-Contact registry, and the permanent audit log.',
      details: [
        'Automated daily database backups',
        'Immutable event logging for complete safety tracking',
        'Dedicated tables for Group A, Group B, and Group C accounts',
      ],
    },
    {
      id: 'outlook',
      name: 'Microsoft Graph (Outlook)',
      category: 'Official Email Dispatch',
      tech: 'Delegated OAuth 2.0 (Official Microsoft API)',
      cost: '$0 / mo (Included in M365 Business)',
      description:
        'Sends real authenticated emails from Marcus, Priya, and Tom. Messages appear in their real Sent Items folder and responses arrive directly to their inboxes.',
      details: [
        'Authentic DKIM, SPF, and DMARC reputation',
        'Polls rep inboxes every 5 minutes for reply detection',
        'Immediately halts sequences when customer replies',
      ],
    },
    {
      id: 'n8n',
      name: 'n8n Workflow Engine (Optional)',
      category: 'Visual Triggers',
      tech: 'Self-Hosted n8n / Webhooks',
      cost: '$0 / mo (Open source self-hosted)',
      description:
        'Optional visual workflow engine for alert routing, Slack/email notifications of hot replies, and morning digest summaries.',
      details: [
        'Optional addition for non-technical visual debugging',
        'Dispatches hot lead alerts to reps on customer reply',
      ],
    },
    {
      id: 'github',
      name: 'Private GitHub Repository',
      category: 'Code Ownership',
      tech: 'Git Version Control',
      cost: '$0 / mo',
      description:
        'You own 100% of the clean, documented source code. No vendor lock-in, proprietary runtime subscriptions, or per-seat licensing.',
      details: [
        'Clean TypeScript and Python codebases',
        'Docker Compose one-click setup script included',
        'Full step-by-step documentation for your IT staff',
      ],
    },
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
              Recommended Architecture & Stack
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EFE4CF] text-[#7A4E2D] border border-[#DFCBB0]">
              Recommended Enhancement
            </span>
          </div>
          <p className="text-[14px] text-[#5E5249]">
            The simplest, most reliable stack that avoids expensive CRM subscriptions (Answers Brief Q4 & Q9)
          </p>
        </div>
      </div>

      {/* Interactive Horizontal Architecture Pipeline */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2DACB] pb-3">
          <div>
            <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
              System Component Pipeline
            </h3>
            <p className="text-[12.5px] text-[#766A5E]">
              Click any component to inspect technical role, data flow, and running cost
            </p>
          </div>
          <span className="text-[12px] font-semibold text-[#2F4A3F] bg-[#E3EBE5] px-2.5 py-1 rounded">
            Estimated Stack Cost: ~$0 to $25 / month total
          </span>
        </div>

        {/* Nodes Grid / Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {nodes.map((node) => {
            const isSelected = node.id === selectedNode;

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-3.5 rounded-[10px] text-left border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-[#E3EBE5] border-[#2F4A3F] shadow-sm ring-2 ring-[#2F4A3F]/20'
                    : 'bg-[#FBF9F4] border-[#E2DACB] hover:bg-[#FFFFFF] hover:border-[#CFC5B2]'
                }`}
              >
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#766A5E] truncate">
                    {node.category}
                  </div>
                  <div className="font-semibold text-[13.5px] text-[#2A211B] mt-1 leading-snug">
                    {node.name}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#3F7D58] font-medium pt-2 border-t border-[#E2DACB]/60">
                  {node.cost.split(' ')[0]} / mo
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Node Detail Card */}
        <div className="p-5 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3 animate-in fade-in duration-160">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E2DACB] gap-2">
            <div>
              <span className="text-[12px] font-bold text-[#7A4E2D] uppercase tracking-wider">
                {activeNodeData.category}
              </span>
              <h4 className="font-serif text-[18px] text-[#2A211B] font-semibold">
                {activeNodeData.name}
              </h4>
            </div>
            <div className="text-[13px] font-semibold text-[#3F7D58] bg-[#E2F0E7] px-3 py-1 rounded border border-[#C1DEC9]">
              Estimated Cost: {activeNodeData.cost}
            </div>
          </div>

          <div className="text-[12px] font-mono text-[#5E5249]">
            <strong>Technology:</strong> {activeNodeData.tech}
          </div>

          <p className="text-[13.5px] text-[#2A211B] leading-relaxed">
            {activeNodeData.description}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-[#E2DACB]/60">
            <span className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
              Technical Implementation Highlights:
            </span>
            <ul className="space-y-1 text-[13px] text-[#5E5249]">
              {activeNodeData.details.map((dt, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58] shrink-0" />
                  <span>{dt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Deployment Host Options: Office PC vs Small Cloud VPS */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2DACB] pb-3">
          <div>
            <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
              Where to Run Cedar: Deployment Comparison
            </h3>
            <p className="text-[12.5px] text-[#766A5E]">
              Client requested simple installation without ongoing enterprise subscription fees
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Office Computer */}
          <div
            onClick={() => setDeploymentTarget('office_pc')}
            className={`p-5 rounded-[10px] border cursor-pointer transition-all ${
              deploymentTarget === 'office_pc'
                ? 'bg-[#E3EBE5]/60 border-[#2F4A3F] ring-2 ring-[#2F4A3F]/20'
                : 'bg-[#FBF9F4] border-[#E2DACB] hover:bg-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-[16px] font-semibold text-[#2A211B]">
                Option A: Local Office PC
              </h4>
              <span className="text-[12px] font-bold text-[#3F7D58] bg-[#E2F0E7] px-2 py-0.5 rounded">
                $0 / month
              </span>
            </div>
            <p className="text-[13px] text-[#5E5249] leading-relaxed mb-3">
              Runs as a quiet Windows background service on any existing office PC that stays powered on.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-[#2A211B]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>Zero monthly hosting fees</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>Direct access to QuickBooks Desktop files if needed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>All data stays on your local office network</span>
              </li>
            </ul>
          </div>

          {/* Option 2: Small Cloud VPS */}
          <div
            onClick={() => setDeploymentTarget('cloud_vps')}
            className={`p-5 rounded-[10px] border cursor-pointer transition-all ${
              deploymentTarget === 'cloud_vps'
                ? 'bg-[#E3EBE5]/60 border-[#2F4A3F] ring-2 ring-[#2F4A3F]/20'
                : 'bg-[#FBF9F4] border-[#E2DACB] hover:bg-[#FFFFFF]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-[16px] font-semibold text-[#2A211B]">
                Option B: Small Private Cloud VPS
              </h4>
              <span className="text-[12px] font-bold text-[#B08D57] bg-[#EFE4CF] px-2 py-0.5 rounded">
                ~$15 – $20 / month
              </span>
            </div>
            <p className="text-[13px] text-[#5E5249] leading-relaxed mb-3">
              Runs in a secure private Docker container on Hetzner or DigitalOcean. Always on 24/7.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-[#2A211B]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>24/7 reliable uptime independent of office power</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>Zero hardware maintenance for your team</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3F7D58]" />
                <span>Easy automated offsite snapshots</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
