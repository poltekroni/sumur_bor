<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LayananController;
use App\Http\Controllers\Api\PemesananController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/layanan', [LayananController::class, 'index']);
Route::get('/layanan/{layanan}', [LayananController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('role:admin')->group(function () {
        Route::post('/layanan', [LayananController::class, 'store']);
        Route::put('/layanan/{layanan}', [LayananController::class, 'update']);
        Route::delete('/layanan/{layanan}', [LayananController::class, 'destroy']);

        Route::get('/admin/dashboard', [DashboardController::class, 'index']);
        Route::get('/admin/pemesanan', [PemesananController::class, 'adminIndex']);
        Route::put('/admin/pemesanan/{pemesanan}/status', [PemesananController::class, 'updateStatus']);
    });

    Route::middleware('role:pelanggan')->group(function () {
        Route::post('/pemesanan', [PemesananController::class, 'store']);
        Route::get('/pemesanan-saya', [PemesananController::class, 'myOrders']);
    });
});
