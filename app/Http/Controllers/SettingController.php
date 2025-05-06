<?php

namespace App\Http\Controllers;

// app/Http/Controllers/SettingController.php
namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        $setting = Setting::firstOrCreate([]);
        return Inertia::render('Admin/Settings', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request)
    {
        $setting = Setting::firstOrCreate([]);
        $setting->update([
            'formulaire_actif' => $request->boolean('formulaire_actif')
        ]);

        return redirect()->back()->with('success', 'Paramètres mis à jour avec succès');
    }
}
