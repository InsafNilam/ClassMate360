<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Insaf Nilam',
            'email' => 'insafnilam.2000@gmail.com',
            'password'=> bcrypt('123.321A'),
            'email_verified_at'=> time()
        ]);

        Student::factory()->count(30)->create();
    }
}
