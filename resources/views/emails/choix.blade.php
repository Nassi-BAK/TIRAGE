<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmation de vos choix</title>
</head>
<body>
    <h2>Bonjour {{ $user->nom_complet }},</h2>

    <p>Nous avons bien reçu vos choix :</p>
    <ul>
        @foreach ($choix as $c)
            <li>
                Choix {{ $c['ordre'] }} : {{ $c['destination'] }} pendant la période {{ $c['periode'] }}
            </li>
        @endforeach
    </ul>

    <p>Merci de votre participation !</p>

    <p>Cordialement,<br>L’équipe</p>
</body>
</html>
