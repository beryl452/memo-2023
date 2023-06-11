<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Badge\BadgeResource;
use App\Http\Resources\Role\RoleResource;
use App\Models\Badge;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'firstname'=> $this->firstname,
            'email'=> $this->email,
            'lastname'=> $this->lastname,
            'username'=> $this->username,
            'password'=> $this->password,
            'role' => RoleResource::make($this->whenLoaded('role')),
            'badge'=> BadgeResource::make($this->whenLoaded('badge'))
        ];
    }
}
