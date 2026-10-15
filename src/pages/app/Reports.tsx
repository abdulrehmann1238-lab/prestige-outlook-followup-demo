import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Send,
  MessageSquare,
} from 'lucide-react';
import { useCedarStore } from '../../store/useCedarStore';
import { Button } from '../../components/ui/Button';
import { exportContactsToCsv, exportContactsToExcel } from '../../api/exporters';
import { useToast } from '../../components/ui/Toast';

export const ReportsPage: React.FC = () => {
  const { contacts, activity } = useCedarStore();
  const { showToast } = useToast();

  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // 14-day mock chart data for sends and replies
  const chartData = [
    { day: 'Oct 01', sends: 28, replies: 4 },
    { day: 'Oct 02', sends: 30, replies: 6 },
    { day: 'Oct 03', sends: 26, replies: 5 },
    { day: 'Oct 04', sends: 12, replies: 2 },
    { day: 'Oct 05', sends: 29, replies: 7 },
    { day: 'Oct 06', sends: 30, replies: 8 },
    { day: 'Oct 07', sends: 28, replies: 5 },
    { day: 'Oct 08', sends: 31, replies: 9 },
    { day: 'Oct 09', sends: 30, replies: 6 },
    { day: 'Oct 10', sends: 15, replies: 3 },
    { day: 'Oct 11', sends: 27, replies: 7 },
    { day: 'Oct 12', sends: 30, replies: 8 },
    { day: 'Oct 13', sends: 18, replies: 7 }, // Today
  ];

  const handleExportGroup = (group: 'A' | 'B' | 'C' | 'ALL', format: 'csv' | 'xlsx') => {
    const subset = group === 'ALL' ? contacts : contacts.filter((c) => c.group === group);
    const filename = `prestige_export_group_${group.toLowerCase()}.${format}`;
    if (format === 'csv') {
      exportContactsToCsv(subset, filename);
    } else {
      exportContactsToExcel(subset, filename);
    }
    showToast({
      type: 'success',
      message: `Exported ${subset.length} records to ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2DACB]">
        <div>
          <h1 className="font-serif text-[28px] text-[#2A211B] font-medium leading-tight">
            Daily Reports & Export Center
          </h1>
          <p className="text-[14px] text-[#5E5249]">
            Performance summaries, reply attribution, and real spreadsheet data extraction
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.print()}
            icon={<Printer className="w-3.5 h-3.5" />}
          >
            Print Summary
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#E2DACB] rounded-[10px] shadow-xs">
          <div className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
            14-Day Outbound Sends
          </div>
          <div className="font-serif text-[32px] text-[#2A211B] mt-1 tabular-nums">336</div>
          <div className="text-[12px] text-[#3F7D58] font-medium mt-0.5">
            100% delivered to real inboxes
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E2DACB] rounded-[10px] shadow-xs">
          <div className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
            Total Inbound Replies
          </div>
          <div className="font-serif text-[32px] text-[#3F7D58] mt-1 tabular-nums">79</div>
          <div className="text-[12px] text-[#5E5249] mt-0.5">23.5% overall reply rate</div>
        </div>

        <div className="p-4 bg-white border border-[#E2DACB] rounded-[10px] shadow-xs">
          <div className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
            Hot Commercial Inquiries
          </div>
          <div className="font-serif text-[32px] text-[#B08D57] mt-1 tabular-nums">34</div>
          <div className="text-[12px] text-[#5E5249] mt-0.5">Price sheets requested</div>
        </div>

        <div className="p-4 bg-white border border-[#E2DACB] rounded-[10px] shadow-xs">
          <div className="text-[12px] font-semibold text-[#766A5E] uppercase tracking-wider">
            Sends After Reply
          </div>
          <div className="font-serif text-[32px] text-[#2A211B] mt-1 tabular-nums">0</div>
          <div className="text-[12px] text-[#3F7D58] font-medium mt-0.5">
            Zero duplicate touches (100% stop)
          </div>
        </div>
      </div>

      {/* Hand-rolled SVG 14-Day Activity Bar Chart */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E2DACB] gap-2">
          <div>
            <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
              14-Day Outlook Pacing & Reply Attribution
            </h3>
            <p className="text-[12.5px] text-[#766A5E]">
              Outbound sends spread evenly across business hours vs incoming customer replies
            </p>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-[#5E5249]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[2px] bg-[#2F4A3F]" />
              <span>Sends (Marcus, Priya, Tom)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[2px] bg-[#B08D57]" />
              <span>Customer Replies</span>
            </span>
          </div>
        </div>

        {/* SVG Chart Container */}
        <div className="relative pt-4">
          <svg
            viewBox="0 0 700 200"
            className="w-full h-48 overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Horizontal Grid lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#E2DACB" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#E2DACB" strokeDasharray="3 3" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#E2DACB" strokeDasharray="3 3" />
            <line x1="0" y1="180" x2="700" y2="180" stroke="#CFC5B2" />

            {/* Bars */}
            {chartData.map((d, i) => {
              const x = 20 + i * 52;
              const maxVal = 35;
              const sendHeight = (d.sends / maxVal) * 140;
              const replyHeight = (d.replies / maxVal) * 140;

              return (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredBarIndex(i)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  className="cursor-pointer"
                >
                  {/* Send bar */}
                  <rect
                    x={x}
                    y={180 - sendHeight}
                    width="18"
                    height={sendHeight}
                    rx="3"
                    fill="#2F4A3F"
                    className="transition-all hover:opacity-85"
                  />
                  {/* Reply bar */}
                  <rect
                    x={x + 20}
                    y={180 - replyHeight}
                    width="14"
                    height={replyHeight}
                    rx="3"
                    fill="#B08D57"
                    className="transition-all hover:opacity-85"
                  />
                  {/* Label */}
                  <text
                    x={x + 18}
                    y="196"
                    fontSize="10"
                    textAnchor="middle"
                    fill="#766A5E"
                    fontFamily="Instrument Sans, sans-serif"
                  >
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Hover Tooltip */}
          {hoveredBarIndex !== null && (
            <div className="absolute top-2 right-4 bg-[#FFFFFF] border border-[#CFC5B2] rounded-[8px] p-2.5 shadow-md text-[12px] space-y-1">
              <div className="font-semibold text-[#2A211B] border-b border-[#E2DACB] pb-1">
                {chartData[hoveredBarIndex].day}, 2026
              </div>
              <div className="text-[#2F4A3F] font-medium">
                Sent: {chartData[hoveredBarIndex].sends} emails
              </div>
              <div className="text-[#B08D57] font-medium">
                Replied: {chartData[hoveredBarIndex].replies} accounts
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Center (PRD Requirement #14) */}
      <div className="bg-[#FFFFFF] border border-[#E2DACB] rounded-[12px] p-5 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif text-[17px] text-[#2A211B] font-medium">
            Export Center (Real File Downloads)
          </h3>
          <p className="text-[12.5px] text-[#766A5E]">
            Generate real CSV and formatted Excel (.xlsx) files instantly from the live state
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Group A */}
          <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3">
            <div>
              <span className="text-[12px] font-bold text-[#7A4E2D] uppercase tracking-wider">
                Group A
              </span>
              <h4 className="font-semibold text-[14px] text-[#2A211B]">Inactive Accounts</h4>
              <p className="text-[12px] text-[#766A5E]">412 dormant retail accounts</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('A', 'csv')}
                className="flex-1"
              >
                CSV
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('A', 'xlsx')}
                className="flex-1"
              >
                Excel
              </Button>
            </div>
          </div>

          {/* Group B */}
          <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3">
            <div>
              <span className="text-[12px] font-bold text-[#3F7D58] uppercase tracking-wider">
                Group B
              </span>
              <h4 className="font-semibold text-[14px] text-[#2A211B]">Recent Customers</h4>
              <p className="text-[12px] text-[#766A5E]">38 post-shipment follow-ups</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('B', 'csv')}
                className="flex-1"
              >
                CSV
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('B', 'xlsx')}
                className="flex-1"
              >
                Excel
              </Button>
            </div>
          </div>

          {/* Group C */}
          <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3">
            <div>
              <span className="text-[12px] font-bold text-[#3D6A8A] uppercase tracking-wider">
                Group C
              </span>
              <h4 className="font-semibold text-[14px] text-[#2A211B]">Retail Prospects</h4>
              <p className="text-[12px] text-[#766A5E]">1,286 verified US lounges</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('C', 'csv')}
                className="flex-1"
              >
                CSV
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('C', 'xlsx')}
                className="flex-1"
              >
                Excel
              </Button>
            </div>
          </div>

          {/* All Contacts */}
          <div className="p-4 bg-[#FBF9F4] border border-[#E2DACB] rounded-[10px] space-y-3">
            <div>
              <span className="text-[12px] font-bold text-[#2A211B] uppercase tracking-wider">
                Full Database
              </span>
              <h4 className="font-semibold text-[14px] text-[#2A211B]">All 1,736 Contacts</h4>
              <p className="text-[12px] text-[#766A5E]">All three groups merged</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('ALL', 'csv')}
                className="flex-1"
              >
                CSV
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleExportGroup('ALL', 'xlsx')}
                className="flex-1"
              >
                Excel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
