<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\JuiceController;
use App\Http\Controllers\Customer\DashboardController as CustomerDashboardController;
use App\Http\Controllers\Customer\JuiceController as CustomerJuiceController;
use App\Http\Controllers\Api\JuiceController as ApiJuiceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConversationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');


// Route::get('/mylogin', function () {
//     return Inertia::render('Auth/CustomLogin');
// })->name('mylogin');


Route::get('/test', function () {
    return response()->json(['message' => 'Laravel is working!']);
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('juices', JuiceController::class);
    Route::resource('messages', MessageController::class);
    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');
    Route::post('/conversations/{conversation}/messages', [ConversationController::class, 'storeMessage'])->name('conversations.messages.store');
});

// Customer routes  
Route::middleware(['auth', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/dashboard', [CustomerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/juices', [CustomerJuiceController::class, 'index'])->name('juices.index');
    Route::get('/juices/{juice}', [CustomerJuiceController::class, 'show'])->name('juices.show');
    Route::get('/messages/create', [MessageController::class, 'create'])->name('messages.create');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::get('/conversations', [\App\Http\Controllers\Customer\ConversationController::class, 'index'])->name('conversations.index');
    Route::get('/conversations/{conversation}', [\App\Http\Controllers\Customer\ConversationController::class, 'show'])->name('conversations.show');
    Route::post('/conversations/{conversation}/messages', [\App\Http\Controllers\Customer\ConversationController::class, 'storeMessage'])->name('conversations.messages.store');
});

// Public juice routes
Route::get('/juices', [CustomerJuiceController::class, 'index'])->name('juices.public');
Route::get('/juices/{juice}', [CustomerJuiceController::class, 'show'])->name('juices.public.show');

// API routes for frontend
Route::get('/api/juices', [ApiJuiceController::class, 'index']);


require_once __DIR__.'/auth.php';
