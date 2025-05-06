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
        ['nom' => 'Période 1', 'debut' => '2025-06-30', 'fin' => '2025-07-06'],
        ['nom' => 'Période 2', 'debut' => '2025-07-07', 'fin' => '2025-07-13'],
        ['nom' => 'Période 3', 'debut' => '2025-07-14', 'fin' => '2025-07-20'],
        ['nom' => 'Période 4', 'debut' => '2025-07-21', 'fin' => '2025-07-27'],
        ['nom' => 'Période 5', 'debut' => '2025-07-28', 'fin' => '2025-08-03'],
        ['nom' => 'Période 6', 'debut' => '2025-08-04', 'fin' => '2025-08-10'],
        ['nom' => 'Période 7', 'debut' => '2025-08-11', 'fin' => '2025-08-17'],
        ['nom' => 'Période 8', 'debut' => '2025-08-18', 'fin' => '2025-08-24'],
        ['nom' => 'Période 9', 'debut' => '2025-08-25', 'fin' => '2025-08-31'],
        ['nom' => 'Période 10', 'debut' => '2025-09-01', 'fin' => '2025-09-07'],
        ['nom' => 'Période 11', 'debut' => '2025-09-08', 'fin' => '2025-09-14'],
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
