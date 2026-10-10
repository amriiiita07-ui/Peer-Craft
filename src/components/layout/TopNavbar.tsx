import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Coins,
  ChevronDown,
  User,
  Settings,
  Shield,
  LogOut,
  FolderKanban,
  Code2,
  Users,
  Package,
  Calendar,
  Menu,
  Maximize2,
  Minimize2,
  Sparkles,
  Flame,
  Camera,
  Activity,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { adminUser, initialUser } from '../../data/mockData';

interface TopNavbarProps {
  onToggleMobileMenu?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    currentUser,
    switchUser,
    togglePersona,
    availableCredits,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    searchQuery,
    setSearchQuery,
    projects,
    codingQuestions,
    resources,
    setShowAvatarPicker,
    isFullscreen,
    toggleFullscreen,
  } = useApp();

  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchResults(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotificationDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter global search results
  const matchingProjects = searchQuery.trim()
    ? projects.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const matchingQuestions = searchQuery.trim()
    ? codingQuestions.filter((q) => q.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const matchingResources = searchQuery.trim()
    ? resources.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const hasSearchResults =
    matchingProjects.length > 0 || matchingQuestions.length > 0 || matchingResources.length > 0;

  return (
    <header className="sticky top-0 z-20 bg-[#FAFCF5]/95 dark:bg-[#0E1B13]/95 backdrop-blur-md border-b border-[#DCE6D2] dark:border-[#274735] px-3 sm:px-6 py-2 transition-colors">
      <div className="flex items-center justify-between gap-3 md:gap-4">
        {/* Left: Mobile hamburger & Campus Pulse */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg text-[#1D3024] dark:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#1A3324] transition-colors lg:hidden"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Engaging Live Campus Pulse Pill (desktop & tablet) */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EAF1DC]/80 dark:bg-[#14241B]/80 border border-[#DCE6D2] dark:border-[#274735] text-[11px] font-semibold text-[#173D2A] dark:text-[#ECF5EE]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#26783C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#26783C]" />
            </span>
            <span className="hidden xl:inline text-[#687769] dark:text-[#96B4A0]">Campus Pulse:</span>
            <span>48 Builders Active</span>
          </div>
        </div>

        {/* Center: Global Search Bar with Ctrl+K shortcut */}
        <div ref={searchRef} className="relative flex-1 max-w-lg mx-2 hidden sm:block">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#687769] dark:text-[#96B4A0] group-focus-within:text-[#26783C] dark:group-focus-within:text-[#389E66] transition-colors" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search teammates, projects, resources, events..."
              className="w-full pl-9 pr-14 py-1.5 text-xs bg-[#EAF1DC]/60 dark:bg-[#14241B]/70 focus:bg-[#FAFCF5] dark:focus:bg-[#182C21] border border-[#DCE6D2] dark:border-[#274735] focus:border-[#26783C] dark:focus:border-[#389E66] rounded-input text-[#1D3024] dark:text-[#ECF5EE] placeholder-[#687769] dark:placeholder-[#96B4A0] outline-none transition-all shadow-2xs"
            />
            {/* Keyboard shortcut badge */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[9px] font-semibold bg-[#FAFCF5] dark:bg-[#182C21] text-[#687769] dark:text-[#96B4A0] border border-[#DCE6D2] dark:border-[#274735] rounded shadow-2xs">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Quick Search Autocomplete Dropdown */}
          {showSearchResults && searchQuery.trim().length > 1 && (
            <div className="absolute left-0 right-0 mt-2 bg-[#FAFCF5] dark:bg-[#14241B] border border-[#DCE6D2] dark:border-[#274735] rounded-card shadow-card p-3 max-h-96 overflow-y-auto z-50 text-xs">
              {!hasSearchResults ? (
                <div className="py-4 text-center text-[#687769] dark:text-[#96B4A0]">
                  No direct results for "{searchQuery}". Try browsing categories.
                </div>
              ) : (
                <div className="space-y-3">
                  {matchingProjects.length > 0 && (
                    <div>
                      <div className="font-semibold text-[#173D2A] dark:text-[#ECF5EE] mb-1.5 flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-[#687769] dark:text-[#96B4A0]">
                        <FolderKanban className="w-3.5 h-3.5 text-[#26783C] dark:text-[#389E66]" /> Projects
                      </div>
                      <div className="space-y-1">
                        {matchingProjects.slice(0, 3).map((p) => (
                          <Link
                            key={p.id}
                            to={`/projects/${p.id}`}
                            onClick={() => setShowSearchResults(false)}
                            className="block p-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] transition-colors"
                          >
                            <div className="font-medium text-[#1D3024] dark:text-[#ECF5EE]">{p.title}</div>
                            <div className="text-[11px] text-[#687769] dark:text-[#96B4A0] truncate">
                              {p.category} • {p.technologies.slice(0, 3).join(', ')}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingQuestions.length > 0 && (
                    <div className="pt-2 border-t border-[#DCE6D2] dark:border-[#274735]">
                      <div className="font-semibold text-[#173D2A] dark:text-[#ECF5EE] mb-1.5 flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-[#687769] dark:text-[#96B4A0]">
                        <Code2 className="w-3.5 h-3.5 text-[#26783C] dark:text-[#389E66]" /> Coding Arena
                      </div>
                      <div className="space-y-1">
                        {matchingQuestions.slice(0, 3).map((q) => (
                          <Link
                            key={q.id}
                            to="/coding-arena"
                            onClick={() => setShowSearchResults(false)}
                            className="block p-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] transition-colors"
                          >
                            <div className="font-medium text-[#1D3024] dark:text-[#ECF5EE] flex items-center justify-between">
                              <span>{q.title}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E4EDCF] dark:bg-[#234332] text-[#173D2A] dark:text-[#ECF5EE]">
                                {q.platform}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#687769] dark:text-[#96B4A0]">
                              {q.difficulty} • {q.topics.join(', ')}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingResources.length > 0 && (
                    <div className="pt-2 border-t border-[#DCE6D2] dark:border-[#274735]">
                      <div className="font-semibold text-[#173D2A] dark:text-[#ECF5EE] mb-1.5 flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-[#687769] dark:text-[#96B4A0]">
                        <Package className="w-3.5 h-3.5 text-[#26783C] dark:text-[#389E66]" /> Campus Resources
                      </div>
                      <div className="space-y-1">
                        {matchingResources.slice(0, 3).map((r) => (
                          <Link
                            key={r.id}
                            to="/resources"
                            onClick={() => setShowSearchResults(false)}
                            className="block p-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] transition-colors"
                          >
                            <div className="font-medium text-[#1D3024] dark:text-[#ECF5EE]">{r.name}</div>
                            <div className="text-[11px] text-[#687769] dark:text-[#96B4A0]">
                              {r.category} • Status: {r.availability}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Real Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-[#1D3024] dark:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#1A3324] border border-[#DCE6D2]/60 dark:border-[#274735] transition-colors hidden sm:flex items-center justify-center"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-[#26783C] dark:text-[#389E66]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[#687769] dark:text-[#96B4A0]" />
            )}
          </button>

          {/* Quick Persona Switch Pill */}
          <button
            onClick={togglePersona}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#DCE6D2] dark:border-[#274735] bg-[#FAFCF5] dark:bg-[#182C21] hover:bg-[#EAF1DC] dark:hover:bg-[#203B2C] text-[11px] font-semibold text-[#173D2A] dark:text-[#ECF5EE] transition-colors"
            title="Toggle between student and admin view"
          >
            <span className="text-[#687769] dark:text-[#96B4A0]">Role:</span>
            <span className="font-bold text-[#26783C] dark:text-[#389E66]">
              {currentUser.role === 'admin' ? 'Faculty Admin' : `Student (${currentUser.firstName || 'Student'})`}
            </span>
          </button>

          {/* Engaging Streak & Credits Pill */}
          <Link
            to="/credits"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF1DC] dark:bg-[#14241B] hover:bg-[#E4EDCF] dark:hover:bg-[#1E3627] text-[#173D2A] dark:text-[#ECF5EE] border border-[#DCE6D2] dark:border-[#274735] rounded-full text-xs font-bold shadow-2xs transition-colors"
            title="Campus Credits Wallet"
          >
            <Coins className="w-4 h-4 text-[#EFC66B] fill-[#EFC66B]" />
            <span>{availableCredits.toLocaleString()}</span>
            <span className="hidden xl:inline text-[10px] font-medium text-[#687769] dark:text-[#96B4A0]">Credits</span>
          </Link>

          {/* Animated Night/Day Theme Toggle Switch */}
          <ThemeToggle />

          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="relative p-1.5 rounded-lg text-[#1D3024] dark:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#1A3324] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#26783C] rounded-full ring-2 ring-[#FAFCF5] dark:ring-[#0E1B13]" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-[#FAFCF5] dark:bg-[#14241B] border border-[#DCE6D2] dark:border-[#274735] rounded-card shadow-card p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DCE6D2] dark:border-[#274735]">
                  <span className="font-bold text-[#173D2A] dark:text-[#ECF5EE]">Notifications</span>
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotificationDropdown(false)}
                    className="text-[11px] text-[#26783C] dark:text-[#389E66] hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.linkUrl) navigate(n.linkUrl);
                        setShowNotificationDropdown(false);
                      }}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        !n.isRead ? 'bg-[#EAF1DC]/90 dark:bg-[#1E3627] font-medium' : 'hover:bg-[#EEF4E3] dark:hover:bg-[#1A3324]'
                      }`}
                    >
                      <div className="text-[12px] text-[#173D2A] dark:text-[#ECF5EE]">{n.title}</div>
                      <div className="text-[11px] text-[#687769] dark:text-[#96B4A0] line-clamp-1">{n.message}</div>
                      <div className="text-[10px] text-[#687769] dark:text-[#96B4A0] mt-0.5">{n.createdAt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Avatar Picker Trigger */}
          <div ref={profileRef} className="relative flex items-center">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full border border-[#DCE6D2] dark:border-[#274735] hover:bg-[#EAF1DC] dark:hover:bg-[#1A3324] transition-colors"
            >
              <div className="relative">
                <img
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser?.fullName || 'User Profile'}
                  className="w-7 h-7 rounded-full object-cover border-2 border-[#26783C]"
                />
                {currentUser?.statusEmoji && (
                  <span className="absolute -bottom-1 -right-1 text-[9px] bg-[#173D2A] text-white rounded-full px-0.5">
                    {currentUser.statusEmoji.split(' ')[0]}
                  </span>
                )}
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-[#173D2A] dark:text-[#ECF5EE] leading-tight flex items-center gap-1">
                  {currentUser?.fullName || 'Campus Student'}
                </div>
                <div className="text-[10px] text-[#687769] dark:text-[#96B4A0] leading-tight">
                  {(currentUser?.branch || 'Engineering').split(' ')[0]} • {currentUser?.academicYear || 'Active'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#687769] dark:text-[#96B4A0]" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-[#FAFCF5] dark:bg-[#14241B] border border-[#DCE6D2] dark:border-[#274735] rounded-card shadow-card p-1.5 z-50 text-xs animate-in fade-in">
                <div className="p-2 border-b border-[#DCE6D2] dark:border-[#274735] mb-1">
                  <div className="font-bold text-[#173D2A] dark:text-[#ECF5EE] flex items-center justify-between">
                    <span>{currentUser?.fullName || 'Campus Student'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E4EDCF] dark:bg-[#234332] text-[#26783C] dark:text-[#389E66] font-bold">
                      {currentUser?.statusEmoji || 'Active'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#687769] dark:text-[#96B4A0] truncate">{currentUser?.email || 'student@campus.edu'}</div>
                  <div className="text-[10px] text-[#26783C] dark:text-[#389E66] font-medium mt-0.5">
                    {currentUser?.college || 'Campus Member'}
                  </div>
                </div>

                {/* Change Avatar Button */}
                <button
                  onClick={() => {
                    setShowAvatarPicker(true);
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] text-[#1D3024] dark:text-[#ECF5EE] font-semibold transition-colors text-left"
                >
                  <Camera className="w-3.5 h-3.5 text-[#EFC66B]" />
                  <span>Choose Avatar & Status</span>
                </button>

                <Link
                  to="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] text-[#1D3024] dark:text-[#ECF5EE] transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#26783C] dark:text-[#389E66]" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] text-[#1D3024] dark:text-[#ECF5EE] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[#26783C] dark:text-[#389E66]" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] text-[#1D3024] dark:text-[#ECF5EE] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#EFC66B]" />
                  <span>Admin Console</span>
                </Link>

                <div className="pt-1 mt-1 border-t border-[#DCE6D2] dark:border-[#274735]">
                  <Link
                    to="/login"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#D94A4A]/10 text-[#D94A4A] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
