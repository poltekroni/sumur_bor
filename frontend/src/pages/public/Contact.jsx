import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Navbar from '../../components/Navbar.jsx';

const contacts = [
  { icon: Phone, title: 'Telepon', text: '0895614038040', href: 'tel:0895614038040' },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    text: '0895614038040',
    href: 'https://wa.me/62895614038040?text=Halo%20Sumur%20Bor%2C%20saya%20ingin%20konsultasi%20layanan.',
  },
  { icon: Mail, title: 'Email', text: 'ronisupriadi26@gmail.com', href: 'mailto:ronisupriadi26@gmail.com' },
  { icon: MapPin, title: 'Alamat', text: 'Jln Sariasih No 54 Bandung Kode Pos 40151' },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-950">Kontak</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Hubungi tim untuk survei lokasi, estimasi biaya, atau konsultasi kebutuhan renovasi dan sumur bor.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item) => (
            <div className="panel p-6" key={item.title}>
              <item.icon className="h-7 w-7 text-brand-700" />
              <h2 className="mt-4 font-bold">{item.title}</h2>
              {item.href ? (
                <a
                  className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
