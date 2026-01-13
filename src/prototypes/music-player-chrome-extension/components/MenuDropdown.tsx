import { Settings, User, LogOut, Info, MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface MenuDropdownProps {
  onLogout: () => void;
}

export function MenuDropdown({ onLogout }: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { icon: User, label: 'Account', onClick: () => console.log('Account') },
    { icon: Settings, label: 'Settings', onClick: () => console.log('Settings') },
    { icon: Info, label: 'About', onClick: () => console.log('About') },
    { icon: LogOut, label: 'Logout', onClick: onLogout, danger: true },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Menu"
      >
        <MoreVertical className="w-4 h-4 text-white/80" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#282828] rounded-lg shadow-2xl border border-white/10 overflow-hidden z-[9999] animate-in fade-in slide-in-from-top-2 duration-150">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-left ${
                item.danger ? 'text-red-400 hover:text-red-300' : 'text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}