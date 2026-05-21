# Aplikasi Pelayanan Renovasi Rumah dan Sumur Bor

Proyek ini terdiri dari:

- `backend/`: Laravel REST API, MySQL, Laravel Sanctum.
- `frontend/`: React Vite, Axios, React Router DOM, Tailwind CSS.

## Admin default

- Email: `admin@sumurbor.test`
- Username: `admin`
- Password: `admin12345`

## Menjalankan backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Sebelum migrasi, buat database MySQL bernama `sumur_bor` atau sesuaikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` pada file `.env`.

## Menjalankan frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend berjalan di `http://127.0.0.1:5173` dan backend default di `http://localhost:8000`.

## Endpoint utama

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/me`
- `GET /api/layanan`
- `GET /api/layanan/{id}`
- `POST /api/layanan`
- `PUT /api/layanan/{id}`
- `DELETE /api/layanan/{id}`
- `POST /api/pemesanan`
- `GET /api/pemesanan-saya`
- `GET /api/admin/pemesanan`
- `PUT /api/admin/pemesanan/{id}/status`
- `GET /api/admin/dashboard`
