import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Welcome({ auth, destinations, laravelVersion, phpVersion }) {
    const [selectedDestination, setSelectedDestination] = useState(null);

    const openModal = (dest) => setSelectedDestination(dest);
    const closeModal = () => setSelectedDestination(null);
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [theme, setTheme]           = useState('light');
  const periods = [
    { key: 'period_1', start: '2025-06-30', end: '2025-07-06' },
    { key: 'period_2', start: '2025-07-07', end: '2025-07-13' },
    { key: 'period_3', start: '2025-07-14', end: '2025-07-20' },
    { key: 'period_4', start: '2025-07-21', end: '2025-07-27' },
    { key: 'period_5', start: '2025-07-28', end: '2025-08-03' },
    { key: 'period_6', start: '2025-08-04', end: '2025-08-10' },
    { key: 'period_7', start: '2025-08-11', end: '2025-08-17' },
    { key: 'period_8', start: '2025-08-18', end: '2025-08-24' },
    { key: 'period_9', start: '2025-08-25', end: '2025-08-31' },
    { key: 'period_10', start: '2025-09-01', end: '2025-09-07' },
    { key: 'period_11', start: '2025-09-08', end: '2025-09-14' },
  ];

  const year = new Date().getFullYear();
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      title: t('adv_quality_title'),
      desc:  t('adv_quality_desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t('adv_price_title'),
      desc:  t('adv_price_desc'),
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: t('adv_variety_title'),
      desc:  t('adv_variety_desc'),
    },
  ];


  // Gestion du scroll pour le header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Thème dark / light
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Changement de langue
  const switchLanguage = (lng) => i18n.changeLanguage(lng);

    
    return (
        <>
            <Head title={`${t('program_title')} – ${t('summer_2025')}`} />

<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
  {/* ===== HEADER ===== */}
  <header className={`fixed w-full z-50 transition-all duration-500 ${
  scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95 py-3'
    : 'bg-gradient-to-r from-blue-900/80 to-indigo-800/80 backdrop-blur-sm py-5'
}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    {/* Logo & titre */}
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-xl ${scrolled ? 'bg-blue-600' : 'bg-blue-500'} shadow-lg transform transition-all duration-300 hover:scale-105`}>
        <img
          src="/images/logo.png"
          alt={t('logo_alt')}
          className="w-10 h-10 object-cover rounded-lg"
        />
      </div>
      <div className="transition-all duration-300">
        <h1 className={`text-xl font-bold tracking-tight ${
          scrolled ? 'text-blue-900 dark:text-white' : 'text-white'
        }`}>
          {t('program_short_title')}
        </h1>
        <p className={`text-sm font-medium ${
          scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-blue-200'
        }`}>{t('summer_2025')}</p>
      </div>
    </div>

    {/* Hamburger mobile avec animation */}
    <div className="md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`focus:outline-none transition-colors duration-300 ${
          scrolled ? 'text-blue-900 dark:text-white' : 'text-white'
        }`}
        aria-label="Menu principal"
      >
        <div className="relative w-6 h-6">
          <span className={`absolute h-0.5 w-6 transform transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
          } ${scrolled ? 'bg-blue-900 dark:bg-white' : 'bg-white'}`}></span>
          <span className={`absolute h-0.5 w-6 top-2.5 transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : 'opacity-100'
          } ${scrolled ? 'bg-blue-900 dark:bg-white' : 'bg-white'}`}></span>
          <span className={`absolute h-0.5 w-6 top-5 transform transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
          } ${scrolled ? 'bg-blue-900 dark:bg-white' : 'bg-white'}`}></span>
        </div>
      </button>
    </div>

    {/* Nav desktop avec badge notification */}
    <div className="hidden md:flex items-center">
      <nav className="flex items-center mr-6 space-x-1">
        <a
          href="#destinations"
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800' 
              : 'text-white hover:text-white hover:bg-white/10'
          }`}
        >
          {t('destinations')}
        </a>
        <a
          href="#advantages"
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800' 
              : 'text-white hover:text-white hover:bg-white/10'
          }`}
        >
          {t('advantages')}
        </a>
      </nav>
      
      {/* Sélecteurs langue + thème */}
      <div className="flex items-center space-x-3 mr-4">
        <select 
          value={i18n.language}
          onChange={e => switchLanguage(e.target.value)}
          className={`text-sm border-1 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 ${
            scrolled 
              ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white' 
              : 'bg-white/20 text-white backdrop-blur-sm'
          } py-1.5 px-2.5 appearance-none`}
          style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
        >
          {['fr','ar'].map(lng => (
            <option key={lng} value={lng} className='text-black  border-1 rounded-lg' >{lng.toUpperCase()}</option>
          ))}
        </select>
        
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-1.5 rounded-lg transition-colors ${
            scrolled 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          aria-label={theme === 'dark' ? t('theme_light') : t('theme_dark')}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bouton action principale */}
      {auth.user ? (
        <Link
          href={route('dashboard')}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          {t('members_area')}
        </Link>
      ) : (
        <Link
          href={route('login')}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          {t('login')}
        </Link>
      )}
    </div>
  </div>

  {/* Dropdown mobile amélioré */}
  <div className={`md:hidden overflow-hidden transition-all duration-300 ${
    isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
  }`}>
    <div className={`px-4 py-3 space-y-2 border-t ${
      scrolled ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700' : 'bg-blue-800/90 border-blue-700/50'
    }`}>
      <nav className="space-y-1">
        <a 
          href="#destinations" 
          className={`block px-3 py-2 rounded-lg font-medium ${
            scrolled 
              ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800' 
              : 'text-white hover:bg-white/10'
          }`}
        >
          {t('destinations')}
        </a>
        <a 
          href="#advantages" 
          className={`block px-3 py-2 rounded-lg font-medium ${
            scrolled 
              ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800' 
              : 'text-white hover:bg-white/10'
          }`}
        >
          {t('advantages')}
        </a>
      </nav>

      <div className="flex items-center justify-between pt-2">
        <select
          value={i18n.language}
          onChange={e => switchLanguage(e.target.value)}
          className={`text-sm border-0 rounded-lg focus:ring-2 focus:ring-blue-500 ${
            scrolled 
              ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white' 
              : 'bg-white/20 text-white'
          } py-1.5 px-2.5`}
        >
          {['fr','en','ar'].map(lng => (
            <option key={lng} value={lng}>{lng.toUpperCase()}</option>
          ))}
        </select>
        
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-1.5 rounded-lg ${
            scrolled 
              ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200' 
              : 'bg-white/20 text-white'
          }`}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {auth.user ? (
        <Link 
          href={route('dashboard')}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md mt-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          {t('members_area')}
        </Link>
      ) : (
        <Link 
          href={route('login')}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md mt-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          {t('login')}
        </Link>
      )}
    </div>
  </div>
