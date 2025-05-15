<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de vos choix</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f2;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f2f2f2;padding:20px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color:#0052cc;padding:20px;text-align:center;color:#ffffff;">
                            <h1 style="margin:0;font-size:24px;">Confirmation de vos choix</h1>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding:25px;color:#333333;">
                            <p style="font-size:16px;line-height:1.5;margin-top:0;">
                                <strong>Bonjour {{ $user->nom_complet }},</strong>
                            </p>
                            <p style="font-size:14px;line-height:1.6;margin:1em 0;">
                                Nous avons bien reçu vos choix pour votre participation :
                            </p>
                            <ul style="padding-left:20px;margin:0 0 1em 0;font-size:14px;line-height:1.6;color:#555555;">
                                @foreach ($choix as $c)
                                <li style="margin-bottom:0.5em;">
    Choix <strong>{{ $c['ordre'] }}</strong> : {{ $c['destination'] }}  
    <span style="color:#888888;">
        (période : {{ $c['periode'] }} – 
        du {{ \Carbon\Carbon::parse($c['date_debut'])->format('d/m/Y') }} 
        au {{ \Carbon\Carbon::parse($c['date_fin'])->format('d/m/Y') }})
    </span>
</li>

                                @endforeach
                            </ul>
                            <p style="font-size:14px;line-height:1.6;margin:1.5em 0;">
                                Merci de votre participation !  
                            </p>
                            <p style="font-size:14px;line-height:1.6;margin:0;">
                                Cordialement,<br>
                                <em>FOS-halieutis</em>
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#999999;">
                            &copy; {{ date('Y') }} Votre Organisation. Tous droits réservés.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
