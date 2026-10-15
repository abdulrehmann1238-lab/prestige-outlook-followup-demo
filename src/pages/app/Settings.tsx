import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
  Sliders,
  Database,
  Mail,
  Zap,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { Toggle } from '../../components/ui/Toggle';
import { BRAND } from '../../config/brand';
import { useToast } from '../../components/ui/Toast';

export const SettingsPage: React.FC = () => {
  const {
    inactiveThreshold,
    setInactiveThreshold,
    postOrderDays,
    setPostOrderDays,
    dailyRepLimit,
    setDailyRepLimit,
    autopilot,
    resetDemoData,
    liveSimulatorActive,
    toggleLiveSimulator,
  } = useCedarStore();
  const { showToast } = useToast();

  const [isAutopilotEnabled, setIsAutopilotEnabled] = useState(autopilot);

  const handleToggleAutopilot = (val: boolean) => {
    if (val) {
      if (
        window.confirm(
          'Enable Controlled Autopilot? Cedar will automatically dispatch drafts that pass all 5 pre-send checks. Review will remain strictly required for first-time prospects.'
        )
      ) {
        setIsAutopilotEnabled(true);
        showToast({
          type: 'warning',
          message: 'Autopilot enabled for trusted recurring customer patterns.',
        });
      }
    } else {
      setIsAutopilotEnabled(false);
      showToast({ type: 'info', message: 'Autopilot disabled. 100% review-first active.' });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo state to original seeded database?')) {
      resetDemoData();
      showToast({ type: 'info', message: 'Demo data restored to initial state.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            System Settings & Team Management
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Tenant defaults, safety tolerances, rep roles, and simulated integrations
          </p>
        </div>

        <Button
          size="sm"
          variant="danger"
          onClick={handleReset}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Demo Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timing Defaults Card */}
        <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E2DACB] pb-2 font-serif text-[16px] text-[#2A211B] font-medium">
            <Clock className="w-4 h-4 text-[#2F4A3F]" />
            <span>Workflow Timing Tolerances</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-[13px]">
              <div>
                <span className="font-semibold text-[#2A211B]">Group A Inactivity Threshold:</span>
                <p className="text-[12px] text-[#766A5E]">Days without order before reactivation</p>
              </div>
              <span className="font-serif font-bold text-[16px] text-[#7A4E2D] tabular-nums">
                {inactiveThreshold} days
              </span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div>
                <span className="font-semibold text-[#2A211B]">Group B Post-Order Delay:</span>
                <p className="text-[12px] text-[#766A5E]">Days after shipment arrival</p>
              </div>
              <span className="font-serif font-bold text-[16px] text-[#3F7D58] tabular-nums">
                {postOrderDays} days
              </span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div>
                <span className="font-semibold text-[#2A211B]">Daily Rep Outbound Cap:</span>
                <p className="text-[12px] text-[#766A5E]">Maximum emails dispatched per rep</p>
              </div>
              <span className="font-serif font-bold text-[16px] text-[#2F4A3F] tabular-nums">
                {dailyRepLimit} / day
              </span>
            </div>
          </div>
        </div>

        {/* Autopilot Mode Card */}
        <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#E2DACB] pb-2 font-serif text-[16px] text-[#2A211B] font-medium">
            <Zap className="w-4 h-4 text-[#B08D57]" />
            <span>Autopilot Dispatch Modes</span>
          </div>

          <div className="space-y-3">
            <Toggle
              checked={isAutopilotEnabled}
              onChange={handleToggleAutopilot}
              label="Controlled Autopilot Mode"
              description="When enabled, drafts that pass 100% of safety checks can send automatically. Off by default per client brief."
            />

            <Toggle
              checked={liveSimulatorActive}
              onChange={toggleLiveSimulator}
              label="Simulated Live Events"
              description="Generates occasional live inbound replies and activity events in the demo background."
            />
          </div>
        </div>
      </div>

      {/* Team Roster */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E2DACB] pb-2 font-serif text-[16px] text-[#2A211B] font-medium">
          <Users className="w-4 h-4 text-[#2F4A3F]" />
          <span>Assigned Sales Reps ({BRAND.reps.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BRAND.reps.map((rep) => (
            <div
              key={rep.id}
              className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center text-[12px]"
                  style={{ backgroundColor: rep.color }}
                >
                  {rep.initials}
                </div>
                <div>
                  <div className="font-semibold text-[13.5px] text-[#2A211B]">{rep.name}</div>
                  <div className="text-[11.5px] text-[#766A5E]">{rep.role}</div>
                </div>
              </div>
              <div className="text-[12px] font-mono text-[#5E5249] pt-1">{rep.email}</div>
              <div className="text-[11.5px] text-[#3F7D58] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Outlook Graph Connected</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Integrations Health */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E2DACB] pb-2 font-serif text-[16px] text-[#2A211B] font-medium">
          <Database className="w-4 h-4 text-[#2F4A3F]" />
          <span>System Integrations Status (Simulated)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[12.5px]">
          <div className="p-3 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px]">
            <div className="font-semibold text-[#1F5333]">QuickBooks</div>
            <div className="text-[11.5px] text-[#2F4A3F] mt-0.5">Read-only orders & invoices</div>
          </div>
          <div className="p-3 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px]">
            <div className="font-semibold text-[#1F5333]">Microsoft 365</div>
            <div className="text-[11.5px] text-[#2F4A3F] mt-0.5">Delegated Graph OAuth</div>
          </div>
          <div className="p-3 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px]">
            <div className="font-semibold text-[#1F5333]">Supabase Database</div>
            <div className="text-[11.5px] text-[#2F4A3F] mt-0.5">PostgreSQL audit ledger</div>
          </div>
          <div className="p-3 bg-[#E2F0E7] border border-[#C1DEC9] rounded-[8px]">
            <div className="font-semibold text-[#1F5333]">Prestige Website</div>
            <div className="text-[11.5px] text-[#2F4A3F] mt-0.5">Wholesale invite portal</div>
          </div>
        </div>
      </div>
    </div>
  );
};
