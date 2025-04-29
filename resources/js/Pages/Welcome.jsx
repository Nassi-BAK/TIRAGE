import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, destinations, laravelVersion, phpVersion }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState('light') // État pour le thème

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        // Applique la classe 'dark' à l'élément body ou html pour activer le mode sombre
        if (theme === 'dark') {
          document.body.classList.add('dark')
        } else {
          document.body.classList.remove('dark')
        }
      }, [theme])
    
    return (
        <>
            <Head title="Programme d'Estivage Familial - Été 2025" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header transparent -> solid on scroll */}
                <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md dark:bg-gray-800 dark:bg-opacity-90'
                        : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                                <img src="/images/logo.png" alt="Logo Fondation" className="w-10 h-10 object-cover rounded-full" />
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold ${scrolled ? 'text-blue-900 dark:text-white' : 'text-white'}`}>
                                    Programme d'Estivage
                                </h1>
                                <p className={`text-sm ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>Été 2025</p>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`focus:outline-none ${scrolled ? 'text-blue-900 dark:text-white' : 'text-white'}`}>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-end">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg"
        >
          <option value="light">Thème clair</option>
          <option value="dark">Thème sombre</option>
        </select>
      </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#destinations" className={`px-3 py-2 text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                                Destinations
                            </a>
                            <a href="#advantages" className={`px-3 py-2 text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                                Avantages
                            </a>
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
                                    Espace adhérent
                                </Link>
                            ) : (
                                <Link href={route('login')}
                                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu dropdown */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
                            <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200">
                                Destinations
                            </a>
                            <a href="#advantages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200">
                                Avantages
                            </a>
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 mt-1">
                                    Espace adhérent
                                </Link>
                            ) : (
                                <Link href={route('login')}
                                    className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 mt-1">
                                    Connexion
                                </Link>
                            )}
                        </div>
                    )}
                </header>

                {/* Hero Section with Modern Background */}
                <section className="relative min-h-screen flex items-center overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('/images/pic6.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.4)'
                        }}>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 max-w-5xl mx-auto px-4 py-20 text-center text-white">
                        <h1 className="text-5xl font-extrabold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                                Programme d'Estivage Familial
                            </span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            La Fondation pour la Promotion des Œuvres Sociales met à votre disposition des résidences et complexes touristiques de haut standing pour l'été 2025
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <a href="#destinations" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg">
                                Voir les destinations
                            </a>
                            <a href="#registration" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100">
                                S'inscrire au tirage
                            </a>
                        </div>
                    </div>
                </section>

                {/* Programme Info Section */}
                <section className="py-16 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                <span className="border-b-4 border-blue-500 pb-2">Programme d'Estivage Familial - Été 2025</span>
                            </h2>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                Dans le cadre de son engagement à améliorer la qualité des offres estivales, <strong>la Fondation pour la Promotion des Œuvres Sociales au profit des employés et agents du secteur ministériel en charge de la pêche maritime</strong> met à disposition pour l'été 2025 une sélection d'appartements dans plusieurs résidences et complexes touristiques de haut standing, répartis dans différentes villes du Royaume. Ces nouvelles offres viennent s'ajouter aux centres de vacances déjà gérés par la Fondation.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                Nous avons le plaisir d'annoncer à l'ensemble des adhérentes et adhérents le <strong>lancement de la campagne d'inscription et de réservation</strong> pour bénéficier du <strong>programme d'estivage familial de l'été 2025</strong> :
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>Centres de vacances "Nargiss" à Capo Negro et "Ayour" à Sidi Ifni</strong> : disponibles du <strong>30 juin au 14 septembre 2025</strong>.</li>
                                <li><strong>Autres destinations estivales</strong> dans diverses villes : disponibles du <strong>14 juillet au 31 août 2025</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="destinations" className="py-16 bg-gray-100 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                <span className="border-b-4 border-blue-500 pb-2">Nos Destinations Estivales</span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Découvrez nos résidences et complexes touristiques pour vos vacances d'été 2025
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {destinations ? (
                                destinations.map((destination) => (
                                    <div
                                        key={destination.id}
                                        className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            {destination.image ? (
                                               <img
                                               src={`/storage/${destination.image}`}
                                               alt={destination.nom}
                                               onError={(e) => { e.target.src = '/default.jpg' }}
                                               className="w-full h-full object-cover"
                                             />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                                                    <svg
                                                        className="w-16 h-16 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.5"
                                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {destination.nom}
                                            </h3>

                                            {/* Infos localisation */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 text-blue-600 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        ></path>
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        ></path>
                                                    </svg>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {destination.ville}, {destination.region || 'Région'}
                                                    </span>
                                                </div>

                                                {destination.coordonnees && (
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 text-blue-600 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            Coordonnées: {destination.coordonnees}
                                                        </span>
                                                    </div>
                                                )}

                                                {destination.distance && (
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 text-blue-600 mr-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                            ></path>
                                                        </svg>
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            Distance: {destination.distance} km
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-gray-700 dark:text-gray-400 mb-4 line-clamp-2">
                                                {destination.description || "Une destination exceptionnelle pour vos vacances d'été."}
                                            </div>

                                            <Link
                                                href={route('destinations.show', destination.id)}
                                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
                                            >
                                                Découvrir
                                            </Link>

                                            {/* Lien vers la carte Google Maps */}
                                            {destination.adresse && (
                                                <a
                                                    href={`https://maps.google.com/?q=${encodeURIComponent(destination.adresse)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg mt-2"
                                                >
                                                    <i className="fas fa-map-marked-alt me-1"></i> Voir sur la carte
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">Aucune destination trouvée.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Dates Importantes Section */}
                <section id="dates" className="py-16 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-semibold">
                                CALENDRIER
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                                Périodes d'ouverture des centres
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Centres de vacances "Nargiss" et "Ayour"</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300">
                                    Capo Negro et Sidi Ifni
                                </p>
                                <p className="text-center text-blue-600 dark:text-blue-300 font-bold mt-2">
                                    30 juin - 14 septembre 2025
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Autres destinations estivales</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300">
                                    Résidences et complexes touristiques dans tout le Royaume
                                </p>
                                <p className="text-center text-blue-600 dark:text-blue-300 font-bold mt-2">
                                    14 juillet - 31 août 2025
                                </p>
                                di
                            </div>
                        </div>
                    </div>
                </section>
{/* Section des périodes d'estivage */}
<section id="periods" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-semibold">
                CALENDRIER
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                Calendrier des périodes d'estivage 2025
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Consultez les dates des différentes périodes d'estivage pour planifier vos vacances
            </p>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Période
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Dates
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Centres
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 30 juin au 9 juillet 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Tous les centres (dont "Nargiss" et "Ayour")
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 2
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 10 au 19 juillet 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Tous les centres (dont "Nargiss" et "Ayour")
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 3
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 20 au 29 juillet 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Tous les centres d'estivage
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 4
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 30 juillet au 8 août 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Tous les centres d'estivage
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 5
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 9 au 18 août 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Tous les centres d'estivage
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 6
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 19 au 28 août 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Tous les centres d'estivage
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 7
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 29 août au 7 septembre 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Centres "Nargiss" et "Ayour" uniquement
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 8
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 8 au 14 septembre 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Centres "Nargiss" et "Ayour" uniquement
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 9
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 29 décembre 2025 au 4 janvier 2026
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Centres "Nargiss" et "Ayour" uniquement
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 10
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 5 au 11 janvier 2026
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Centres "Nargiss" et "Ayour" uniquement
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Période 11
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Du 28 décembre 2025 au 4 janvier 2026
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            Centres "Nargiss" et "Ayour" uniquement
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-gray-600">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Important</h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                        <p>Les réservations sont attribuées par tirage au sort. Les inscriptions pour le programme d'estivage 2025 seront ouvertes du 1er au 30 avril 2025.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
                {/* Advantages Section */}
                <section id="advantages" className="py-16 bg-gray-100 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-semibold">
                                AVANTAGES
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                                Les avantages du programme d'estivage familial
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Résidences de qualité</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                    Complexes touristiques de haut standing pour un séjour de qualité en famille.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Tarifs préférentiels</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                    Des prix avantageux réservés aux adhérents de la Fondation.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Destinations variées</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                    Des sites répartis dans différentes villes du Royaume pour varier vos expériences.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="registration" className="relative py-16 bg-gradient-to-r from-blue-900 to-blue-700">
                    <div className="max-w-5xl mx-auto px-4 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Prêt à participer au tirage au sort pour l'été 2025 ?</h2>
                        <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
                            Inscrivez-vous dès maintenant pour bénéficier du programme d'estivage familial
                        </p>
                        <Link href={route('register')}
                            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 shadow-md">
                            S'inscrire au tirage
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white pt-12 pb-6">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="p-1 bg-blue-600 rounded-lg">
                                        <span className="text-lg font-bold text-white">FP</span>
                                    </div>
                                    <span className="text-lg font-bold">Fondation des Œuvres Sociales</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Plateforme officielle pour le programme d'estivage familial - Été 2025.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Liens rapides</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-400 hover:text-white">À propos</a></li>
                                    <li><a href="#destinations" className="text-gray-400 hover:text-white">Destinations</a></li>
                                    <li><a href="#advantages" className="text-gray-400 hover:text-white">Avantages</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Contact</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-400 hover:text-white">Nous contacter</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Assistance</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Mentions légales</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                            <div className="text-sm text-gray-500">
                                © {new Date().getFullYear()} Ministère de la Pêche Maritime
                            </div>
                            <div className="text-sm text-gray-500 mt-2 md:mt-0">
                                Laravel v{laravelVersion} (PHP v{phpVersion})
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}