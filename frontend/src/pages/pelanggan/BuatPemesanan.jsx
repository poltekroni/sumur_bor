import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { layananService } from '../../services/layananService.jsx';
import { pemesananService } from '../../services/pemesananService.jsx';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function BuatPemesanan() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [layanan, setLayanan] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    layanan_id: params.get('layanan') || '',
    tanggal_pemesanan: '',
    catatan: '',
    bukti_transfer: null,
  });
  const selectedLayanan = layanan.find((item) => String(item.id) === String(form.layanan_id));
  const hargaPemesanan = Number(selectedLayanan?.harga_layanan || 0);
  const dpPembayaran = hargaPemesanan * 0.1;

  useEffect(() => {
    const load = async () => {
      const response = await layananService.getAll();
      setLayanan(response.data.data || []);
    };

    load();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const payload = new FormData();
      payload.append('layanan_id', form.layanan_id);
      payload.append('tanggal_pemesanan', form.tanggal_pemesanan);
      payload.append('catatan', form.catatan || '');

      if (form.bukti_transfer) {
        payload.append('bukti_transfer', form.bukti_transfer);
      }

      await pemesananService.create(payload);
      setMessage('Pemesanan berhasil dibuat.');
      setTimeout(() => navigate('/pelanggan/riwayat'), 600);
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' ') : 'Gagal membuat pemesanan.');
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buat Pemesanan</h1>
        <p className="mt-1 text-slate-600">Lengkapi data layanan dan tanggal kunjungan.</p>
      </div>
      <form className="panel space-y-5 p-6" onSubmit={handleSubmit}>
        {message && <div className="rounded-md bg-brand-50 p-3 text-sm text-brand-900">{message}</div>}
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div className="space-y-2">
          <label htmlFor="layanan_id">Layanan</label>
          <select
            id="layanan_id"
            value={form.layanan_id}
            onChange={(e) => setForm({ ...form, layanan_id: e.target.value })}
            required
          >
            <option value="">Pilih layanan</option>
            {layanan.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama_layanan}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="tanggal_pemesanan">Tanggal Pemesanan</label>
          <input
            id="tanggal_pemesanan"
            type="date"
            value={form.tanggal_pemesanan}
            onChange={(e) => setForm({ ...form, tanggal_pemesanan: e.target.value })}
            required
          />
        </div>
        {selectedLayanan && (
          <div className="grid gap-3 rounded-lg border border-brand-100 bg-brand-50 p-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-600">Harga Pemesanan</p>
              <p className="mt-1 text-lg font-bold text-slate-950">{formatRupiah(hargaPemesanan)}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">DP Pembayaran 10%</p>
              <p className="mt-1 text-lg font-bold text-brand-900">{formatRupiah(dpPembayaran)}</p>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="catatan">Catatan</label>
          <textarea
            id="catatan"
            rows="4"
            value={form.catatan}
            onChange={(e) => setForm({ ...form, catatan: e.target.value })}
            placeholder="Contoh: lokasi, patokan rumah, kebutuhan khusus"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="bukti_transfer">Upload Bukti Transfer DP</label>
          <input
            id="bukti_transfer"
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => setForm({ ...form, bukti_transfer: e.target.files?.[0] || null })}
          />
          <p className="text-xs text-slate-500">Format: JPG, PNG, WEBP, atau PDF. Maksimal 2 MB.</p>
        </div>
        <button className="btn-primary" type="submit">
          Kirim Pemesanan
        </button>
      </form>
    </div>
  );
}
