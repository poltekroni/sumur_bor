import Navbar from '../../components/Navbar.jsx';

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Tentang kami</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Tim lapangan untuk pekerjaan rumah dan air bersih.
            </h1>
            <p className="mt-5 leading-8 text-slate-600">
              Sumur Bor membantu pelanggan memesan jasa renovasi rumah dan sumur bor submersible
              melalui alur digital yang sederhana. Admin dapat mengelola layanan, memantau pemesanan,
              dan memperbarui status pekerjaan dari satu dashboard.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80"
            alt="Pekerja lapangan"
            className="h-80 w-full rounded-lg object-cover shadow-sm"
          />
        </div>
      </main>
    </div>
  );
}
