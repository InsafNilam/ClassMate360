<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'age'=> fake()->numberBetween(1, 100),
            'status'=> fake()->randomElement(['active', 'inactive']),
            'image'=> fake()->imageUrl(),
            'created_by'=> 1,
            'updated_by'=>1,
        ];
    }
}
