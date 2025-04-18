<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    protected $fillable = [
        'nom',
        'type',
        
    ];
   
    public function destinations()
{
    return $this->belongsToMany(Destination::class, 'destination_periode');
}
public function chiox()
{
    return $this->hasMany(Chiox::class);
}

}
