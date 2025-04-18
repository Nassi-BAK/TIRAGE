<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = [
        'nom',
        'image',
        'ville',
        'adresse',
        'description',
        'type'
    ];
    public function periodes()
{
    return $this->belongsToMany(Periode::class, 'destination_periode')
    ->where('type', $this->type);
}
public function users()
{
    return $this->belongsToMany(User::class);
}

    
}
