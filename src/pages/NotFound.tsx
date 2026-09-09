import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-animated">
      <div className="glass-card rounded-2xl p-8 text-center max-w-sm mx-4 fade-in-up">
        <div className="w-16 h-16 rounded-2xl glass-emerald tube-glow flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-black shimmer-text mb-2">404</h1>
        <p className="text-sm font-medium text-gray-600 mb-6">Page not found</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200">
          <Home className="w-4 h-4" />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
