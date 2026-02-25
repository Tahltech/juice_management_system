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
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'show'])->name('users.show');
    Route::get('/juices', [\App\Http\Controllers\Admin\JuiceController::class, 'index'])->name('juices.index');
    Route::get('/juices/create', [\App\Http\Controllers\Admin\JuiceController::class, 'create'])->name('juices.create');
    Route::post('/juices', [\App\Http\Controllers\Admin\JuiceController::class, 'store'])->name('juices.store');
    Route::get('/juices/{juice}/edit', [\App\Http\Controllers\Admin\JuiceController::class, 'edit'])->name('juices.edit');
    Route::put('/juices/{juice}', [\App\Http\Controllers\Admin\JuiceController::class, 'update'])->name('juices.update');
    Route::delete('/juices/{juice}', [\App\Http\Controllers\Admin\JuiceController::class, 'destroy'])->name('juices.destroy');
    Route::get('/messages', [\App\Http\Controllers\Admin\MessageController::class, 'index'])->name('messages.index');
    Route::get('/conversations', [\App\Http\Controllers\Admin\ConversationController::class, 'index'])->name('conversations.index');
    Route::get('/conversations/{conversation}', [\App\Http\Controllers\Admin\ConversationController::class, 'show'])->name('conversations.show');
    Route::get('/conversations/{conversation}/messages/latest', [\App\Http\Controllers\Admin\ConversationController::class, 'latestMessages'])->name('conversations.messages.latest');
    Route::post('/conversations/{conversation}/messages', [\App\Http\Controllers\Admin\ConversationController::class, 'storeMessage'])->name('conversations.messages.store');
    Route::delete('/conversations/{conversation}/clear', [\App\Http\Controllers\Admin\ConversationController::class, 'clearChat'])->name('conversations.clear');
    Route::delete('/conversations/{conversation}/messages/{message}', [\App\Http\Controllers\Admin\ConversationController::class, 'deleteMessage'])->name('conversations.messages.delete');
    Route::get('/orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [\App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/approve', [\App\Http\Controllers\Admin\OrderController::class, 'approve'])->name('orders.approve');
    Route::post('/orders/{order}/deliver', [\App\Http\Controllers\Admin\OrderController::class, 'markAsDelivered'])->name('orders.deliver');
    Route::post('/orders/{order}/cancel', [\App\Http\Controllers\Admin\OrderController::class, 'cancel'])->name('orders.cancel');
    Route::put('/orders/{order}/status', [\App\Http\Controllers\Admin\OrderController::class, 'updateStatus'])->name('orders.updateStatus');
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
    Route::get('/conversations/{conversation}/messages/latest', [\App\Http\Controllers\Customer\ConversationController::class, 'latestMessages'])->name('conversations.messages.latest');
    Route::post('/conversations/{conversation}/messages', [\App\Http\Controllers\Customer\ConversationController::class, 'storeMessage'])->name('conversations.messages.store');
    Route::delete('/conversations/{conversation}/clear', [\App\Http\Controllers\Customer\ConversationController::class, 'clearChat'])->name('conversations.clear');
    Route::delete('/conversations/{conversation}/messages/{message}', [\App\Http\Controllers\Customer\ConversationController::class, 'deleteMessage'])->name('conversations.messages.delete');
    Route::get('/cart', [\App\Http\Controllers\Customer\CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [\App\Http\Controllers\Customer\CartController::class, 'add'])->name('cart.add');
    Route::put('/cart/{cart}', [\App\Http\Controllers\Customer\CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cart}', [\App\Http\Controllers\Customer\CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart', [\App\Http\Controllers\Customer\CartController::class, 'clear'])->name('cart.clear');
    Route::get('/orders', [\App\Http\Controllers\Customer\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/checkout', [\App\Http\Controllers\Customer\OrderController::class, 'checkout'])->name('orders.checkout');
    Route::post('/orders', [\App\Http\Controllers\Customer\OrderController::class, 'placeOrder'])->name('orders.place');
    Route::get('/orders/{order}', [\App\Http\Controllers\Customer\OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/cancel', [\App\Http\Controllers\Customer\OrderController::class, 'cancel'])->name('orders.cancel');
});

// Public juice routes
Route::get('/juices', [CustomerJuiceController::class, 'index'])->name('juices.public');
Route::get('/juices/{juice}', [CustomerJuiceController::class, 'show'])->name('juices.public.show');

// API routes for frontend
Route::get('/api/juices', [ApiJuiceController::class, 'index']);


require_once __DIR__.'/auth.php';
