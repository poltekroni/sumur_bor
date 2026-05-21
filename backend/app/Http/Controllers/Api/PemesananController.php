<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pemesanan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PemesananController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'layanan_id' => ['required', 'exists:layanan,id'],
            'tanggal_pemesanan' => ['required', 'date', 'after_or_equal:today'],
            'catatan' => ['nullable', 'string'],
            'bukti_transfer' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:2048'],
        ]);

        if ($request->hasFile('bukti_transfer')) {
            $validated['bukti_transfer'] = $request->file('bukti_transfer')->store('bukti-transfer', 'public');
        }

        $pemesanan = Pemesanan::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'status' => 'pending',
        ])->load('layanan');

        return response()->json([
            'message' => 'Pemesanan berhasil dibuat.',
            'data' => $pemesanan,
        ], 201);
    }

    public function myOrders(Request $request): JsonResponse
    {
        $pemesanan = Pemesanan::query()
            ->with('layanan')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'data' => $pemesanan,
        ]);
    }

    public function adminIndex(): JsonResponse
    {
        $pemesanan = Pemesanan::query()
            ->with(['user', 'layanan'])
            ->latest()
            ->get();

        return response()->json([
            'data' => $pemesanan,
        ]);
    }

    public function updateStatus(Request $request, Pemesanan $pemesanan): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['pending', 'diproses', 'selesai', 'dibatalkan'])],
        ]);

        $pemesanan->update($validated);

        return response()->json([
            'message' => 'Status pemesanan berhasil diperbarui.',
            'data' => $pemesanan->fresh()->load(['user', 'layanan']),
        ]);
    }
}
