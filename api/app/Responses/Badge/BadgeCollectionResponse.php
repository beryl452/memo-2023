<?php
namespace App\Responses\Badge;

use App\Http\Resources\Badge\BadgeCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class BadgeCollectionResponse implements \Illuminate\Contracts\Support\Responsable
{
    public function __construct(
        private readonly LengthAwarePaginator|Collection $collection,
        private readonly int $status = 200,
    )
    {}

    public function toResponse($request)
    {
        return response(json_encode([
            'Badge' =>BadgeCollection::make($this->collection)->response()->getData(),
        ]), $this->status);
    }
}
