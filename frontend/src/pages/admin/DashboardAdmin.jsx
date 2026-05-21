import { ClipboardList, Clock, Hammer, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pemesananService } from '../../services/pemesananService.jsx';

const statMeta = [
  { key: 'jumlah_layanan', label: 'Layanan', icon: Hammer, color: 'text-brand-700' },
  { key: 'jumlah_pelanggan', label: 'Pelanggan', icon: Users, color: 'text-blue-700' },
  { key: 'jumlah_pemesanan', label: 'Pemesanan', icon: ClipboardList, color: 'text-slate-700' },
  { key: 'pending', label: 'Pending', icon: Clock, color: 'text-amber-700' },
  { key: 'diproses', label: 'Diproses', icon: Clock, color: 'text-blue-700' },
  { key: 'selesai', label: 'Selesai', icon: Clock, color: 'text-brand-700' },
  { key: 'dibatalkan', label: 'Dibatalkan', icon: Clock, color: 'text-red-700' },
];

export default function DashboardAdmin() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await pemesananService.dashboard();
        setStats(response.data.data || {});
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="mt-1 text-slate-600">Ringkasan layanan, pelanggan, dan status pemesanan.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statMeta.map((item) => (
          <div className="panel p-5" key={item.key}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{loading ? '-' : stats[item.key] || 0}</p>
              </div>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
