import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Upload from './pages/Upload';
import Search from './pages/Search';
import Analytics from './pages/Analytics';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/catalog"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Catalog />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Upload />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Search />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Analytics />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
