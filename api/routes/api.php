<?php

use App\Http\Controllers\BadgeController;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(static function () {
    Route::prefix('badge')
        ->as('badge.')
        ->group(static function () {
            Route::post('/create', [BadgeController::class, 'store'])->name('store');
            // ->middleware([
            //             'ability:badge-store'
            // ]);
            Route::put('/activation/{badge}', [BadgeController::class, 'activation'])->name('activation');
            // ->middleware([
            // 'ability:badge-activation'
            // ]);
            Route::get('/is_active/{serialNumber}', [BadgeController::class, 'isActive'])->name('isActive');
            // ->middleware([
            // 'ability:badge-isActive'
            // ]);
            Route::get('/{search}', [BadgeController::class, 'index'])->name('search');
            // ->middleware([
            // 'ability:badge-search'
            // ]);
            Route::get('/', [BadgeController::class, 'index'])->name('index');
            // ->middleware([
            // 'ability:badge-index'
            // ]);
            Route::put('/update/{badge}', [BadgeController::class, 'update'])->name('update');
            // ->middleware([
            // 'ability:badge-update'
            // ]);
            Route::delete('/delete/{badge}', [BadgeController::class, 'destroy'])->name('destroy');
            // ->middleware([
            // 'ability:badge-destroy'
            // ]);
        });

    Route::prefix('user')
        ->as('user.')
        ->group(static function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            // ->middleware([
            // 'ability:user-index'
            // ]);
            Route::get('/{search}', [UserController::class, 'index'])->name('search');
            // ->middleware([
            // 'ability:user-search'
            // ]);
            Route::get('/show/{user}', [UserController::class, 'show'])->name('show');
            // ->middleware([
            // 'ability:user-show'
            // ]);
            Route::post('/create', [UserController::class, 'store'])->name('store');
            // ->middleware([
            // 'ability:user-store'
            // ]);
            Route::put('/update/{user}', [UserController::class, 'update'])->name('update');
            // ->middleware([
            // 'ability:user-update'
            // ]);
            Route::delete('/delete/{user}', [UserController::class, 'destroy'])->name('destroy');
            // ->middleware([
            // 'ability:user-destroy'
            // ]);
            Route::get('/users/allUsers', [UserController::class, 'allUsers'])->name('allUsers');
            // ->middleware([
            // 'ability:user-theUser'
            // ]);
        });

    Route::prefix('role')
        ->as('role.')
        ->group(static function () {
            Route::get('/', RoleController::class . '@index')->name('index');
            // ->middleware([
            // 'ability:role-index'
            // ]);
            Route::get('/{role}/', RoleController::class . '@show')->name('show');
            // ->middleware([
            // 'ability:role-show'
            // ]);
            Route::post('/create', RoleController::class . '@store')->name('store');
            // ->middleware([
            // 'ability:role-store'
            // ]);
            Route::put('/update/{role}', RoleController::class . '@update')->name('update');
            // ->middleware([
            // 'ability:role-update'
            // ]);
            Route::delete('/delete/{role}', RoleController::class . '@destroy')->name('destroy');
            // ->middleware([
            // 'ability:role-destroy'
            // ]);
        });

    Route::prefix('ressource')
        ->as('ressource.')
        ->group(static function () {
            Route::delete('/{role}/{ressource}', [RoleController::class, 'deleteAbility'])->name('deleteAbility');
            // ->middleware([
            // 'ability:ressource-deleteAbility'
            // ]);
            Route::post('/addAbility', [RoleController::class, 'addAbility'])->name('addAbility');
            Route::get('/createAbilities', [RessourceController::class, 'createAbilities'])->name('createAbilities');
            Route::get('/', RessourceController::class . '@index')->name('index');
            // ->middleware([
            // 'ability:ressource-index'
            // ]);
            Route::get('/myAbilities', [RessourceController::class, 'myAbilities'])->name('myAbilities');
            // ->middleware([
            // 'ability:ressource-myAbilities'
            // ]);
        });
});
Route::post('/login', [UserController::class, 'login']);
