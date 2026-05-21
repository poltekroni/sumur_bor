# Backend Laravel REST API

API untuk pelayanan renovasi rumah dan sumur bor submersible.

## Admin default

- Email: `admin@sumurbor.test`
- Username: `admin`
- Password: `admin12345`

## Instalasi

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Pastikan database MySQL `sumur_bor` sudah dibuat dan konfigurasi `.env` sudah sesuai.
