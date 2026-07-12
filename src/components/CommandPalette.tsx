import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Home,
  User,
  FolderOpen,
  Rss,
  Award,
  Github,
  Linkedin,
  Codepen,
  Share2,
  Code,
  Settings,
  Wrench,
  Phone,
  Newspaper,
  Mail,
  Camera
} from 'lucide-react';
import { BookIcon, LeetcodeIcon } from './icons/SocialIcons';
import { books } from './Bookshelf';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  category: 'recent' | 'navigation' | 'actions' | 'books';
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  const bookItems: SearchItem[] = books.map((book) => ({
    id: `book-${book.slug}`,
    title: `Book: ${book.title}`,
    description: `Read thoughts on ${book.title} by ${book.author}`,
    icon: <BookIcon size="16" />,
    category: 'books',
    action: () => {
      navigate(`/thoughts/${book.slug}`);
      onNavigate?.(`/thoughts/${book.slug}`);
      onClose();
    }
  }));

  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load recent command IDs from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cmd-palette-recent');
      if (saved) {
        setRecentIds(JSON.parse(saved));
      } else {
        // Fallback default navigation items
        setRecentIds(['home', 'projects', 'contact']);
      }
    } catch (e) {
      console.error('Failed to load recent commands:', e);
    }
  }, []);

  const addToRecent = (id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 3);
      try {
        localStorage.setItem('cmd-palette-recent', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save recent commands:', e);
      }
      return next;
    });
  };

  const handleItemAction = (item: SearchItem) => {
    const originalId = item.id.startsWith('recent-') ? item.id.replace('recent-', '') : item.id;
    addToRecent(originalId);
    item.action();
  };

  // Play click audio sound from public/Audio/
  const playClickSound = () => {
    const audio = new Audio('/Audio/mouse-click.mp3');
    audio.volume = 0.2; // Lower volume for a very soft and pleasant click
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

  // Define all search items with proper categorization
  const searchItems: SearchItem[] = [
    {
      id: 'home',
      title: 'Go to Home',
      description: 'Navigate to the homepage',
      icon: <Home size={16} />,
      shortcut: 'Shift+H',
      category: 'navigation',
      action: () => {
        navigate('/');
        onNavigate?.('/');
        onClose();
      }
    },

    // Navigation
    {
      id: 'about',
      title: 'Go to About',
      description: 'Learn more about me',
      icon: <User size={16} />,
      shortcut: 'Shift+A',
      category: 'navigation',
      action: () => {
        navigate('/about');
        onNavigate?.('/about');
        onClose();
      }
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      description: 'View my projects',
      icon: <FolderOpen size={16} />,
      shortcut: 'Shift+P',
      category: 'navigation',
      action: () => {
        navigate('/projects');
        onNavigate?.('/projects');
        onClose();
      }
    },
    {
      id: 'photos',
      title: 'Go to Photos',
      description: 'View my photography portfolio',
      icon: <Camera size={16} />,
      shortcut: 'Shift+F',
      category: 'navigation',
      action: () => {
        navigate('/photos');
        onNavigate?.('/photos');
        onClose();
      }
    },
    {
      id: 'blogs',
      title: 'Go to Blogs',
      description: 'Read my blog posts',
      icon: <Rss size={16} />,
      shortcut: 'Shift+B',
      category: 'navigation',
      action: () => {
        navigate('/all-posts');
        onNavigate?.('/all-posts');
        onClose();
      }
    },
    {
      id: 'certificates',
      title: 'Go to Certificates',
      description: 'View my certificates',
      icon: <Award size={16} />,
      shortcut: 'Shift+C',
      category: 'navigation',
      action: () => {
        navigate('/certificates');
        onNavigate?.('/certificates');
        onClose();
      }
    },
    {
      id: 'resume',
      title: 'Go to Resume',
      description: 'View my resume and experience',
      icon: <BookIcon size="16" />,
      shortcut: 'Shift+R',
      category: 'navigation',
      action: () => {
        navigate('/resume');
        onNavigate?.('/resume');
        onClose();
      }
    },
    {
      id: 'experience',
      title: 'Go to Experience',
      description: 'View my work experience and history',
      icon: <Award size={16} />,
      shortcut: 'Shift+W',
      category: 'navigation',
      action: () => {
        navigate('/experience');
        onNavigate?.('/experience');
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      description: 'Get in touch',
      icon: <Phone size={16} />,
      shortcut: 'Shift+T',
      category: 'navigation',
      action: () => {
        navigate('/contact');
        onNavigate?.('/contact');
        onClose();
      }
    },
    {
      id: 'tools-gears',
      title: 'Go to Tools & Gears',
      description: 'Explore my development tools and gear',
      icon: <Wrench size={16} />,
      shortcut: 'Shift+O',
      category: 'navigation',
      action: () => {
        navigate('/gears');
        onNavigate?.('/gears');
        onClose();
      }
    },
    {
      id: 'vscode-extensions',
      title: 'Go to VS Code Extensions',
      description: 'Check out my recommended extensions',
      icon: <Settings size={16} />,
      shortcut: 'Shift+X',
      category: 'navigation',
      action: () => {
        navigate('/extensions');
        onNavigate?.('/extensions');
        onClose();
      }
    },
    ...bookItems,

    // Actions
    {
      id: 'share-page',
      title: 'Share Current Page',
      description: 'Share this page on social media',
      icon: <Share2 size={16} />,
      shortcut: 'Shift+S',
      category: 'actions',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
        }
        onClose();
      }
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      description: 'Copy my email to clipboard',
      icon: <Mail size={16} />,
      shortcut: 'Shift+E',
      category: 'actions',
      action: () => {
        navigator.clipboard.writeText('pati.dhrubaraj@outlook.com');
        onClose();
      }
    },
    {
      id: 'view-source',
      title: 'View Source Code',
      description: 'Open GitHub repository',
      icon: <Code size={16} />,
      shortcut: 'Shift+V',
      category: 'actions',
      action: () => window.open('https://github.com/codewithdhruba01/codewithdhruba.app', '_blank')
    },
    {
      id: 'github-profile',
      title: 'Open GitHub Profile',
      description: 'Visit my GitHub profile',
      icon: <Github size={16} />,
      shortcut: 'Shift+G',
      category: 'actions',
      action: () => window.open('https://github.com/codewithdhruba01', '_blank')
    },
    {
      id: 'linkedin-profile',
      title: 'Open LinkedIn Profile',
      description: 'Connect on LinkedIn',
      icon: <Linkedin size={16} />,
      shortcut: 'Shift+L',
      category: 'actions',
      action: () => window.open('https://www.linkedin.com/in/dhrubaraj-pati/', '_blank')
    },
    {
      id: 'daily-dev',
      title: 'Open Daily.dev',
      description: 'Follow me on Daily.dev',
      icon: <Newspaper size={16} />,
      shortcut: 'Shift+D',
      category: 'actions',
      action: () => window.open('https://app.daily.dev/codewithdhruba', '_blank')
    },
    {
      id: 'codepen',
      title: 'Open CodePen',
      description: 'View my CodePen creations',
      icon: <Codepen size={16} />,
      shortcut: 'Shift+N',
      category: 'actions',
      action: () => window.open('https://codepen.io/Dhrubaraj-Pati-the-looper', '_blank')
    },
    {
      id: 'leetcode',
      title: 'Open Leetcode',
      description: 'View my Leetcode profile',
      icon: <LeetcodeIcon size="16" />,
      shortcut: 'Shift+I',
      category: 'actions',
      action: () => window.open('https://leetcode.com/u/codewithdhruba/', '_blank')
    }
  ];

  // Dynamically build the list of items starting with Recent items
  const recentItems: SearchItem[] = recentIds
    .map((id) => {
      const baseItem = searchItems.find((item) => item.id === id);
      if (!baseItem) return null;
      const recentItem: SearchItem = {
        ...baseItem,
        id: `recent-${baseItem.id}`,
        category: 'recent',
        action: () => baseItem.action()
      };
      return recentItem;
    })
    .filter((item): item is SearchItem => item !== null);

  const finalItems = [...recentItems, ...searchItems];

  // Filter items based on search query
  const filteredItems = finalItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  // Animation effects
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Wait for the next browser paint to ensure the initial closed state is rendered
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setSearchQuery('');
        setSelectedIndex(0);
      }, 300); // Matches the 300ms transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus input when open and animated
  useEffect(() => {
    if (isAnimating) {
      inputRef.current?.focus();
    }
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredItems[selectedIndex]) {
            playClickSound();
            handleItemAction(filteredItems[selectedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }

      // Shortcut keys
      const targetShortcut = `Shift+${event.key.toUpperCase()}`;
      const shortcutItem = filteredItems.find(item => item.shortcut === targetShortcut);
      if (shortcutItem && event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        playClickSound();
        handleItemAction(shortcutItem);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Lock body scroll and prevent layout shift
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = `${scrollbarWidth}px`;
        }
      }
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = '';
        }
      }, 150); // Wait for transition to finish before restoring scroll
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const categoryLabels = {
    recent: 'Recent',
    navigation: 'Navigation',
    books: 'Bookshelf / Reading',
    actions: 'Actions'
  };

  return (
    <>
      <style>{`
        .cmd-palette-scroll::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
      {/* Backdrop with high-fidelity blur */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-[4px] transition-all duration-[300ms] ease-out
                   ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-[70] flex items-end justify-center pb-6 px-4 md:items-center md:pb-0 overflow-y-auto"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-[440px] bg-[#0e0e10] border border-neutral-800/80 rounded-xl
                     shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]
                     overflow-hidden transition-all duration-[300ms] cubic-bezier(0.16, 1, 0.3, 1) transform
                     origin-bottom md:origin-center
                     flex flex-col-reverse md:flex-col
                     ${isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-[0.35] translate-y-3 md:scale-95 md:translate-y-0'
            }`}
        >
          {/* Search Header Container (Swaps to bottom on mobile) */}
          <div className="p-4 pb-4 md:pb-2">
            <div className="flex items-center bg-[#151518] border border-neutral-800/70 rounded-xl px-3.5 py-2.5 shadow-inner">
              <Search className="w-4 h-4 text-neutral-400 mr-2.5 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-sm font-outfit font-light"
              />
            </div>
          </div>

          {/* Results Scroll Container (Swaps to top on mobile) */}
          <div
            className="max-h-[450px] md:max-h-[420px] overflow-y-auto overscroll-contain px-2.5 pt-4 pb-2 md:pt-2 md:pb-4 space-y-4 cmd-palette-scroll"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-3 mb-2">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const globalIndex = filteredItems.findIndex(filtered => filtered.id === item.id);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        ref={isSelected ? activeItemRef : null}
                        onClick={() => {
                          playClickSound();
                          handleItemAction(item);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left
                                   transition-all duration-200 group
                                   ${isSelected ? 'bg-[#1c1c1e]' : 'hover:bg-[#151518]/60 bg-transparent'}`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`flex-shrink-0 text-neutral-400 transition-colors duration-200
                            ${isSelected ? 'text-white' : 'group-hover:text-white'}`}>
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-white font-medium text-sm font-outfit truncate">{item.title}</div>
                            <div className="text-neutral-500 text-xs font-outfit truncate mt-0.5">{item.description}</div>
                          </div>
                        </div>
                        {item.shortcut && (
                          <div className="text-[10px] font-mono text-neutral-400 bg-neutral-800/40 border border-neutral-700/50 px-1.5 py-0.5 rounded-md flex-shrink-0 ml-2 shadow-sm font-semibold">
                            {item.shortcut}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && searchQuery && (
              <div className="px-4 py-12 text-center text-neutral-500 text-sm font-outfit font-light">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;
