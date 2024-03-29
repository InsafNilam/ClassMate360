<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StudentResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'age'=> $this->age,
            'created_at' =>(new Carbon($this->created_at))->format('Y-m-d'),    
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
            'status'=> $this->status,
            'image'=> $this->image ? Storage::url($this->image) : "",
            'created_by'=> new UserResource($this->createdBy),  
            'updated_by'=> new UserResource($this->updatedBy),  
        ];
    }
}
