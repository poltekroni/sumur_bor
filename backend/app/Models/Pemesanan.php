<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Pemesanan extends Model
{
    use HasFactory;

    protected $table = 'pemesanan';

    protected $fillable = [
        'user_id',
        'layanan_id',
        'tanggal_pemesanan',
        'catatan',
        'bukti_transfer',
        'status',
    ];

    protected $casts = [
        'tanggal_pemesanan' => 'date',
    ];

    protected $appends = [
        'total_harga',
        'dp_pembayaran',
        'bukti_transfer_url',
    ];

    public function getTotalHargaAttribute(): float
    {
        return (float) ($this->layanan?->harga_layanan ?? 0);
    }

    public function getDpPembayaranAttribute(): float
    {
        return $this->total_harga * 0.1;
    }

    public function getBuktiTransferUrlAttribute(): ?string
    {
        if (! $this->bukti_transfer) {
            return null;
        }

        return Storage::disk('public')->url($this->bukti_transfer);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function layanan(): BelongsTo
    {
        return $this->belongsTo(Layanan::class);
    }
}
