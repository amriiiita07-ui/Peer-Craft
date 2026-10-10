import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { MobileNav } from './MobileNav';
import { PeerCraftAIMentor } from '../ai/PeerCraftAIMentor';
import { AvatarPickerModal } from '../modals/AvatarPickerModal';

export const AppLayout: React.FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isSidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-[#F3F7EA] dark:bg-[#0D1610] text-[#1D3024] dark:text-[#ECF5EE] flex w-full overflow-x-hidden transition-colors">
      {/* Desktop Fixed Left Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative z-10 w-[260px] h-full shadow-2xl animate-in slide-in-from-left">
            <Sidebar onCloseMobile={() => setMobileDrawerOpen(false)} isMobileDrawer />
          </div>
        </div>
      )}

      {/* Main Content Area - Fixed Left Offset for Sidebar */}
      <div
        className={`flex-1 flex flex-col min-w-0 min-h-screen w-full transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[240px]'
        }`}
      >
        <TopNavbar onToggleMobileMenu={() => setMobileDrawerOpen(true)} />

        <main className="flex-1 pb-20 lg:pb-8 w-full">
          <Outlet />
        </main>

        {/* Mobile Navigation bar */}
        <MobileNav onOpenDrawer={() => setMobileDrawerOpen(true)} />

        {/* Integrated AI Mentor floating assistant */}
        <PeerCraftAIMentor />

        {/* Interactive Avatar Picker Modal */}
        <AvatarPickerModal />
      </div>
    </div>
  );
};
