import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { layananService } from '../../services/layananService.jsx';

export default function FormLayanan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nama_layanan: '',
    harga_layanan: '',
    deskripsi: '',
    gambar: null,
  });

  useEffect(() => {
    const load = async () => {
      if (!isEdit) {
        return;
      }

      const response = await layananService.getById(id);
      const data = response.data.data;
      setForm({
        nama_layanan: data.nama_layanan,
        harga_layanan: data.harga_layanan,
        deskripsi: data.deskripsi,
        gambar: null,
      });
      setPreview(data.gambar_url || '');
    };

    load();
  }, [id, isEdit]);

  const handleFile = (file) => {
    setForm((current) => ({ ...current, gambar: file }));
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const payload = new FormData();
    payload.append('nama_layanan', form.nama_layanan);
    payload.append('harga_layanan', form.harga_layanan);
    payload.append('deskripsi', form.deskripsi);

    if (form.gambar) {
      payload.append('gambar', form.gambar);
    }

    try {
      if (isEdit) {
        await layananService.update(id, payload);
      } else {
        await layananService.create(payload);
      }

      navigate('/admin/layanan');
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? Object.values(errors).flat().join(' ') : 'Gagal menyimpan layanan.');
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Layanan' : 'Tambah Layanan'}</h1>
        <p className="mt-1 text-slate-600">Isi informasi layanan yang akan ditampilkan kepada pelanggan.</p>
      </div>
      <form className="panel space-y-5 p-6" onSubmit={handleSubmit}>
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div className="grid gap-5 md:grid-cols-[1fr_260px]">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="nama_layanan">Nama Layanan</label>
              <input
                id="nama_layanan"
                value={form.nama_layanan}
                onChange={(e) => setForm({ ...form, nama_layanan: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="harga_layanan">Harga Layanan</label>
              <input
                id="harga_layanan"
                min="0"
                type="number"
                value={form.harga_layanan}
                onChange={(e) => setForm({ ...form, harga_layanan: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="deskripsi">Deskripsi</label>
              <textarea
                id="deskripsi"
                rows="6"
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-3">
            <label htmlFor="gambar">Gambar Layanan</label>
            <input id="gambar" type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} />
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              {preview ? (
                <img src={preview} alt="Preview layanan" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">Belum ada gambar</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" type="submit">
            <Save className="h-4 w-4" />
            Simpan
          </button>
          <Link className="btn-secondary" to="/admin/layanan">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
