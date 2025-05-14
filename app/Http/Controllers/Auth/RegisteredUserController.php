<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserData; 
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        // 1) Validation des formats et unicité dans users
        $request->validate([
            'email'                    => 'required|string|email|max:255|unique:users,email',
            'nom_complet'              => 'required|string|max:255',
            'numero_adhesion'          => 'required|string|max:100|unique:users,numero_adhesion',
            'cin'                      => 'required|string|max:20|unique:users,cin',
            'lieu_travail'             => 'required|string|max:255',
            'numero_telephone'         => 'required|string|max:20',
            'vacances_l_annee_dernier' => 'required|in:oui,non',
        ], [
            // email
            'email.required' => 'L’adresse e-mail est obligatoire.',
            'email.email'    => 'Le format de l’adresse e-mail est invalide.',
            'email.unique'   => 'Cette adresse e-mail est déjà utilisée.',
        
            // nom_complet
            'nom_complet.required' => 'Le nom complet est requis.',
            'nom_complet.max'      => 'Le nom complet ne peut dépasser 255 caractères.',
        
            // numero_adhesion
            'numero_adhesion.required' => 'Le numéro d’adhésion est requis.',
            'numero_adhesion.unique'   => 'Ce numéro d’adhésion est déjà enregistré.',
            'numero_adhesion.max'      => 'Le numéro d’adhésion ne peut dépasser 100 caractères.',
        
            // cin
            'cin.required' => 'Le CIN est obligatoire.',
            'cin.unique'   => 'Ce CIN est déjà enregistré.',
            'cin.max'      => 'Le CIN ne peut dépasser 20 caractères.',
        
            // lieu_travail
            'lieu_travail.required' => 'Le lieu de travail est requis.',
            'lieu_travail.max'      => 'Le lieu de travail ne peut dépasser 255 caractères.',
        
            // numero_telephone
            'numero_telephone.required' => 'Le numéro de téléphone est requis.',
            'numero_telephone.max'      => 'Le numéro de téléphone ne peut dépasser 20 caractères.',
        
            // vacances_l_annee_dernier
            'vacances_l_annee_dernier.required' => 'Veuillez indiquer si vous étiez en vacances l’année dernière.',
            'vacances_l_annee_dernier.in'       => 'La valeur choisie doit être “oui” ou “non”.',
        ]);
        
    
      
    
       
    
        // 4) Création de l’utilisateur
        try {
            $user = User::create([
                'email'                   => $request->email,
                'nom_complet'             => $request->nom_complet,
                'numero_adhesion'         => $request->numero_adhesion,
                'cin'                     =>$request->cin,
                'lieu_travail'            => $request->lieu_travail,
                'numero_telephone'        => $request->numero_telephone,
                'vacances_l_annee_dernier'=> $request->vacances_l_annee_dernier,
                'password'                => Hash::make($request->password),
                'role'                    => 'user',
            ]);
    
            event(new Registered($user));
            Auth::login($user);
    
            return redirect()->route('select');
    
        } catch (QueryException $e) {
            // En cas de doublon inattendu
            if ($e->errorInfo[1] === 1062) {
                return back()
                    ->withInput()
                    ->withErrors(['cin' => 'Doublon détecté : ce CIN ou numéro d’adhésion existe déjà.']);
            }
            throw $e;
        }
    }
    
}
