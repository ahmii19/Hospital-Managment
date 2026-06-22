import { motion } from 'framer-motion';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, RadialLinearScale, Filler, Tooltip, Legend
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { CHART_DATA } from '../data/mockData';
import { TrendingUp, Activity, PieChart, Zap } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Filler, Tooltip, Legend);

const CHART_COLORS = {
  cyan: '#00B4D8', purple: '#7209B7', green: '#10b981',
  orange: '#f59e0b', red: '#ef4444', indigo: '#6366f1',
};

const defaultOptions = (dark = true) => ({
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, boxWidth: 12, padding: 16 } },
    tooltip: {
      backgroundColor: '#1a2a3d', titleColor: '#e2e8f0', bodyColor: '#94a3b8',
      borderColor: 'rgba(0,180,216,0.3)', borderWidth: 1, padding: 12, cornerRadius: 10,
    }
  },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } } },
  }
});

const noScaleOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, boxWidth: 12, padding: 16 } },
    tooltip: {
      backgroundColor: '#1a2a3d', titleColor: '#e2e8f0', bodyColor: '#94a3b8',
      borderColor: 'rgba(0,180,216,0.3)', borderWidth: 1, padding: 12, cornerRadius: 10,
    }
  }
};

function ChartCard({ title, subtitle, icon: Icon, iconColor, children, delay = 0 }) {
  return (
    <motion.div className="chart-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${iconColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={iconColor} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{subtitle}</div>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function Analytics() {
  const { monthlyAdmissions, departmentPerformance, patientCategories, diseaseDistribution, doctorPerformance, revenue, aiAccuracy } = CHART_DATA;

  const lineData = {
    labels: monthlyAdmissions.labels,
    datasets: [
      {
        label: 'Admissions', data: monthlyAdmissions.admissions,
        borderColor: CHART_COLORS.cyan, backgroundColor: 'rgba(0,180,216,0.1)',
        fill: true, tension: 0.4, borderWidth: 2.5, pointBackgroundColor: CHART_COLORS.cyan, pointRadius: 4,
      },
      {
        label: 'Discharges', data: monthlyAdmissions.discharges,
        borderColor: CHART_COLORS.green, backgroundColor: 'rgba(16,185,129,0.1)',
        fill: true, tension: 0.4, borderWidth: 2.5, pointBackgroundColor: CHART_COLORS.green, pointRadius: 4,
      },
    ],
  };

  const barData = {
    labels: departmentPerformance.labels,
    datasets: [
      {
        label: 'Patients', data: departmentPerformance.patients,
        backgroundColor: 'rgba(0,180,216,0.7)', borderRadius: 6, borderSkipped: false,
      },
      {
        label: 'Revenue ($K)', data: departmentPerformance.revenue,
        backgroundColor: 'rgba(114,9,183,0.7)', borderRadius: 6, borderSkipped: false,
      },
    ],
  };

  const doughnutData = {
    labels: ['Heart Disease', 'Diabetes', 'Hypertension', 'Others'],
    datasets: [{
      data: patientCategories,
      backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(245,158,11,0.8)', 'rgba(0,180,216,0.8)', 'rgba(114,9,183,0.8)'],
      borderColor: ['#ef4444', '#f59e0b', '#00B4D8', '#7209B7'],
      borderWidth: 2, hoverOffset: 8,
    }],
  };

  const areaData = {
    labels: aiAccuracy.labels,
    datasets: [{
      label: 'AI Accuracy %', data: aiAccuracy.data,
      borderColor: CHART_COLORS.purple, backgroundColor: 'rgba(114,9,183,0.15)',
      fill: true, tension: 0.4, borderWidth: 2.5, pointBackgroundColor: CHART_COLORS.purple, pointRadius: 4,
    }],
  };

  const radarData = {
    labels: doctorPerformance.labels,
    datasets: doctorPerformance.datasets.map(d => ({
      label: d.label, data: d.data,
      borderColor: d.color, backgroundColor: `${d.color}20`,
      pointBackgroundColor: d.color, borderWidth: 2, pointRadius: 3,
    })),
  };

  const revenueData = {
    labels: revenue.labels,
    datasets: [{
      label: 'Revenue ($)', data: revenue.data.map(v => v / 1000),
      backgroundColor: revenue.data.map((_, i) => i === revenue.data.length - 1 ? 'rgba(0,180,216,0.9)' : 'rgba(0,180,216,0.4)'),
      borderRadius: 8, borderSkipped: false,
    }],
  };

  const radarOptions = {
    ...noScaleOptions,
    scales: {
      r: {
        grid: { color: 'rgba(255,255,255,0.08)' },
        ticks: { color: '#64748b', backdropColor: 'transparent', font: { size: 10 } },
        pointLabels: { color: '#94a3b8', font: { size: 11 } },
        angleLines: { color: 'rgba(255,255,255,0.06)' },
      }
    }
  };

  return (
    <div>
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">Hospital performance insights and trends</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['7D', '1M', '3M', '1Y'].map((t, i) => (
            <button key={t} className={`btn btn-sm ${i === 1 ? 'btn-primary' : 'btn-secondary'}`}>{t}</button>
          ))}
        </div>
      </motion.div>

      {/* Row 1 */}
      <div className="grid-2 mb-6">
        <ChartCard title="Patient Admissions vs Discharges" subtitle="Monthly trend analysis" icon={TrendingUp} iconColor={CHART_COLORS.cyan} delay={0.1}>
          <div style={{ height: 280 }}>
            <Line data={lineData} options={defaultOptions()} />
          </div>
        </ChartCard>
        <ChartCard title="Department Performance" subtitle="Patients & revenue by department" icon={Activity} iconColor={CHART_COLORS.purple} delay={0.15}>
          <div style={{ height: 280 }}>
            <Bar data={barData} options={defaultOptions()} />
          </div>
        </ChartCard>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20, marginBottom: 24 }}>
        <ChartCard title="Disease Distribution" subtitle="Active patient breakdown" icon={PieChart} iconColor={CHART_COLORS.orange} delay={0.2}>
          <div style={{ height: 280 }}>
            <Doughnut data={doughnutData} options={noScaleOptions} />
          </div>
        </ChartCard>
        <ChartCard title="AI Prediction Accuracy" subtitle="System intelligence uptime & accuracy" icon={Zap} iconColor={CHART_COLORS.purple} delay={0.25}>
          <div style={{ height: 280 }}>
            <Line data={areaData} options={defaultOptions()} />
          </div>
        </ChartCard>
      </div>

      {/* Row 3 */}
      <div className="grid-2">
        <ChartCard title="Doctor Performance Radar" subtitle="Multi-dimensional evaluation" icon={Activity} iconColor={CHART_COLORS.green} delay={0.3}>
          <div style={{ height: 300 }}>
            <Radar data={radarData} options={radarOptions} />
          </div>
        </ChartCard>
        <ChartCard title="Monthly Revenue" subtitle="Financial performance ($K)" icon={TrendingUp} iconColor={CHART_COLORS.orange} delay={0.35}>
          <div style={{ height: 300 }}>
            <Bar data={revenueData} options={{ ...defaultOptions(), plugins: { ...defaultOptions().plugins, legend: { display: false } } }} />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
