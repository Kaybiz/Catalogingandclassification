import { useState } from 'react';
import { Book, Plus, Filter } from 'lucide-react';

export default function Catalog() {
  const [items] = useState([
    {
      id: 1,
      title: 'Introduction to Library Science',
      author: 'John Doe',
      subjects: ['Library Science', 'Information Management'],
      date: '2024-03-01'
    },
    {
      id: 2,
      title: 'Digital Libraries and Information Systems',
      author: 'Jane Smith',
      subjects: ['Digital Libraries', 'Information Technology'],
      date: '2024-02-28'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Catalog
        </h1>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Plus className="w-5 h-5 mr-2" />
          New Entry
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search catalog..."
            className="flex-1 min-w-[200px] px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <button className="inline-flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.author}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {item.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Added: {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
