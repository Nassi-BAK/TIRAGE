import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

const CreateDestination = ({ flash }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    nom: '',
    image: null,
    ville: '',
    adresse: '',
    description: '',
    type: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('image', file);

    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('destinations.store'), {
      onSuccess: () => {
        reset();
        setPreviewUrl(null);
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Head title="Ajouter une destination" />
      <button
      type="button"
      onClick={() => window.history.back()}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
    >
      Back
    </button>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ajouter une destination</h1>
        <p className="text-gray-600">Créez une nouvelle destination dans votre catalogue</p>
      </div>

      {flash && flash.message && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p>{flash.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                Nom de la destination
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                value={data.nom}
                onChange={(e) => setData('nom', e.target.value)}
                required
              />
              {errors.nom && <div className="text-red-500 text-xs mt-1">{errors.nom}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ville">
                Ville
              </label>
              <input
                type="text"
                id="ville"
                name="ville"
                className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                value={data.ville}
                onChange={(e) => setData('ville', e.target.value)}
                required
              />
              {errors.ville && <div className="text-red-500 text-xs mt-1">{errors.ville}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adresse">
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                value={data.adresse}
                onChange={(e) => setData('adresse', e.target.value)}
                required
              />
              {errors.adresse && <div className="text-red-500 text-xs mt-1">{errors.adresse}</div>}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {!previewUrl ? (
                      <>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="text-xs text-gray-500">Glissez une image ou cliquez pour sélectionner</p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP (max 2Mo)</p>
                      </>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <img
                          src={previewUrl}
                          alt="Aperçu"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp"
                  />
                </label>
              </div>
              {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setData('image', null);
                  }}
                  className="text-sm text-red-500 mt-1"
                >
                  Supprimer l'image
                </button>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500 h-28"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
            </div>
          </div>
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
    Type
  </label>
  <select
    id="type"
    name="type"
    className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
    value={data.type}
    onChange={(e) => setData('type', e.target.value)}
    required
  >
    <option value="">-- Choisir le type --</option>
    <option value="FOS-HALEUTIS">FOS-HALEUTIS</option>
    <option value="externe">externe</option>
  </select>
  {errors.type && <div className="text-red-500 text-xs mt-1">{errors.type}</div>}
</div>


        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              setPreviewUrl(null);
            }}
            className="text-gray-600 hover:text-gray-800 font-medium mr-4 focus:outline-none"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded focus:outline-none transition duration-150 ease-in-out"
            disabled={processing}
          >
            {processing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ajout en cours...
              </span>
            ) : 'Ajouter la destination'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDestination;