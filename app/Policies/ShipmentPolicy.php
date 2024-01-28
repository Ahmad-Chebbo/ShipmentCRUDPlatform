<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Shipment;

class ShipmentPolicy
{
    public function update(User $user, Shipment $shipment): bool
    {
        return $user->id === $shipment->user_id;
    }

    public function show(User $user, Shipment $shipment): bool
    {
        return $user->id === $shipment->user_id;
    }

    public function destroy(User $user, Shipment $shipment): bool
    {
        return $user->id === $shipment->user_id;
    }
}
