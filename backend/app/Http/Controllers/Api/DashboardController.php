<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use App\Models\Pemesanan;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                'jumlah_layanan' => Layanan::count(),
                'jumlah_pelanggan' => User::where('role', 'pelanggan')->count(),
                'jumlah_pemesanan' => Pemesanan::count(),
                'pending' => Pemesanan::where('status', 'pending')->count(),
                'diproses' => Pemesanan::where('status', 'diproses')->count(),
                'selesai' => Pemesanan::where('status', 'selesai')->count(),
                'dibatalkan' => Pemesanan::where('status', 'dibatalkan')->count(),
            ],
        ]);
    }
}
