import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Mail, Lock, User, Phone, Loader2, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ROLES = ['Admin', 'Doctor', 'Receptionist', 'Patient'];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'Patient' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const strength = getStrength(form.password);
  const strengthColors = ['', '#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Fair', 'Strong', 'Very Strong'];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone) e.phone = 'Phone is required';
    if (!form.password || form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, role: form.role });
    setLoading(false);
    if (result.success) {
      toast.success(`Account created! Welcome, ${result.user.name} 🎉`);
      navigate('/dashboard');
    } else {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="login-bg">
      <motion.div
        style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(114,9,183,0.07) 0%, transparent 70%)', top: '-10%', right: '0%', pointerEvents: 'none' }}
        animate={{ y: [0, 25, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="login-card"
        style={{ maxWidth: 520 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #7209B7, #00B4D8)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 0 25px rgba(114,9,183,0.4)' }}>
            <Heart size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Create Account</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Join MediCore Hospital System</p>
        </div>

        {/* Profile upload placeholder */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-glass)', border: '2px dashed var(--border-glow)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 4 }}
            onClick={() => toast.info('Profile upload coming soon')}>
            <Upload size={20} color="var(--text-muted)" />
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Photo</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className={`form-input ${errors.name ? 'error' : ''}`} style={{ paddingLeft: 38 }} placeholder="John Smith"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className={`form-input ${errors.phone ? 'error' : ''}`} style={{ paddingLeft: 38 }} placeholder="+1-555-0100"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-group mt-4">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} style={{ paddingLeft: 38 }} placeholder="you@hospital.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          {/* Role selector */}
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {ROLES.map(r => (
                <button key={r} type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  style={{
                    padding: '10px 8px', borderRadius: 10, border: `1px solid ${form.role === r ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                    background: form.role === r ? 'rgba(0,180,216,0.1)' : 'var(--bg-glass)',
                    color: form.role === r ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif'
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type={showPass ? 'text' : 'password'} className={`form-input ${errors.password ? 'error' : ''}`} style={{ paddingLeft: 38, paddingRight: 38 }} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
              {/* Strength indicator */}
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="strength-bar" style={{ flex: 1, background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                </div>
              )}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="password" className={`form-input ${errors.confirm ? 'error' : ''}`} style={{ paddingLeft: 38 }} placeholder="••••••••"
                  value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
              </div>
              {errors.confirm && <div className="form-error">{errors.confirm}</div>}
            </div>
          </div>

          <motion.button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', padding: '14px', fontSize: 15, borderRadius: 12 }}
            whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}>
            {loading ? <><Loader2 size={18} className="spin" /> Creating Account...</> : 'Create Account'}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
