<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;
    protected $table = 'user_data';

    // Les attributs qui sont massivement assignables
    protected $fillable = [
        'numero',
        'cin',
        'type',
    ];

    // Si tu veux utiliser des timestamps (created_at et updated_at), garde cette ligne, sinon commente-la
    public $timestamps = true;
}
