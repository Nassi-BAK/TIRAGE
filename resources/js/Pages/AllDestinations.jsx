import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function AllDestinations({ destinations }) {
    const { auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('');
    
    // Liste des villes uniques pour le filtre
    const cities = [...new Set(destinations.map(dest => dest.ville))];
    
    const handleDelete = (id, name) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la destination "${name}" ?`)) {
            router.delete(route('destinations.destroy', id));
        }
    };
    
    // Filtrer les destinations
    const filteredDestinations = destinations.filter(destination => {
        return (
            destination.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterCity === '' || destination.ville === filterCity)
        );
    });

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Explorez Nos Destinations
                </h1>
                
                {auth.user && (
                    <Link
                        href={route('destinations.create')}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg"
                    >
                        <span className="font-bold">+</span>
                        Ajouter une destination
                    </Link>
                )}
            </div>
            
            <div className="mb-8 bg-white p-4 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Rechercher une destination..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="md:w-1/3">
                        <select
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                            <option value="">Toutes les villes</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            {filteredDestinations.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <p className="text-xl text-gray-600">Aucune destination ne correspond à votre recherche.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((destination) => (
                        <div 
                            key={destination.id}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={`/storage/${destination.image}`}
                                    alt={destination.nom}
                                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <h3 className="font-bold text-xl text-white">{destination.nom}</h3>
                                    <div className="flex items-center mt-1 text-white/90">
                                        <span className="mr-1">📍</span>
                                        <p>{destination.ville}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <p className="text-gray-600 line-clamp-2">{destination.description}</p>
                                
                                <div className="mt-4 flex justify-between items-center">
                                    <Link
                                        href={route('destinations.show', destination.id)}
                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                                    >
                                        <span>👁️</span>
                                        <span className="group-hover:underline">Découvrir</span>
                                    </Link>
                                    
                                    {auth.user && (
                                        <button
                                            onClick={() => handleDelete(destination.id, destination.nom)}
                                            className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors group"
                                        >
                                            <span>🗑️</span>
                                            <span className="group-hover:underline">Supprimer</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}