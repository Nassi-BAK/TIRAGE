<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chiox extends Model
{
    protected $table = 'chiox';

    protected $fillable = [
        'user_id',
        'destination_id',
        'periode_id',
        'ordre', 
         // Si tu veux aussi autoriser 'ordre' à l'assignation de masse
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }
}

    
