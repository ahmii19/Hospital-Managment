import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: 'admin@gmail.com', password: '123456' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}! 👋`);
      navigate('/dashboard');
    } else {
      toast.error(result.error);
      setErrors({ general: result.error });
    }
  };

  return (
    <div className="login-bg">
      {/* Animated blobs */}
      <motion.div
        style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)', top: '10%', left: '5%', pointerEvents: 'none' }}
        animate={{ y: [0, 30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%)', bottom: '10%', right: '10%', pointerEvents: 'none' }}
        animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <motion.div
            style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #00B4D8, #7209B7)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 30px rgba(0,180,216,0.4)' }}
            animate={{ boxShadow: ['0 0 20px rgba(0,180,216,0.3)', '0 0 40px rgba(0,180,216,0.6)', '0 0 20px rgba(0,180,216,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart size={28} color="white" />
          </motion.div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
            MediCore HMS
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Sign in to your account</p>
        </div>

        {/* Quick login hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 24, fontSize: 13, color: 'var(--text-secondary)' }}
        >
          🔑 Demo: <strong style={{ color: 'var(--accent-cyan)' }}>admin@gmail.com</strong> / <strong style={{ color: 'var(--accent-cyan)' }}>123456</strong>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                style={{ paddingLeft: 42 }}
                placeholder="admin@gmail.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <a href="#" style={{ fontSize: 12, color: 'var(--accent-cyan)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                style={{ paddingLeft: 42, paddingRight: 42 }}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <input type="checkbox" id="remember" style={{ accentColor: 'var(--accent-cyan)', width: 16, height: 16 }} />
            <label htmlFor="remember" style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' }}>Remember me</label>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary w-full"
            style={{ justifyContent: 'center', padding: '14px', fontSize: 15, borderRadius: 12 }}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
          >
            {loading ? <><Loader2 size={18} className="spin" /> Signing in...</> : 'Sign In'}
          </motion.button>
        </form>

        {/* Social */}
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {['Google', 'Microsoft'].map(p => (
            <button key={p} className="btn btn-secondary" style={{ justifyContent: 'center' }} onClick={() => toast.info('Social login not available in demo')}>
              {p === 'Google' ? '🔵' : '🟦'} {p}
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
