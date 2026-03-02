<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Juice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JuiceController extends Controller
{
    public function index()
    {
        $juices = Juice::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Juices/Index', [
            'juices' => $juices,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Juices/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_available' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('juices', 'public');
        }

        $validated['user_id'] = auth()->id();
        $validated['is_available'] = $request->boolean('is_available', true);

        Juice::create($validated);

        return redirect()->route('admin.juices.index')
            ->with('success', 'Juice created successfully!');
    }

    public function show(Juice $juice)
    {
        return Inertia::render('Admin/Juices/Show', [
            'juice' => $juice->load('user'),
        ]);
    }

    public function edit(Juice $juice)
    {
        return Inertia::render('Admin/Juices/Edit', [
            'juice' => $juice,
        ]);
    }

    public function update(Request $request, Juice $juice)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_available' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($juice->image) {
                Storage::disk('public')->delete($juice->image);
            }
            $validated['image'] = $request->file('image')->store('juices', 'public');
        }

        $validated['is_available'] = $request->boolean('is_available', true);

        $juice->update($validated);

        return redirect()->route('admin.juices.index')
            ->with('success', 'Juice updated successfully!');
    }

    public function destroy(Juice $juice)
    {
        if ($juice->image) {
            Storage::disk('public')->delete($juice->image);
        }

        $juice->delete();

        return redirect()->route('admin.juices.index')
            ->with('success', 'Juice deleted successfully!');
    }
}
