import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Clock, X, Edit, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DOCTORS } from '../data/mockData';
import toast from 'react-hot-toast';

const STATUS_COLORS = { Available: '#10b981', Busy: '#f59e0b', 'Off Duty': '#64748b' };
const STATUS_ICONS = { Available: CheckCircle, Busy: AlertCircle, 'Off Duty': XCircle };

function DoctorCard({ doctor, onView, index }) {
  const StatusIcon = STATUS_ICONS[doctor.status];
  return (
    <motion.div
      className="glass glass-hover"
      style={{ borderRadius: 18, padding: 24, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
      onClick={() => onView(doctor)}
      whileHover={{ y: -4 }}
    >
      {/* Background accent */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, borderRadius: '50%', background: `${doctor.color}15`, transform: 'translate(30%, -30%)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg, ${doctor.color}, ${doctor.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'white', boxShadow: `0 6px 20px ${doctor.color}40` }}>
          {doctor.avatar}
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: STATUS_COLORS[doctor.status], background: `${STATUS_COLORS[doctor.status]}15`, border: `1px solid ${STATUS_COLORS[doctor.status]}40`, padding: '4px 10px', borderRadius: 20 }}>
          <StatusIcon size={12} /> {doctor.status}
        </span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>{doctor.name}</div>
        <div style={{ fontSize: 13, color: doctor.color, fontWeight: 600 }}>{doctor.specialization}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{doctor.department}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={13} fill={s <= Math.floor(doctor.rating) ? '#f59e0b' : 'none'} stroke={s <= Math.floor(doctor.rating) ? '#f59e0b' : '#64748b'} />
        ))}
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginLeft: 4 }}>{doctor.rating}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: 12, marginTop: 4 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Patients</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{doctor.patients}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Experience</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{doctor.experience}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Shift</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <Clock size={11} /> {doctor.shift}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DoctorModal({ doctor, onClose }) {
  if (!doctor) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-box" style={{ maxWidth: 560 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg, ${doctor.color}, ${doctor.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: 'white' }}>
              {doctor.avatar}
            </div>
            <div>
              <div className="modal-title">{doctor.name}</div>
              <div style={{ fontSize: 13, color: doctor.color, fontWeight: 600 }}>{doctor.specialization}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>{doctor.bio}</p>

        <div className="grid-2 mb-4">
          {[
            { label: 'Department', value: doctor.department },
            { label: 'Experience', value: doctor.experience },
            { label: 'Shift Hours', value: doctor.shift },
            { label: 'Status', value: doctor.status },
            { label: 'Phone', value: doctor.phone },
            { label: 'Email', value: doctor.email },
          ].map(i => (
            <div key={i.label} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>{i.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{i.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
          {[1,2,3,4,5].map(s => <Star key={s} size={18} fill={s <= Math.floor(doctor.rating) ? '#f59e0b' : 'none'} stroke={s <= Math.floor(doctor.rating) ? '#f59e0b' : '#64748b'} />)}
          <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>{doctor.rating}/5.0</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>patient rating</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { toast.success('Message sent!'); onClose(); }}>📩 Message</button>
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { toast.success('Schedule updated!'); onClose(); }}>📅 Schedule</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Doctors() {
  const [doctors, setDoctors] = useState(DOCTORS);
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [newDoc, setNewDoc] = useState({ name: '', specialization: '', department: '', experience: '', shift: '', status: 'Available', rating: 4.5, bio: '', phone: '', email: '', color: '#00B4D8' });

  const filtered = filterStatus === 'All' ? doctors : doctors.filter(d => d.status === filterStatus);

  const handleAdd = (e) => {
    e.preventDefault();
    const d = { ...newDoc, id: Date.now(), patients: 0, avatar: newDoc.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0,2) };
    setDoctors(prev => [d, ...prev]);
    setShowAdd(false);
    toast.success('Doctor profile created! 🎉');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Management</h1>
          <p className="page-subtitle">{doctors.length} specialist doctors on staff</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Plus size={16} /> Add Doctor</button>
      </div>

      {/* Status filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="tab-group">
          {['All', 'Available', 'Busy', 'Off Duty'].map(s => (
            <button key={s} className={`tab-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>{s}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
          {filtered.filter(d => d.status === 'Available').length} available now
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid-3">
        {filtered.map((doc, i) => (
          <DoctorCard key={doc.id} doctor={doc} onView={setSelected} index={i} />
        ))}
      </div>

      {/* Doctor Detail Modal */}
      <AnimatePresence>
        {selected && <DoctorModal doctor={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Add Doctor Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="modal-overlay" onClick={() => setShowAdd(false)}>
            <motion.div className="modal-box" style={{ maxWidth: 620 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">Add New Doctor</div>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowAdd(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd}>
                <div className="grid-2">
                  {[
                    { label: 'Full Name *', key: 'name', placeholder: 'Dr. John Smith' },
                    { label: 'Specialization *', key: 'specialization', placeholder: 'e.g. Cardiologist' },
                    { label: 'Department *', key: 'department', placeholder: 'e.g. Cardiology' },
                    { label: 'Experience', key: 'experience', placeholder: 'e.g. 10 years' },
                    { label: 'Shift Hours', key: 'shift', placeholder: '08:00 - 16:00' },
                    { label: 'Phone', key: 'phone', placeholder: '+1-555-0100' },
                    { label: 'Email', key: 'email', placeholder: 'doctor@hospital.com' },
                  ].map(f => (
                    <div key={f.key} className="form-group">
                      <label className="form-label">{f.label}</label>
                      <input className="form-input" placeholder={f.placeholder} required={f.label.includes('*')} value={newDoc[f.key]} onChange={e => setNewDoc({ ...newDoc, [f.key]: e.target.value })} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-input form-select" value={newDoc.status} onChange={e => setNewDoc({ ...newDoc, status: e.target.value })}>
                      <option>Available</option><option>Busy</option><option>Off Duty</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Biography</label>
                  <textarea className="form-input" rows={3} placeholder="Brief professional biography..." value={newDoc.bio} onChange={e => setNewDoc({ ...newDoc, bio: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Plus size={16} /> Add Doctor</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
