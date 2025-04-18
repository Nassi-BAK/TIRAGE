import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const AddDestination = () => {
  const [form, setForm] = useState({
    nom: '',
    image: null,
    ville: '',
    adresse: '',
    description: ''
  });

  // Gérer l'upload du fichier image
  const handleFileUpload = (event) => {
    setForm({ ...form, image: event.target.files[0] });
  };

  // Gérer les changements dans les champs de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Soumettre le formulaire
  const submit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nom', form.nom);
    formData.append('image', form.image);
    formData.append('ville', form.ville);
    formData.append('adresse', form.adresse);
    formData.append('description', form.description);

    // Envoi des données avec Inertia
    Inertia.post('/destinations', formData);
  };

  return (
    <div>
      <h1>Ajouter une destination</h1>
      <form onSubmit={submit} encType="multipart/form-data">
        <div>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileUpload}
          />
        </div>

        <div>
          <label htmlFor="ville">Ville</label>
          <input
            type="text"
            id="ville"
            name="ville"
            value={form.ville}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddDestination;
