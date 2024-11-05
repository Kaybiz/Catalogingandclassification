import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Book, Upload, Search } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome back, {user?.name || 'Librarian'}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 rounded-md">
                <Book className="w-5 h-5 mr-2" />
                New Catalog Entry
              </button>
              <button className="w-full flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 rounded-md">
                <Upload className="w-5 h-5 mr-2" />
                Upload Materials
              </button>
              <button className="w-full flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 rounded-md">
                <Search className="w-5 h-5 mr-2" />
                Search Catalog
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                No recent activity to display.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
