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

        // Sales data for charts - last 30 days
        $salesData = Order::where('status', 'delivered')
            ->where('created_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Monthly sales data for last 12 months
        $monthlySalesData = Order::where('status', 'delivered')
            ->where('created_at', '>=', now()->subMonths(12))
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, SUM(total_amount) as total, COUNT(*) as orders')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // Top selling juices
        $topJuices = Order::where('status', 'delivered')
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('juices', 'order_items.juice_id', '=', 'juices.id')
            ->selectRaw('juices.name, SUM(order_items.quantity) as total_sold, SUM(order_items.subtotal) as revenue')
            ->groupBy('juices.id', 'juices.name')
            ->orderBy('total_sold', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'lowStockJuices' => $lowStockJuices,
            'salesData' => $salesData,
            'monthlySalesData' => $monthlySalesData,
            'topJuices' => $topJuices,
        ]);
    }
}
