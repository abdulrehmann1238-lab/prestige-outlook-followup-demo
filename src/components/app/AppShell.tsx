import React, { useState } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Layers,
  FileCheck,
  Search,
  Menu,
  X,
  Sliders,
  ShieldCheck,
  Mail,
  History,
  BarChart3,
  Cpu,
  Settings,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DemoControls } from './DemoControls';
import { VARIANTS } from '../../motion/presets';
import { useCedarStore } from '../../store/useCedarStore';

export const AppShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { drafts, attentionItems } = useCedarStore();

  return (
    <div className="flex h-screen bg-[#F6F2EA] text-[#2A211B] overflow-hidden">
      {/* Desktop / Tablet Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar />

        {/* Scrollable Page Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <div className="max-w-[1360px] mx-auto pb-16 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={VARIANTS.routeTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Demo Controls Floating Widget */}
      <DemoControls />

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#FFFFFF] border-t border-[#E2DACB] flex items-center justify-around z-30 px-2 shadow-lg">
        <NavLink
          to="/app/today"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-[11px] ${
              isActive ? 'text-[#2F4A3F] font-bold' : 'text-[#766A5E]'
            }`
          }
        >
          <div className="relative">
            <Calendar className="w-4 h-4" />
            {attentionItems.length > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#B7791F]" />
            )}
          </div>
          <span>Today</span>
        </NavLink>

        <NavLink
          to="/app/pipeline"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-[11px] ${
              isActive ? 'text-[#2F4A3F] font-bold' : 'text-[#766A5E]'
            }`
          }
        >
          <Layers className="w-4 h-4" />
          <span>Pipeline</span>
        </NavLink>

        <NavLink
          to="/app/review"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-[11px] ${
              isActive ? 'text-[#2F4A3F] font-bold' : 'text-[#766A5E]'
            }`
          }
        >
          <div className="relative">
            <FileCheck className="w-4 h-4" />
            {drafts.length > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#B08D57]" />
            )}
          </div>
          <span>Review</span>
        </NavLink>

        <NavLink
          to="/app/prospects"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-[11px] ${
              isActive ? 'text-[#2F4A3F] font-bold' : 'text-[#766A5E]'
            }`
          }
        >
          <Search className="w-4 h-4" />
          <span>Prospects</span>
        </NavLink>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[11px] text-[#766A5E]"
        >
          <Menu className="w-4 h-4" />
          <span>More</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2A211B]/40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24 }}
              className="relative w-72 bg-[#FBF9F4] h-full shadow-2xl z-10"
            >
              <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
