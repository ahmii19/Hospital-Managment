import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, Eye, Search, Filter, X, FileText, Activity } from 'lucide-react';
import { REPORTS } from '../data/mockData';
import toast from 'react-hot-toast';

const STATUS_STYLE = {
  Normal: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
  Review: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  Critical: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  Pending: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
};

const LAB_RESULTS = [
  { test: 'Hemoglobin', value: '11.2', unit: 'g/dL', ref: '12.0-17.5', status: 'Low' },
  { test: 'WBC Count', value: '8,500', unit: 'cells/μL', ref: '4,500-11,000', status: 'Normal' },
  { test: 'Platelet Count', value: '145,000', unit: '/μL', ref: '150,000-400,000', status: 'Low' },
  { test: 'Total Cholesterol', value: '240', unit: 'mg/dL', ref: '<200', status: 'High' },
  { test: 'Triglycerides', value: '168', unit: 'mg/dL', ref: '<150', status: 'High' },
  { test: 'HDL Cholesterol', value: '42', unit: 'mg/dL', ref: '>40', status: 'Normal' },
  { test: 'LDL Cholesterol', value: '164', unit: 'mg/dL', ref: '<100', status: 'High' },
  { test: 'Blood Glucose', value: '126', unit: 'mg/dL', ref: '70-100', status: 'High' },
];

function ReportPreviewModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-box" style={{ maxWidth: 700, maxHeight: '85vh', overflow: 'auto' }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">📄 {report.type}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{report.patient} • {report.date}</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Mock PDF Preview */}
        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 16, borderBottom: '2px solid var(--accent-cyan)' }}>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--text-primary)' }}>MediCore Hospital</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>123 Medical Ave, Healthcare City, HC 10001</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Report Date</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{report.date}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Report ID: RPT-{report.id.toString().padStart(4, '0')}</div>
            </div>
          </div>

          <div className="grid-2 mb-4">
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Patient Name</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{report.patient}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ordering Physician</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{report.doctor}</div>
            </div>
          </div>

          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 12 }}>Lab Results – Lipid Profile & CBC</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Test Name</th><th>Result</th><th>Unit</th><th>Reference Range</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LAB_RESULTS.map(l => (
                <tr key={l.test}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{l.test}</td>
                  <td style={{ fontWeight: 700, color: l.status === 'High' ? '#ef4444' : l.status === 'Low' ? '#f59e0b' : '#10b981' }}>{l.value}</td>
                  <td>{l.unit}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{l.ref}</td>
                  <td><span className={`badge ${l.status === 'High' ? 'badge-error' : l.status === 'Low' ? 'badge-warning' : 'badge-success'}`}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Digital Signature */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'var(--accent-cyan)', marginBottom: 4 }}>{report.doctor}</div>
              <div style={{ width: 160, height: 1, background: 'var(--border-color)', margin: '4px auto' }} />
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Digital Signature Verified ✅</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>License: MED-2024-{report.id.toString().padStart(5,'0')}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { toast.success('Report downloaded!'); onClose(); }}>
            <Download size={16} /> Download PDF
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function MedicalReports() {
  const [reports, setReports] = useState(REPORTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = reports.filter(r => {
    const matchSearch = r.patient.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    setReports(r => r.filter(x => x.id !== id));
    toast.success('Report deleted');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Medical Reports</h1>
          <p className="page-subtitle">{reports.length} reports in system</p>
        </div>
        <button className="btn btn-primary" onClick={() => toast.info('Upload feature active')}>
          <FileText size={16} /> Upload Report
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid-4 mb-6">
        {[
          { label: 'Total Reports', value: reports.length, color: '#00B4D8', icon: '📋' },
          { label: 'Normal', value: reports.filter(r => r.status === 'Normal').length, color: '#10b981', icon: '✅' },
          { label: 'Critical', value: reports.filter(r => r.status === 'Critical').length, color: '#ef4444', icon: '🚨' },
          { label: 'Pending Review', value: reports.filter(r => r.status === 'Pending').length, color: '#f59e0b', icon: '⏳' },
        ].map((s, i) => (
          <motion.div key={s.label} className="glass glass-hover" style={{ borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="form-input" style={{ paddingLeft: 40 }} placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tab-group">
          {['All', 'Normal', 'Review', 'Critical', 'Pending'].map(s => (
            <button key={s} className={`tab-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Report Type</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Format / Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((r, i) => {
                const s = STATUS_STYLE[r.status] || {};
                return (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #00B4D8, #7209B7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>
                          {r.patient[0]}
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{r.patient}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{r.type}</td>
                    <td style={{ fontSize: 13 }}>{r.doctor}</td>
                    <td style={{ fontSize: 13 }}>{r.date}</td>
                    <td>
                      <div style={{ fontSize: 13 }}>{r.format}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.size}</div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button className="btn btn-ghost btn-icon btn-sm" title="Preview" onClick={() => setSelected(r)}><Eye size={15} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="Download" onClick={() => toast.success('Downloading...')}><Download size={15} /></button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="Delete" style={{ color: 'var(--accent-red)' }} onClick={() => handleDelete(r.id)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selected && <ReportPreviewModal report={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
