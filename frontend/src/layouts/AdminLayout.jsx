import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

const items = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/layanan', label: 'Kelola Layanan', icon: 'layanan' },
  { to: '/admin/pemesanan', label: 'Pemesanan', icon: 'pemesanan' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="md:flex">
        <Sidebar items={items} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
