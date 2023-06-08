<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Responses\Badge\BadgeCollectionResponse;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //Vérifier si un badge existe déjà pour cet utilisateur
        $badge = Badge::where('user_id', $request->user_id)->first();
        if($badge){
            return response()->json([
                'message' => 'Un badge existe déjà pour cet utilisateur'
            ], 400);
        }

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
        return new BadgeCollectionResponse(
            Badge::query()
                ->with([
                    'user'
                ])
                ->where('id', $badge->id)
                ->get()
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
    public function update(Request $request, badge $badge)
    {
        //
    }

    public function activation(Badge $badge)
    {
        $badge->is_active = !$badge->active;
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
        //
    }
}
