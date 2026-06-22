import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, UserCog, Calendar, Brain,
  FileText, AlertTriangle, Settings, LogOut, Activity,
  ChevronLeft, ChevronRight, Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useStore from '../../store/useStore';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Analytics', icon: Activity, path: '/analytics' },
];
const NAV_MANAGEMENT = [
  { label: 'Patients', icon: Users, path: '/patients' },
  { label: 'Doctors', icon: UserCog, path: '/doctors' },
  { label: 'Appointments', icon: Calendar, path: '/appointments' },
];
const NAV_TOOLS = [
  { label: 'AI Analysis', icon: Brain, path: '/ai-analysis' },
  { label: 'Medical Reports', icon: FileText, path: '/reports' },
  { label: 'Emergency', icon: AlertTriangle, path: '/emergency' },
];
const NAV_SYSTEM = [
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const renderNavGroup = (items) =>
    items.map(({ label, icon: Icon, path }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        title={sidebarCollapsed ? label : undefined}
      >
        <Icon size={20} style={{ flexShrink: 0 }} />
        <span className="sidebar-nav-label">{label}</span>
        {path === '/emergency' && (
          <span style={{
            marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%',
            background: '#ef4444', flexShrink: 0,
            animation: 'pulse-red 1.5s infinite',
            display: sidebarCollapsed ? 'none' : 'block'
          }} />
        )}
      </NavLink>
    ));

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <motion.aside
        className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
        initial={false}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Heart size={22} color="white" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="sidebar-logo-text"
              >
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)' }}>
                  MediCore
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>Hospital System</div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Collapse toggle - desktop only */}
          <button
            onClick={toggleSidebar}
            style={{
              marginLeft: 'auto',
              width: 28, height: 28,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-glass)',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              display: window.innerWidth <= 768 ? 'none' : 'flex'
            }}
          >
            {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Overview</div>
          {renderNavGroup(NAV_ITEMS)}

          <div className="sidebar-section-title" style={{ marginTop: 12 }}>Management</div>
          {renderNavGroup(NAV_MANAGEMENT)}

          <div className="sidebar-section-title" style={{ marginTop: 12 }}>Tools</div>
          {renderNavGroup(NAV_TOOLS)}

          <div className="sidebar-section-title" style={{ marginTop: 12 }}>System</div>
          {renderNavGroup(NAV_SYSTEM)}

          <div style={{ marginTop: 8 }}>
            <button className="sidebar-nav-item w-full" onClick={handleLogout} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <LogOut size={20} style={{ flexShrink: 0, color: 'var(--accent-red)' }} />
              <span className="sidebar-nav-label" style={{ color: 'var(--accent-red)' }}>Logout</span>
            </button>
          </div>
        </nav>

        {/* Bottom info */}
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border-color)',
              fontSize: 11,
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}
          >
            MediCore HMS v2.0 • 2024
          </motion.div>
        )}
      </motion.aside>
    </>
  );
}
