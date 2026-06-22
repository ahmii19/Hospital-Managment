import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Heart, AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { AI_INSIGHTS, DISEASE_PREDICTIONS, PATIENTS } from '../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

function HealthMeter({ score, size = 160 }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const radius = (size / 2) - 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={10} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Health Score</div>
      </div>
    </div>
  );
}

function RiskCard({ prediction, index }) {
  const riskColor = prediction.risk >= 75 ? '#ef4444' : prediction.risk >= 50 ? '#f59e0b' : '#10b981';
  const data = {
    datasets: [{
      data: [prediction.risk, 100 - prediction.risk],
      backgroundColor: [`${riskColor}CC`, 'rgba(255,255,255,0.05)'],
      borderColor: [riskColor, 'transparent'],
      borderWidth: [2, 0],
    }]
  };
  const opts = { cutout: '72%', plugins: { tooltip: { enabled: false } }, maintainAspectRatio: true };

  return (
    <motion.div
      className="glass glass-hover"
      style={{ borderRadius: 18, padding: 24, borderColor: `${riskColor}40` }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{prediction.disease}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Patient: {prediction.patient}</div>
        </div>
        {prediction.trend === 'up' ? <TrendingUp size={20} color="#ef4444" /> : <TrendingDown size={20} color="#10b981" />}
      </div>

      <div style={{ width: 100, height: 100, margin: '0 auto 16px' }}>
        <Doughnut data={data} options={opts} />
        <div style={{ textAlign: 'center', marginTop: -66, fontSize: 24, fontWeight: 800, color: riskColor, fontFamily: 'Outfit, sans-serif' }}>
          {prediction.risk}%
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>Risk Indicators</div>
        {prediction.indicators.map((ind, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: riskColor, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ind}</span>
          </div>
        ))}
      </div>

      <div style={{ background: `${riskColor}15`, border: `1px solid ${riskColor}30`, borderRadius: 10, padding: '10px 12px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        💊 {prediction.recommendation}
      </div>
    </motion.div>
  );
}

export default function AIAnalysis() {
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0]);
  const avgHealth = Math.round(PATIENTS.reduce((s, p) => s + p.healthScore, 0) / PATIENTS.length);

  return (
    <div>
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Brain size={32} color="#7209B7" style={{ filter: 'drop-shadow(0 0 10px rgba(114,9,183,0.6))' }} />
            AI Analysis Engine
          </h1>
          <p className="page-subtitle">Predictive diagnostics and intelligent health insights</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(114,9,183,0.1)', border: '1px solid rgba(114,9,183,0.3)', borderRadius: 12, padding: '10px 16px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse-cyan 2s infinite' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#9B5DE5' }}>AI Engine Active</span>
        </div>
      </motion.div>

      {/* Top Stats */}
      <div className="grid-4 mb-6">
        {[
          { label: 'Avg Health Score', value: avgHealth, icon: '💪', color: '#10b981' },
          { label: 'High Risk Patients', value: PATIENTS.filter(p => p.healthScore < 60).length, icon: '⚠️', color: '#ef4444' },
          { label: 'AI Predictions Today', value: 47, icon: '🔮', color: '#7209B7' },
          { label: 'Accuracy Rate', value: '92%', icon: '🎯', color: '#00B4D8' },
        ].map((s, i) => (
          <motion.div key={s.label} className="glass glass-hover" style={{ borderRadius: 16, padding: 20 }}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20, marginBottom: 24 }}>
        {/* Patient Health Score */}
        <motion.div className="glass" style={{ borderRadius: 18, padding: 24 }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>Patient Health Score</div>
          <div style={{ marginBottom: 16 }}>
            <select className="form-input form-select" value={selectedPatient.id}
              onChange={e => setSelectedPatient(PATIENTS.find(p => p.id === parseInt(e.target.value)))}>
              {PATIENTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <HealthMeter score={selectedPatient.healthScore} size={180} />
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(selectedPatient.vitals).map(([key, val]) => (
                <div key={key} style={{ background: 'var(--bg-glass)', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize', marginBottom: 2 }}>{key === 'bp' ? 'Blood Pressure' : key === 'temp' ? 'Temperature' : key === 'oxygen' ? 'O₂ Saturation' : 'Pulse'}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{val}{key === 'oxygen' ? '%' : key === 'temp' ? '°C' : key === 'pulse' ? ' bpm' : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div className="glass" style={{ borderRadius: 18, padding: 24 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Zap size={18} color="#f59e0b" />
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>AI Insights Engine</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AI_INSIGHTS.map((insight, i) => (
              <motion.div key={insight.id}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
                style={{
                  padding: '14px 16px', borderRadius: 12,
                  background: insight.severity === 'High' ? 'rgba(239,68,68,0.06)' : insight.severity === 'Medium' ? 'rgba(245,158,11,0.06)' : 'rgba(16,185,129,0.06)',
                  border: `1px solid ${insight.severity === 'High' ? 'rgba(239,68,68,0.25)' : insight.severity === 'Medium' ? 'rgba(245,158,11,0.25)' : 'rgba(16,185,129,0.25)'}`,
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{insight.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 6 }}>{insight.message}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Confidence:</span>
                      <div style={{ flex: 1, maxWidth: 100 }}>
                        <div className="progress-bar" style={{ height: 4 }}>
                          <div className="progress-fill" style={{ width: `${insight.confidence}%`, background: insight.severity === 'High' ? '#ef4444' : insight.severity === 'Medium' ? '#f59e0b' : '#10b981' }} />
                        </div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>{insight.confidence}%</span>
                      <span className={`badge ${insight.severity === 'High' ? 'badge-error' : insight.severity === 'Medium' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: 10 }}>{insight.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Disease Predictions */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={20} color="#ef4444" /> Predictive Disease Cards
        </div>
        <div className="grid-3">
          {DISEASE_PREDICTIONS.map((p, i) => <RiskCard key={i} prediction={p} index={i} />)}
        </div>
      </div>

      {/* Recommendations */}
      <motion.div className="glass" style={{ borderRadius: 18, padding: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={18} color="#00B4D8" /> AI Recommendations for {selectedPatient.name}
        </div>
        <div className="grid-3">
          {[
            { emoji: '🥗', title: 'Diet Plan', items: ['Low sodium diet (<2g/day)', 'Increase potassium-rich foods', 'Avoid processed foods', 'Mediterranean diet recommended'] },
            { emoji: '🏃', title: 'Fitness Routine', items: ['30 min daily walking', 'Light yoga twice a week', 'Avoid high-intensity for now', 'Breathing exercises daily'] },
            { emoji: '👨‍⚕️', title: 'Specialist Referrals', items: ['Cardiologist – Priority High', 'Nutritionist consultation', 'Physical therapist weekly', 'Follow-up in 2 weeks'] },
          ].map(r => (
            <div key={r.title} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{r.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 12 }}>{r.title}</div>
              {r.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
