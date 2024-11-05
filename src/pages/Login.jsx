import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleDemoAccess = async () => {
    await login('demo@catandclass.io', 'demo123');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      <div className="flex min-h-screen">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to Cat&Class
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Access your library catalog management
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleDemoAccess}
                  className="w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-transparent hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Preview Cat&Class Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Features Preview */}
        <div className="hidden lg:flex flex-1 bg-indigo-600 text-white">
          <div className="flex flex-col justify-center px-12">
            <h2 className="text-4xl font-bold mb-8">
              Intelligent Knowledge Organization
            </h2>
            <ul className="space-y-6">
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
                  1
                </div>
                <span>AI-Powered Cataloging Assistant</span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
                  2
                </div>
                <span>Library of Congress Integration</span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
                  3
                </div>
                <span>Smart Subject Analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
