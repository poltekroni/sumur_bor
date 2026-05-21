import { ArrowRight, Hammer, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <section className="relative min-h-[620px] overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=80"
          alt="Pekerjaan renovasi rumah"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
              Renovasi rumah dan sumur bor submersible
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Sumur Bor
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-100 sm:text-lg">
              Layanan renovasi dan instalasi sumur bor yang tertata dari konsultasi, pemesanan,
              proses pengerjaan, hingga status pekerjaan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary bg-brand-600 hover:bg-brand-700" to="/layanan">
                Lihat Layanan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="btn-secondary border-white/40 bg-white/10 text-white hover:bg-white/20" to="/register">
                Daftar Pelanggan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          {
            icon: Wrench,
            title: 'Pemesanan cepat',
            text: 'Pelanggan memilih layanan, menentukan tanggal, dan menambahkan catatan lokasi atau kebutuhan.',
          },
          {
            icon: Hammer,
            title: 'Layanan terkelola',
            text: 'Admin dapat menambah, mengubah, dan menghapus layanan renovasi maupun sumur bor.',
          },
          {
            icon: ShieldCheck,
            title: 'Status transparan',
            text: 'Status pemesanan bisa dipantau dari pending, diproses, selesai, sampai dibatalkan.',
          },
        ].map((item) => (
          <div className="panel p-6" key={item.title}>
            <item.icon className="h-8 w-8 text-brand-700" />
            <h2 className="mt-4 text-lg font-bold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
