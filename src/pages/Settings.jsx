import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Shield, Bell, Globe, Database, Palette, User, Building, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { DEPARTMENTS } from '../data/mockData';

const TABS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'hospital', label: 'Hospital Info', icon: Building },
  { id: 'departments', label: 'Departments', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', phone: '+1-555-0100', role: user?.role || '', bio: 'Hospital administrator with over 10 years of experience in healthcare management.' });
  const [notifs, setNotifs] = useState({ email: true, sms: false, push: true, emergency: true, appointments: true, reports: false });
  const [twoFA, setTwoFA] = useState(false);
  const [hospital, setHospital] = useState({ name: 'MediCore Hospital', address: '123 Medical Avenue, Healthcare City', phone: '+1-800-555-0100', email: 'admin@medicore.com', website: 'www.medicore.com', beds: 500, established: '1985' });
  const [language, setLanguage] = useState('en');

  const save = () => toast.success('Settings saved successfully! ✅');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and system preferences</p>
        </div>
        <button className="btn btn-primary" onClick={save}><Save size={16} /> Save Changes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        {/* Sidebar Tabs */}
        <div className="glass" style={{ borderRadius: 18, padding: 12, height: 'fit-content' }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 2,
                  background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(0,180,216,0.2), rgba(114,9,183,0.1))' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  borderLeft: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                }}
              >
                <Icon size={17} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="glass" style={{ borderRadius: 18, padding: 28 }}>
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>Profile Information</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Update your personal details and profile photo</p>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #00B4D8, #7209B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'white', border: '3px solid var(--accent-cyan)', boxShadow: '0 0 20px rgba(0,180,216,0.3)' }}>
                  {user?.avatar}
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm" onClick={() => toast.info('Upload photo coming soon')}><Upload size={14} /> Change Photo</button>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>JPG, PNG up to 5MB</div>
                </div>
              </div>

              <div className="grid-2">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Phone Number', key: 'phone', type: 'tel' },
                  { label: 'Role', key: 'role', type: 'text', disabled: true },
                ].map(f => (
                  <div key={f.key} className="form-group">
                    <label className="form-label">{f.label}</label>
                    <input type={f.type} className="form-input" value={profile[f.key]} disabled={f.disabled}
                      onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                      style={f.disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}} />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Biography</label>
                <textarea className="form-input" rows={3} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>Security Settings</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Manage password and authentication options</p>

              {/* Change Password */}
              <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Lock size={16} /> Change Password
                </div>
                <div className="grid-2">
                  {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
                    <div key={f} className="form-group" style={f === 'Current Password' ? { gridColumn: '1/-1' } : {}}>
                      <label className="form-label">{f}</label>
                      <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => toast.success('Password updated!')}>Update Password</button>
              </div>

              {/* 2FA */}
              <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 14, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={16} /> Two-Factor Authentication</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Add an extra layer of security to your account</div>
                  </div>
                  <div
                    onClick={() => { setTwoFA(!twoFA); toast.success(twoFA ? '2FA disabled' : '2FA enabled'); }}
                    style={{ width: 48, height: 26, borderRadius: 13, background: twoFA ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', border: `2px solid ${twoFA ? 'var(--accent-cyan)' : 'var(--border-color)'}` }}
                  >
                    <motion.div animate={{ left: twoFA ? '22px' : '2px' }}
                      style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>Notification Preferences</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Choose how and when you want to be notified</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Receive SMS alerts for critical events' },
                  { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'emergency', label: 'Emergency Alerts', desc: 'Immediate alerts for emergencies' },
                  { key: 'appointments', label: 'Appointment Reminders', desc: 'Reminders 30 mins before appointments' },
                  { key: 'reports', label: 'Report Ready Alerts', desc: 'Notify when lab reports are ready' },
                ].map((n, i) => (
                  <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < 5 ? '1px solid var(--border-color)' : 'none' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{n.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{n.desc}</div>
                    </div>
                    <div
                      onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                      style={{ width: 44, height: 24, borderRadius: 12, background: notifs[n.key] ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }}
                    >
                      <motion.div animate={{ left: notifs[n.key] ? '20px' : '2px' }}
                        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'hospital' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>Hospital Information</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Manage hospital details and contact information</p>
              <div className="grid-2">
                {Object.entries(hospital).map(([key, val]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                    <input className="form-input" value={val} onChange={e => setHospital({ ...hospital, [key]: e.target.value })} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'departments' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>Department Management</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Configure hospital departments and capacity</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DEPARTMENTS.map((dept, i) => (
                  <motion.div key={dept.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: dept.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Head: {dept.head}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{dept.beds} beds</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dept.occupied} occupied</div>
                    </div>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </motion.div>
                ))}
                <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => toast.info('Add department feature')}>+ Add Department</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 6 }}>Appearance & Language</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Customize the look and feel of the system</p>

              {/* Theme */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 14 }}>Theme Mode</div>
                <div style={{ display: 'flex', gap: 14 }}>
                  {['dark', 'light'].map(t => (
                    <div key={t} onClick={() => { if (theme !== t) toggleTheme(); }}
                      style={{ flex: 1, padding: '20px', borderRadius: 16, cursor: 'pointer', border: `2px solid ${theme === t ? 'var(--accent-cyan)' : 'var(--border-color)'}`, background: theme === t ? 'rgba(0,180,216,0.08)' : 'var(--bg-glass)', transition: 'all 0.2s', textAlign: 'center' }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>{t === 'dark' ? '🌙' : '☀️'}</div>
                      <div style={{ fontWeight: 600, color: theme === t ? 'var(--accent-cyan)' : 'var(--text-secondary)', textTransform: 'capitalize', fontSize: 14 }}>{t} Mode</div>
                      {theme === t && <div style={{ fontSize: 11, color: 'var(--accent-cyan)', marginTop: 4 }}>✓ Active</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 14 }}>System Language</div>
                <div className="grid-3">
                  {[
                    { code: 'en', label: 'English', flag: '🇺🇸' },
                    { code: 'es', label: 'Español', flag: '🇪🇸' },
                    { code: 'fr', label: 'Français', flag: '🇫🇷' },
                    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
                    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                    { code: 'zh', label: '中文', flag: '🇨🇳' },
                  ].map(lang => (
                    <div key={lang.code} onClick={() => { setLanguage(lang.code); toast.success(`Language changed to ${lang.label}`); }}
                      style={{ padding: '14px 16px', borderRadius: 12, cursor: 'pointer', border: `2px solid ${language === lang.code ? 'var(--accent-cyan)' : 'var(--border-color)'}`, background: language === lang.code ? 'rgba(0,180,216,0.08)' : 'var(--bg-glass)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{lang.flag}</span>
                      <span style={{ fontWeight: 600, fontSize: 14, color: language === lang.code ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{lang.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button className="btn btn-secondary" onClick={() => toast.info('Changes discarded')}>Discard</button>
            <button className="btn btn-primary" onClick={save}><Save size={16} /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
