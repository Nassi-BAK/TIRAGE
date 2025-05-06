<?php

use App\Http\Controllers\ChioxController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

use Illuminate\Support\Facades\Auth;

Route::get('/dashboard', function () {
    // Vérifier si l'utilisateur est authentifié et a le rôle 'admin'
    if (Auth::check() && Auth::user()->role === 'admin') {
        // Si l'utilisateur est un admin, afficher le tableau de bord
        return Inertia::render('Dashboard',['totalUsers'=>User::all()]);
    }

    // Si l'utilisateur n'est pas un admin, le rediriger ailleurs (exemple: home)
    return redirect()->route('select');  // Tu peux modifier la route de redirection
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

use App\Http\Controllers\DestinationController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserDataController;
use App\Models\Setting;
use Dompdf\Image\Cache;

Route::middleware(['auth'])->group(function () {
});

Route::get('/destinations/create', [DestinationController::class, 'create'])->name('destinations.create');
Route::post('/destinations', [DestinationController::class, 'store'])->name('destinations.store');
Route::get('/', [DestinationController::class, 'showDestinations'])->name('destinations.show');
Route::get('/Alldestinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::delete('/destinations/{id}', [DestinationController::class, 'destroy'])->name('destinations.destroy');

    Route::get('/admin/periodes/create', [PeriodeController::class, 'create'])->name('periodes.create');
    Route::post('/admin/periodes', [PeriodeController::class, 'store'])->name('periodes.store');

    Route::get('/periodes', [PeriodeController::class, 'index'])->name('periodes.index');
    Route::delete('/periodes/{id}', [PeriodeController::class, 'destroy'])->name('periodes.destroy');
    Route::get('/select-destination', [DestinationController::class, 'select'])->name('destinations.select');
    Route::get('/chiox/create', [ChioxController::class, 'create'])->name('select');
    Route::get('/get-periodes-by-destination/{destinationId}', [ChioxController::class, 'getPeriodesByDestination']);

    Route::post('/store-chiox', [ChioxController::class, 'store']);

    


   
    
Route::get('/chiox', [ChioxController::class, 'index'])->name('chiox.index');
Route::get('/tirage', [ChioxController::class, 'tirage'])->name('tirage');

Route::get('/chiox-stats', [ChioxController::class, 'getChioxStats']);

Route::get('/destinations', [DestinationController::class, 'index1']);
// In your routes/web.php file:
Route::get('/download-pdf', [ChioxController::class, 'downloadApplicationPdf'])->name('download.pdf');

Route::get('/api/destination-stats', [ChioxController::class, 'getDestinationStats']);
Route::get('/statistiques', [StatistiqueController::class, 'index'])->name('statistiques.index');
Route::post('/user_data', [UserDataController::class, 'store'])->name('user_data.store');
Route::post('/admin/toggle-formulaire', function () {
    $setting = Setting::first();
    $setting->formulaire_actif = !$setting->formulaire_actif;
    $setting->save();

    return back();
})->name('setting');

// Route::get('/Dashboard', [UserController::class, 'index']);

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/destinations/{destination}/edit', [DestinationController::class, 'edit'])->name('destinations.edit');
Route::put('/destinations/{destination}', [DestinationController::class, 'update'])->name('destinations.update');
