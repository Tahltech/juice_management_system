<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Juice;
use App\Models\Order;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_sales' => Order::where('status', 'delivered')->sum('total_amount'),
            'total_orders' => Order::count(),
            'total_customers' => User::whereHas('orders')->count(),
            'low_stock_juices' => Juice::where('stock_quantity', '<=', 10)->count(),
        ];

        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        $lowStockJuices = Juice::where('stock_quantity', '<=', 10)
            ->orderBy('stock_quantity', 'asc')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'lowStockJuices' => $lowStockJuices,
        ]);
    }
}
