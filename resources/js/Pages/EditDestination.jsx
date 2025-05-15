import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EditDestination({ destination, errors: initialErrors }) {
    const [form, setForm] = useState({
        nom: destination.nom || '',
        ville: destination.ville || '',
        adresse: destination.adresse || '',
        description: destination.description || '',
    });

    const [errors, setErrors] = useState(initialErrors || {});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!form.nom.trim()) newErrors.nom = 'Le nom est requis';
        if (!form.ville.trim()) newErrors.ville = 'La ville est requise';
        if (!form.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
        if (!form.description.trim()) newErrors.description = 'La description est requise';
        else if (form.description.length < 10) newErrors.description = 'La description doit faire au moins 10 caractères';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        router.put(route('destinations.update', destination.id), form, {
            onFinish: () => setIsSubmitting(false),
            onError: (err) => {
                setErrors(err);
                setIsSubmitting(false);
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Modifier la destination</h1>
            <button
      type="button"
      onClick={() => window.history.back()}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
    >
      Back
    </button>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nom de la destination"
                        disabled={isSubmitting}
                    />
                    {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">
                            Ville <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="ville"
                            name="ville"
                            value={form.ville}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.ville ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Ville"
                            disabled={isSubmitting}
                        />
                        {errors.ville && <p className="mt-1 text-sm text-red-600">{errors.ville}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            value={form.adresse}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.adresse ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Adresse complète"
                            disabled={isSubmitting}
                        />
                        {errors.adresse && <p className="mt-1 text-sm text-red-600">{errors.adresse}</p>}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Décrivez cette destination..."
                        disabled={isSubmitting}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.visit(route('destinations.index'))}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    );
}