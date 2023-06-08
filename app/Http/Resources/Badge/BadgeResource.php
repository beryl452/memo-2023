<?php

namespace App\Http\Resources\Badge;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BadgeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'serial_number'=> $this->serial_number,
            'is_active' => $this->is_active,
            'last_login' => $this->last_login,
            'user_id' => $this->whenLoaded('user')
        ];
    }
}
