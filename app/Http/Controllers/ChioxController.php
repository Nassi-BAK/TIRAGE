<?php
namespace App\Http\Controllers;

    use Barryvdh\Snappy\Facades\SnappyPdf as PDF; 
use App\Mail\ChoixConfirmationMail;
use App\Models\Chiox;
use App\Models\Destination;
use App\Models\Periode;
use App\Models\Setting;
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
            'formulaireActif'=>Setting::first()->formulaire_actif,
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
                'ordre'       => $ordre,
                'destination' => $destination->nom,
                'periode'     => $periode->nom,
                'date_debut'  => $periode->date_debut,
                'date_fin'    => $periode->date_fin,
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
    
    public function downloadApplicationPdf(Request $request)
    {
        $user = auth()->user();
    
        // Récupération des choix de l'utilisateur
        $userChoices = Chiox::where('user_id', $user->id)
                            ->orderBy('ordre')
                            ->get();
    
        $destinations = [];
        $periodes     = [];
        foreach ($userChoices as $choice) {
            $destinations[$choice->ordre] = Destination::find($choice->destination_id);
            $periodes    [$choice->ordre] = Periode   ::find($choice->periode_id);
        }
    
        // Création du PDF avec Snappy
        $pdf = PDF::loadView('pdf.application-form', [
            'user'         => $user,
            'destinations' => $destinations,
            'periodes'     => $periodes,
        ]);
    
        // Options spécifiques wkhtmltopdf
        $pdf->setOption('enable-local-file-access', true);
        $pdf->setOption('encoding', 'utf-8');
        // Si besoin de définir la police par défaut :
      
        // Vous pouvez aussi préciser le binaire ici si vous n'utilisez pas l'env
        // $pdf->setBinary(env('WKHTMLTOPDF_BINARY'));
    
        return $pdf->download('استمارة_الترشيح.pdf');
    }
    
    

public function getDestinationStats()
{
    $stats = DB::table('chiox')
        ->join('destinations', 'chiox.destination_id', '=', 'destinations.id')
        ->select('destinations.nom as name', DB::raw('count(*) as value'))
        ->where('chiox.ordre', 1)
        ->groupBy('destinations.nom')
        ->get();

    return response()->json($stats);
}

public function showForm()
{
    $formulaireActif = Setting::first()->formulaire_actif ?? false;

    return Inertia::render('StepperForm', [
        'destinations' => Destination::all(),
        'periodes' => Periode::all(),
        'formulaireActif' => $formulaireActif,
    ]);
}

}
