<?php 
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;
use App\Models\Destination;
use App\Models\Periode;
use Inertia\Inertia;

class DestinationController extends Controller
{
    // Afficher le formulaire de création
    public function create()
    {
        $periodes = Periode::all();

    return Inertia::render('CreateDestination', [
        'periodes' => $periodes,
        'flash' => session('flash'),
    ]);
        }

    // Enregistrer une destination

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'ville' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'description' => 'nullable|string',
            
            
        ]);
    
        // Gestion de l’image si elle existe
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/destinations', 'public');
        }
    
        // Création de la destination
        $destination = Destination::create([
            'nom' => $request->nom,
            'image' => $imagePath,
            'ville' => $request->ville,
            'adresse' => $request->adresse,
            'description' => $request->description,
            'type'=>$request->type
        ]);
    
        // Attacher les périodes si envoyées
        
    
        return redirect()->route('destinations.create')->with('success', 'Destination ajoutée avec succès.');
    }

    // Afficher les destinations
    public function showDestinations()
    {
        $destinations = Destination::all(); // Récupérer toutes les destinations
        return Inertia::render('Welcome', [
            'destinations' => $destinations, // Passer les destinations à la vue
            'laravelVersion' => app()->version(),
            'phpVersion' => phpversion(),
        ]);
    }
    public function index()
{
    $destinations = Destination::all();
    return Inertia::render('AllDestinations', [
        'destinations' => $destinations,
    ]);
}
public function select()
{
    // Récupérer toutes les destinations avec leurs périodes associées, filtrées par type
    $destinations = Destination::with(['periodes' => function ($query) {
        // Filtrer les périodes par type de destination
        $query->where('type', 'FOS-HALEUTIS'); // Exemple de filtrage par type
    }])->get();

    return Inertia::render('SelectDestination', [
        'destinations' => $destinations,
    ]);
}

public function destroy($id)
{
    $destination = Destination::findOrFail($id);

    // Supprimer l'image si elle existe
    if ($destination->image && Storage::exists($destination->image)) {
        Storage::delete($destination->image);
    }

    $destination->delete();

    return redirect()->route('destinations.index')->with('success', 'Destination supprimée avec succès');
}

public function index1()
{
    // Récupère le total des destinations
    $totalDestinations = Destination::count();

    return Inertia::render('Dashboard', [
        'totalDestinations' => $totalDestinations,
    ]);
}
}
