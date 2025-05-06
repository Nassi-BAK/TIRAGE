<?php

namespace App\Http\Controllers;

use App\Models\UserData;
use Illuminate\Http\Request;

class UserDataController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'numero' => 'required|string',
            'cin' => 'required|string',
            'type' => 'required|string',
        ]);

        // Création de l'enregistrement dans la base de données
        UserData::create($validatedData);

        // Redirection après la soumission du formulaire
        return redirect()->route('home')->with('success', 'Données utilisateur ajoutées.');
    }
}
