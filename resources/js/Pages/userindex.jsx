import { Head } from '@inertiajs/react';
import React from 'react';

const UsersIndex = ({ users }) => {
    return (
        <div className="container">

            <Head title="Liste des utilisateurs" />  {/* Titre de la page */}
            
            <h1>Liste des utilisateurs</h1>

            {/* Vérification si des utilisateurs existent */}
            {users.length === 0 ? (
                <p>Aucun utilisateur trouvé.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom Complet</th>
                            <th>Email</th>
                            <th>Numéro d'adhésion</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Affichage de la liste des utilisateurs */}
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom_complet}</td>
                                <td>{user.email}</td>
                                <td>{user.numero_adhesion}</td>
                                <td>
                                    <a href={`/users/${user.id}/edit`} className="btn btn-primary">Modifier</a>
                                    <form
                                        action={`/users/${user.id}`}
                                        method="POST"
                                        style={{ display: 'inline' }}
                                    >
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" className="btn btn-danger">Supprimer</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UsersIndex;
