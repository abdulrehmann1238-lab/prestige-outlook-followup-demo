import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#F6F2EA]/95 border-b border-[#E2DACB] shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Wordmark */}
        <Link to="/" className="flex items-center gap-1.5 group select-none">
          <span className="font-serif text-[26px] font-medium text-[#2A211B] tracking-tight">
            Cedar
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mt-1" />
          <span className="text-[11px] font-mono uppercase bg-[#EFE9DD] text-[#766A5E] px-1.5 py-0.5 rounded ml-1 border border-[#CFC5B2] hidden sm:inline">
            Prestige Demo
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-[14px] text-[#5E5249] font-medium">
          <a
            href="#three-groups"
            className="hover:text-[#2A211B] transition-colors relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#2F4A3F] after:absolute after:bottom-[-2px] after:left-0 after:transition-all"
          >
            How It Works
          </a>
          <a
            href="#draft-showcase"
            className="hover:text-[#2A211B] transition-colors relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#2F4A3F] after:absolute after:bottom-[-2px] after:left-0 after:transition-all"
          >
            Draft Grounding
          </a>
          <a
            href="#safeguards"
            className="hover:text-[#2A211B] transition-colors relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#2F4A3F] after:absolute after:bottom-[-2px] after:left-0 after:transition-all"
          >
            Safeguards
          </a>
          <a
            href="#architecture"
            className="hover:text-[#2A211B] transition-colors relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#2F4A3F] after:absolute after:bottom-[-2px] after:left-0 after:transition-all"
          >
            Architecture
          </a>
          <a
            href="#delivery"
            className="hover:text-[#2A211B] transition-colors relative hover:after:w-full after:w-0 after:h-[1px] after:bg-[#2F4A3F] after:absolute after:bottom-[-2px] after:left-0 after:transition-all"
          >
            What You Receive
          </a>
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="text-[13.5px] font-medium text-[#5E5249] hover:text-[#2A211B] px-3 py-1.5"
          >
            See the Plan
          </a>
          <Button
            size="sm"
            onClick={() => navigate('/app/today')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Open the Live Demo
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#2A211B]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E2DACB] px-5 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-[15px] font-medium text-[#2A211B]">
            <a
              href="#three-groups"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              How It Works (Three Groups)
            </a>
            <a
              href="#draft-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Grounded Drafting
            </a>
            <a
              href="#safeguards"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Safeguards & Compliance
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Architecture & Stack
            </a>
            <a
              href="#delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              What You Receive
            </a>
          </div>

          <div className="pt-3 border-t border-[#E2DACB]">
            <Button
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/app/today');
              }}
            >
              Open the Live Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
