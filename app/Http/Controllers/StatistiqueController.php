<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Destination;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StatistiqueController extends Controller
{
    public function index()
    {
        // Récupérer le nombre total d'utilisateurs
        $totalUsers = DB::table('users')->count();

        
        // Récupérer les statistiques des destinations choisies
        $stats = DB::table('chiox')
            ->join('destinations', 'chiox.destination_id', '=', 'destinations.id')
            ->select('destinations.nom', DB::raw('count(DISTINCT chiox.user_id) as total_users'))
            ->groupBy('chiox.destination_id', 'destinations.nom')
            ->get();

        // Envoyer les statistiques au frontend
        return Inertia::render('Statistiques', [
            'data' => $stats,
            'totalUsers' => $totalUsers,
        ]);
    }
}


