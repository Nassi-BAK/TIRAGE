<!DOCTYPE html>
<html>
<head>
    <title>Formulaire PDF</title>
</head>
<body>
    <h1>Formulaire de candidature</h1>

    <p>Nom: {{ $user->name }}</p>
    
    <h3>Choix :</h3>
    @foreach ($destinations as $ordre => $destination)
        <p>Choix {{ $ordre }} : {{ $destination }} - {{ $periodes[$ordre] ?? 'Aucune période' }}</p>
    @endforeach
</body>
</html>
