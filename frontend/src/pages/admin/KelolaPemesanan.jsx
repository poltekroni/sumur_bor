import { useEffect, useState } from 'react';
import { pemesananService } from '../../services/pemesananService.jsx';

const statuses = ['pending', 'diproses', 'selesai', 'dibatalkan'];

const statusClass = {
  pending: 'bg-amber-100 text-amber-800',
  diproses: 'bg-blue-100 text-blue-800',
  selesai: 'bg-brand-100 text-brand-900',
  dibatalkan: 'bg-red-100 text-red-800',
};

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function KelolaPemesanan() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const response = await pemesananService.adminAll();
      setItems(response.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    await pemesananService.updateStatus(id, status);
    setMessage('Status pemesanan berhasil diperbarui.');
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kelola Pemesanan</h1>
        <p className="mt-1 text-slate-600">Lihat semua pemesanan pelanggan dan ubah statusnya.</p>
      </div>
      {message && <div className="rounded-md bg-brand-50 p-3 text-sm text-brand-900">{message}</div>}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Pelanggan</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Layanan</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">DP 10%</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Bukti</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Ubah Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-600" colSpan="7">
                    Memuat data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-600" colSpan="7">
                    Belum ada pemesanan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-slate-900">{item.user?.name}</p>
                      <p className="text-xs text-slate-500">{item.user?.no_hp}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{item.layanan?.nama_layanan}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{item.tanggal_pemesanan}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-brand-900">
                      {formatRupiah(item.dp_pembayaran || Number(item.layanan?.harga_layanan || 0) * 0.1)}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {item.bukti_transfer_url ? (
                        <a
                          className="font-semibold text-brand-700 hover:text-brand-900"
                          href={item.bukti_transfer_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Lihat Bukti
                        </a>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`badge ${statusClass[item.status]}`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        className="min-w-36"
                        value={item.status}
                        onChange={(e) => handleStatus(item.id, e.target.value)}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
