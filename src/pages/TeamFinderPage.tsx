import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  UsersRound,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Send,
  Star,
  Award,
  BookOpen,
  RotateCcw,
  Zap,
  Flame,
  ArrowRight,
  Layers,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';

export const TeamFinderPage: React.FC = () => {
  const { allUsers, currentUser, projects } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [projectIdea, setProjectIdea] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [isSearching, setIsSearching] = useState(false);
  const [inviteModalUser, setInviteModalUser] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [proposedRole, setProposedRole] = useState('Full-Stack Engineer');
  const [personalNote, setPersonalNote] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const skillsList = [
    'All',
    'React',
    'TypeScript',
    'Python',
    'UI/UX Design',
    'Docker',
    'Kubernetes',
    'Flutter',
    'Rust',
    'FastAPI',
    'PyTorch',
    'Arduino',
    'SQL',
  ];

  const branchesList = [
    'All',
    'Computer Science Engineering',
    'Electronics and Communication',
    'Data Science & Artificial Intelligence',
  ];

  const quickPresets = [
    { label: '🚀 Full-Stack Web (React + FastAPI)', query: 'Building a responsive web platform with React, TypeScript, and FastAPI backend with PostgreSQL database' },
    { label: '🤖 AI/ML & LLM Research (Python + PyTorch)', query: 'Machine learning model training and dataset pipelines using PyTorch, NLP, and Computer Vision' },
    { label: '📱 Mobile App (Flutter & Firebase)', query: 'Cross-platform mobile application development with Flutter, Dart, state management and Firebase' },
    { label: '🛡️ Cybersecurity & Zero-Trust (Rust)', query: 'Secure systems programming, cryptography, zero-trust infrastructure, and memory safety in Rust' },
    { label: '🔌 IoT Robotics & Embedded (Arduino)', query: 'Smart IoT hardware prototype with embedded C, Arduino microcontrollers, and wireless sensors' },
    { label: '🎨 UI/UX & Design Systems (Figma)', query: 'Modern UI/UX design, accessible micro-interactions, Figma component libraries, and Tailwind CSS' },
  ];

  // Exclude current user and admin from candidate pool
  const candidateUsers = useMemo(() => {
    return allUsers.filter((u) => u.id !== currentUser.id && u.role !== 'admin');
  }, [allUsers, currentUser.id]);

  // Compute matches with smart relevance scoring
  const matchedCandidates = useMemo(() => {
    const combinedText = `${searchQuery} ${projectIdea}`.trim().toLowerCase();
    const queryTokens = combinedText
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 1 && !['and', 'the', 'for', 'with', 'need', 'building', 'developer', 'using'].includes(t));

    return candidateUsers
      .map((candidate) => {
        let score = 70; // baseline score
        const matchedReasons: string[] = [];

        // 1. Skill Match
        candidate.skills.forEach((s) => {
          const sName = s.name.toLowerCase();
          const matchInQuery = queryTokens.some((token) => sName.includes(token) || token.includes(sName));
          const matchInSelectedSkill = selectedSkill !== 'All' && sName.includes(selectedSkill.toLowerCase());

          if (matchInQuery || matchInSelectedSkill) {
            score += s.proficiency === 'Expert' ? 12 : s.proficiency === 'Advanced' ? 9 : 6;
            matchedReasons.push(s.name);
          }
        });

        // 2. Interest / Domain Match
        candidate.interests?.forEach((interest) => {
          const iName = interest.toLowerCase();
          if (queryTokens.some((token) => iName.includes(token))) {
            score += 5;
          }
        });

        // 3. Name / Bio / Branch Match
        const candText = `${candidate.fullName} ${candidate.bio} ${candidate.branch}`.toLowerCase();
        queryTokens.forEach((token) => {
          if (candText.includes(token)) {
            score += 4;
          }
        });

        // 4. Reputation bonus
        if (candidate.reputation >= 4.8) score += 3;

        // Cap score between 75% and 99%
        const finalMatchPercent = Math.min(99, Math.max(75, Math.round(score)));

        // Generate dynamic explanation
        let explanation = '';
        if (matchedReasons.length > 0) {
          explanation = `Direct synergy with ${matchedReasons.slice(0, 3).join(', ')} (${candidate.skills[0]?.proficiency || 'Verified'} competency)`;
        } else if (candidate.branch.includes('Data Science')) {
          explanation = 'Advanced data modeling & machine learning architecture specialist';
        } else if (candidate.branch.includes('Electronics')) {
          explanation = 'Proven track record in Embedded C & IoT hardware prototyping';
        } else {
          explanation = 'High synergy with full-stack software architecture and modular engineering';
        }

        return {
          candidate,
          matchPercent: finalMatchPercent,
          matchExplanation: explanation,
          matchesFilter: () => {
            // Skill filter
            if (selectedSkill !== 'All' && !candidate.skills.some((s) => s.name.toLowerCase().includes(selectedSkill.toLowerCase()))) {
              return false;
            }
            // Branch filter
            if (selectedBranch !== 'All' && candidate.branch !== selectedBranch) {
              return false;
            }
            // If there's an active search query or project description
            if (queryTokens.length > 0) {
              const fullProfileText = `${candidate.fullName} ${candidate.bio} ${candidate.branch} ${candidate.skills.map((s) => s.name).join(' ')} ${candidate.interests?.join(' ') || ''}`.toLowerCase();
              const hasAnyToken = queryTokens.some((token) => fullProfileText.includes(token));
              return hasAnyToken;
            }
            return true;
          },
        };
      })
      .filter((item) => item.matchesFilter())
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [candidateUsers, searchQuery, projectIdea, selectedSkill, selectedBranch]);

  const handleApplyPreset = (presetQuery: string) => {
    setProjectIdea(presetQuery);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setProjectIdea('');
    setSelectedSkill('All');
    setSelectedBranch('All');
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteModalUser(null);
    setFeedbackMsg(`Project invitation successfully sent to ${inviteModalUser}!`);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast */}
      {feedbackMsg && (
        <div className="bg-[#26783C] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-card flex items-center justify-between animate-in fade-in">
          <span>{feedbackMsg}</span>
          <button onClick={() => setFeedbackMsg(null)} className="text-white hover:opacity-80">✕</button>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF1DC] dark:bg-[#14241B] text-[#173D2A] dark:text-[#ECF5EE] text-xs font-semibold mb-2 border border-[#DCE6D2] dark:border-[#274735]">
          <Sparkles className="w-3.5 h-3.5 text-[#EFC66B]" />
          Smart Skills Compatibility Matcher
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173D2A] dark:text-[#ECF5EE] tracking-tight">
          AI Team Finder
        </h1>
        <p className="text-sm text-[#687769] dark:text-[#96B4A0] mt-1">
          Search and match campus developers, designers, and domain specialists tailored to your project requirements.
        </p>
      </div>

      {/* Project Criteria Query Box */}
      <div className="bg-[#FAFCF5] dark:bg-[#162A1E] p-5 rounded-card border border-[#DCE6D2] dark:border-[#274735] shadow-subtle space-y-4 transition-colors">
        
        {/* Quick Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#687769] dark:text-[#96B4A0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, tech stack (e.g. React, Python, Rust, Flutter, Figma), or domain..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] focus:border-[#26783C] dark:focus:border-[#4ADE80] rounded-input text-[#1D3024] dark:text-white outline-none text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687769] hover:text-[#173D2A] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* AI Project Requirement Description Box */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#173D2A] dark:text-[#ECF5EE] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#EFC66B]" />
              Describe Your Project & Roles Needed (AI Semantic Match)
            </label>
            {(projectIdea || searchQuery || selectedSkill !== 'All' || selectedBranch !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#26783C] dark:text-[#4ADE80] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Clear All Filters
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              rows={2}
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="e.g. Building an automated AI drone simulation. Need a 3rd/4th year developer experienced with Python, ROS, PyTorch, and embedded hardware..."
              className="w-full px-3.5 py-2.5 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] focus:border-[#26783C] dark:focus:border-[#4ADE80] rounded-input text-[#1D3024] dark:text-white outline-none text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* One-Click Quick Presets */}
        <div>
          <div className="text-[11px] font-semibold text-[#687769] dark:text-[#96B4A0] mb-1.5">
            Suggested Project Scenarios:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPresets.map((preset, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleApplyPreset(preset.query)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  projectIdea === preset.query
                    ? 'bg-[#173D2A] text-white border-[#173D2A] dark:bg-[#26783C] dark:border-[#26783C] font-semibold shadow-2xs'
                    : 'bg-[#EAF1DC]/60 dark:bg-[#14241B] hover:bg-[#E4EDCF] dark:hover:bg-[#1F3A29] text-[#173D2A] dark:text-[#ECF5EE] border-[#DCE6D2] dark:border-[#274735]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter controls: Skill chips & Branch dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DCE6D2] dark:border-[#274735]">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-semibold text-[#173D2A] dark:text-[#ECF5EE] mr-1">Filter Skills:</span>
            {skillsList.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(selectedSkill === skill ? 'All' : skill)}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer text-[11px] ${
                  selectedSkill === skill
                    ? 'bg-[#26783C] text-white font-bold shadow-2xs'
                    : 'bg-[#EAF1DC]/60 dark:bg-[#14241B] hover:bg-[#E4EDCF] dark:hover:bg-[#1F3A29] text-[#173D2A] dark:text-[#ECF5EE] border border-[#DCE6D2] dark:border-[#274735]'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#687769] dark:text-[#96B4A0]">Branch:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-1.5 bg-[#EAF1DC]/70 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-[#ECF5EE] outline-none text-xs cursor-pointer"
            >
              {branchesList.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[#687769] dark:text-[#96B4A0]">
        <span>
          Showing <strong className="text-[#173D2A] dark:text-[#ECF5EE]">{matchedCandidates.length}</strong> matching candidate{matchedCandidates.length === 1 ? '' : 's'}
        </span>
        {(searchQuery || projectIdea) && (
          <span className="text-[#26783C] dark:text-[#4ADE80] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Filtered by AI Match Relevance
          </span>
        )}
      </div>

      {/* Candidate Teammate Cards Grid */}
      {matchedCandidates.length === 0 ? (
        <div className="bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] p-12 text-center space-y-3">
          <UsersRound className="w-10 h-10 text-[#687769] dark:text-[#96B4A0] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#173D2A] dark:text-white">
            No matching candidates found
          </h3>
          <p className="text-xs text-[#687769] dark:text-[#96B4A0] max-w-md mx-auto">
            Try searching with broader terms, clicking a skill chip (e.g. React, Python, Flutter), or resetting the query filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#26783C] hover:bg-[#1C622F] text-white rounded-btn text-xs font-bold transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {matchedCandidates.map(({ candidate, matchPercent, matchExplanation }) => (
            <div
              key={candidate.id}
              className="bg-[#FAFCF5] dark:bg-[#162A1E] border border-[#DCE6D2] dark:border-[#274735] rounded-card p-5 shadow-subtle hover:border-[#26783C]/60 dark:hover:border-[#4ADE80]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidate.avatarUrl}
                      alt={candidate.fullName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#26783C]/40"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-[#173D2A] dark:text-[#ECF5EE] group-hover:text-[#26783C] dark:group-hover:text-[#4ADE80] transition-colors">
                        {candidate.fullName}
                      </h3>
                      <div className="text-[11px] text-[#687769] dark:text-[#96B4A0]">
                        {candidate.branch.split(' ')[0]} • {candidate.academicYear}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#B88718] dark:text-[#EFC66B] font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-[#EFC66B] text-[#EFC66B]" />
                        <span>{candidate.reputation} / 5.0 Reputation</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E4EDCF] dark:bg-[#0E3A2F] text-[#26783C] dark:text-[#4ADE80] border border-[#26783C]/30 dark:border-[#166534]">
                    {matchPercent}% Match
                  </span>
                </div>

                {/* Match explanation */}
                <div className="bg-[#EAF1DC]/60 dark:bg-[#0D1610] p-2.5 rounded-xl text-[11px] text-[#173D2A] dark:text-[#D3E0C8] mb-3 flex items-start gap-1.5 border border-[#DCE6D2]/60 dark:border-[#274735]">
                  <Sparkles className="w-3.5 h-3.5 text-[#EFC66B] flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{matchExplanation}</span>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#687769] dark:text-[#96B4A0] line-clamp-2 leading-relaxed mb-3">
                  {candidate.bio}
                </p>

                {/* Skills */}
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-[#687769] dark:text-[#96B4A0] tracking-wider">
                    Verified Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                          s.verified
                            ? 'bg-[#E4EDCF] dark:bg-[#1E3627] text-[#173D2A] dark:text-[#ECF5EE] border border-[#26783C]/20 dark:border-[#2E8555]/40'
                            : 'bg-[#EAF1DC] dark:bg-[#14241B] text-[#687769] dark:text-[#96B4A0]'
                        }`}
                      >
                        {s.name}
                        {s.verified && <CheckCircle2 className="w-2.5 h-2.5 text-[#26783C] dark:text-[#4ADE80]" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-[#DCE6D2] dark:border-[#274735] flex items-center justify-between gap-2">
                <Link
                  to={`/users/${candidate.id}`}
                  className="px-3 py-1.5 border border-[#DCE6D2] dark:border-[#274735] hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] text-[#173D2A] dark:text-[#ECF5EE] text-xs font-semibold rounded-btn transition-colors"
                >
                  View Profile
                </Link>

                <button
                  onClick={() => setInviteModalUser(candidate.fullName)}
                  className="px-3.5 py-1.5 bg-[#26783C] hover:bg-[#1C622F] text-white text-xs font-bold rounded-btn transition-colors shadow-2xs cursor-pointer"
                >
                  Invite to Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      {inviteModalUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAFCF5] dark:bg-[#162A1E] rounded-card border border-[#DCE6D2] dark:border-[#274735] p-6 max-w-md w-full shadow-card text-[#1D3024] dark:text-[#ECF5EE] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE6D2] dark:border-[#274735]">
              <div className="font-bold text-base text-[#173D2A] dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#26783C]" />
                Invite {inviteModalUser}
              </div>
              <button
                onClick={() => setInviteModalUser(null)}
                className="text-[#687769] hover:text-[#173D2A] dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#173D2A] dark:text-[#ECF5EE] mb-1">Select Project</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#173D2A] dark:text-[#ECF5EE] mb-1">Proposed Role</label>
                <input
                  type="text"
                  required
                  value={proposedRole}
                  onChange={(e) => setProposedRole(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173D2A] dark:text-[#ECF5EE] mb-1">Personal Note</label>
                <textarea
                  rows={2}
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Hey, we are building this project and your skill set is a great fit..."
                  className="w-full px-3 py-2 bg-[#EAF1DC]/50 dark:bg-[#0D1610] border border-[#DCE6D2] dark:border-[#274735] rounded-input text-[#1D3024] dark:text-white outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalUser(null)}
                  className="px-4 py-2 border border-[#DCE6D2] dark:border-[#274735] text-[#687769] hover:bg-[#EAF1DC] dark:hover:bg-[#1E3627] rounded-btn font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#26783C] hover:bg-[#1C622F] text-white rounded-btn font-bold cursor-pointer shadow-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
