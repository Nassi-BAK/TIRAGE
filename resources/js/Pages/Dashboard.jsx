import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Dashboard({ auth, destinations = [] }) {
    const [selectedDestination, setSelectedDestination] = useState(null);
    
    // Statistiques des destinations
    const totalDestinations = destinations.length;
    const citiesCount = new Set(destinations.map(d => d.ville)).size;
    const recentDestinations = [...destinations].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
    ).slice(0, 5);
    
    // Distribution par villes pour le graphique
    const cityDistribution = destinations.reduce((acc, dest) => {
        acc[dest.ville] = (acc[dest.ville] || 0) + 1;
        return acc;
    }, {});
    
    // Trier par nombre de destinations (pour le graphique)
    const sortedCities = Object.entries(cityDistribution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    // Fonction pour obtenir une couleur basée sur l'index
    const getBarColor = (index) => {
        const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500'];
        return colors[index % colors.length];
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tableau de Bord</h2>
                    <div className="flex gap-3">
                        <Link
                            href={route('destinations.create')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Ajouter une destination
                        </Link>
                        <Link
                            href={route('destinations.index')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Voir toutes les destinations
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                <Link
                    href={route('periodes.create')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center"
                >
                    ➕ Ajouter une période
                </Link>

                <Link
                    href={route('periodes.index')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center"
                >
                    📋 Voir la liste des périodes
                </Link>
            </div>
                </div>      
            }
        >
            <Head title="Tableau de Bord" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Cartes de statistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Destinations</p>
                                        <p className="text-3xl font-bold text-gray-900">{totalDestinations}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Villes Couvertes</p>
                                        <p className="text-3xl font-bold text-gray-900">{citiesCount}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Dernière mise à jour</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {destinations.length > 0 
                                                ? new Date(Math.max(...destinations.map(d => new Date(d.updated_at)))).toLocaleDateString('fr-FR') 
                                                : "Aucune"}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Graphique de distribution par ville */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg lg:col-span-2">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-900">Distribution par Ville</h3>
                            </div>
                            <div className="p-6">
                                {sortedCities.length > 0 ? (
                                    <div className="space-y-4">
                                        {sortedCities.map(([city, count], index) => (
                                            <div key={city} className="relative pt-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">{city}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-500">{count} destination{count > 1 ? 's' : ''}</div>
                                                </div>
                                                <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                                                    <div 
                                                        style={{ width: `${(count / Math.max(...Object.values(cityDistribution))) * 100}%` }} 
                                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getBarColor(index)}`}>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Aucune donnée disponible</p>
                                )}
                            </div>
                        </div>

                        {/* Dernières destinations ajoutées */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-900">Ajouts Récents</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentDestinations.length > 0 ? (
                                    recentDestinations.map((destination) => (
                                        <div 
                                            key={destination.id} 
                                            className="p-4 hover:bg-gray-50 cursor-pointer transition"
                                            onClick={() => setSelectedDestination(destination)}
                                        >
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                                                    {destination.image && (
                                                        <img 
                                                            src={`/storage/${destination.image}`} 
                                                            alt={destination.nom}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{destination.nom}</p>
                                                    <p className="text-sm text-gray-500">{destination.ville}</p>
                                                </div>
                                                <Link 
                                                    href={route('destinations.show', destination.id)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Aucune destination ajoutée</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions rapides */}
                    <div className="mt-8 bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-medium text-gray-900">Actions Rapides</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Link
                                    href={route('destinations.create')}
                                    className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">Nouvelle Destination</span>
                                </Link>
                                
                                <Link
                                    href={route('destinations.index')}
                                    className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">Toutes les Destinations</span>
                                </Link>
                                
                                <Link
                                    href="#" // Remplacer par la route appropriée
                                    className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">Générer Rapport</span>
                                </Link>
                                
                                <Link
                                    href="#" // Remplacer par la route appropriée
                                    className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">Paramètres</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour afficher les détails d'une destination sélectionnée */}
            {selectedDestination && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">{selectedDestination.nom}</h3>
                            <button 
                                onClick={() => setSelectedDestination(null)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            {selectedDestination.image && (
                                <img 
                                    src={`/storage/${selectedDestination.image}`} 
                                    alt={selectedDestination.nom}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            )}
                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-500">Ville</p>
                                <p className="text-gray-900">{selectedDestination.ville}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-500">Description</p>
                                <p className="text-gray-900">{selectedDestination.description}</p>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right rounded-b-lg">
                            <Link 
                                href={route('destinations.edit', selectedDestination.id)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition mr-2"
                            >
                                Modifier
                            </Link>
                            <Link 
                                href={route('destinations.show', selectedDestination.id)}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition"
                            >
                                Voir les détails
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}