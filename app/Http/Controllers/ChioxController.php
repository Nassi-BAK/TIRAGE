<?php

namespace App\Http\Controllers;

use App\Mail\ChoixConfirmationMail;
use App\Models\Chiox;
use App\Models\Destination;
use App\Models\Periode;
use Barryvdh\DomPDF\Facade\PDF;
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
        $destinations = Destination::all();
        $periodes = Periode::all();

        return Inertia::render('StepperForm', [
            'destinations' => $destinations,
            'periodes' => $periodes,
        ]);
    }

    public function getPeriodesByDestination($destinationId)
    {
        if (!$destinationId) {
            return response()->json(['error' => 'Destination ID is invalid'], 400);
        }

        $destination = Destination::find($destinationId);

        if (!$destination) {
            return response()->json(['error' => 'Destination not found'], 404);
        }

        $periodes = Periode::where('type', $destination->type)->get(['id', 'nom' , 'date_debut' , 'date_fin']);

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
        $choixDetails = [];
    
        foreach ($request->destinations as $index => $choice) {
            $ordre = $index + 1;
            
            Chiox::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'ordre' => $ordre
                ],
                [
                    'destination_id' => $choice['destination_id'],
                    'periode_id' => $choice['periode_id'],
                ]
            );
            
            // Get full details for email
            $destination = Destination::find($choice['destination_id']);
            $periode = Periode::find($choice['periode_id']);
            
            $choixDetails[] = [
                'ordre' => $ordre,
                'destination' => $destination->nom,
                'periode' => $periode->nom,
            ];
        }
    
        // Send confirmation email (without PDF)
        Mail::to($user->email)->send(new ChoixConfirmationMail($user, $choixDetails));
    
        return redirect()->back()->with('success', 'Tes choix ont été enregistrés ! Un email de confirmation a été envoyé.');
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

    public function tirage()
    {
        $chioxAvecUsers = Chiox::with('user')
            ->select('user_id')
            ->distinct()
            ->get();

        if ($chioxAvecUsers->isEmpty()) {
            return back()->with('error', 'Aucun utilisateur disponible pour le tirage.');
        }

        $randomChiox = $chioxAvecUsers->random();
        $user = $randomChiox->user;

        $choixDuGagnant = Chiox::with(['periode', 'destination'])
            ->where('user_id', $user->id)
            ->get();

        $allChiox = Chiox::with(['user', 'periode', 'destination'])
            ->orderBy('periode_id')
            ->orderBy('destination_id')
            ->orderBy('ordre')
            ->get();

        return Inertia::render('Chiox/Index', [
            'chiox' => $allChiox,
            'user' => $user,
            'gagnantChiox' => $choixDuGagnant,
        ]);
    }
    public function downloadApplicationPdf()
{
    $user = auth()->user();
    
    // Get user's choices from database
    $userChoices = Chiox::where('user_id', $user->id)
                      ->orderBy('ordre')
                      ->get();
    
    $destinations = [];
    $periodes = [];
    
    foreach ($userChoices as $choice) {
        $destination = Destination::find($choice->destination_id);
        $periode = Periode::find($choice->periode_id);
        
        $destinations[$choice->ordre] = $destination->nom;
        $periodes[$choice->ordre] = $periode->nom;
    }
    
    // Generate PDF
    $pdf = app('dompdf.wrapper');
    $pdf->loadView('pdf.application-form', [
        'user' => $user,
        'destinations' => $destinations,
        'periodes' => $periodes
    ]);

    // Set appropriate headers for download
    return response($pdf->output())
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'inline; filename="application-form.pdf"')
        ->header('Cache-Control', 'public, must-revalidate, max-age=0')
        ->header('Pragma', 'public')
        ->header('Expires', '0');
}


}
