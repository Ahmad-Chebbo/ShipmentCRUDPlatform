<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'waybill' => $this->waybill,
            'customer_name' => $this->customer_name,
            'customer_address' => $this->customer_address,
            'user' => $this->user,
        ];
    }
}
