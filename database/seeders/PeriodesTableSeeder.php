<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeriodesTableSeeder extends Seeder
{
    public function run(): void
    {
        // 🔵 Périodes FOS-HALEUTIS (1 à 11)
        for ($i = 1; $i <= 11; $i++) {
            DB::table('periodes')->insert([
                'nom' => "Période $i",
                'type' => 'FOS-HALEUTIS',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 🔴 Périodes INTERNE (de la 3 à la 11)
        for ($i = 3; $i <= 9; $i++) {
            DB::table('periodes')->insert([
                'nom' => "Période $i",
                'type' => 'Externe',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
