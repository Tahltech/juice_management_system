<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Juice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with(['orderItems.juice'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Customer/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order): Response
    {
        // Check if user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
        
        $order->load(['orderItems.juice', 'user']);

        return Inertia::render('Customer/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function checkout(): Response
    {
        $cartItems = Cart::with('juice')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('customer.cart.index')
                ->with('error', 'Your cart is empty. Add some items before checkout.');
        }

        // Check stock availability
        foreach ($cartItems as $cartItem) {
            if ($cartItem->juice->stock_quantity < $cartItem->quantity) {
                return redirect()->route('customer.cart.index')
                    ->with('error', "Sorry, {$cartItem->juice->name} doesn't have enough stock. Only {$cartItem->juice->stock_quantity} available.");
            }
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });
        $tax = $subtotal * 0.1;
        $total = $subtotal + $tax;

        return Inertia::render('Customer/Orders/Checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
        ]);
    }

    public function placeOrder(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'shipping_address' => 'required|string|min:10',
            'phone' => 'required|string|min:10',
            'notes' => 'nullable|string|max:500',
        ]);

        $cartItems = Cart::with('juice')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        // Final stock check
        foreach ($cartItems as $cartItem) {
            if ($cartItem->juice->stock_quantity < $cartItem->quantity) {
                return back()->with('error', "Sorry, {$cartItem->juice->name} doesn't have enough stock.");
            }
        }

        try {
            DB::beginTransaction();

            // Calculate totals
            $subtotal = $cartItems->sum(function ($item) {
                return $item->quantity * $item->price;
            });
            $tax = $subtotal * 0.1;
            $total = $subtotal + $tax;

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $total,
                'status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'phone' => $request->phone,
                'notes' => $request->notes,
            ]);

            // Create order items and update stock
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'juice_id' => $cartItem->juice_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'subtotal' => $cartItem->quantity * $cartItem->price,
                ]);

                // Update juice stock
                $cartItem->juice->decrement('stock_quantity', $cartItem->quantity);
            }

            // Clear cart
            Cart::where('user_id', Auth::id())->delete();

            DB::commit();

            return redirect()->route('customer.orders.show', $order)
                ->with('success', 'Order placed successfully! We will process it soon.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to place order. Please try again.');
        }
    }

    public function cancel(Order $order): \Illuminate\Http\RedirectResponse
    {
        // Check if user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        if ($order->status !== 'pending') {
            return back()->with('error', 'Cannot cancel order that is already being processed.');
        }

        try {
            DB::beginTransaction();

            // Restore stock
            foreach ($order->orderItems as $orderItem) {
                $orderItem->juice->increment('stock_quantity', $orderItem->quantity);
            }

            $order->update(['status' => 'cancelled']);

            DB::commit();

            return back()->with('success', 'Order cancelled successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to cancel order. Please try again.');
        }
    }
}
