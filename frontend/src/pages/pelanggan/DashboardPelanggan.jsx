import { CalendarPlus, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function DashboardPelanggan() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Halo, {user?.name}</h1>
        <p className="mt-1 text-slate-600">Kelola pemesanan layanan Anda dari halaman ini.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Link className="panel p-6 transition hover:border-brand-600" to="/pelanggan/pemesanan">
          <CalendarPlus className="h-8 w-8 text-brand-700" />
          <h2 className="mt-4 text-lg font-bold">Buat Pemesanan</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Pilih layanan dan tentukan tanggal pemesanan.</p>
        </Link>
        <Link className="panel p-6 transition hover:border-brand-600" to="/pelanggan/riwayat">
          <ClipboardList className="h-8 w-8 text-brand-700" />
          <h2 className="mt-4 text-lg font-bold">Riwayat Pemesanan</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Pantau status pemesanan yang sudah Anda buat.</p>
        </Link>
      </div>
    </div>
  );
}
