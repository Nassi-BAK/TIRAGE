<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserData; // باش نستعملوها فالتشييك
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validation
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'nom_complet' => 'required|string|max:255',
            'numero_adhesion' => 'required|string|max:100',
            'cin' => 'required|string|max:20', // زدنا cin
            'lieu_travail' => 'required|string|max:255',
            'numero_telephone' => 'required|string|max:20',
            'vacances_l_annee_dernier' => 'required|in:oui,non',
        ]);

        // Vérifier si numéro et cin existent dans user_data
        $userData = UserData::where('numero', $request->numero_adhesion)
        ->whereRaw("REPLACE(cin, 'CIN: ', '') = ?", [$request->cin])
        ->first();
    
    if (!$userData) {
        return back()->withErrors(['numero_adhesion' => 'Numéro d\'adhésion ou CIN incorrect.']);
    }
    

        // Création de l'utilisateur
        $user = User::create([
            'email' => $request->email,
            'nom_complet' => $request->nom_complet,
            'numero_adhesion' => $request->numero_adhesion,
            'cin' => $request->cin, // نضيفو cin
            'lieu_travail' => $request->lieu_travail,
            'numero_telephone' => $request->numero_telephone,
            'vacances_l_annee_dernier' => $request->vacances_l_annee_dernier,
            'role' => 'user', // ديرناه default user
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('select');
    }
}
