<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeriodesTableSeeder extends Seeder
{
    public function run(): void
{
    // 🔵 Périodes FOS-HALEUTIS (1 à 11)
    $fosHaleutisPeriods = [
        ['nom' => 'Période 1', 'debut' => '2025-01-13', 'fin' => '2025-01-17'],
        ['nom' => 'Période 2', 'debut' => '2025-01-20', 'fin' => '2025-01-24'],
        ['nom' => 'Période 3', 'debut' => '2025-01-27', 'fin' => '2025-01-31'],
        ['nom' => 'Période 4', 'debut' => '2025-02-03', 'fin' => '2025-02-07'],
        ['nom' => 'Période 5', 'debut' => '2025-02-10', 'fin' => '2025-02-14'],
        ['nom' => 'Période 6', 'debut' => '2025-02-17', 'fin' => '2025-02-21'],
        ['nom' => 'Période 7', 'debut' => '2025-02-24', 'fin' => '2025-02-28'],
        ['nom' => 'Période 8', 'debut' => '2025-03-03', 'fin' => '2025-03-07'],
        ['nom' => 'Période 9', 'debut' => '2025-03-10', 'fin' => '2025-03-14'],
        ['nom' => 'Période 10', 'debut' => '2025-03-17', 'fin' => '2025-03-21'],
        ['nom' => 'Période 11', 'debut' => '2025-03-24', 'fin' => '2025-03-28'],
    ];

    foreach ($fosHaleutisPeriods as $periode) {
        DB::table('periodes')->insert([
            'nom' => $periode['nom'],
            'type' => 'FOS-HALEUTIS',
            'date_debut' => $periode['debut'],
            'date_fin' => $periode['fin'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    // 🔴 Périodes INTERNE (Externe) de la 3 à la 9
    for ($i = 3; $i <= 9; $i++) {
        $periode = $fosHaleutisPeriods[$i - 1]; // même date que FOS-HALEUTIS
        DB::table('periodes')->insert([
            'nom' => $periode['nom'],
            'type' => 'Externe',
            'date_debut' => $periode['debut'],
            'date_fin' => $periode['fin'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

}
