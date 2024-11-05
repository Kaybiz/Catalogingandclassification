import { useState } from 'react';
import { Upload as UploadIcon, X, File, Check } from 'lucide-react';

export default function Upload() {
  const [files, setFiles] = useState([
    { id: 1, name: 'book-cover.jpg', status: 'complete', type: 'image' },
    { id: 2, name: 'copyright-page.pdf', status: 'processing', type: 'pdf' }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      status: 'processing',
      type: file.type.includes('image') ? 'image' : 'pdf'
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Upload Materials
      </h1>

      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-200">
              Drop files here or click to upload
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files || []);
                const newFiles = selectedFiles.map((file, index) => ({
                  id: Date.now() + index,
                  name: file.name,
                  status: 'processing',
                  type: file.type.includes('image') ? 'image' : 'pdf'
                }));
                setFiles([...files, ...newFiles]);
              }}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            PDF, PNG, JPG up to 10MB each
          </p>
        </div>
      </div>

      {/* File List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Uploaded Files
          </h2>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {files.map((file) => (
              <li key={file.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-6 w-6 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {file.status === 'complete' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-t-indigo-500 rounded-full animate-spin" />
                    )}
                    <button 
                      className="ml-4 text-gray-400 hover:text-gray-500"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Process Files
        </button>
      </div>
    </div>
  );
}
