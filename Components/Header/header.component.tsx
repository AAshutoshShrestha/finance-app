import { useState } from 'react';
import { useAppStore } from '@/lib/hooks/useAppStore';
import clsx from 'clsx';
import { BiBell, BiChevronDown, BiLogOut, BiMenu, BiMoon, BiSearch, BiSun, BiUser } from 'react-icons/bi';

export const Header: React.FC = () => {
  const { toggleSidebar, darkMode, toggleDarkMode, currentTenant, currentUser } = useAppStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl lg:hidden transition-colors"
        >
          <BiMenu size={22} className="text-gray-600 dark:text-gray-400" />
        </button>

        {/* Search */}
        <div className={clsx(
          'relative hidden md:flex items-center transition-all duration-200',
          searchFocused ? 'w-96' : 'w-72'
        )}>
          <BiSearch size={18} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search transactions, reports..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700/50 border border-transparent focus:border-blue-500 dark:focus:border-blue-400 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="absolute right-3 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded pointer-events-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Current Date */}
        <div className="hidden lg:flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-xl text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? (
            <BiSun size={20} className="text-yellow-500" />
          ) : (
            <BiMoon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors relative">
          <BiBell size={20} className="text-gray-600 dark:text-gray-400" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {currentUser?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser?.role || 'Admin'}
              </p>
            </div>
            <BiChevronDown size={16} className="text-gray-400 hidden md:block" />
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowUserMenu(false)} 
              />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentTenant?.name || 'Finance SaaS'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {currentUser?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <BiUser size={16} />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <BiLogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
