<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Juice;
use App\Models\User;

class JuiceSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@juice.com')->first();

        $juices = [
            [
                'name' => 'Fresh Orange Juice',
                'description' => '100% pure orange juice made from fresh oranges. No added sugar or preservatives.',
                'price' => 4.99,
                'stock_quantity' => 50,
                'image' => 'orange-juice.jpg',
                'is_available' => true,
            ],
            [
                'name' => 'Green Apple Juice',
                'description' => 'Crisp and refreshing green apple juice with a perfect balance of sweet and tart.',
                'price' => 5.49,
                'stock_quantity' => 35,
                'image' => 'apple-juice.jpg',
                'is_available' => true,
            ],
            [
                'name' => 'Tropical Paradise',
                'description' => 'A delicious blend of pineapple, mango, and passion fruit for a taste of the tropics.',
                'price' => 6.99,
                'stock_quantity' => 25,
                'image' => 'tropical-juice.jpg',
                'is_available' => true,
            ],
            [
                'name' => 'Beetroot Boost',
                'description' => 'Nutrient-rich beetroot juice with apple and ginger for an energy boost.',
                'price' => 7.49,
                'stock_quantity' => 8,
                'image' => 'beetroot-juice.jpg',
                'is_available' => true,
            ],
            [
                'name' => 'Carrot Ginger Zing',
                'description' => 'Fresh carrot juice with a kick of ginger for immunity and vitality.',
                'price' => 5.99,
                'stock_quantity' => 42,
                'image' => 'carrot-juice.jpg',
                'is_available' => true,
            ],
        ];

        foreach ($juices as $juice) {
            Juice::create(array_merge($juice, ['user_id' => $admin->id]));
        }
    }
}
