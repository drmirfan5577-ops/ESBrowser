import { useEffect, useState, type FormEvent } from 'react';
import { Search, ArrowUpRight, CalendarDays, Globe } from 'lucide-react';

interface BrowserHomePageProps {
  onNavigate: (url: string) => void;
  language: string;
  isRTL: boolean;
  launcherPrimary: string;
}

const groups = [
  { title: 'Everyday essentials', links: [
    ['Google', 'https://www.google.com', 'G'], ['Gmail', 'https://mail.google.com', 'M'],
    ['Google Maps', 'https://maps.google.com', 'Mp'], ['Google Drive', 'https://drive.google.com', 'Dr'],
    ['Google Calendar', 'https://calendar.google.com', 'Ca'], ['Translate', 'https://translate.google.com', 'Tr'],
  ] },
  { title: 'Social & communities', links: [
    ['WhatsApp', 'https://web.whatsapp.com', 'Wa'], ['Facebook', 'https://www.facebook.com', 'Fb'],
    ['Instagram', 'https://www.instagram.com', 'Ig'], ['X', 'https://x.com', 'X'],
    ['LinkedIn', 'https://www.linkedin.com', 'Li'], ['Reddit', 'https://www.reddit.com', 'Re'],
    ['Telegram', 'https://web.telegram.org', 'Tg'], ['Discord', 'https://discord.com/app', 'Di'],
  ] },
  { title: 'Video, channels & audio', links: [
    ['YouTube', 'https://www.youtube.com', 'Yt'], ['YouTube Music', 'https://music.youtube.com', 'Ym'],
    ['Spotify', 'https://open.spotify.com', 'Sp'], ['Twitch', 'https://www.twitch.tv', 'Tw'],
    ['BBC News', 'https://www.bbc.com/news', 'BBC'], ['Al Jazeera', 'https://www.aljazeera.com', 'AJ'],
  ] },
  { title: 'AI, creation & discovery', links: [
    ['ChatGPT', 'https://chatgpt.com', 'AI'], ['Gemini', 'https://gemini.google.com', 'Ge'],
    ['Claude', 'https://claude.ai', 'Cl'], ['Perplexity', 'https://www.perplexity.ai', 'Pe'],
    ['Canva', 'https://www.canva.com', 'Cv'], ['Figma', 'https://www.figma.com', 'Fi'],
    ['GitHub', 'https://github.com', 'Gh'], ['Wikipedia', 'https://www.wikipedia.org', 'W'],
    ['Notion', 'https://www.notion.so', 'N'], ['Khan Academy', 'https://www.khanacademy.org', 'Ka'],
  ] },
];

export const BrowserHomePage = ({ onNavigate, isRTL }: BrowserHomePageProps) => {
  const [query, setQuery] = useState('');
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const search = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    onNavigate(/^(https?:\/\/)/i.test(value) ? value : /^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(value)
      ? `https://${value}` : `https://www.google.com/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f6f8f5] text-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-emerald-900/10 bg-white px-4 sm:px-8 py-3" dir="ltr">
        <h1 className="text-xs font-bold tracking-wide text-emerald-900">ES Browser</h1>
        <p lang="ur" dir="rtl" className="col-span-2 row-start-1 sm:row-auto sm:col-span-1 text-center text-base font-semibold bg-gradient-to-r from-emerald-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">بسم اللّٰہ الرحمٰن الرحیم</p>
        <time dateTime={now.toISOString()} className="flex items-center justify-end gap-2 text-right text-[11px] leading-4 tabular-nums text-slate-600">
          <CalendarDays className="h-4 w-4 text-emerald-700" />
          <span>{now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}<br />{now.toLocaleTimeString()}</span>
        </time>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 py-6 max-w-[1600px] mx-auto">
        <form onSubmit={search} role="search" className="flex items-center gap-3 rounded-2xl border border-emerald-900/15 bg-white px-4 py-3 mb-7 shadow-sm focus-within:ring-2 focus-within:ring-emerald-600">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input aria-label="Search Google or enter a website" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Google or enter a website" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          <button type="submit" className="rounded-xl bg-emerald-800 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-900">Search</button>
        </form>

        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500"><Globe className="w-4 h-4" />Your digital world · Open any platform in one click</div>
        <div className="space-y-7">
          {groups.map((group, index) => (
            <section key={group.title} aria-labelledby={`group-${index}`}>
              <div className="mb-3 flex items-center gap-3"><span className="font-mono text-[10px] text-emerald-700">0{index + 1}</span><h2 id={`group-${index}`} className="text-sm font-semibold">{group.title}</h2><div className="h-px flex-1 bg-emerald-900/10" /></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {group.links.map(([name, url, mark]) => (
                  <a key={url} href={url} className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 transition-colors hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-700">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${['bg-emerald-100 text-emerald-800', 'bg-sky-100 text-sky-800', 'bg-rose-100 text-rose-800', 'bg-amber-100 text-amber-800'][index]}`}>{mark}</span>
                    <span className="flex-1 text-xs font-semibold break-words">{name}</span><ArrowUpRight className="h-3 w-3 shrink-0 text-slate-400 group-hover:text-emerald-700" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-8 text-[11px] text-slate-500">Platforms open in this tab. Use your browser’s Back button to return. Some services require an account or regional availability.</p>
      </main>
    </div>
  );
};
