<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'nom_complet' => 'required|string|max:255',
            'numero_adhesion' => 'required|string|max:100',
            'lieu_travail' => 'required|string|max:255',
            'numero_telephone' => 'required|string|max:20',
            'vacances_l_annee_dernier' => 'required|in:oui,non',
        ]);
    
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nom_complet' => $request->nom_complet,
            'numero_identification' => $request->numero_identification,
            'numero_adhesion' => $request->numero_adhesion,
            'lieu_travail' => $request->lieu_travail,
            'numero_telephone' => $request->numero_telephone,
            'vacances_l_annee_dernier' => $request->vacances_l_annee_dernier,
        ]);
        
        event(new Registered($user));
    
        Auth::login($user);
        return redirect()->route('select');

    }
    
}
