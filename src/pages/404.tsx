import React from "react";
import { Link } from "gatsby";
import { Home, ArrowLeft, Search } from "lucide-react";

// --- CSS for Glitch Animation ---
const glitchStyles = `
  @keyframes glitch {
    0% { transform: translate(0) }
    20% { transform: translate(-2px, 2px) }
    40% { transform: translate(-2px, -2px) }
    60% { transform: translate(2px, 2px) }
    80% { transform: translate(2px, -2px) }
    100% { transform: translate(0) }
  }
  
  .animate-glitch {
    animation: glitch 2.5s infinite;
  }
  
  /* Scanline background effect */
  .bg-grid-pattern {
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
  }
`;

const NotFoundPage = () => {
  return (
    <>
      <style>{glitchStyles}</style>
      <main className="relative min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden px-6">
        {/* 1. Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl mix-blend-screen"></div>

        {/* 2. Glass Container */}
        <div className="relative z-10 max-w-2xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          {/* Glitchy 404 Text */}
          <div className="relative mb-6">
            <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 select-none animate-glitch">
              404
            </h1>
            {/* Shadow/Echo for depth */}
            <span
              className="absolute inset-0 text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-primary-500/20 blur-sm select-none"
              aria-hidden="true"
            >
              404
            </span>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-white mb-4">Connection Lost</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for has been moved, deleted, or currently exists in a parallel dimension.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Button */}
            <Link
              to="/"
              className="group flex items-center gap-2 bg-primary-500 text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              Return Home
            </Link>

            {/* Secondary Button (Contact/Back) */}
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 bg-transparent border border-white/20 text-white font-medium py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </div>

        {/* Decorative Bottom Text */}
        <div className="absolute bottom-8 text-center w-full text-gray-600 text-xs font-mono uppercase tracking-[0.2em]">
          Error Code: 0x404 • Resource Not Found
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
