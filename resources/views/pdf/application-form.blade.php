<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Formulaire de Candidature</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">

    <style>
        :root {
            --primary-color: #2980b9;
            --background-color: #f4f7f9;
            --card-bg: #ffffff;
            --text-color: #333333;
            --text-light: #666666;
        }
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            background-color: var(--background-color);
            font-family: 'Montserrat', sans-serif;
            color: var(--text-color);
            line-height: 1.6;
            padding: 20px;
        }
        .wrapper {
            max-width: 800px;
            margin: 40px auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-family: 'Amiri', serif;
            font-size: 2.5rem;
            color: var(--primary-color);
        }
        .card {
            background-color: var(--card-bg);
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        .info strong {
            display: block;
            margin-bottom: 8px;
            color: var(--primary-color);
            font-weight: 600;
        }
        .info span {
            display: block;
            font-size: 1.1rem;
        }
        .choix h2 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        .choix-item {
            background-color: #ecf0f1;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 12px;
        }
        .choix-item strong {
            display: block;
            font-size: 1.1rem;
            margin-bottom: 6px;
        }
        .choix-item .periode {
            display: block;
            font-size: 0.95rem;
            color: var(--text-light);
            font-style: italic;
        }
        @media (max-width: 600px) {
            .wrapper { padding: 10px; }
            .header h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <header class="header">
            <h1>Formulaire de Candidature</h1>
            <h2> Programme D'estivage Familial 2024</h2>
        </header>

        <section class="card info">
            <strong>Nom complet :</strong>
            <span>{{ $user->nom_complet }}</span>
        </section>

        <section class="card choix">
            <h2>Vos Choix</h2>
            @foreach ($destinations as $ordre => $destination)
                <div class="choix-item">
                    <strong>Choix {{ $ordre }} : {{ $destination->adresse ?? 'Adresse inconnue' }}</strong>
                    @if(isset($periodes[$ordre]))
                        <span class="periode">
                            Période : {{ $periodes[$ordre]->nom }}
                            (du {{ \Carbon\Carbon::parse($periodes[$ordre]->date_debut)->format('d/m/Y') }}
                            au {{ \Carbon\Carbon::parse($periodes[$ordre]->date_fin)->format('d/m/Y') }})
                        </span>
                    @else
                        <span class="periode">Période : Aucune période disponible</span>
                    @endif
                </div>
            @endforeach
        </section>
    </div>
</body>
</html>
