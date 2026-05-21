<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayananController extends Controller
{
    public function index(): JsonResponse
    {
        $layanan = Layanan::query()
            ->latest()
            ->paginate(12);

        return response()->json($layanan);
    }

    public function show(Layanan $layanan): JsonResponse
    {
        return response()->json([
            'data' => $layanan,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama_layanan' => ['required', 'string', 'max:255'],
            'harga_layanan' => ['required', 'numeric', 'min:0'],
            'deskripsi' => ['required', 'string'],
            'gambar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('layanan', 'public');
        }

        $layanan = Layanan::create($validated);

        return response()->json([
            'message' => 'Layanan berhasil ditambahkan.',
            'data' => $layanan,
        ], 201);
    }

    public function update(Request $request, Layanan $layanan): JsonResponse
    {
        $validated = $request->validate([
            'nama_layanan' => ['required', 'string', 'max:255'],
            'harga_layanan' => ['required', 'numeric', 'min:0'],
            'deskripsi' => ['required', 'string'],
            'gambar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('gambar')) {
            if ($layanan->gambar) {
                Storage::disk('public')->delete($layanan->gambar);
            }

            $validated['gambar'] = $request->file('gambar')->store('layanan', 'public');
        }

        $layanan->update($validated);

        return response()->json([
            'message' => 'Layanan berhasil diperbarui.',
            'data' => $layanan->fresh(),
        ]);
    }

    public function destroy(Layanan $layanan): JsonResponse
    {
        if ($layanan->gambar) {
            Storage::disk('public')->delete($layanan->gambar);
        }

        $layanan->delete();

        return response()->json([
            'message' => 'Layanan berhasil dihapus.',
        ]);
    }
}
