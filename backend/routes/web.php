<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    $indexPath = public_path('app/index.html');

    if (! File::exists($indexPath)) {
        abort(404, 'Frontend belum dibuild. Jalankan: cd frontend && npm run build');
    }

    return response(File::get($indexPath), 200, [
        'Content-Type' => 'text/html',
    ]);
})->where('any', '.*');
