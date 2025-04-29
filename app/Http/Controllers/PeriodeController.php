<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Periode;
use Inertia\Inertia;

class PeriodeController extends Controller
{
   
public function create()
{
    return Inertia::render('Admin/CreatePeriode');
}

public function store(Request $request)
{
    $request->validate([
        'nom' => 'required|string|max:255',
        'type' => 'required|in:FOS-HALEUTIS,externe',
    ]);
    Periode::create([
        'nom' => $request->nom,
        'type' => $request->type,
        'date_debut' => $request->date_debut,
        'date_fin' => $request->date_fin,
    ]);

    return redirect()->route('periodes.create')->with('success', 'Période ajoutée avec succès !');
}
public function index()
{
    $periodes = Periode::all();
    return Inertia::render('Admin/Periodes', [
        'periodes' => Periode::all()
    ]);
}

public function destroy($id)
{
    Periode::destroy($id);
    return redirect()->back()->with('message', 'Période supprimée avec succès');
}
}
