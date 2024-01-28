<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'waybill',
        'customer_address',
        'customer_name',
        'customer_phone_number'
    ];

    protected $casts = [
        'created_at' => "datetime:Y-m-d",
        'updated_at' => "datetime:Y-m-d",
    ];

    protected $hidden = [
        'updated_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeAuthUser($query)
    {
        $query->where('user_id', Auth::id());
    }
}
