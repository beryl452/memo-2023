<?php

namespace App\Actions\LoginHistory;

use App\Models\LoginHistory;

class StoreLoginHistoryAction
{
    public function handle(
        $date_login,
        $user_id
    ){
        LoginHistory::create([
            'date_login' => $date_login,
            'user_id' => $user_id,
        ]);
    }
}
