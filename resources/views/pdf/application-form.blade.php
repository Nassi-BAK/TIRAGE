<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Formulaire de Candidature</title>
    <style>
        @font-face {
            font-family: 'amiri';
            src: url('{{ storage_path("fonts/Amiri-Regular.ttf") }}') format('truetype');
        }

        .ar {
    direction: rtl;
    text-align: right;
}
        body {
            font-family: 'amiri', DejaVu Sans, sans-serif;
            direction: ltr;
            text-align: left;
            line-height: 1.6;
            padding: 40px;
            font-size: 14px;
            background-color: #f9f9f9;
        }

        h1 {
            text-align: center;
            margin-bottom: 40px;
            font-size: 24px;
            color: #2c3e50;
        }

        .info, .choix {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .info strong,
        .choix strong {
            color: #34495e;
        }

        .choix h3 {
            margin-bottom: 10px;
            color: #2980b9;
            font-size: 18px;
        }

        .choix p {
            margin: 8px 0;
            padding: 8px;
            background-color: #ecf0f1;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Formulaire de Candidature</h1>

    <div class="info">
        <strong>Nom complet :</strong> {{ $user->nom_complet }}
    </div>

    <div class="choix">
        <h3>Choix :</h3>
        @foreach ($destinations as $ordre => $destination)
            <p>
                <strong class="ar">Choix {{ $ordre }} :</strong>
                {{ $destination->adresse ?? 'Adresse inconnue' }}<br>

                @if(isset($periodes[$ordre]))
                    <strong>Période :</strong>
                    {{ $periodes[$ordre]->nom }}
                    (du {{ \Carbon\Carbon::parse($periodes[$ordre]->date_debut)->format('d/m/Y') }}
                    au {{ \Carbon\Carbon::parse($periodes[$ordre]->date_fin)->format('d/m/Y') }})
                @else
                    <strong>Période :</strong> Aucune période disponible
                @endif
            </p>
        @endforeach
    </div>
</body>
</html>
