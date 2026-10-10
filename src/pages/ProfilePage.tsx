import React, { useState, useEffect } from 'react';
import {
  Shield,
  Sparkles,
  Code2,
  FolderKanban,
  Star,
  GitFork,
  ExternalLink,
  MessageSquare,
  Award,
  Terminal,
  TrendingUp,
  Coins,
  Lock,
  User,
  Share2,
  Flame,
  CheckCircle2,
  Briefcase,
  Building2,
  MapPin,
  Globe,
  Edit3,
  Check,
  Zap,
  Layers,
  ChevronRight,
  Eye,
  FileCode,
  ShieldCheck,
  Send,
  SlidersHorizontal,
  Save,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile, projects, codingQuestions, setIsAiMentorOpen } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'repos' | 'security' | 'ai' | 'community' | 'jobs' | 'achievements'>('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Dynamic form state synchronized with currentUser
  const [editFullName, setEditFullName] = useState(currentUser?.fullName || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editCollege, setEditCollege] = useState(currentUser?.college || '');
  const [editBranch, setEditBranch] = useState(currentUser?.branch || '');
  const [editAcademicYear, setEditAcademicYear] = useState(currentUser?.academicYear || '');
  const [editGithubUrl, setEditGithubUrl] = useState(currentUser?.githubUrl || '');
  const [editLinkedinUrl, setEditLinkedinUrl] = useState(currentUser?.linkedinUrl || '');
  const [editLeetcodeUrl, setEditLeetcodeUrl] = useState(currentUser?.leetcodeUrl || '');
  const [editHackerrankUrl, setEditHackerrankUrl] = useState(currentUser?.hackerrankUrl || '');
  const [messageSentToast, setMessageSentToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [customRepoPinned, setCustomRepoPinned] = useState(false);

  // Sync state when currentUser changes (e.g. on sign in or switch)
  useEffect(() => {
    if (currentUser) {
      setEditFullName(currentUser.fullName || '');
      setEditBio(currentUser.bio || '');
      setEditCollege(currentUser.college || '');
      setEditBranch(currentUser.branch || '');
      setEditAcademicYear(currentUser.academicYear || '');
      setEditGithubUrl(currentUser.githubUrl || '');
      setEditLinkedinUrl(currentUser.linkedinUrl || '');
      setEditLeetcodeUrl(currentUser.leetcodeUrl || '');
      setEditHackerrankUrl(currentUser.hackerrankUrl || '');
    }
  }, [currentUser]);

  // Generate realistic 36-week contribution matrix matching the heatmap
  const contributionWeeks = Array.from({ length: 36 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const val = (weekIndex * 7 + dayIndex * 13) % 11;
      if (val > 8) return 4;
      if (val > 5) return 3;
      if (val > 3) return 2;
      if (val > 1) return 1;
      return 0;
    });
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#26783C] dark:bg-[#22C55E]';
      case 3:
        return 'bg-[#3E9F6B] dark:bg-[#16A34A]';
      case 2:
        return 'bg-[#82C39B] dark:bg-[#15803D]';
      case 1:
        return 'bg-[#C4E5D1] dark:bg-[#14532D]';
      default:
        return 'bg-[#EAF1DC] dark:bg-[#1A2E22]';
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = editFullName.trim() || 'Student Developer';
    updateUserProfile({
      fullName: cleanName,
      firstName: cleanName.split(' ')[0],
      bio: editBio.trim(),
      college: editCollege.trim(),
      branch: editBranch.trim(),
      academicYear: editAcademicYear.trim(),
      githubUrl: editGithubUrl.trim() || undefined,
      linkedinUrl: editLinkedinUrl.trim() || undefined,
      leetcodeUrl: editLeetcodeUrl.trim() || undefined,
      hackerrankUrl: editHackerrankUrl.trim() || undefined,
    });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleSendMessage = () => {
    setIsAiMentorOpen(true);
    setMessageSentToast(true);
    setTimeout(() => setMessageSentToast(false), 3000);
  };

  // Derive username and dynamic fields
  const handleName = currentUser?.email ? currentUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') : 'developer';
  const displayBio = currentUser?.bio || 'Building secure software, scalable applications, and collaborating across campus projects. 🛡️ 🚀';
  const displayCollege = currentUser?.college || 'National Institute of Technology';
  const displayRole = currentUser?.role === 'admin' ? 'Faculty Admin' : 'Full-Stack Developer';

  return (
    <div className="min-h-screen bg-[#F3F7EA] dark:bg-[#0D1610] text-[#1D3024] dark:text-[#ECF5EE] font-sans antialiased pb-16 pt-2 transition-colors">
      {/* Toast Notifications */}
      {messageSentToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#26783C] text-white px-4 py-3 rounded-xl shadow-card flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom">
          <Check className="w-4 h-4" /> Connected to AI Mentor messaging session!
        </div>
      )}

      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#26783C] text-white px-4 py-3 rounded-xl shadow-card flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom">
          <Check className="w-4 h-4" /> Profile changes saved and remembered across sessions!
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Grid: Left Column (Profile card) + Right Column (Content Tabs & Views) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: User Hero & Details */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Avatar with Vibrant Forest Green & Gold Glow Ring */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-[#26783C] via-[#EFC66B] to-[#4ADE80] shadow-card">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FAFCF5] dark:bg-[#182C21] border-4 border-[#F3F7EA] dark:border-[#0D1610]">
                    <img
                      src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                      alt={currentUser?.fullName || 'User Profile'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                {/* Status Dot / Badge on bottom-right of avatar */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#FAFCF5] dark:bg-[#182C21] border-2 border-[#DCE6D2] dark:border-[#274735] flex items-center justify-center text-sm shadow-md" title="Active developer status">
                  <span>{currentUser?.statusEmoji?.split(' ')[0] || '⚡'}</span>
                </div>
              </div>

              {/* Name & Handle */}
              <div className="mt-4 text-center lg:text-left w-full">
                <h1 className="text-2xl sm:text-3xl font-black text-[#173D2A] dark:text-[#ECF5EE] tracking-tight flex items-center justify-center lg:justify-start gap-2">
                  {currentUser?.fullName || 'Student Developer'}
                </h1>
                <p className="text-sm text-[#687769] dark:text-[#96B4A0] font-mono mt-0.5">
                  @{handleName}
                </p>

                {/* Role & Achievement Pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mt-3">
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#E4EDCF] dark:bg-[#0E3A2F] text-[#173D2A] dark:text-[#4ADE80] border border-[#26783C]/30 dark:border-[#166534]">
                    {displayRole}
                  </span>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#DDEBFA] dark:bg-[#0E2F3D] text-[#1E40AF] dark:text-[#38BDF8] border border-[#93C5FD] dark:border-[#0369A1]">
                    PeerCraft Verified
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#E9E1FA] dark:bg-[#3B1F56] text-[#6B21A8] dark:text-[#C084FC] border border-[#C4B5FD] dark:border-[#7E22CE]">
                    Active Contributor
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-[13px] text-[#1D3024] dark:text-[#C9D1D9] leading-relaxed mt-3 text-center lg:text-left">
                  {displayBio}
                </p>

                {/* Location, Organization, Link, Freelance Rating */}
                <div className="mt-4 space-y-2 text-xs text-[#687769] dark:text-[#96B4A0]">
                  <div className="flex items-center gap-2.5 justify-center lg:justify-start hover:text-[#173D2A] dark:hover:text-[#ECF5EE] transition-colors">
                    <Building2 className="w-4 h-4 text-[#26783C]" />
                    <span>{displayCollege}</span>
                  </div>
                  <div className="flex items-center gap-2.5 justify-center lg:justify-start hover:text-[#173D2A] dark:hover:text-[#ECF5EE] transition-colors">
                    <MapPin className="w-4 h-4 text-[#26783C]" />
                    <span>{currentUser?.branch ? `${currentUser.branch} • ${currentUser.academicYear || 'Active'}` : 'Campus Innovation Cell'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                    <Globe className="w-4 h-4 text-[#26783C]" />
                    <a
                      href={currentUser?.githubUrl || "https://github.com"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#26783C] dark:text-[#58A6FF] font-semibold hover:underline truncate"
                    >
                      {currentUser?.githubUrl ? currentUser.githubUrl.replace('https://', '') : `${handleName}.dev`}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 justify-center lg:justify-start text-[#173D2A] dark:text-[#ECF5EE]">
                    <Star className="w-4 h-4 text-[#EFC66B] fill-[#EFC66B]" />
                    <span className="font-bold">{currentUser?.reputation || 5.0}/5</span>
                    <span className="text-[#687769] dark:text-[#96B4A0]">(Peer Reputation)</span>
                  </div>
                </div>

                {/* Action Buttons: Follow, Message, Offer Job / Edit */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`w-full py-2 px-4 rounded-btn font-bold text-xs tracking-wide transition-all shadow-subtle flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFollowing
                        ? 'bg-[#173D2A] hover:bg-[#102B20] text-white'
                        : 'bg-[#26783C] hover:bg-[#1C622F] text-white'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Following
                      </>
                    ) : (
                      'Follow'
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleSendMessage}
                      className="py-2 px-3 rounded-btn text-xs font-semibold bg-[#EAF1DC] dark:bg-[#162A1E] hover:bg-[#E4EDCF] dark:hover:bg-[#203B2C] text-[#173D2A] dark:text-[#ECF5EE] border border-[#DCE6D2] dark:border-[#274735] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#26783C] dark:text-[#38BDF8]" />
                      <span>Message</span>
                    </button>

                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="py-2 px-3 rounded-btn text-xs font-semibold bg-[#EAF1DC] dark:bg-[#162A1E] hover:bg-[#E4EDCF] dark:hover:bg-[#203B2C] text-[#173D2A] dark:text-[#ECF5EE] border border-[#DCE6D2] dark:border-[#274735] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#EFC66B]" />
                      <span>{isEditing ? 'Close Edit' : 'Edit Profile'}</span>
                    </button>
                  </div>
                </div>

                {/* Badges Section */}
                <div className="mt-6 pt-5 border-t border-[#DCE6D2] dark:border-[#274735]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#687769] dark:text-[#96B4A0] mb-3 text-center lg:text-left">
                    BADGES
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2.5">
                    {/* Badge 1: Security Shield */}
                    <div className="w-9 h-9 rounded-xl bg-[#EAF1DC] dark:bg-[#0E3A2F] border border-[#DCE6D2] dark:border-[#238636] flex items-center justify-center text-[#26783C] dark:text-[#3FB950] shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Security Champion (Top 5%)">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    {/* Badge 2: AI Power User */}
                    <div className="w-9 h-9 rounded-xl bg-[#DDEBFA] dark:bg-[#0E2F3D] border border-[#93C5FD] dark:border-[#38BDF8] flex items-center justify-center text-[#1E40AF] dark:text-[#38BDF8] shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="ForgeAI Master">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    {/* Badge 3: Top Contributor */}
                    <div className="w-9 h-9 rounded-xl bg-[#E9E1FA] dark:bg-[#3B1F56] border border-[#C4B5FD] dark:border-[#A855F7] flex items-center justify-center text-[#6B21A8] dark:text-[#C084FC] shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Elite Mentor">
                      <Award className="w-5 h-5" />
                    </div>
                    {/* Badge 4: Hackathon Winner */}
                    <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] dark:bg-[#3D2E0E] border border-[#FDE68A] dark:border-[#F59E0B] flex items-center justify-center text-[#B45309] dark:text-[#FBBF24] shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Hackathon Finalist">
                      <Flame className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Profile Edit Modal / Inline Drawer */}
            {isEditing && (
              <form
                onSubmit={handleSaveProfile}
                className="bg-[#FAFCF5] dark:bg-[#162A1E] p-4 rounded-card border border-[#DCE6D2] dark:border-[#274735] space-y-3 text-xs animate-in fade-in shadow-card"
              >
                <div className="font-bold text-[#173D2A] dark:text-white text-sm pb-1 border-b border-[#DCE6D2] dark:border-[#274735] flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-[#26783C]" /> Edit Your Profile Information
                </div>
                <div>
                  <label className="block text-[#687769] dark:text-[#96B4A0] mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none focus:border-[#26783C]"
                  />
                </div>
                <div>
                  <label className="block text-[#687769] dark:text-[#96B4A0] mb-1 font-semibold">College / University</label>
                  <input
                    type="text"
                    value={editCollege}
                    onChange={(e) => setEditCollege(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none focus:border-[#26783C]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#687769] dark:text-[#96B4A0] mb-1 font-semibold">Branch</label>
                    <input
                      type="text"
                      value={editBranch}
                      onChange={(e) => setEditBranch(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none focus:border-[#26783C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#687769] dark:text-[#96B4A0] mb-1 font-semibold">Year of Study</label>
                    <input
                      type="text"
                      value={editAcademicYear}
                      onChange={(e) => setEditAcademicYear(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none focus:border-[#26783C]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#687769] dark:text-[#96B4A0] mb-1 font-semibold">Bio</label>
                  <textarea
                    rows={2}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none focus:border-[#26783C]"
                  />
                </div>
                <div>
                  <label className="block text-[#687769] dark:text-[#96B4A0] mb-1 font-semibold">GitHub URL</label>
                  <input
                    type="url"
                    value={editGithubUrl}
                    onChange={(e) => setEditGithubUrl(e.target.value)}
                    placeholder="https://github.com/your-handle"
                    className="w-full px-2.5 py-1.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none focus:border-[#26783C] font-mono text-[11px]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-[#687769] hover:text-[#173D2A] dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#26783C] hover:bg-[#1C622F] text-white rounded-btn font-bold cursor-pointer flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Navigation Tabs, Highlights, 2x2 Metric Grid, Repos & Activity */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Top Navigation Bar / Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 border-b border-[#DCE6D2] dark:border-[#274735] hide-scrollbar text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#EFC66B]" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('repos')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'repos'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Code & Repos</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#EAF1DC] dark:bg-[#1E3627] text-[10px] text-[#173D2A] dark:text-[#ECF5EE] font-bold">
                  {projects.filter((p) => p.isUserEnrolled).length || 42}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#26783C]" />
                <span>Security</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#E4EDCF] dark:bg-[#0E3A2F] text-[10px] text-[#26783C] dark:text-[#3FB950] font-bold">
                  Top 5%
                </span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#EFC66B]" />
                <span>AI & ForgeAI</span>
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'community'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#26783C]" />
                <span>Community</span>
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'jobs'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#EFC66B]" />
                <span>Jobs</span>
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'achievements'
                    ? 'bg-[#173D2A] text-white dark:bg-[#234332] dark:text-[#ECF5EE] shadow-sm border border-[#173D2A] dark:border-[#2E8555]'
                    : 'text-[#687769] dark:text-[#96B4A0] hover:text-[#173D2A] dark:hover:text-[#ECF5EE] hover:bg-[#EAF1DC] dark:hover:bg-[#162A1E]'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#26783C]" />
                <span>Achievements</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 1: ⚡ Highlights (3 Horizontal Cards) */}
            {/* ========================================================================= */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173D2A] dark:text-white mb-3">
                <Zap className="w-3.5 h-3.5 text-[#EFC66B] fill-[#EFC66B]" />
                <span>Highlights</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Highlight Card 1: Top Community Post */}
                <div className="bg-[#FAFCF5] dark:bg-[#162A1E] p-3.5 rounded-card border border-[#DCE6D2] dark:border-[#274735] hover:border-[#26783C] dark:hover:border-[#389E66] transition-colors shadow-subtle cursor-pointer">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#687769] dark:text-[#96B4A0] mb-1.5">
                    <span>Top Community Post</span>
                    <span className="text-[#26783C] dark:text-[#3FB950] font-bold flex items-center gap-0.5">
                      ↑ 342
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#173D2A] dark:text-[#ECF5EE] line-clamp-2 leading-snug">
                    Guide: Implementing Zero-Trust with Rust in 2024
                  </div>
                </div>

                {/* Highlight Card 2: Best Project */}
                <div className="bg-[#FAFCF5] dark:bg-[#162A1E] p-3.5 rounded-card border border-[#DCE6D2] dark:border-[#274735] hover:border-[#26783C] dark:hover:border-[#389E66] transition-colors shadow-subtle cursor-pointer">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#687769] dark:text-[#96B4A0] mb-1.5">
                    <span>Best Project</span>
                    <span className="w-2 h-2 rounded-full bg-[#26783C] dark:bg-[#3FB950]" />
                  </div>
                  <div className="text-xs font-bold text-[#173D2A] dark:text-[#ECF5EE] truncate font-mono">
                    {projects[0]?.title || 'rust-crypto-guard'}
                  </div>
                  <div className="text-[11px] text-[#687769] dark:text-[#96B4A0] mt-0.5">
                    Used by {projects[0]?.memberCount ? `${projects[0].memberCount * 300}+ developers` : '1.2k developers'}
                  </div>
                </div>

                {/* Highlight Card 3: Featured Gig */}
                <div className="bg-[#FAFCF5] dark:bg-[#162A1E] p-3.5 rounded-card border border-[#DCE6D2] dark:border-[#274735] hover:border-[#26783C] dark:hover:border-[#389E66] transition-colors shadow-subtle cursor-pointer">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#687769] dark:text-[#96B4A0] mb-1.5">
                    <span>Featured Gig</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#EAF1DC] dark:bg-[#3D2E0E] text-[#173D2A] dark:text-[#FBBF24] border border-[#DCE6D2] dark:border-[#F59E0B]/40">
                      Open
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#173D2A] dark:text-[#ECF5EE] line-clamp-1">
                    Security Audit for Enterprise DeFi Protocol
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 2: 2x2 Metric Grid (Coding Snapshot, Security Impact, ForgeAI, Freelance) */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: <> Coding Snapshot */}
              <div className="bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] p-4 flex flex-col justify-between shadow-subtle">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6D2] dark:border-[#274735]">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#173D2A] dark:text-white">
                      <Code2 className="w-4 h-4 text-[#26783C]" />
                      <span>Coding Snapshot</span>
                    </div>
                    <button className="text-[11px] text-[#26783C] dark:text-[#58A6FF] hover:underline font-semibold cursor-pointer">
                      View Details
                    </button>
                  </div>

                  {/* Donut Chart Simulation + Language Percentages */}
                  <div className="flex items-center gap-6 py-2">
                    {/* Visual Donut Ring */}
                    <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background track */}
                        <path
                          className="text-[#EAF1DC] dark:text-[#122218]"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Primary Language - 45% (Emerald) */}
                        <path
                          className="text-[#26783C] dark:text-[#4ADE80]"
                          strokeDasharray="45, 100"
                          strokeWidth="4"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Secondary - 30% (Gold) */}
                        <path
                          className="text-[#EFC66B]"
                          strokeDasharray="30, 100"
                          strokeDashoffset="-45"
                          strokeWidth="4"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Tertiary - 25% (Sage) */}
                        <path
                          className="text-[#173D2A] dark:text-[#38BDF8]"
                          strokeDasharray="25, 100"
                          strokeDashoffset="-75"
                          strokeWidth="4"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-[10px] font-bold text-[#687769] dark:text-[#96B4A0]">Stats</span>
                      </div>
                    </div>

                    {/* Breakdown list */}
                    <div className="space-y-1.5 text-xs font-semibold flex-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[#1D3024] dark:text-[#ECF5EE]">
                          <span className="w-2 h-2 rounded-full bg-[#26783C] dark:bg-[#4ADE80]" /> TypeScript / Python
                        </span>
                        <span className="text-[#687769] dark:text-[#96B4A0]">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[#1D3024] dark:text-[#ECF5EE]">
                          <span className="w-2 h-2 rounded-full bg-[#EFC66B]" /> Rust / C++
                        </span>
                        <span className="text-[#687769] dark:text-[#96B4A0]">30%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[#1D3024] dark:text-[#ECF5EE]">
                          <span className="w-2 h-2 rounded-full bg-[#173D2A] dark:bg-[#38BDF8]" /> Go / SQL
                        </span>
                        <span className="text-[#687769] dark:text-[#96B4A0]">25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#DCE6D2] dark:border-[#274735] text-[11px] text-[#687769] dark:text-[#96B4A0] truncate">
                  Recent Activity: <span className="text-[#173D2A] dark:text-[#ECF5EE] font-medium">Verified platform commits and merged PRs</span>
                </div>
              </div>

              {/* Card 2: 🛡️ Security Impact */}
              <div className="bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] p-4 flex flex-col justify-between shadow-subtle relative overflow-hidden">
                <Shield className="w-32 h-32 absolute -right-6 -bottom-6 text-[#EAF1DC] dark:text-[#122218]/40 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6D2] dark:border-[#274735]">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#173D2A] dark:text-white">
                      <ShieldCheck className="w-4 h-4 text-[#26783C]" />
                      <span>Security & Quality</span>
                    </div>
                  </div>

                  {/* Two Large Metric Tiles */}
                  <div className="grid grid-cols-2 gap-3 py-1">
                    <div className="bg-[#EAF1DC]/70 dark:bg-[#0D1610] p-3 rounded-xl border border-[#DCE6D2] dark:border-[#274735]">
                      <div className="text-2xl font-black text-[#26783C] dark:text-[#3FB950] tracking-tight">
                        {codingQuestions.filter((q) => q.isPublished).length * 12 || 142}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#687769] dark:text-[#96B4A0] mt-0.5">
                        CHALLENGES SOLVED
                      </div>
                    </div>
                    <div className="bg-[#EAF1DC]/70 dark:bg-[#0D1610] p-3 rounded-xl border border-[#DCE6D2] dark:border-[#274735]">
                      <div className="text-2xl font-black text-[#D94A4A] dark:text-[#F87171] tracking-tight">0</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#687769] dark:text-[#96B4A0] mt-0.5">
                        PENDING ISSUES
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#DCE6D2] dark:border-[#274735] text-[11px] text-[#26783C] dark:text-[#3FB950] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26783C] dark:bg-[#3FB950]" />
                  <span>340 Peer Reviews Completed</span>
                </div>
              </div>

              {/* Card 3: ✨ ForgeAI Usage */}
              <div className="bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] p-4 flex flex-col justify-between shadow-subtle">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6D2] dark:border-[#274735]">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#173D2A] dark:text-white">
                      <Sparkles className="w-4 h-4 text-[#26783C] dark:text-[#38BDF8]" />
                      <span>AI Mentor Usage</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded bg-[#E4EDCF] dark:bg-[#0E2F3D] text-[#173D2A] dark:text-[#38BDF8] text-[9px] font-extrabold tracking-wider border border-[#26783C]/30 dark:border-[#0369A1]">
                      PRO
                    </span>
                  </div>

                  {/* Visual Session / Token Activity Bars */}
                  <div className="flex items-end gap-2 h-14 my-2 px-2">
                    <div className="flex-1 bg-[#C4E5D1] dark:bg-[#1E3A4B] rounded-t h-[40%]" title="Week 1" />
                    <div className="flex-1 bg-[#82C39B] dark:bg-[#255269] rounded-t h-[60%]" title="Week 2" />
                    <div className="flex-1 bg-[#3E9F6B] dark:bg-[#2E6B87] rounded-t h-[80%]" title="Week 3" />
                    <div className="flex-1 bg-[#26783C] dark:bg-[#38BDF8] rounded-t h-[95%]" title="Current Week" />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#DCE6D2] dark:border-[#274735] flex items-center justify-between text-[11px] text-[#687769] dark:text-[#96B4A0]">
                  <span>856 Learning Sessions</span>
                  <span className="text-[#26783C] dark:text-[#38BDF8] font-bold">32% Accelerated by AI</span>
                </div>
              </div>

              {/* Card 4: 💼 Freelance */}
              <div className="bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] p-4 flex flex-col justify-between shadow-subtle">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6D2] dark:border-[#274735]">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#173D2A] dark:text-white">
                      <Briefcase className="w-4 h-4 text-[#EFC66B]" />
                      <span>Campus Micro-Gigs</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#173D2A] dark:text-[#EFC66B] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#EFC66B] text-[#EFC66B]" />
                      <span>5.0</span>
                    </div>
                  </div>

                  {/* Jobs & Top Category */}
                  <div className="space-y-1.5 text-xs py-1">
                    <div className="flex items-center justify-between text-[#687769] dark:text-[#96B4A0]">
                      <span>Gigs Completed</span>
                      <span className="font-bold text-[#173D2A] dark:text-white">24</span>
                    </div>
                    <div className="flex items-center justify-between text-[#687769] dark:text-[#96B4A0]">
                      <span>Top Category</span>
                      <span className="font-semibold text-[#173D2A] dark:text-[#ECF5EE]">Architecture & QA</span>
                    </div>
                  </div>

                  {/* Repeat Hire Rate Progress Bar */}
                  <div className="mt-2.5 space-y-1">
                    <div className="w-full bg-[#EAF1DC] dark:bg-[#122218] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#EFC66B] h-full rounded-full w-[88%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#DCE6D2] dark:border-[#274735] text-right text-[10px] text-[#687769] dark:text-[#96B4A0] font-medium">
                  88% Peer Recommendation Rate
                </div>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* SECTION 3: Pinned Repositories */}
            {/* ========================================================================= */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#173D2A] dark:text-white">
                  Pinned Repositories & Projects
                </h2>
                <button
                  onClick={() => setCustomRepoPinned(!customRepoPinned)}
                  className="text-[11px] text-[#26783C] dark:text-[#58A6FF] hover:underline font-semibold cursor-pointer"
                >
                  Customize
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Repo 1 */}
                <div className="bg-[#FAFCF5] dark:bg-[#162A1E] p-4 rounded-card border border-[#DCE6D2] dark:border-[#274735] hover:border-[#26783C] dark:hover:border-[#389E66] transition-colors flex flex-col justify-between space-y-3 shadow-subtle">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-[#687769] dark:text-[#96B4A0]" />
                        <span className="font-bold text-sm text-[#173D2A] dark:text-[#58A6FF] hover:underline cursor-pointer">
                          {projects[0]?.title ? projects[0].title.toLowerCase().replace(/\s+/g, '-') : 'campus-nav-system'}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EAF1DC] dark:bg-[#122218] border border-[#DCE6D2] dark:border-[#274735] text-[#687769] dark:text-[#96B4A0]">
                          Public
                        </span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E4EDCF] dark:bg-[#0E3A2F] text-[#26783C] dark:text-[#3FB950] font-bold border border-[#26783C]/30 dark:border-[#238636]">
                        ● A+
                      </span>
                    </div>

                    <p className="text-xs text-[#687769] dark:text-[#96B4A0] mt-2 line-clamp-2 leading-relaxed">
                      {projects[0]?.description || 'High-performance cryptographic primitives and navigation map layers for university campus.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#687769] dark:text-[#96B4A0] pt-2 border-t border-[#DCE6D2] dark:border-[#274735]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EFC66B]" /> {projects[0]?.technologies[0] || 'TypeScript'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#EFC66B] fill-[#EFC66B]" /> 1.2k
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-[#687769]" /> 142
                      </span>
                    </div>
                    <span className="text-[#26783C] dark:text-[#3FB950] font-bold">+45%</span>
                  </div>
                </div>

                {/* Repo 2 */}
                <div className="bg-[#FAFCF5] dark:bg-[#162A1E] p-4 rounded-card border border-[#DCE6D2] dark:border-[#274735] hover:border-[#26783C] dark:hover:border-[#389E66] transition-colors flex flex-col justify-between space-y-3 shadow-subtle">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-[#687769] dark:text-[#96B4A0]" />
                        <span className="font-bold text-sm text-[#173D2A] dark:text-[#58A6FF] hover:underline cursor-pointer">
                          {projects[1]?.title ? projects[1].title.toLowerCase().replace(/\s+/g, '-') : 'ai-peer-evaluator'}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EAF1DC] dark:bg-[#122218] border border-[#DCE6D2] dark:border-[#274735] text-[#687769] dark:text-[#96B4A0]">
                          Public
                        </span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E4EDCF] dark:bg-[#0E3A2F] text-[#26783C] dark:text-[#3FB950] font-bold border border-[#26783C]/30 dark:border-[#238636]">
                        ● A
                      </span>
                    </div>

                    <p className="text-xs text-[#687769] dark:text-[#96B4A0] mt-2 line-clamp-2 leading-relaxed">
                      {projects[1]?.description || 'Automated vulnerability scanning and code review pipeline leveraging LLMs for code analysis.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#687769] dark:text-[#96B4A0] pt-2 border-t border-[#DCE6D2] dark:border-[#274735]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#26783C] dark:bg-[#4ADE80]" /> {projects[1]?.technologies[0] || 'Python'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#EFC66B] fill-[#EFC66B]" /> 856
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-[#687769]" /> 89
                      </span>
                    </div>
                    <span className="text-[#26783C] dark:text-[#3FB950] font-bold">+90%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 4: PeerCraft Activity Matrix & Latest Activity */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left 8 cols: Activity Matrix */}
              <div className="lg:col-span-8 bg-[#FAFCF5] dark:bg-[#162A1E] p-4 rounded-card border border-[#DCE6D2] dark:border-[#274735] shadow-subtle">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-[#173D2A] dark:text-white">PeerCraft Contribution Activity</span>
                  <span className="text-[#687769] dark:text-[#96B4A0] font-semibold">2,450 contributions</span>
                </div>

                {/* Heatmap Matrix */}
                <div className="overflow-x-auto pb-1">
                  <div className="inline-flex gap-1">
                    {contributionWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1">
                        {week.map((level, dIdx) => (
                          <div
                            key={dIdx}
                            className={`w-2.5 h-2.5 rounded-xs ${getHeatmapColor(level)} hover:ring-1 hover:ring-[#173D2A] dark:hover:ring-white transition-all cursor-pointer`}
                            title={`Activity intensity: ${level * 3} contributions`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heatmap Legend */}
                <div className="flex items-center justify-end gap-1.5 text-[10px] text-[#687769] dark:text-[#96B4A0] mt-3">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#EAF1DC] dark:bg-[#1A2E22]" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#C4E5D1] dark:bg-[#14532D]" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#82C39B] dark:bg-[#15803D]" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3E9F6B] dark:bg-[#16A34A]" />
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#26783C] dark:bg-[#22C55E]" />
                  <span>More</span>
                </div>
              </div>

              {/* Right 4 cols: Latest Activity */}
              <div className="lg:col-span-4 bg-[#FAFCF5] dark:bg-[#162A1E] p-4 rounded-card border border-[#DCE6D2] dark:border-[#274735] shadow-subtle flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DCE6D2] dark:border-[#274735]">
                    <span className="font-bold text-xs text-[#173D2A] dark:text-white">Latest Activity</span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#687769] dark:text-[#96B4A0]" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#26783C] dark:bg-[#3FB950] mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="text-[#1D3024] dark:text-[#C9D1D9] font-medium leading-tight">
                          <strong className="text-[#173D2A] dark:text-white font-semibold">{currentUser?.fullName || 'You'}</strong> verified repository merge
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#26783C] dark:text-[#4ADE80]">
                            PR-2026-CAMPUS
                          </span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[#E4EDCF] dark:bg-[#0E3A2F] text-[#26783C] dark:text-[#3FB950] font-bold">
                            Merged
                          </span>
                        </div>
                        <div className="text-[11px] text-[#687769] dark:text-[#96B4A0] mt-0.5">
                          Clean build & verified unit tests
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-[#DCE6D2] dark:border-[#274735] text-[10px] text-[#687769] dark:text-[#96B4A0] text-right">
                  Just now
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
