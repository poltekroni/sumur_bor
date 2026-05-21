import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { layananService } from '../../services/layananService.jsx';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const getFallbackImage = (namaLayanan = '') => {
  const name = namaLayanan.toLowerCase();

  if (name.includes('sumur') || name.includes('bor') || name.includes('submersible')) {
    return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80';
  }

  if (name.includes('renovasi') || name.includes('rumah')) {
    return 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=300&q=80';
  }

  return 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=300&q=80';
};

export default function KelolaLayanan() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const response = await layananService.getAll();
      setLayanan(response.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Hapus layanan ini?')) {
      return;
    }

    await layananService.remove(id);
    setMessage('Layanan berhasil dihapus.');
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Layanan</h1>
          <p className="mt-1 text-slate-600">Tambah, edit, dan hapus layanan yang tersedia.</p>
        </div>
        <Link className="btn-primary" to="/admin/layanan/tambah">
          <Plus className="h-4 w-4" />
          Tambah Layanan
        </Link>
      </div>
      {message && <div className="rounded-md bg-brand-50 p-3 text-sm text-brand-900">{message}</div>}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Layanan</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Harga</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Deskripsi</th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-600" colSpan="4">
                    Memuat data...
                  </td>
                </tr>
              ) : layanan.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-600" colSpan="4">
                    Belum ada layanan.
                  </td>
                </tr>
              ) : (
                layanan.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.gambar_url ||
                            getFallbackImage(item.nama_layanan)
                          }
                          alt={item.nama_layanan}
                          className="h-12 w-16 rounded-md object-cover"
                        />
                        <span className="text-sm font-semibold text-slate-900">{item.nama_layanan}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{formatRupiah(item.harga_layanan)}</td>
                    <td className="max-w-md px-4 py-4 text-sm text-slate-600">{item.deskripsi}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Link className="btn-secondary px-3" to={`/admin/layanan/${item.id}/edit`} title="Edit layanan">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button className="btn-danger px-3" type="button" onClick={() => handleDelete(item.id)} title="Hapus layanan">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
