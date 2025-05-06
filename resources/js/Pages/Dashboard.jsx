import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, totalUsers, formulaire_active = 0 }) {
    console.log('État du formulaire:', formulaire_active);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tableau de Bord" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
                    <p className="mt-2 text-sm text-gray-600">Gérez vos destinations et participants</p>
                </div>

                {/* Quick Actions Cards */}
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
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Liste des Participants</h2>
                        <div className="flex space-x-3">
                            <Link 
                                href={route('select')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                Participer au tirage
                            </Link>
                            <button 
                                onClick={() => router.post(route('setting'))}
                                className={`inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                                    formulaire_active === 1
                                        ? 'bg-green-600 hover:bg-green-700 border-green-700'
                                        : 'bg-red-600 hover:bg-red-700 border-red-700'
                                }`}
                            >
                                {formulaire_active === 1 ? (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Formulaire Actif
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Formulaire Inactif
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CIN</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu de travail</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vacances l'année dernière</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {totalUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nom_complet}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.numero_telephone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lieu_travail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.vacances_l_annee_dernier ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {user.vacances_l_annee_dernier ? 'Oui' : 'Non'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// DashboardCard component
function DashboardCard({ title, description, icon, color, href }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
        purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
        green: 'bg-green-50 text-green-600 hover:bg-green-100',
        yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
    };

    return (
        <Link 
            href={href} 
            className={`${colorClasses[color]} p-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md`}
        >
            <div className="flex items-start">
                <div className="p-2 rounded-lg bg-white shadow-sm mr-4">{icon}</div>
                <div>
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>
        </Link>
    );
}
