<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Ajouter les nouvelles colonnes
            $table->string('nom_complet')->nullable();
            $table->string('numero_adhesion')->nullable();
            $table->string('lieu_travail')->nullable();
            $table->string('numero_telephone')->nullable();
            $table->enum('vacances_l_annee_dernier', ['oui', 'non'])->nullable();
            $table->string('role')->default('user');
            $table->string('cin')->nullable()->after('numero_adhesion')->unique();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Supprimer les colonnes ajoutées en cas de rollback
            $table->dropColumn([
                'nom_complet',
                'numero_adhesion',
                'lieu_travail',
                'numero_telephone',
                'vacances_l_annee_dernier',
                'role',
            ]);
        });
    }
}
