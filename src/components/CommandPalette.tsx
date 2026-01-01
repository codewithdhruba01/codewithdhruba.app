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
  X,
  Settings,
  Wrench,
  Phone,
  Newspaper,
  Mail
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  category: 'recent' | 'navigation' | 'actions';
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Define all search items with proper categorization
  const searchItems: SearchItem[] = [
    // Recent (show recently visited pages)
    {
      id: 'home',
      title: 'Go to Home',
      description: 'Navigate to the homepage',
      icon: <Home size={18} />,
      shortcut: 'H',
      category: 'recent',
      action: () => navigate('/')
    },

    // Navigation
    {
      id: 'about',
      title: 'Go to About',
      description: 'Learn more about me',
      icon: <User size={18} />,
      shortcut: 'A',
      category: 'navigation',
      action: () => navigate('/about')
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      description: 'View my projects',
      icon: <FolderOpen size={18} />,
      shortcut: 'P',
      category: 'navigation',
      action: () => navigate('/projects')
    },
    {
      id: 'blogs',
      title: 'Go to Blogs',
      description: 'Read my blog posts',
      icon: <Rss size={18} />,
      shortcut: 'B',
      category: 'navigation',
      action: () => navigate('/all-posts')
    },
    {
      id: 'certificates',
      title: 'Go to Certificates',
      description: 'View my certificates',
      icon: <Award size={18} />,
      shortcut: 'C',
      category: 'navigation',
      action: () => navigate('/certificates')
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      description: 'Get in touch',
      icon: <Phone size={18} />,
      shortcut: 'T',
      category: 'navigation',
      action: () => navigate('/contact')
    },
    {
      id: 'tools-gears',
      title: 'Go to Tools & Gears',
      description: 'Explore my development tools and gear',
      icon: <Wrench size={18} />,
      shortcut: 'O',
      category: 'navigation',
      action: () => navigate('/tools')
    },
    {
      id: 'vscode-extensions',
      title: 'Go to VS Code Extensions',
      description: 'Check out my recommended extensions',
      icon: <Settings size={18} />,
      shortcut: 'X',
      category: 'navigation',
      action: () => navigate('/extensions')
    },

    // Actions
    {
      id: 'share-page',
      title: 'Share Current Page',
      description: 'Share this page on social media',
      icon: <Share2 size={18} />,
      shortcut: 'Shift + S',
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
      icon: <Mail size={18} />,
      shortcut: 'E',
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
      icon: <Code size={18} />,
      shortcut: 'V',
      category: 'actions',
      action: () => window.open('https://github.com/codewithdhruba01/codewithdhruba.app', '_blank')
    },
    {
      id: 'github-profile',
      title: 'Open GitHub Profile',
      description: 'Visit my GitHub profile',
      icon: <Github size={18} />,
      shortcut: 'G',
      category: 'actions',
      action: () => window.open('https://github.com/codewithdhruba01', '_blank')
    },
    {
      id: 'linkedin-profile',
      title: 'Open LinkedIn Profile',
      description: 'Connect on LinkedIn',
      icon: <Linkedin size={18} />,
      shortcut: 'L',
      category: 'actions',
      action: () => window.open('https://www.linkedin.com/in/dhrubaraj-pati/', '_blank')
    },
    {
      id: 'daily-dev',
      title: 'Open Daily.dev',
      description: 'Follow me on Daily.dev',
      icon: <Newspaper size={18} />,
      shortcut: 'D',
      category: 'actions',
      action: () => window.open('https://app.daily.dev/codewithdhruba', '_blank')
    },
    {
      id: 'codepen',
      title: 'Open CodePen',
      description: 'View my CodePen creations',
      icon: <Codepen size={18} />,
      shortcut: 'N',
      category: 'actions',
      action: () => window.open('https://codepen.io/codewithdhruba01', '_blank')
    }
  ];

  // Filter items based on search query
  const filteredItems = searchItems.filter(item =>
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
      setIsAnimating(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsAnimating(false);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

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
            filteredItems[selectedIndex].action();
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }

      // Shortcut keys
      const shortcutItem = filteredItems.find(item => item.shortcut === event.key);
      if (shortcutItem && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        shortcutItem.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  if (!isOpen) return null;

  const categoryLabels = {
    recent: 'Recent',
    navigation: 'Navigation',
    actions: 'Actions'
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300
                   ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div
          className={`w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-xl
                     shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)]
                     overflow-hidden transition-all duration-300
                     ${isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4'
            }`}
        >
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-neutral-700">
            <Search className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-base"
            />
            <button
              onClick={onClose}
              className="ml-3 p-1 rounded-md hover:bg-neutral-800 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="px-2 py-3">
                <div className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2 px-2">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const globalIndex = filteredItems.findIndex(filtered => filtered.id === item.id);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={() => item.action()}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left
                                   transition-all duration-200 hover:bg-neutral-800
                                   ${isSelected ? 'bg-neutral-800' : ''}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="text-neutral-400 flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-white font-medium text-sm truncate">{item.title}</div>
                            <div className="text-neutral-500 text-xs truncate">{item.description}</div>
                          </div>
                        </div>
                        {item.shortcut && (
                          <div className="text-xs text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded flex-shrink-0 ml-2">
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
              <div className="px-4 py-8 text-center text-neutral-500 text-sm">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-neutral-700 bg-neutral-900/50">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <div>
                {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;
