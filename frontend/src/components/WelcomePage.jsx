import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <>
      <style>{`
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }
        
        .role-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .role-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(26, 54, 93, 0.1), 0 10px 10px -5px rgba(26, 54, 93, 0.04);
            border-color: #1a365d;
        }

        .bg-pattern {
            background-color: #f8f9ff;
            background-image: radial-gradient(#dce9ff 1px, transparent 1px);
            background-size: 24px 24px;
        }
      `}</style>
      <div className="bg-pattern text-on-surface min-h-screen flex flex-col font-body-md">
        <header className="w-full flex justify-center py-lg px-margin-desktop absolute top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[32px]">school</span>
            <span className="font-display-lg text-primary-container text-headline-lg">UniSmart</span>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 relative">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-fixed-dim/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-surface-container-high/50 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 flex flex-col gap-6 z-10 text-center lg:text-left">
              <h1 className="font-display-lg text-display-lg text-primary-container">
                AI-Powered Academic Management for Modern Universities.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto lg:mx-0">
                Streamline institutional operations, enhance student engagement, and empower faculty with our intelligent learning management system. Choose your portal to begin.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 mt-12 lg:mt-0 relative">
              <Link className="role-card glass-panel rounded-xl p-8 flex flex-col items-start gap-6 group relative overflow-hidden bg-surface-container-lowest mt-0 sm:mt-12" to="/admin/login">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary-container group-hover:text-on-primary text-[32px] transition-colors duration-300" style={{fontVariationSettings: "'FILL' 1"}}>admin_panel_settings</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary-container mb-2">Login as Admin</h2>
                  <p className="font-body-md text-[14px] text-on-surface-variant">
                    Access institutional data, manage faculty, configure system settings, and oversee university-wide analytics.
                  </p>
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2 text-primary-container font-label-md text-label-md uppercase group-hover:gap-4 transition-all duration-300">
                  Enter Portal <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-surface-container-low opacity-50 z-[-1] group-hover:scale-110 transition-transform duration-500">domain</span>
              </Link>
              
              <Link className="role-card glass-panel rounded-xl p-8 flex flex-col items-start gap-6 group relative overflow-hidden bg-surface-container-lowest" to="/faculty/login">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary-container group-hover:text-on-primary text-[32px] transition-colors duration-300" style={{fontVariationSettings: "'FILL' 1"}}>local_library</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary-container mb-2">Login as Faculty</h2>
                  <p className="font-body-md text-[14px] text-on-surface-variant">
                    Manage courses, grade assignments, communicate with students, and review academic performance metrics.
                  </p>
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2 text-primary-container font-label-md text-label-md uppercase group-hover:gap-4 transition-all duration-300">
                  Enter Portal <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </div>
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-surface-container-low opacity-50 z-[-1] group-hover:scale-110 transition-transform duration-500">menu_book</span>
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-primary-container text-on-primary w-full py-xl px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
          <div className="font-body-md text-[14px]">
            © 2024 UniSmart Learning Management System. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end font-body-md text-[14px]">
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Privacy Policy</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Terms of Service</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Support</a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Accessibility</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WelcomePage;
