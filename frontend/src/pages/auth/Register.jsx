import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    no_hp: '',
    alamat: '',
    password: '',
    password_confirmation: '',
  });

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(form);
      navigate('/pelanggan', { replace: true });
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' ') : 'Registrasi gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <form className="panel space-y-5 p-6" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-bold">Daftar Pelanggan</h1>
            <p className="mt-2 text-sm text-slate-600">Buat akun untuk memesan layanan.</p>
          </div>
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name">Nama</label>
              <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="username">Username</label>
              <input id="username" value={form.username} onChange={(e) => update('username', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="no_hp">No HP</label>
              <input id="no_hp" value={form.no_hp} onChange={(e) => update('no_hp', e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="alamat">Alamat</label>
            <textarea id="alamat" rows="3" value={form.alamat} onChange={(e) => update('alamat', e.target.value)} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password_confirmation">Konfirmasi Password</label>
              <input
                id="password_confirmation"
                type="password"
                value={form.password_confirmation}
                onChange={(e) => update('password_confirmation', e.target.value)}
                required
              />
            </div>
          </div>
          <button className="btn-primary w-full" disabled={loading} type="submit">
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
          <p className="text-center text-sm text-slate-600">
            Sudah punya akun?{' '}
            <Link className="font-semibold text-brand-700" to="/login">
              Login
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
