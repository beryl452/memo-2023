<?php

use App\Http\Controllers\BadgeController;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(static function () {
    Route::prefix('badge')
        ->as('badge.')
        ->group(static function () {
            Route::post('/create', [BadgeController::class, 'store'])->name('store');
            Route::put('/activation/{badge}', [BadgeController::class, 'activation'])->name('activation');
            Route::get('/is_active/{serialNumber}', [BadgeController::class, 'isActive'])->name('isActive');
        });

    Route::prefix('user')
        ->as('user.')
        ->group(static function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('/{search}', [UserController::class, 'index'])->name('search');
            Route::get('/show/{user}', [UserController::class, 'show'])->name('show');
            Route::post('/create', [UserController::class, 'store'])->name('store');
            Route::put('/update/{user}', [UserController::class, 'update'])->name('update');
            Route::delete('/delete/{user}', [UserController::class, 'destroy'])->name('destroy');
        });

    Route::prefix('role')
        ->as('role.')
        ->group(static function () {
            Route::get('/', RoleController::class . '@index')->name('index');
            Route::get('/{role}/', RoleController::class . '@show')->name('show');
            Route::post('/create', RoleController::class . '@store')->name('store');
            Route::put('/update/{role}', RoleController::class . '@update')->name('update');
            Route::delete('/delete/{role}', RoleController::class . '@destroy')->name('destroy');
        });

    Route::prefix('ressource')
        ->as('ressource.')
        ->group(static function () {
            Route::delete('/{role}/{ressource}', [RoleController::class, 'deleteAbility'])->name('deleteAbility');
            Route::post('/addAbility', [RoleController::class, 'addAbility'])->name('addAbility');
            Route::get('/createAbilities', [RessourceController::class, 'createAbilities'])->name('createAbilities');
            Route::get('/', RessourceController::class . '@index')->name('index');
            Route::get('/myAbilities', [RessourceController::class, 'myAbilities'])->name('myAbilities')->middleware([
                'abilities:ressource-myAbilities'
            ]);
        });
});
Route::post('/login', [UserController::class, 'login']);
