<?php

namespace App\Http\Controllers;

use App\Mail\ChoixConfirmationMail;
use App\Models\Chiox;
use App\Models\Destination;
use App\Models\Periode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ChioxController extends Controller
{
    public function create()
{
    $user = Auth::user();

   

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
        $choixDetails = collect($request->destinations)->map(function ($item, $index) {
            return [
                'ordre' => $index + 1,
                'destination' => Destination::find($item['destination_id'])->nom ?? 'Inconnue',
                'periode' => Periode::find($item['periode_id'])->nom ?? 'Inconnue',
            ];
        });
        Mail::to($user->email)->send(new ChoixConfirmationMail($user, $choixDetails));
        return redirect()->back()->with('success', 'Tes choix ont été enregistrés !');
    }
    
    public function index() {
        $chiox = Chiox::with(['user', 'periode', 'destination'])
            ->orderBy('periode_id')
            ->orderBy('destination_id')
            ->orderBy('ordre')
            ->get();
    
        return inertia('Chiox/Index', [
            'chiox' => $chiox
        ]);
    }



public function tirage() {
    // On récupère tous les chiox avec les utilisateurs associés
    $chioxAvecUsers = Chiox::with('user')
        ->select('user_id')
        ->distinct()
        ->get();

    if ($chioxAvecUsers->isEmpty()) {
        return back()->with('error', 'Aucun utilisateur disponible pour le tirage.');
    }

    // Tirage d'un utilisateur aléatoire parmi ceux disponibles
    $randomChiox = $chioxAvecUsers->random();
    $user = $randomChiox->user;

    // On récupère tous les choix de l'utilisateur sélectionné
    $choixDuGagnant = Chiox::with(['periode', 'destination'])
        ->where('user_id', $user->id)
        ->get();

    // Récupérer tous les chiox pour le tableau principal
    $allChiox = Chiox::with(['user', 'periode', 'destination'])
        ->orderBy('periode_id')
        ->orderBy('destination_id')
        ->orderBy('ordre')
        ->get();

    // Retourner la page avec les informations
    return Inertia::render('Chiox/Index', [
        'chiox' => $allChiox,
        'user' => $user,
        'gagnantChiox' => $choixDuGagnant,
    ]);
}


}
