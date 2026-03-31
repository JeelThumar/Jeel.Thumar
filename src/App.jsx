import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import WorkPage from './pages/WorkPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import Loader from './components/Loader';

function AppContent() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="blog" element={<BlogPage />} />

          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="blog/:id" element={<BlogPost />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </AnimatePresence>
  );
}

import { SpotlightProvider } from './context/SpotlightContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SpotlightProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <AnimatePresence mode="wait">
          {loading && <Loader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        {!loading && <AppContent />}
      </BrowserRouter>
    </SpotlightProvider>
  );
}

export default App;
