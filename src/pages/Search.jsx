import { useState } from 'react';
import { Search as SearchIcon, Filter, Book } from 'lucide-react';

export default function Search() {
  const [searchResults] = useState([
    {
      id: 1,
      title: 'Introduction to Library Science',
      author: 'John Doe',
      subjects: ['Library Science', 'Information Management'],
      type: 'Book',
      relevance: 98
    },
    {
      id: 2,
      title: 'Digital Libraries and Information Systems',
      author: 'Jane Smith',
      subjects: ['Digital Libraries', 'Information Technology'],
      type: 'Book',
      relevance: 95
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Search
            </button>
          </div>

          {/* Filter Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
              <Filter className="w-4 h-4 mr-2" />
              Filter Results
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {searchResults.map((result) => (
          <div 
            key={result.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <Book className="w-6 h-6 text-indigo-600 mt-1" />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {result.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Relevance: {result.relevance}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">{result.author}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.subjects.map((subject) => (
                    <span 
                      key={subject}
                      className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
