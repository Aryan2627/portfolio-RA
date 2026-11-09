import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, FileText, Settings, HelpCircle, LogOut, Wand2, Microscope, Sigma } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
    { icon: UploadCloud, label: 'Upload Data', path: '/app/upload' },
    { icon: Microscope, label: 'Quality Control', path: '/app/qc' },
    { icon: Wand2, label: 'Data Cleaning', path: '/app/cleaning' },
    { icon: Sigma, label: 'Statistical Analysis', path: '/app/statistics' },
    { icon: FileText, label: 'AI Insights', path: '/app/explain' },
  ];

  return (
    <div className="w-64 bg-surface border-r border-slate-700 flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        {/* mix-blend-mode trick or we assume the image has transparent bg */}
        <img src="/logo.png" alt="Torvixo.ai" className="h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" style={{ filter: 'contrast(1.1)' }} />
      </div>
      
      <div className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'text-textMuted hover:bg-slate-800 hover:text-textMain'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-textMuted hover:text-textMain rounded-lg hover:bg-slate-800 transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-textMuted hover:text-textMain rounded-lg hover:bg-slate-800 transition-colors">
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors mt-4 border border-red-500/20"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
