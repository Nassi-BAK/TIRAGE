<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tirage au Sort - Pêche Maritime</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        body {
            font-family: 'Figtree', sans-serif;
            background-color: #f3f4f6;
        }
        .destination-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body>
    <!-- Header avec logo et bouton admin -->
    <header class="bg-blue-900 text-white shadow-md">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center">
                <!-- Logo de la pêche maritime -->
                <img src="{{ asset('images/logo-peche-maritime.png') }}" alt="Logo Pêche Maritime" class="h-16 mr-4">
                <h1 class="text-2xl font-bold">Tirage au Sort - Pêche Maritime</h1>
            </div>
            
            <!-- Bouton Admin -->
            <a href="{{ route('admin.dashboard') }}" class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300">
                Espace Administrateur
            </a>
        </div>
    </header>

    <!-- Section de description -->
    <section class="bg-white py-8 shadow-sm">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Tirage au Sort des Destinations de Pêche</h2>
            <div class="max-w-3xl mx-auto text-gray-600 leading-relaxed">
                <p class="mb-4">
                    Bienvenue sur la plateforme officielle de tirage au sort des destinations de pêche maritime. Ce système permet une attribution équitable des zones de pêche selon les réglementations en vigueur.
                </p>
                <p>
                    Découvrez ci-dessous les destinations disponibles pour la période actuelle. Les résultats des tirages seront communiqués aux participants inscrits selon le calendrier établi par l'administration.
                </p>
            </div>
        </div>
    </section>

    <!-- Section des destinations -->
    <section class="py-12 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-8">Destinations Disponibles</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($destinations as $destination)
                <div class="bg-white rounded-lg overflow-hidden shadow-md destination-card transition duration-300">
                    <!-- Image de la destination -->
                    @if($destination->image)
                        <img src="{{ asset('storage/' . $destination->image) }}" alt="{{ $destination->nom }}" class="w-full h-48 object-cover">
                    @else
                        <div class="w-full h-48 bg-blue-100 flex items-center justify-center">
                            <span class="text-blue-500">Image non disponible</span>
                        </div>
                    @endif
                    
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $destination->nom }}</h3>
                        <div class="text-sm text-gray-600 mb-4">
                            <p><strong>Ville:</strong> {{ $destination->ville }}</p>
                            <p><strong>Adresse:</strong> {{ $destination->adresse }}</p>
                        </div>
                        
                        @if($destination->description)
                            <p class="text-gray-700">{{ Str::limit($destination->description, 100) }}</p>
                        @endif
                        
                        <a href="{{ route('destinations.show', $destination->id) }}" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                            Voir détails
                        </a>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-900 text-white py-6">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; {{ date('Y') }} - Ministère de la Pêche Maritime. Tous droits réservés.</p>
            <p class="mt-2 text-sm text-blue-200">Plateforme de tirage au sort pour l'attribution des destinations de pêche.</p>
        </div>
    </footer>
</body>
</html>