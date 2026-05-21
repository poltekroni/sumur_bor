# Postman Collection

Import dua file berikut ke Postman:

1. `Sumur_Bor_API.postman_collection.json`
2. `Sumur_Bor_Local.postman_environment.json`

Pilih environment `Sumur Bor Local`, lalu jalankan request berurutan:

1. `Authentication / Login Admin`
2. `Authentication / Register Pelanggan`
3. `Layanan / GET Semua Layanan`
4. `Pemesanan Pelanggan / POST Buat Pemesanan - Pelanggan`
5. `Admin / GET Dashboard Admin`
6. `Admin / GET Semua Pemesanan - Admin`
7. `Admin / PUT Ubah Status Pemesanan - Admin`

Token admin dan pelanggan akan tersimpan otomatis ke environment setelah request login/register berhasil.
