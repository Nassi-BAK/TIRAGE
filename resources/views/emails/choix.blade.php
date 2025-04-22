<h2>Bonjour {{ $user->name }},</h2>

<p>Merci d’avoir soumis vos choix. Voici votre sélection :</p>

<ul>
    @foreach ($choix as $c)
        <li>
            <strong>Choix {{ $c['ordre'] }} :</strong> 
            {{ $c['destination'] }} ({{ $c['periode'] }})
        </li>
    @endforeach
</ul>

<p>Bonne chance pour le tirage au sort !</p>
