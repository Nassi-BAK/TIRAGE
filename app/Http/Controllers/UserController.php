<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Récupérer les utilisateurs
        $users = User::all(); // Ou filtrer si nécessaire

        // Passer les utilisateurs à la vue Inertia
        return Inertia::render('Dashboard', [
            'users' => $users, 
             // Passe les utilisateurs au composant React
        ]);
    }
}
