<?php

namespace Database\Seeders;

use App\Models\Layanan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sumurbor.test'],
            [
                'name' => 'Admin Sumur Bor',
                'username' => 'admin',
                'no_hp' => '081234567890',
                'alamat' => 'Kantor layanan renovasi rumah dan sumur bor',
                'password' => Hash::make('admin12345'),
                'role' => 'admin',
            ]
        );

        Layanan::updateOrCreate(
            ['nama_layanan' => 'Sumur Bor Submersible'],
            [
                'harga_layanan' => 8500000,
                'deskripsi' => 'Pembuatan sumur bor lengkap dengan instalasi pompa submersible untuk rumah, kontrakan, dan usaha.',
            ]
        );

        Layanan::updateOrCreate(
            ['nama_layanan' => 'Renovasi Rumah'],
            [
                'harga_layanan' => 15000000,
                'deskripsi' => 'Jasa renovasi rumah meliputi perbaikan ruang, atap, dinding, lantai, dan pekerjaan finishing.',
            ]
        );
    }
}
