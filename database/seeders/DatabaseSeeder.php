<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        \App\Models\Role::factory()->create([
            'name' => 'Administrator',
            'description' => 'Administrator',
        ]);

        \App\Models\Role::factory()->create([
            'name' => 'Root',
            'description' => 'Root',
        ]);

        \App\Models\Role::factory()->create([
            'name' => 'Machine',
            'description' => 'Machine',
        ]);

        \App\Models\Role::factory()->create([
            'name' => 'User',
            'description' => 'User',
        ]);

        \App\Models\Badge::factory(10)->create();
        \App\Models\User::factory(10)->create();
    }
}
