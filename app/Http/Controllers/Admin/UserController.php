<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::withCount('orders')
            ->withSum('orders', 'total_amount')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function show(User $user): Response
    {
        $user->load(['orders' => function ($query) {
            $query->with('orderItems.juice')->latest();
        }]);

        $stats = [
            'total_orders' => $user->orders()->count(),
            'total_spent' => $user->orders()->sum('total_amount'),
            'delivered_orders' => $user->orders()->where('status', 'delivered')->count(),
            'pending_orders' => $user->orders()->where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'stats' => $stats,
        ]);
    }
}
