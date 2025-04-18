<?php

namespace App\Http\Controllers;

use App\Models\Chiox;
use App\Models\Destination;
use App\Models\Periode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChioxController extends Controller
{
    public function create()
{
    $user = Auth::user();

    if ($user->vacances_l_annee_dernier === 'oui') {
        // Redirection avec message ou simplement vers accueil
        return redirect('/error')->with('error', "Vous avez déjà eu des vacances l'année dernière.");
    }

    // Si c'est bon, on récupère les données nécessaires
    $destinations = Destination::all();
    $periodes = Periode::all();

    return Inertia::render('StepperForm', [
        'destinations' => $destinations,
        'periodes' => $periodes,
    ]);

}
public function getPeriodesByDestination($destinationId)
{
    // Vérifie si destinationId est valide
    if (!$destinationId) {
        return response()->json(['error' => 'Destination ID is invalid'], 400);
    }

    $destination = \App\Models\Destination::find($destinationId);

    if (!$destination) {
        return response()->json(['error' => 'Destination not found'], 404);
    }

    // Si la destination existe, on récupère les périodiques associées
    $periodes = \App\Models\Periode::where('type', $destination->type)->get(['id', 'nom']);

    return response()->json($periodes);
}

    public function store(Request $request)
    {
        $request->validate([
            'destinations' => 'required|array|size:3',
            'destinations.*.destination_id' => 'required|exists:destinations,id',
            'destinations.*.periode_id' => 'required|exists:periodes,id',
        ]);
    
        $user = auth()->user();
    
        foreach ($request->destinations as $index => $choice) {
            \App\Models\Chiox::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'ordre' => $index + 1
                ],
                [
                    'destination_id' => $choice['destination_id'],
                    'periode_id' => $choice['periode_id'],
                ]
            );
        }
    
        return redirect()->back()->with('success', 'Tes choix ont été enregistrés !');
    }
    public function index()
{
    $chiox = Chiox::with(['user', 'periode', 'destination'])
        ->orderBy('periode_id')
        ->orderBy('destination_id')
        ->orderBy('ordre')
        ->get();

    return inertia('Chiox/Index', [
        'chiox' => $chiox
    ]);
}
    
}
