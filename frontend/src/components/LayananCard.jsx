import { CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const fallbackImages = {
  sumur:
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
  renovasi:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
  default:
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
};

const getFallbackImage = (namaLayanan = '') => {
  const name = namaLayanan.toLowerCase();

  if (name.includes('sumur') || name.includes('bor') || name.includes('submersible')) {
    return fallbackImages.sumur;
  }

  if (name.includes('renovasi') || name.includes('rumah')) {
    return fallbackImages.renovasi;
  }

  return fallbackImages.default;
};

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function LayananCard({ layanan }) {
  return (
    <article className="panel overflow-hidden">
      <img
        src={layanan.gambar_url || getFallbackImage(layanan.nama_layanan)}
        alt={layanan.nama_layanan}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{layanan.nama_layanan}</h3>
          <p className="mt-1 font-semibold text-brand-700">{formatRupiah(layanan.harga_layanan)}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{layanan.deskripsi}</p>
        <Link className="btn-primary w-full" to={`/pelanggan/pemesanan?layanan=${layanan.id}`}>
          <CalendarPlus className="h-4 w-4" />
          Pesan Layanan
        </Link>
      </div>
    </article>
  );
}
