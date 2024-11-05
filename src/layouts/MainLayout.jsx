import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, Search, Upload, BarChart, 
  LogOut, Menu, X, Sun, Moon 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const navigation = [
  { name: 'Catalog', icon: Book, path: '/catalog' },
  { name: 'Upload', icon: Upload, path: '/upload' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Analytics', icon: BarChart, path: '/analytics' }
];

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden ${
        sidebarOpen ? 'block' : 'hidden'
      }`}>
        <div className="fixed inset-0 flex">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Cat&Class</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      location.pathname === item.path
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <button
                onClick={toggleDarkMode}
                className="flex-1 flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
              >
                {darkMode ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:dark:border-gray-700 lg:bg-white lg:dark:bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Cat&Class</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-200'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex flex-col border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
          >
            {darkMode ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={logout}
            className="mt-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <span className="text-xl font-bold text-gray-900 dark:text-white lg:hidden">
                Cat&Class
              </span>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

