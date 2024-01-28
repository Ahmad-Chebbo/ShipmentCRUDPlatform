<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'waybill' => fake()->unique()->uuid(),
            'customer_name' => fake()->name(),
            'customer_address' => fake()->address(),
            'customer_phone_number' => fake()->phoneNumber(),
            'user_id' => 2,
        ];
    }
}
