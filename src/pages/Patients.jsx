import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PATIENTS, DOCTORS } from '../data/mockData';
import toast from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const PAGE_SIZE = 5;

function PatientModal({ patient, onClose }) {
  if (!patient) return null;
  const vitals = patient.vitals;
  const healthColor = patient.healthScore >= 80 ? '#10b981' : patient.healthScore >= 60 ? '#f59e0b' : '#ef4444';

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [60, 65, 70, 68, 72, patient.healthScore],
      borderColor: healthColor, backgroundColor: `${healthColor}20`,
      fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3,
    }]
  };
  const opts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: { x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } }, y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.04)' } } }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-box" style={{ maxWidth: 680 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #00B4D8, #7209B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'white' }}>
              {patient.avatar}
            </div>
            <div>
              <div className="modal-title">{patient.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{patient.diagnosis} • {patient.blood} • Age {patient.age}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="grid-2 mb-4">
          {[
            { label: 'Blood Pressure', value: vitals.bp, unit: 'mmHg', icon: '🩺' },
            { label: 'Pulse', value: vitals.pulse, unit: 'bpm', icon: '💓' },
            { label: 'Temperature', value: vitals.temp, unit: '°C', icon: '🌡️' },
            { label: 'Oxygen', value: vitals.oxygen, unit: '%', icon: '💨' },
          ].map(v => (
            <div key={v.label} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{v.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{v.value} <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-muted)' }}>{v.unit}</span></div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>AI Health Score</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: healthColor, fontFamily: 'Outfit, sans-serif' }}>{patient.healthScore}</div>
            <div style={{ flex: 1 }}>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${patient.healthScore}%`, background: healthColor }} /></div>
            </div>
          </div>
          <div style={{ height: 100 }}><Line data={chartData} options={opts} /></div>
        </div>

        <div className="grid-2">
          {[
            { label: 'Assigned Doctor', value: patient.doctor },
            { label: 'Status', value: patient.status },
            { label: 'Room', value: patient.room },
            { label: 'Admitted', value: patient.admitDate },
            { label: 'Phone', value: patient.phone },
            { label: 'Email', value: patient.email },
          ].map(i => (
            <div key={i.label}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{i.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{i.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Patients() {
  const [patients, setPatients] = useState(PATIENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: 'Male', diagnosis: '', doctor: '', status: 'Outpatient' });

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosis.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id) => {
    setPatients(p => p.filter(x => x.id !== id));
    toast.success('Patient record removed');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const p = { ...newPatient, id: Date.now(), avatar: newPatient.name.split(' ').map(n => n[0]).join('').toUpperCase(), blood: 'A+', room: 'OPD-1', phone: '-', email: '-', admitDate: new Date().toISOString().split('T')[0], healthScore: 75, vitals: { bp: '120/80', pulse: 72, temp: 36.6, oxygen: 98 } };
    setPatients(prev => [p, ...prev]);
    setShowAdd(false);
    setNewPatient({ name: '', age: '', gender: 'Male', diagnosis: '', doctor: '', status: 'Outpatient' });
    toast.success('Patient added successfully! 🎉');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Management</h1>
          <p className="page-subtitle">{patients.length} total patients registered</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Plus size={16} /> Add Patient</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="form-input" style={{ paddingLeft: 40 }} placeholder="Search patients..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div className="tab-group">
          {['All', 'Admitted', 'Outpatient', 'Discharged'].map(s => (
            <button key={s} className={`tab-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => { setStatusFilter(s); setPage(1); }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age / Gender</th>
              <th>Diagnosis</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Health Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginated.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00B4D8, #7209B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0 }}>{p.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.room}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.age} / {p.gender}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{p.diagnosis}</td>
                  <td style={{ fontSize: 13 }}>{p.doctor}</td>
                  <td>
                    <span className={`badge ${p.status === 'Admitted' ? 'badge-error' : p.status === 'Outpatient' ? 'badge-info' : 'badge-success'}`}>{p.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${p.healthScore}%`, background: p.healthScore >= 80 ? '#10b981' : p.healthScore >= 60 ? '#f59e0b' : '#ef4444' }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.healthScore}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setSelected(p)} title="View"><Eye size={15} /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" onClick={() => toast.info('Edit feature active')} title="Edit"><Edit size={15} /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" onClick={() => handleDelete(p.id)} title="Delete" style={{ color: 'var(--accent-red)' }}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing {(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-secondary btn-icon btn-sm" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}><ChevronLeft size={15} /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`btn btn-sm ${page === i+1 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPage(i+1)}>{i+1}</button>
            ))}
            <button className="btn btn-secondary btn-icon btn-sm" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}><ChevronRight size={15} /></button>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selected && <PatientModal patient={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="modal-overlay" onClick={() => setShowAdd(false)}>
            <motion.div className="modal-box" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">Add New Patient</div>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Patient name" required value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age *</label>
                    <input type="number" className="form-input" placeholder="Age" required value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-input form-select" value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-input form-select" value={newPatient.status} onChange={e => setNewPatient({ ...newPatient, status: e.target.value })}>
                      <option>Admitted</option><option>Outpatient</option><option>Discharged</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Diagnosis *</label>
                    <input className="form-input" placeholder="Primary diagnosis" required value={newPatient.diagnosis} onChange={e => setNewPatient({ ...newPatient, diagnosis: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assign Doctor</label>
                    <select className="form-input form-select" value={newPatient.doctor} onChange={e => setNewPatient({ ...newPatient, doctor: e.target.value })}>
                      <option value="">Select doctor</option>
                      {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Plus size={16} /> Add Patient</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
