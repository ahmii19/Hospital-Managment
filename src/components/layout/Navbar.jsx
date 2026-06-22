import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, Menu, X, LogOut, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useStore from '../../store/useStore';
import { NOTIFICATIONS } from '../../data/mockData';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { sidebarCollapsed, theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen, searchQuery, setSearchQuery } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef();
  const userRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    toast.success('See you soon!');
    navigate('/login');
  };

  return (
    <header className={`navbar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Mobile menu button */}
      <button className="navbar-icon-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none' }}
        id="mobile-menu-btn">
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Search */}
      <div className="navbar-search">
        <Search size={16} className="navbar-search-icon" />
        <input
          type="text"
          placeholder="Search patients, doctors, appointments..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        {/* Theme toggle */}
        <button className="navbar-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button className="navbar-icon-btn" onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}>
            <Bell size={18} />
            {unread > 0 && <span className="notification-badge">{unread}</span>}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>Notifications</span>
                  <span style={{ fontSize: 12, color: 'var(--accent-cyan)', marginLeft: 8 }}>{unread} new</span>
                </div>
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className="dropdown-item" style={{ alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>
                      {n.type === 'critical' ? '🔴' : n.type === 'success' ? '🟢' : n.type === 'warning' ? '🟡' : 'ℹ️'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: n.read ? 'var(--text-muted)' : 'var(--text-primary)', lineHeight: 1.4 }}>{n.message}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</div>
                    </div>
                    {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-cyan)', flexShrink: 0, marginTop: 4 }} />}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User dropdown */}
        <div ref={userRef} style={{ position: 'relative' }}>
          <div className="user-avatar" onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}>
            {user?.avatar || 'U'}
          </div>
          <AnimatePresence>
            {userOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{user?.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.email}</div>
                  <span className="badge badge-info" style={{ marginTop: 6, fontSize: 11 }}>{user?.role}</span>
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/settings'); setUserOpen(false); }}>
                  <User size={16} /> My Profile
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/settings'); setUserOpen(false); }}>
                  <Settings size={16} /> Settings
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
                <div className="dropdown-item" onClick={handleLogout} style={{ color: 'var(--accent-red)' }}>
                  <LogOut size={16} /> Logout
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
