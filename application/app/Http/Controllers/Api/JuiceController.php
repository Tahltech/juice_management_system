<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Juice;
use Illuminate\Http\Request;

class JuiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Juice::where('is_available', true)
            ->with('user');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('sort')) {
            $sort = $request->get('sort');
            if ($sort === 'price_low') {
                $query->orderBy('price', 'asc');
            } elseif ($sort === 'price_high') {
                $query->orderBy('price', 'desc');
            } elseif ($sort === 'name') {
                $query->orderBy('name', 'asc');
            } else {
                $query->latest();
            }
        } else {
            $query->latest();
        }

        $juices = $query->paginate(12);

        return response()->json([
            'juices' => $juices,
            'filters' => $request->only(['search', 'sort']),
        ]);
    }
}
