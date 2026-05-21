import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import PelangganLayout from '../layouts/PelangganLayout.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import DashboardAdmin from '../pages/admin/DashboardAdmin.jsx';
import FormLayanan from '../pages/admin/FormLayanan.jsx';
import KelolaLayanan from '../pages/admin/KelolaLayanan.jsx';
import KelolaPemesanan from '../pages/admin/KelolaPemesanan.jsx';
import BuatPemesanan from '../pages/pelanggan/BuatPemesanan.jsx';
import DashboardPelanggan from '../pages/pelanggan/DashboardPelanggan.jsx';
import RiwayatPemesanan from '../pages/pelanggan/RiwayatPemesanan.jsx';
import About from '../pages/public/About.jsx';
import Contact from '../pages/public/Contact.jsx';
import Home from '../pages/public/Home.jsx';
import Layanan from '../pages/public/Layanan.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute role="pelanggan" />}>
        <Route path="/pelanggan" element={<PelangganLayout />}>
          <Route index element={<DashboardPelanggan />} />
          <Route path="pemesanan" element={<BuatPemesanan />} />
          <Route path="riwayat" element={<RiwayatPemesanan />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="layanan" element={<KelolaLayanan />} />
          <Route path="layanan/tambah" element={<FormLayanan />} />
          <Route path="layanan/:id/edit" element={<FormLayanan />} />
          <Route path="pemesanan" element={<KelolaPemesanan />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
