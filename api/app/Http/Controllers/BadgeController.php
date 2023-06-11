<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Models\User;
use App\Responses\Badge\BadgeCollectionResponse;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->has('search')) {
            return new BadgeCollectionResponse(
                Badge::query()
                    ->where('serial_number', 'like', '%' . request()->search . '%')
                    ->paginate(7)
            );
        }
        return new BadgeCollectionResponse(
            Badge::query()
                ->with([
                    'user'
                ])
                ->paginate(7)
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'is_active' => $request->is_active == 'true' ? true : false,
            'last_login' => $request->last_login ? $request->last_login : null
        ]);
        $fields = $request->validate([
            'serial_number' => 'required|string|unique:badges,serial_number',
            'is_active' => 'required|boolean',
            'last_login' => 'nullable|date',
            'user_id' => 'required|exists:users,id'
        ]);

        $badge = Badge::create([
            'serial_number' => $fields['serial_number'],
            'is_active' => $fields['is_active'],
            'last_login' => $fields['last_login'],
            'user_id' => $fields['user_id']
        ]);

        User::find($fields['user_id'])->update([
            'badge_id' => $badge->id
        ]);
        return new BadgeCollectionResponse(
            Badge::query()
                ->with([
                    'user'
                ])
                ->paginate(7)
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(badge $badge)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(badge $badge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Badge $badge)
    {
        $fields = $request->validate([
            'serial_number' => 'required|string|unique:badges,serial_number',
            'user_id' => 'required|exists:users,id'
        ]);

        $badge->update([
            'serial_number' => $fields['serial_number'],
        ]);

        User::find($fields['user_id'])->update([
            'badge_id' => $badge->id
        ]);

        return response(json_encode(
            [
                'message' => 'Badge updated successfully',
                'badge' => $badge,
                'user' => User::find($fields['user_id'])
            ]
        ));
        return new BadgeCollectionResponse(
            Badge::query()
                ->with([
                    'user'
                ])
                ->paginate(7)
        );
    }

    public function activation(Badge $badge)
    {
        // return response(json_encode([
        //     'badge' => $badge,
        //     'badge Before' => $badge->is_active,
        //     'badge After' => !$badge->is_active
        // ]));
        $badge->is_active = !$badge->is_active;
        $badge->save();
        return response()->json([
            'message' => 'Badge updated successfully',
            'badge' => $badge
        ]);
    }

    public function isActive(Request $request)
    {
        return new BadgeCollectionResponse(
            Badge::query()
                ->with([
                    'user'
                ])
                ->where('serial_number', $request->serialNumber)
                ->where('is_active', true)
                ->get()
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(badge $badge)
    {
        // Check if the badge is assigned to a user
        $user = User::where('badge_id', $badge->id)->first();

        // If the badge is assigned to a user, remove the badge_id from the user

        if ($user) {
            $user->update([
                'badge_id' => null
            ]);
        }
        $badge->delete();
       return response(json_encode([
            'message' => 'Badge deleted successfully',
            'badge' => $badge
        ]));

    }
}
