<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Juice;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('Customer/Juices/Index', [
            'juices' => $juices,
            'filters' => $request->only(['search', 'sort']),
        ]);
    }

    public function show(Juice $juice)
    {
        if (!$juice->is_available) {
            abort(404);
        }

        $relatedJuices = Juice::where('is_available', true)
            ->where('id', '!=', $juice->id)
            ->inRandomOrder()
            ->take(4)
            ->get();

        return Inertia::render('Customer/Juices/Show', [
            'juice' => $juice->load('user'),
            'relatedJuices' => $relatedJuices,
        ]);
    }
}
