<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_number',
        'is_active',
        'last_login',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
