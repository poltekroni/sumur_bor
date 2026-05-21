import { useEffect, useState } from 'react';
import { pemesananService } from '../../services/pemesananService.jsx';

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

export default function RiwayatPemesanan() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await pemesananService.mine();
        setItems(response.data.data || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Riwayat Pemesanan</h1>
        <p className="mt-1 text-slate-600">Status pemesanan Anda akan diperbarui oleh admin.</p>
      </div>
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Layanan</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">DP 10%</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Bukti</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Catatan</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-600" colSpan="6">
                    Memuat data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-600" colSpan="6">
                    Belum ada pemesanan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">{item.layanan?.nama_layanan}</td>
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
                    <td className="px-4 py-4 text-sm text-slate-600">{item.catatan || '-'}</td>
                    <td className="px-4 py-4">
                      <span className={`badge ${statusClass[item.status]}`}>{item.status}</span>
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
