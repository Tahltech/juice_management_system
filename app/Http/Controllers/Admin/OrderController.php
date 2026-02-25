<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['user', 'orderItems.juice'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load(['user', 'orderItems.juice']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function approve(Order $order): \Illuminate\Http\RedirectResponse
    {
        if ($order->status !== 'pending') {
            return back()->with('error', 'Order can only be approved if it is pending.');
        }

        $order->update(['status' => 'processing']);

        return back()->with('success', 'Order approved and is now being processed.');
    }

    public function markAsDelivered(Order $order): \Illuminate\Http\RedirectResponse
    {
        if ($order->status !== 'processing') {
            return back()->with('error', 'Order can only be marked as delivered if it is being processed.');
        }

        $order->update(['status' => 'delivered']);

        return back()->with('success', 'Order marked as delivered successfully.');
    }

    public function cancel(Order $order): \Illuminate\Http\RedirectResponse
    {
        if ($order->status === 'delivered') {
            return back()->with('error', 'Cannot cancel an order that has already been delivered.');
        }

        try {
            \DB::beginTransaction();

            // Restore stock if order is cancelled
            if ($order->status !== 'cancelled') {
                foreach ($order->orderItems as $orderItem) {
                    $orderItem->juice->increment('stock_quantity', $orderItem->quantity);
                }
            }

            $order->update(['status' => 'cancelled']);

            \DB::commit();

            return back()->with('success', 'Order cancelled successfully.');

        } catch (\Exception $e) {
            \DB::rollBack();
            return back()->with('error', 'Failed to cancel order. Please try again.');
        }
    }

    public function updateStatus(Request $request, Order $order): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:pending,processing,delivered,cancelled',
        ]);

        $oldStatus = $order->status;
        $newStatus = $request->status;

        // Handle stock restoration for cancellations
        if ($newStatus === 'cancelled' && $oldStatus !== 'cancelled') {
            try {
                \DB::beginTransaction();

                foreach ($order->orderItems as $orderItem) {
                    $orderItem->juice->increment('stock_quantity', $orderItem->quantity);
                }

                $order->update(['status' => $newStatus]);

                \DB::commit();

                return back()->with('success', 'Order cancelled and stock restored.');

            } catch (\Exception $e) {
                \DB::rollBack();
                return back()->with('error', 'Failed to cancel order. Please try again.');
            }
        }

        // For other status changes
        $order->update(['status' => $newStatus]);

        $statusMessages = [
            'pending' => 'Order status set to pending.',
            'processing' => 'Order status set to processing.',
            'delivered' => 'Order marked as delivered.',
        ];

        return back()->with('success', $statusMessages[$newStatus] ?? 'Order status updated.');
    }
}
