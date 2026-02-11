import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Home from '@/pages/Home';
import StoreBuilder from '@/pages/StoreBuilder';
import MarketingBuilder from '@/pages/MarketingBuilder';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import CaseStudies from '@/pages/CaseStudies';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import './App.css';

// Hash-based router for GitHub Pages compatibility
type Route = 'home' | 'builder-store' | 'builder-marketing' | 'blog' | 'about' | 'contact' | 'case-studies' | 'admin';

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  // Parse hash route
  useEffect(() => {
    const parseRoute = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const validRoutes: Route[] = ['home', 'builder-store', 'builder-marketing', 'blog', 'about', 'contact', 'case-studies', 'admin'];
      if (validRoutes.includes(hash as Route)) {
        setCurrentRoute(hash as Route);
      } else {
        setCurrentRoute('home');
      }
    };

    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    return () => window.removeEventListener('hashchange', parseRoute);
  }, []);

  // Check for existing admin token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    window.location.hash = '#/admin';
  };

  // Render current page
  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home />;
      case 'builder-store':
        return <StoreBuilder />;
      case 'builder-marketing':
        return <MarketingBuilder />;
      case 'blog':
        return <Blog />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'case-studies':
        return <CaseStudies />;
      case 'admin':
        return isAdmin ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          },
        }}
      />
      {renderPage()}
    </div>
  );
}

export default App;
