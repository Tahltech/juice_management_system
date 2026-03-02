<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@juice.com',
            'password' => bcrypt('password'),
            'phone' => '+1234567890',
            'address' => '123 Admin Street, Juice City',
        ]);

        $admin->assignRole('admin');
    }
}