</header>

  {/* ===== HERO ===== */}
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: "url('/images/pic6.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.4)',
      }}
    />
    <div className="relative z-20 max-w-5xl mx-auto px-4 py-20 text-center text-white">
      <h1 className="text-5xl font-extrabold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          {t('program_title')}
        </span>
      </h1>
      <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
        {t('program_description')}
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <a
          href="#destinations"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg"
        >
          {t('view_destinations')}
        </a>
        <a 
          href={route('register')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg"
          >
          
          {t('register_draw')}
        </a>
      </div>
    </div>
  </section>


               

    <section id="destinations" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="relative inline-block">
                {t('destinations_section_title')}
                <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-500 dark:bg-blue-600 -z-1 transform translate-y-1"></span>
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('destinations_section_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations && destinations.length > 0 ? (
              destinations.map(destination => (
                <div
                  key={destination.id}
                  className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    {destination.image ? (
                      <img
                        src={`/storage/${destination.image}`}
                        alt={destination.nom}
                        onError={e => { e.target.src = '/default.jpg'; }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {destination.nom}
                      </h3>

                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>
                          {destination.ville}, {destination.region || t('region_fallback')}
                        </span>
                      </div>

                      {destination.distance && (
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            {t('distance')}: {destination.distance} كم
                          </span>
                        </div>
                      )}

                      <p className="text-gray-700 dark:text-gray-400 mb-6 line-clamp-3">
                        {destination.description || t('default_destination_desc')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => openModal(destination)}
                        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t('discover')}
                      </button>

                      {destination.adresse && (
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(destination.adresse)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          {t('view_on_map')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  {t('no_destinations')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modale popup améliorée */}
      {selectedDestination && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl transform transition-all duration-300 scale-95 group-hover:scale-100"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('close')}
            >
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              {selectedDestination.image && (
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={`/storage/${selectedDestination.image}`}
                    alt={selectedDestination.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedDestination.nom}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('ville')}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{selectedDestination.ville}</p>
                    </div>
                  </div>

                  {selectedDestination.adresse && (
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('adresse')}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{selectedDestination.adresse}</p>
                      </div>
                    </div>
                  )}

                  {selectedDestination.distance && (
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('distance')}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{selectedDestination.distance} كم</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('description')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedDestination.description || t('default_destination_desc')}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    {t('close')}
                  </button>
                  {selectedDestination.adresse && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(selectedDestination.adresse)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-medium transition-all"
                    >
                      {t('view_on_map')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
                {/* قسم التواريخ المهمة */}
                <section id="dates" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-semibold">
            {t('dates_badge')}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            {t('dates_section_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {periods.map((period) => (
            <div
              key={period.key}
              className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                {t(period.key)}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {period.start} - {period.end}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


    <section id="advantages" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-semibold">
            {t('advantages_badge')}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            {t('advantages_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

{/* قسم CTA */}
<section
      id="registration"
      className="relative py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-right"
    >
      <div className="max-w-5xl mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold mb-4">
          {t('registration_cta_desc')}
        </h2>
       
        <Link
          href={route('register')}
          className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 shadow-md"
        >
          {t('registration_cta_button')}
        </Link>
      </div>
    </section>

{/* التذييل */}
<footer className="bg-gray-900 text-white pt-12 pb-6 text-right">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Bloc 1 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-1 bg-blue-600 rounded-lg">
                <span className="text-lg font-bold text-white">FP</span>
              </div>
              <span className="text-lg font-bold">{t('footer_brand_name')}</span>
            </div>
            <p className="text-gray-400 text-sm">{t('footer_tagline')}</p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t('footer_quick_links')}
            </h3>
         <ul>
              <li>
                <a href="https://foshalieutis.ma/" className="text-gray-400 hover:text-white">
                  {t('link_advantages')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t('footer_contact')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://foshalieutis.ma/nous-contacter/" className="text-gray-400 hover:text-white">
                  {t('contact_phone')}
                </a>
              </li>
             
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © {year} 
          </div>
          
        </div>
      </div>
    </footer>

            </div>
        </>
    );
}