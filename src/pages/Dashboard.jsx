import { motion } from 'framer-motion';
import { Users, UserCog, Calendar, DollarSign, AlertTriangle, Bed, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATIENTS, DOCTORS, APPOINTMENTS, NOTIFICATIONS } from '../data/mockData';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const METRIC_CARDS = [
  {
    title: 'Total Patients', value: '1,284', change: '+12.5%', up: true,
    icon: Users, gradient: 'linear-gradient(135deg, #00B4D8, #0096B7)',
    bg: 'rgba(0,180,216,0.08)', border: 'rgba(0,180,216,0.3)',
    data: [45, 52, 48, 61, 55, 67, 74, 68, 78, 85, 80, 92]
  },
  {
    title: 'Active Doctors', value: '48', change: '+3', up: true,
    icon: UserCog, gradient: 'linear-gradient(135deg, #7209B7, #9B5DE5)',
    bg: 'rgba(114,9,183,0.08)', border: 'rgba(114,9,183,0.3)',
    data: [40, 42, 41, 44, 43, 45, 44, 46, 47, 45, 48, 48]
  },
  {
    title: 'Appointments', value: '326', change: '+8.2%', up: true,
    icon: Calendar, gradient: 'linear-gradient(135deg, #10b981, #059669)',
    bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)',
    data: [280, 295, 310, 290, 320, 305, 315, 310, 322, 318, 325, 326]
  },
  {
    title: 'Monthly Revenue', value: '$625K', change: '+5.8%', up: true,
    icon: DollarSign, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)',
    data: [420, 485, 510, 475, 545, 590, 570, 600, 580, 610, 605, 625]
  },
  {
    title: 'Emergency Cases', value: '18', change: '-2', up: false,
    icon: AlertTriangle, gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)',
    data: [22, 20, 25, 18, 21, 19, 23, 20, 17, 22, 20, 18]
  },
  {
    title: 'ICU Beds Available', value: '12/40', change: '70% Occupied', up: false,
    icon: Bed, gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.3)',
    data: [35, 30, 28, 32, 25, 22, 28, 24, 18, 20, 15, 12]
  },
];

const miniLineOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
};

function MetricCard({ card, index }) {
  const Icon = card.icon;
  const chartData = {
    labels: card.data.map((_, i) => i),
    datasets: [{
      data: card.data,
      borderColor: card.gradient.includes('#00B4D8') ? '#00B4D8' : card.gradient.includes('#7209B7') ? '#9B5DE5' : card.gradient.includes('#10b981') ? '#10b981' : card.gradient.includes('#f59e0b') ? '#f59e0b' : card.gradient.includes('#ef4444') ? '#ef4444' : '#6366f1',
      backgroundColor: 'transparent',
      fill: false,
    }]
  };
  return (
    <motion.div
      className="metric-card glass-hover"
      style={{ '--card-gradient': card.gradient, background: card.bg, borderColor: card.border }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 500 }}>{card.title}</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>{card.value}</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 15px ${card.border}` }}>
          <Icon size={22} color="white" />
        </div>
      </div>
      <div style={{ height: 40, marginBottom: 12 }}>
        <Line data={chartData} options={miniLineOptions} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {card.up ? <TrendingUp size={14} color="#10b981" /> : <TrendingDown size={14} color="#ef4444" />}
        <span style={{ fontSize: 13, fontWeight: 600, color: card.up ? '#10b981' : '#ef4444' }}>{card.change}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>vs last month</span>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const admitted = PATIENTS.filter(p => p.status === 'Admitted').length;
  const todayAppts = APPOINTMENTS.slice(0, 5);

  return (
    <div>
      {/* Page Header */}
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="page-subtitle">Here's what's happening at MediCore today</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/appointments" className="btn btn-secondary btn-sm">
            <Calendar size={15} /> View Schedule
          </Link>
          <Link to="/emergency" className="btn btn-danger btn-sm">
            <AlertTriangle size={15} /> Emergency
          </Link>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid-6 mb-8">
        {METRIC_CARDS.map((card, i) => (
          <MetricCard key={card.title} card={card} index={i} />
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Today's Appointments */}
        <motion.div className="table-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>Today's Appointments</div>
            <Link to="/appointments" style={{ color: 'var(--accent-cyan)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>View all <ArrowRight size={14} /></Link>
          </div>
          <div style={{ padding: '8px 0' }}>
            {todayAppts.map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < todayAppts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--gradient-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                  {a.patient[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.patient}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.doctor} • {a.department}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{a.time}</div>
                  <span className={`badge ${a.status === 'Confirmed' ? 'badge-success' : a.status === 'Pending' ? 'badge-warning' : a.status === 'Completed' ? 'badge-info' : 'badge-error'}`} style={{ fontSize: 11 }}>
                    {a.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity / Patients */}
        <motion.div className="table-container" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>Recent Patients</div>
            <Link to="/patients" style={{ color: 'var(--accent-cyan)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>View all <ArrowRight size={14} /></Link>
          </div>
          <div style={{ padding: '8px 0' }}>
            {PATIENTS.slice(0, 5).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${DOCTORS.find(d => d.name === p.doctor)?.color || '#00B4D8'}, #7209B7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                  {p.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.diagnosis} • Age {p.age}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className={`badge ${p.status === 'Admitted' ? 'badge-error' : p.status === 'Outpatient' ? 'badge-info' : 'badge-success'}`} style={{ fontSize: 11 }}>
                    {p.status}
                  </span>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Score: {p.healthScore}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid-4 mt-4">
        {[
          { label: 'Admitted', value: admitted, color: '#ef4444', icon: '🏥' },
          { label: 'Outpatient', value: PATIENTS.filter(p=>p.status==='Outpatient').length, color: '#00B4D8', icon: '🩺' },
          { label: 'Discharged Today', value: PATIENTS.filter(p=>p.status==='Discharged').length, color: '#10b981', icon: '✅' },
          { label: 'On-duty Doctors', value: DOCTORS.filter(d=>d.status==='Available').length, color: '#7209B7', icon: '👨‍⚕️' },
        ].map((s, i) => (
          <motion.div key={s.label} className="glass glass-hover" style={{ padding: '16px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.05 }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
