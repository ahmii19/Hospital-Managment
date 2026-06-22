import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, X, Clock, User, Stethoscope } from 'lucide-react';
import { APPOINTMENTS, DOCTORS } from '../data/mockData';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Confirmed: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
  Pending: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  Completed: { bg: 'rgba(0,180,216,0.15)', color: '#00B4D8', border: 'rgba(0,180,216,0.3)' },
  Cancelled: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function CalendarView({ appointments }) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // Jan 2024
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const getAppts = (day) => appointments.filter(a => {
    const d = new Date(a.date);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  });

  return (
    <div className="glass" style={{ borderRadius: 18, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
          {MONTHS[month]} {year}
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-icon btn-sm" onClick={() => setCurrentDate(new Date(year, month - 1))}><ChevronLeft size={16} /></button>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentDate(new Date())}>Today</button>
          <button className="btn btn-secondary btn-icon btn-sm" onClick={() => setCurrentDate(new Date(year, month + 1))}><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '8px 0' }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const dayAppts = getAppts(day);
          const isToday = day === 25 && month === 0;
          return (
            <motion.div key={idx}
              style={{
                minHeight: 70, borderRadius: 10, padding: '8px 6px',
                background: isToday ? 'linear-gradient(135deg, #00B4D8, #0096B7)' : dayAppts.length ? 'rgba(0,180,216,0.06)' : 'transparent',
                border: `1px solid ${isToday ? 'transparent' : dayAppts.length ? 'rgba(0,180,216,0.2)' : 'rgba(255,255,255,0.03)'}`,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              whileHover={{ background: isToday ? undefined : 'rgba(0,180,216,0.1)' }}
            >
              <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 500, color: isToday ? 'white' : 'var(--text-secondary)', marginBottom: 4 }}>{day}</div>
              {dayAppts.slice(0, 2).map(a => (
                <div key={a.id} style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, marginBottom: 2, background: STATUS_COLORS[a.status]?.bg, color: STATUS_COLORS[a.status]?.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.time} {a.patient.split(' ')[0]}
                </div>
              ))}
              {dayAppts.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{dayAppts.length - 2} more</div>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Appointments() {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [view, setView] = useState('list');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showBook, setShowBook] = useState(false);
  const [booking, setBooking] = useState({ patient: '', doctor: '', date: '', time: '', department: '', type: 'Checkup', notes: '' });

  const filtered = statusFilter === 'All' ? appointments : appointments.filter(a => a.status === statusFilter);

  const handleBook = (e) => {
    e.preventDefault();
    const appt = { ...booking, id: Date.now(), status: 'Pending', duration: 30 };
    setAppointments(prev => [appt, ...prev]);
    setShowBook(false);
    toast.success('Appointment booked successfully! 📅');
  };

  const changeStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    toast.success(`Status updated to ${status}`);
  };

  const cancel = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    toast.error('Appointment cancelled');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">{appointments.filter(a => a.status !== 'Cancelled').length} active appointments</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="tab-group">
            <button className={`tab-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
            <button className={`tab-btn ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}>Calendar</button>
          </div>
          <button className="btn btn-primary" onClick={() => setShowBook(true)}><Plus size={16} /> Book Appointment</button>
        </div>
      </div>

      {/* Status filters */}
      <div className="tab-group mb-6" style={{ display: 'inline-flex' }}>
        {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map(s => (
          <button key={s} className={`tab-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
        ))}
      </div>

      {view === 'calendar' ? (
        <CalendarView appointments={appointments} />
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((a, i) => {
                  const s = STATUS_COLORS[a.status] || {};
                  return (
                    <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.03 }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #00B4D8, #7209B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>
                            {a.patient[0]}
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{a.patient}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: 13 }}>{a.doctor}</td>
                      <td><span className="badge badge-info" style={{ fontSize: 11 }}>{a.department}</span></td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{a.time}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.date}</div>
                      </td>
                      <td style={{ fontSize: 13 }}>{a.type}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {a.status === 'Pending' && (
                            <button className="btn btn-sm" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 10px', fontSize: 12 }} onClick={() => changeStatus(a.id, 'Confirmed')}>Confirm</button>
                          )}
                          {a.status === 'Confirmed' && (
                            <button className="btn btn-sm" style={{ background: 'rgba(0,180,216,0.15)', color: '#00B4D8', border: '1px solid rgba(0,180,216,0.3)', padding: '4px 10px', fontSize: 12 }} onClick={() => changeStatus(a.id, 'Completed')}>Complete</button>
                          )}
                          {a.status !== 'Cancelled' && a.status !== 'Completed' && (
                            <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '4px 10px', fontSize: 12 }} onClick={() => cancel(a.id)}>Cancel</button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Book Appointment Modal */}
      <AnimatePresence>
        {showBook && (
          <div className="modal-overlay" onClick={() => setShowBook(false)}>
            <motion.div className="modal-box" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">📅 Book Appointment</div>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowBook(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleBook}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label"><User size={13} style={{ display: 'inline', marginRight: 4 }} />Patient Name *</label>
                    <input className="form-input" placeholder="Patient name" required value={booking.patient} onChange={e => setBooking({ ...booking, patient: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label"><Stethoscope size={13} style={{ display: 'inline', marginRight: 4 }} />Department *</label>
                    <select className="form-input form-select" required value={booking.department} onChange={e => setBooking({ ...booking, department: e.target.value })}>
                      <option value="">Select department</option>
                      {['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Radiology'].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Doctor *</label>
                    <select className="form-input form-select" required value={booking.doctor} onChange={e => setBooking({ ...booking, doctor: e.target.value })}>
                      <option value="">Select doctor</option>
                      {DOCTORS.map(d => <option key={d.id} value={d.name}>{d.name} - {d.specialization}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Appointment Type</label>
                    <select className="form-input form-select" value={booking.type} onChange={e => setBooking({ ...booking, type: e.target.value })}>
                      {['Checkup', 'Follow-up', 'Consultation', 'Surgery Consult', 'Emergency', 'Treatment'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label"><Clock size={13} style={{ display: 'inline', marginRight: 4 }} />Date *</label>
                    <input type="date" className="form-input" required value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time Slot *</label>
                    <select className="form-input form-select" required value={booking.time} onChange={e => setBooking({ ...booking, time: e.target.value })}>
                      <option value="">Select time</option>
                      {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-input" rows={2} placeholder="Additional notes..." value={booking.notes} onChange={e => setBooking({ ...booking, notes: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowBook(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Plus size={16} /> Book Appointment</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
