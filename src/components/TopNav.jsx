import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 w-64 focus-within:ring-1 focus-within:ring-primary transition-all">
        <Search size={18} className="text-textMuted mr-2" />
        <input 
          type="text" 
          placeholder="Search projects..." 
          className="bg-transparent border-none outline-none text-sm text-textMain w-full placeholder:text-slate-500"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-textMuted hover:text-textMain rounded-full hover:bg-slate-800 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-textMain">Dr. Demo User</p>
            <p className="text-xs text-textMuted">Bioinformatics Lab</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-primary font-medium">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
