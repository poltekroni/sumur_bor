import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import LayananCard from '../../components/LayananCard.jsx';
import { layananService } from '../../services/layananService.jsx';

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await layananService.getAll();
        setLayanan(response.data.data || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Daftar Layanan</h1>
            <p className="mt-2 text-slate-600">Pilih layanan renovasi atau sumur bor sesuai kebutuhan.</p>
          </div>
        </div>

        {loading ? (
          <div className="panel p-6 text-sm text-slate-600">Memuat layanan...</div>
        ) : layanan.length === 0 ? (
          <div className="panel p-6 text-sm text-slate-600">Belum ada layanan tersedia.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {layanan.map((item) => (
              <div key={item.id} className="space-y-3">
                <LayananCard layanan={item} />
                <button className="btn-secondary w-full" type="button" onClick={() => setSelected(item)}>
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        )}

        {selected && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="panel max-h-[90vh] w-full max-w-2xl overflow-y-auto">
              <img
                src={
                  selected.gambar_url ||
                  (selected.nama_layanan?.toLowerCase().includes('sumur') ||
                  selected.nama_layanan?.toLowerCase().includes('bor') ||
                  selected.nama_layanan?.toLowerCase().includes('submersible')
                    ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80'
                    : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80')
                }
                alt={selected.nama_layanan}
                className="h-64 w-full rounded-t-lg object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold">{selected.nama_layanan}</h2>
                <p className="mt-4 leading-7 text-slate-600">{selected.deskripsi}</p>
                <button className="btn-secondary mt-6" type="button" onClick={() => setSelected(null)}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
