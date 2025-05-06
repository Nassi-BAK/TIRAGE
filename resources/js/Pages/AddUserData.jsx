import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const AddUserData = () => {
    const { data, setData, post, processing, errors } = useForm({
        numero: '',
        cin: '',
        type: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();  // Empêche la soumission par défaut
        post(route('user_data.store'), {
            data,
            onSuccess: () => {
                setData({ numero: '', cin: '', type: '' });  // Réinitialiser les champs après succès
            },
            onError: (errors) => {
                console.log(errors);  // Affiche les erreurs, si nécessaire
            }
        });
    };

    return (
        <div>
            <h1>Ajouter des données utilisateur</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="numero">Numéro</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={data.numero}
                        onChange={(e) => setData('numero', e.target.value)}
                    />
                    {errors.numero && <div>{errors.numero}</div>}
                </div>

                <div>
                    <label htmlFor="cin">CIN</label>
                    <input
                        type="text"
                        id="cin"
                        name="cin"
                        value={data.cin}
                        onChange={(e) => setData('cin', e.target.value)}
                    />
                    {errors.cin && <div>{errors.cin}</div>}
                </div>

                <div>
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                    />
                    {errors.type && <div>{errors.type}</div>}
                </div>

                <button type="submit" disabled={processing}>Soumettre</button>
            </form>
        </div>
    );
};

export default AddUserData;
