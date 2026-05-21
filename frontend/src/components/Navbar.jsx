import { Drill, LogOut, Menu, UserRound } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-brand-100 text-brand-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-brand-900">
          <Drill className="h-6 w-6" />
          Sumur Bor
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={navLinkClass} to="/layanan">
            Layanan
          </NavLink>
          <NavLink className={navLinkClass} to="/about">
            Tentang
          </NavLink>
          <NavLink className={navLinkClass} to="/contact">
            Kontak
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link className="btn-secondary hidden sm:inline-flex" to={user.role === 'admin' ? '/admin' : '/pelanggan'}>
                <UserRound className="h-4 w-4" />
                Dashboard
              </Link>
              <button className="btn-secondary" type="button" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link className="btn-secondary" to="/login">
                Login
              </Link>
              <Link className="btn-primary hidden sm:inline-flex" to="/register">
                Daftar
              </Link>
            </>
          )}
          <Menu className="h-5 w-5 text-slate-500 md:hidden" />
        </div>
      </div>
    </header>
  );
}
