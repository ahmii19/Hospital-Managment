import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, Navigation, Clock, Bed, Wind } from 'lucide-react';
import { EMERGENCY_ALERTS, AMBULANCES, DEPARTMENTS } from '../data/mockData';
import toast from 'react-hot-toast';

const SEVERITY_STYLES = {
  Critical: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', color: '#ef4444' },
  High: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', color: '#f59e0b' },
  Medium: { bg: 'rgba(0,180,216,0.1)', border: 'rgba(0,180,216,0.3)', color: '#00B4D8' },
};

const AMB_STATUS_STYLES = {
  Dispatched: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  Available: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  'On Scene': { color: '#00B4D8', bg: 'rgba(0,180,216,0.1)', border: 'rgba(0,180,216,0.3)' },
  'In Maintenance': { color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)' },
};

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#ef4444', letterSpacing: 2, textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
      {time.toLocaleTimeString()}
    </div>
  );
}

export default function Emergency() {
  const [alerts, setAlerts] = useState(EMERGENCY_ALERTS);
  const [ambulances, setAmbulances] = useState(AMBULANCES);

  const resolveAlert = (id) => {
    setAlerts(a => a.map(x => x.id === id ? { ...x, status: 'Resolved' } : x));
    toast.success('Alert resolved');
  };

  const dispatchAmbulance = (id) => {
    setAmbulances(a => a.map(x => x.id === id && x.status === 'Available' ? { ...x, status: 'Dispatched', destination: 'Emergency Call' } : x));
    toast.success('Ambulance dispatched!');
  };

  const criticalCount = alerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length;

  return (
    <div>
      {/* Emergency Header */}
      <motion.div
        style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 20, padding: '24px 28px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        animate={{ boxShadow: ['0 0 0 0 rgba(239,68,68,0)', '0 0 30px 4px rgba(239,68,68,0.25)', '0 0 0 0 rgba(239,68,68,0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(239,68,68,0.2)', border: '2px solid rgba(239,68,68,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="pulse-red">
            <AlertTriangle size={26} color="#ef4444" />
          </div>
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#ef4444' }}>Emergency Control</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{criticalCount} critical active • Real-time monitoring</p>
          </div>
        </div>
        <LiveClock />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid-4 mb-6">
        {[
          { label: 'Active Alerts', value: alerts.filter(a => a.status === 'Active').length, color: '#ef4444', icon: '🚨' },
          { label: 'Ambulances Available', value: ambulances.filter(a => a.status === 'Available').length, color: '#10b981', icon: '🚑' },
          { label: 'ICU Occupied', value: '28/40', color: '#f59e0b', icon: '🏥' },
          { label: 'ER Beds Free', value: '6/20', color: '#00B4D8', icon: '🛏️' },
        ].map((s, i) => (
          <motion.div key={s.label} className="glass glass-hover" style={{ borderRadius: 14, padding: '16px 20px' }}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Live Alerts */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse-red 1.5s infinite' }} />
            Live Emergency Alerts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AnimatePresence>
              {alerts.map((alert, i) => {
                const s = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.Medium;
                return (
                  <motion.div key={alert.id}
                    style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 14, padding: '16px 18px' }}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.07 }}
                    layout
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{alert.type}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
                            {alert.severity}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                          👤 {alert.patient} • 📍 {alert.room} • 👨‍⚕️ {alert.doctor}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: s.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {alert.time}
                        </div>
                        <span className={`badge ${alert.status === 'Active' ? 'badge-error' : alert.status === 'Stable' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 11, marginTop: 4 }}>
                          {alert.status}
                        </span>
                      </div>
                    </div>
                    {alert.status === 'Active' && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', fontSize: 12 }} onClick={() => resolveAlert(alert.id)}>
                          ✅ Mark Resolved
                        </button>
                        <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', fontSize: 12 }} onClick={() => toast.info('Doctor paged!')}>
                          📟 Page Doctor
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Ambulance Dispatch */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            🚑 Ambulance Dispatch
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ambulances.map((amb, i) => {
              const s = AMB_STATUS_STYLES[amb.status];
              return (
                <motion.div key={amb.id}
                  style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 14, padding: '14px 16px' }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{amb.id}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: s.color, padding: '3px 10px', borderRadius: 20, background: s.bg, border: `1px solid ${s.border}` }}>
                      {amb.status}
                    </span>
                  </div>
                  {amb.destination !== '-' && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Navigation size={11} /> {amb.destination}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Driver: {amb.driver}</span>
                    {amb.eta !== '-' && <span>ETA: {amb.eta}</span>}
                  </div>
                  {amb.status === 'Available' && (
                    <button className="btn btn-sm btn-primary" style={{ marginTop: 8, width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={() => dispatchAmbulance(amb.id)}>
                      Dispatch Now
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ICU / ER Bed Availability */}
      <div>
        <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bed size={20} color="#00B4D8" /> Department Bed Availability
        </div>
        <div className="grid-3">
          {DEPARTMENTS.map((dept, i) => {
            const pct = Math.round((dept.occupied / dept.beds) * 100);
            const barColor = pct >= 80 ? '#ef4444' : pct >= 60 ? '#f59e0b' : '#10b981';
            return (
              <motion.div key={dept.name} className="glass glass-hover" style={{ borderRadius: 16, padding: 20 }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{dept.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Head: {dept.head}</div>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${dept.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bed size={20} color={dept.color} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Occupied</span>
                  <span style={{ fontWeight: 700, color: barColor }}>{dept.occupied}/{dept.beds} ({pct}%)</span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <motion.div className="progress-fill"
                    style={{ background: barColor, borderRadius: 10 }}
                    initial={{ width: '0%' }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  {dept.beds - dept.occupied} beds available
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
