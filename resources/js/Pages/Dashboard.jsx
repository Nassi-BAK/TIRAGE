import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, totalUsers, formulaire_active = 0 }) {
    const [cinFilter, setCinFilter] = useState('');
    const [lieuFilter, setLieuFilter] = useState('');

    const lieuxUnique = [...new Set(totalUsers.map(user => user.lieu_travail))];

    const filteredUsers = totalUsers.filter(user => {
        const cinMatch = user.cin.toLowerCase().includes(cinFilter.toLowerCase());
        const lieuMatch = lieuFilter ? user.lieu_travail === lieuFilter : true;
        return cinMatch && lieuMatch;
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tableau de Bord" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-8 p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Tableau de Bord</h1>
                            <p className="mt-2 text-blue-100">Gérez vos destinations et participants</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button 
                                onClick={() => router.post(route('setting'))}
                                className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition duration-300 shadow-md ${
                                    formulaire_active === 1
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                            >
                                {formulaire_active === 1 ? (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Formulaire Actif
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Formulaire Inactif
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        title="Total Participants" 
                        value={totalUsers.length}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        color="blue"
                    />
                    <StatCard 
                        title="Lieux de Travail" 
                        value={lieuxUnique.length}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        color="purple"
                    />
                    <StatCard 
                        title="Vacances l'an dernier" 
                        value={totalUsers.filter(u => u.vacances_l_annee_dernier).length}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        color="green"
                    />
                    <StatCard 
                        title="Sans Vacances" 
                        value={totalUsers.filter(u => !u.vacances_l_annee_dernier).length}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        color="yellow"
                    />
                </div>

                {/* Quick Actions Cards */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard 
                        title="Nouvelle Destination" 
                        description="Créer un nouvel itinéraire"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                        color="blue"
                        href={route('destinations.create')}
                    />
                    <DashboardCard 
                        title="Toutes les Destinations" 
                        description="Gérer vos destinations"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
                        color="purple"
                        href={route('destinations.index')}
                    />
                    <DashboardCard 
                        title="Liste Participants" 
                        description="Gérer les inscriptions"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        color="green"
                        href={route('chiox.index')}
                    />
                    <DashboardCard 
                        title="Statistiques" 
                        description="Voir les analyses détaillées"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        color="yellow"
                        href={route('statistiques.index')}
                    />
                </div>

                {/* Participants Section */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <h2 className="text-lg font-semibold text-gray-900">Liste des Participants</h2>
                        <div className="flex flex-wrap gap-3">
                            <Link 
                                href={route('select')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-sm text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                                Participer au tirage
                            </Link>
                        </div>
                    </div>
                    
                    {/* Search and Filters */}
                    <div className="p-4 bg-gray-50">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative flex-grow max-w-xs">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher par CIN"
                                    value={cinFilter}
                                    onChange={(e) => setCinFilter(e.target.value)}
                                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex-grow max-w-xs">
                                <select
                                    value={lieuFilter}
                                    onChange={(e) => setLieuFilter(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Tous les lieux</option>
                                    {lieuxUnique.map((lieu, idx) => (
                                        <option key={idx} value={lieu}>{lieu}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CIN</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu de travail</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">numero d'adhesion</th>
                               
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 flex-shrink-0 mr-3 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium text-sm">{user.nom_complet.charAt(0)}</span>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{user.nom_complet}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{user.cin}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.numero_telephone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium bg-gray-100 text-gray-800 rounded-full">
                                                    {user.lieu_travail}
                                                </span>
                                            </td>
   
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.numero_adhesion}</td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            Aucun participant trouvé
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Placeholder - would need actual pagination data */}
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Affichage de <span className="font-medium">{filteredUsers.length}</span> participants
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// DashboardCard component - enhanced
function DashboardCard({ title, description, icon, color, href }) {
    const colorClasses = {
        blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200',
        purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200',
        green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200',
        yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-200',
    };

    return (
        <Link 
            href={href} 
            className={`${colorClasses[color]} p-5 rounded-xl transition-all duration-300 border shadow-sm hover:shadow-md transform hover:-translate-y-1`}
        >
            <div className="flex items-start">
                <div className="p-3 rounded-lg bg-white shadow-sm mr-4 flex items-center justify-center">{icon}</div>
                <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>
        </Link>
    );
}

// New StatCard component
function StatCard({ title, value, icon, color }) {
    const colorClasses = {
        blue: 'bg-blue-500 text-blue-100',
        purple: 'bg-purple-500 text-purple-100',
        green: 'bg-green-500 text-green-100',
        yellow: 'bg-yellow-500 text-yellow-100',
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="flex items-center">
                <div className={`${colorClasses[color]} p-4 flex items-center justify-center`}>
                    {icon}
                </div>
                <div className="p-4 flex-grow">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                </div>
            </div>
        </div>
    );
}