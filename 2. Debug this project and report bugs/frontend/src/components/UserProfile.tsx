import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user.username}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={logout}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">User ID</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.id}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Account Type</p>
              <p className="font-medium text-gray-900 dark:text-white">Demo Account</p>
            </div>
          </div>
          
          {/* Dark Mode Toggle */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Theme</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                backgroundColor: isDark ? '#3B82F6' : '#D1D5DB'
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
              <span className="sr-only">Toggle dark mode</span>
            </button>
          </div>
          
          {/* Theme Preview */}
          {/* <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Theme Preview</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-gray-900 dark:text-white">Background</p>
                <p className="text-gray-500 dark:text-gray-400">Text</p>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-blue-900 dark:text-blue-100">Primary</p>
                <p className="text-blue-600 dark:text-blue-300">Accent</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 