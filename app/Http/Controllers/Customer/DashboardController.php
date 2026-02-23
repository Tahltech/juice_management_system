<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Juice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $stats = [
            'total_orders' => $user->orders()->count(),
            'active_orders' => $user->orders()->whereIn('status', ['pending', 'processing'])->count(),
            'delivered_orders' => $user->orders()->where('status', 'delivered')->count(),
            'total_spent' => $user->orders()->where('status', 'delivered')->sum('total_amount'),
        ];

        $recentOrders = $user->orders()
            ->with('orderItems.juice')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
        ]);
    }
}
