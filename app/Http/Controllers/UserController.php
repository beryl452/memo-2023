<?php

namespace App\Http\Controllers;

use App\Actions\LoginHistory\StoreLoginHistoryAction;
use App\DataTransferObjects\LoginHistory\LoginHistoryDataObject;
use App\Models\Role;
use App\Models\User;
use App\Responses\User\UserCollectionResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->search) {
            $search = $request->search;
            $users = User::query()
                ->with([
                    'role',
                    'badge'
                ])
                ->where('firstname', 'LIKE', "%{$search}%")
                ->orWhere('lastname', 'LIKE', "%{$search}%")
                ->orWhere('username', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhereHas('role', function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%");
                })
                ->paginate(10);
        } else {
            $users = User::query()
                ->with([
                    'role',
                ])
                ->paginate(10);
        }
        return new UserCollectionResponse($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['badge_id' => $request->badge_id ? $request->badge_id : null]);
        $fields = $request->validate([
            'firstname' => 'required|string|max:255',
            'email' => 'required|string|unique:users,email',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|unique:users,username|max:255',
            'password' => 'required|string',
            'password_confirmation' => 'required|string|same:password',
            'role_id' => 'required|integer|exists:roles,id',
            'badge_id' => 'nullable|integer|exists:badges,id',
        ]);

        $user = User::create([
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role_id' => $fields['role_id'],
            'badge_id' => $fields['badge_id']
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserCollectionResponse(
            User::query()
                ->with([
                    'role',
                    'badge'
                ])
                ->where('id', $user->id)
                ->get()
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->merge(['badge_id' => $request->badge_id ? $request->badge_id : null]);
        $fields = $request->validate([
            'firstname' => 'nullable|string|max:255',
            'email' => 'nullable|string|unique:users,email',
            'lastname' => 'nullable|string|max:255',
            'username' => 'nullable|string|unique:users,username|max:255',
            'password' => 'nullable|string',
            'role_id' => 'nullable|integer|exists:roles,id',
            'badge_id' => 'nullable|integer|exists:badges,id',
        ]);

        $user->update([
            'firstname' => $fields['firstname'] ?? $user->firstname,
            'lastname' => $fields['lastname'] ?? $user->lastname,
            'username' => $fields['username'] ?? $user->username,
            'email' => $fields['email'] ?? $user->email,
            'password' => $fields['password'] ? Hash::make($fields['password']) : $user->password,
            'role_id' => $fields['role_id'] ?? $user->role_id,
            'badge_id' => $fields['badge_id'] ?? $user->badge_id
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully',
            'user' => $user,
        ], 200);
    }

    public function login(Request $request)
    {

        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad credentials'
            ], 401);
        }
        $abilities = Role::find($user->role->id)->ressources()->get(['name'])->pluck('name')->toArray();
        // Parcourt les abilities et remplace les '.' par des '-' et enleve le "\n" à la fin
        foreach ($abilities as $key => $ability) {
            $abilities[$key] = str_replace("\n", '', $abilities[$key]);
        }
        $token = $user->createToken(time(), $abilities, now()->addDay())->plainTextToken;
        $loginHistoryDto = new LoginHistoryDataObject(
            date_login: now(),
            user_id: $user->id,
        );
        (new StoreLoginHistoryAction())
            ->handle(
                ...$loginHistoryDto->toArray()
            );
        return response(json_encode([
            'user' => $user,
            'token' => $token,
            'abilities' => $abilities,
        ]), 201);
    }
}
