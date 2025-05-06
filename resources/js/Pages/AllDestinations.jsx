import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function AllDestinations({ destinations }) {
    const { auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);

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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Nos Destinations
                    </h1>
                    <p className="text-gray-600 max-w-lg">
                        Découvrez nos magnifiques destinations à travers le monde. Des expériences uniques vous attendent.
                    </p>
                </div>

                {auth.user && (
                    <Link
                        href={route('destinations.create')}
                        className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:from-blue-600 hover:to-purple-700 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Ajouter une destination
                    </Link>
                )}
            </div>

            {/* Search & Filter Section */}
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Rechercher des destinations</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher par nom..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                    <div className="md:w-1/3 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <select
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none shadow-sm"
                        >
                            <option value="">Toutes les villes</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {filteredDestinations.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-700 mt-4">Aucun résultat trouvé</h3>
                    <p className="text-gray-500 mt-2">Essayez d'ajuster vos critères de recherche</p>
                    <button 
                        onClick={() => { setSearchTerm(''); setFilterCity(''); }}
                        className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((destination) => (
                        <div
                            key={destination.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                            onMouseEnter={() => setHoveredCard(destination.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={`/storage/${destination.image}`}
                                    alt={destination.nom}
                                    className={`w-full h-full object-cover transition-transform duration-500 ${hoveredCard === destination.id ? 'scale-110' : 'scale-100'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="font-bold text-2xl text-white">{destination.nom}</h3>
                                    <div className="flex items-center mt-2 text-white/90">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p>{destination.ville}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <p className="text-gray-600 line-clamp-3 mb-4">{destination.description}</p>

                                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                    

                                    {auth.user && (
                                        <div className="flex gap-4">
                                            <Link
                                                href={route('destinations.edit', destination.id)}
                                                className="text-gray-500 hover:text-yellow-600 transition-colors"
                                                title="Modifier"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(destination.id, destination.nom)}
                                                className="text-gray-500 hover:text-red-600 transition-colors"
                                                title="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
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