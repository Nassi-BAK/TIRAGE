import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, destinations, laravelVersion, phpVersion }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    

    return (
        <>
            <Head title="Tirage au Sort - Pêche Maritime" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header transparent -> solid on scroll */}
                <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md dark:bg-gray-800 dark:bg-opacity-90'
                        : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                                <img src="/images/logo.png" alt="Logo PM" className="w-10 h-10 object-cover rounded-full" />
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold ${scrolled ? 'text-blue-900 dark:text-white' : 'text-white'}`}>
                                    Tirage au Sort
                                </h1>
                                <p className={`text-sm ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>Pêche Maritime</p>
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

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#destinations" className={`px-3 py-2 text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                                Destinations
                            </a>
                            <a href="#employees" className={`px-3 py-2 text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                                Avantages
                            </a>
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
                                    Admin
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
                            <a href="#employees" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200">
                                Avantages
                            </a>
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 mt-1">
                                    Admin
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
                            backgroundImage: "url('/images/Peches.jpeg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.4)'
                        }}>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 max-w-5xl mx-auto px-4 py-20 text-center text-white">
                        <h1 className="text-5xl font-extrabold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                                Zones de Pêche Maritime
                            </span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            Découvrez nos destinations et participez au tirage au sort pour votre permis de pêche.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <a href="#destinations" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg">
                                Voir les destinations
                            </a>
                            <a href="#employees" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100">
                                Espace employés
                            </a>
                        </div>
                    </div>
                </section>

                <section id="destinations" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                <span className="border-b-4 border-blue-500 pb-2">Destinations de Pêche</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Explorez nos zones exclusives et trouvez votre spot idéal
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations ? (
                destinations.map((destination) => (
                    <div
                        key={destination.id}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                                {destination.description || "Une destination exceptionnelle pour les amateurs de pêche maritime."}
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

                {/* Employees Benefits Section */}
                <section id="employees" className="py-16 bg-gray-100 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-semibold">
                                BIEN-ÊTRE
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                                Engagés pour le bien-être de nos employés
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Santé et Sécurité</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                    Programmes de prévention et de soutien pour garantir un environnement de travail sain et sécurisé.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Équilibre vie pro/perso</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                    Horaires flexibles et soutien à la parentalité pour un meilleur équilibre au quotidien.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-1a3 3 0 013-3h1a3 3 0 013 3v1m-4-12a4 4 0 110 8 4 4 0 010-8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Développement Personnel</h3>
                                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                    Formations continues et accès à des parcours de montée en compétence.
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <Link href={route('login')}
                                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md">
                                Se connecter à l'espace collaborateurs
                            </Link>
                        </div>
                    </div>
                </section>


                {/* CTA Section */}
                <section className="relative py-16 bg-gradient-to-r from-blue-900 to-blue-700">
                    <div className="max-w-5xl mx-auto px-4 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Prêt à participer au prochain tirage?</h2>
                        <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
                            Inscrivez-vous maintenant pour obtenir votre permis de pêche
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
                                        <span className="text-lg font-bold text-white">PM</span>
                                    </div>
                                    <span className="text-lg font-bold">Pêche Maritime</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Plateforme officielle de tirage au sort pour la pêche maritime.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Liens rapides</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-400 hover:text-white">À propos</a></li>
                                    <li><a href="#destinations" className="text-gray-400 hover:text-white">Destinations</a></li>
                                    <li><a href="#employees" className="text-gray-400 hover:text-white">Espace employés</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Légal</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-400 hover:text-white">Mentions légales</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Confidentialité</a></li>
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