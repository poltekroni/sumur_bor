import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(form);
      const target = location.state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/pelanggan');
      navigate(target, { replace: true });
    } catch (err) {
      const errors = err.response?.data?.errors;
      const apiMessage = errors ? Object.values(errors).flat().join(' ') : err.response?.data?.message;

      setError(apiMessage || 'Login gagal. Pastikan backend Laravel dan database MySQL sedang berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="mx-auto flex max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <form className="panel space-y-5 p-6" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="mt-2 text-sm text-slate-600">Masuk sebagai admin atau pelanggan.</p>
            </div>
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <div className="space-y-2">
              <label htmlFor="login">Email atau Username</label>
              <input
                id="login"
                value={form.login}
                onChange={(e) => setForm({ ...form, login: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn-primary w-full" disabled={loading} type="submit">
              {loading ? 'Memproses...' : 'Login'}
            </button>
            <p className="text-center text-sm text-slate-600">
              Belum punya akun?{' '}
              <Link className="font-semibold text-brand-700" to="/register">
                Daftar
              </Link>
            </p>
          </form>
          <img
            src="https://images.unsplash.com/photo-1581091870622-1e7e74e35454?auto=format&fit=crop&w=1000&q=80"
            alt="Teknisi lapangan"
            className="hidden h-[520px] w-full rounded-lg object-cover md:block"
          />
        </div>
      </main>
    </div>
  );
}
