import { useState, useCallback } from 'react';
import { Search, Zap, Shield, Sparkles, Globe, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { SEARCH_ENGINES } from '@/constants/languages';
import heroBanner from '@/assets/hero-banner.jpg';
import logo from '@/assets/logo.png';

interface BrowserHomePageProps {
  onNavigate: (url: string) => void;
  language: string;
  isRTL: boolean;
  launcherPrimary: string;
}

const quickLinks = [
  { name: 'Google', url: 'https://www.google.com', color: 'from-blue-500 to-blue-600', letter: 'G' },
  { name: 'YouTube', url: 'https://www.youtube.com', color: 'from-red-500 to-red-600', letter: 'Y' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org', color: 'from-gray-600 to-gray-700', letter: 'W' },
  { name: 'GitHub', url: 'https://github.com', color: 'from-gray-800 to-gray-900', letter: 'Gh' },
  { name: 'Twitter', url: 'https://twitter.com', color: 'from-sky-400 to-sky-500', letter: 'X' },
  { name: 'Reddit', url: 'https://www.reddit.com', color: 'from-orange-500 to-orange-600', letter: 'R' },
  { name: 'LinkedIn', url: 'https://linkedin.com', color: 'from-blue-700 to-blue-800', letter: 'Li' },
  { name: 'News', url: 'https://news.google.com', color: 'from-emerald-500 to-emerald-600', letter: 'N' },
];

const stats = [
  { label: 'Ultra Fast', value: '< 0.1s', icon: Zap, color: 'text-amber-500' },
  { label: 'Secure', value: '256-bit', icon: Shield, color: 'text-emerald-500' },
  { label: 'Smart', value: 'AI+', icon: Sparkles, color: 'text-purple-500' },
  { label: 'Global', value: '100+', icon: Globe, color: 'text-blue-500' },
];

export const BrowserHomePage = ({ onNavigate, isRTL, launcherPrimary }: BrowserHomePageProps) => {
  const [query, setQuery] = useState('');
  const [activeEngine, setActiveEngine] = useState('google');

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    const engine = SEARCH_ENGINES.find(e => e.id === activeEngine)!;
    if (query.startsWith('http://') || query.startsWith('https://') || (query.includes('.') && !query.includes(' '))) {
      onNavigate(query.includes('://') ? query : 'https://' + query);
    } else {
      onNavigate(engine.url + encodeURIComponent(query));
    }
    setQuery('');
  }, [query, activeEngine, onNavigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={`h-full overflow-y-auto gradient-bg-animated ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-20 left-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)' }} />
        <div className="orb-2 absolute top-40 right-32 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)' }} />
        <div className="orb-3 absolute bottom-40 left-1/2 w-56 h-56 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Logo + Title */}
        <div className="text-center mb-8 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 float-anim tube-glow rounded-2xl overflow-hidden glass-card flex items-center justify-center">
              <img src={logo} alt="UniOrbi" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-black shimmer-text tracking-tight">ES Browser</h1>
              <p className="text-xs font-medium text-emerald-600 tracking-widest uppercase">UniOrbi Platform</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Fast · Secure · Beautiful · Intelligent</p>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-6 tube-glow fade-in-up" style={{ animationDelay: '0.1s' }}>
          <img src={heroBanner} alt="ES Browser" className="w-full h-32 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60 flex items-center justify-center">
            <div className="text-center">
              <p className="text-base font-bold text-emerald-800 glow-emerald digital-display">UniOrbi · ES Browser</p>
              <p className="text-xs text-gray-600">The Smartest Way to Browse</p>
            </div>
          </div>
        </div>

        {/* Search Engines */}
        <div className="flex gap-1 mb-2 overflow-x-auto pb-1 fade-in-up" style={{ animationDelay: '0.15s' }}>
          {SEARCH_ENGINES.map(eng => (
            <button
              key={eng.id}
              onClick={() => setActiveEngine(eng.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeEngine === eng.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                  : 'glass-card text-gray-600 hover:bg-emerald-50'
              }`}
            >
              {eng.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card rounded-2xl tube-border-emerald flex items-center gap-2 px-4 py-3 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-emerald-100">
            <Search className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search or enter URL..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md shadow-emerald-200"
            >
              Go
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6 fade-in-up" style={{ animationDelay: '0.25s' }}>
          {stats.map(stat => (
            <div key={stat.label} className="glass-card rounded-xl p-3 text-center card-3d">
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
              <p className="text-sm font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-6 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-gray-700">Quick Access</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quickLinks.map(link => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.url)}
                className="glass-card rounded-xl p-3 flex flex-col items-center gap-1 card-3d hover:scale-105 transition-all duration-200 group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-white text-xs font-bold group-hover:shadow-md transition-shadow`}>
                  {link.letter}
                </div>
                <span className="text-xs text-gray-600 font-medium">{link.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-3 fade-in-up" style={{ animationDelay: '0.35s' }}>
          <div className="glass-emerald rounded-xl p-3 text-center card-3d cursor-pointer">
            <BookOpen className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-emerald-800">Bookmarks</p>
          </div>
          <div className="glass-crimson rounded-xl p-3 text-center card-3d cursor-pointer">
            <Clock className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-xs font-semibold text-red-700">History</p>
          </div>
          <div className="glass-gold rounded-xl p-3 text-center card-3d cursor-pointer">
            <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-xs font-semibold text-amber-700">Smart AI</p>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-6 glass-emerald rounded-xl py-2 overflow-hidden tube-border-emerald">
          <div className="marquee-container">
            <div className="marquee-content text-xs font-semibold text-emerald-700">
              {Array(4).fill('⚡ ES Browser — UniOrbi Platform &nbsp;&nbsp;•&nbsp;&nbsp; 🛡️ Secure Browsing &nbsp;&nbsp;•&nbsp;&nbsp; 🎵 Built-in Media Player &nbsp;&nbsp;•&nbsp;&nbsp; 🖼️ Native Gallery &nbsp;&nbsp;•&nbsp;&nbsp; 🌍 Multi-language Support &nbsp;&nbsp;•&nbsp;&nbsp; ⚙️ Admin Panel &nbsp;&nbsp;•&nbsp;&nbsp; 🎨 8 Launcher Themes &nbsp;&nbsp;&nbsp;&nbsp;').join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
