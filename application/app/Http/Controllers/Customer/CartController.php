<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Juice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        $cartItems = Cart::with('juice')
            ->where('user_id', Auth::id())
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });

        return Inertia::render('Customer/Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
            'count' => $cartItems->sum('quantity'),
        ]);
    }

    public function add(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'juice_id' => 'required|exists:juices,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $juice = Juice::findOrFail($request->juice_id);

        if ($juice->stock_quantity < $request->quantity) {
            return back()->with('error', 'Not enough stock available.');
        }

        $cartItem = Cart::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'juice_id' => $request->juice_id,
            ],
            [
                'quantity' => $request->quantity,
                'price' => $juice->price,
            ]
        );

        if (!$cartItem->wasRecentlyCreated) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        }

        return back()->with('success', 'Item added to cart!');
    }

    public function update(Request $request, Cart $cart): \Illuminate\Http\JsonResponse
    {
        try {
            // Check if the cart item belongs to the authenticated user
            if ($cart->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized action.'
                ], 403);
            }

            $request->validate([
                'quantity' => 'required|integer|min:1|max:10',
            ]);

            $juice = $cart->juice;
            
            if ($juice->stock_quantity < $request->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough stock available.'
                ], 422);
            }

            $cart->update(['quantity' => $request->quantity]);

            return response()->json([
                'success' => true,
                'message' => 'Cart updated successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update cart. Please try again.'
            ], 500);
        }
    }

    public function remove(Cart $cart): \Illuminate\Http\JsonResponse
    {
        try {
            // Check if the cart item belongs to the authenticated user
            if ($cart->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized action.'
                ], 403);
            }

            $cart->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item removed from cart successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove item. Please try again.'
            ], 500);
        }
    }

    public function clear(): \Illuminate\Http\JsonResponse
    {
        try {
            Cart::where('user_id', Auth::id())->delete();

            return response()->json([
                'success' => true,
                'message' => 'Cart cleared successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cart. Please try again.'
            ], 500);
        }
    }
}
