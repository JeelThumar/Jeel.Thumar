import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import WorkPage from './pages/WorkPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetail from './pages/CaseStudyDetail';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import Loader from './components/Loader';
import { SpotlightProvider } from './context/SpotlightContext';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="casestudies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:id" element={<CaseStudyDetail />} />
          <Route path="case-study/:id" element={<CaseStudyDetail />} />
          <Route path="casestudy/:id" element={<CaseStudyDetail />} />
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

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <SpotlightProvider>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <AnimatePresence mode="wait">
            {loading && <Loader onComplete={() => setLoading(false)} />}
          </AnimatePresence>
          {!loading && <AppContent />}
        </BrowserRouter>
      </SpotlightProvider>
    </MotionConfig>
  );
}

export default App;
