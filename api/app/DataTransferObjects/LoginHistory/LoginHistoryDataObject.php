<?php

namespace App\DataTransferObjects\LoginHistory;

use DateTime;

class LoginHistoryDataObject
{
    public function __construct(
        private readonly DateTime $date_login,
        private readonly int $user_id,
    )
    {}

    public function toArray(): array
    {
        return [
            'date_login' => $this->date_login,
            'user_id' => $this->user_id,
        ];
    }
}
