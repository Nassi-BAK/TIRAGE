import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, destinations, laravelVersion, phpVersion }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState('light') // حالة للسمة

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        // تطبيق فئة 'dark' على عنصر body أو html لتنشيط الوضع المظلم
        if (theme === 'dark') {
          document.body.classList.add('dark')
        } else {
          document.body.classList.remove('dark')
        }
      }, [theme])
    
    return (
        <>
            <Head title="برنامج الاصطياف العائلي - صيف 2025" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* رأس الصفحة شفاف -> صلب عند التمرير */}
                <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md dark:bg-gray-800 dark:bg-opacity-90'
                        : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                                <img src="/images/logo.png" alt="شعار المؤسسة" className="w-10 h-10 object-cover rounded-full" />
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold ${scrolled ? 'text-blue-900 dark:text-white' : 'text-white'}`}>
                                    برنامج الاصطياف
                                </h1>
                                <p className={`text-sm ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>صيف 2025</p>
                            </div>
                        </div>

                        {/* زر القائمة للهاتف */}
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
          <option value="light">السمة الفاتحة</option>
          <option value="dark">السمة الداكنة</option>
        </select>
      </div>

                        {/* التنقل على الحاسوب */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#destinations" className={`px-3 py-2 text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                                الوجهات
                            </a>
                            <a href="#advantages" className={`px-3 py-2 text-sm font-medium ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                                المزايا
                            </a>
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    className="mr-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
                                    فضاء المنخرطين
                                </Link>
                            ) : (
                                <Link href={route('login')}
                                    className="mr-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
                                    تسجيل الدخول
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* قائمة منسدلة للهاتف */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
                            <a href="#destinations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200">
                                الوجهات
                            </a>
                            <a href="#advantages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200">
                                المزايا
                            </a>
                            {auth.user ? (
                                <Link href={route('dashboard')}
                                    className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 mt-1">
                                    فضاء المنخرطين
                                </Link>
                            ) : (
                                <Link href={route('login')}
                                    className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 mt-1">
                                    تسجيل الدخول
                                </Link>
                            )}
                        </div>
                    )}
                </header>

                {/* قسم الصفحة الرئيسية مع خلفية حديثة */}
                <section className="relative min-h-screen flex items-center overflow-hidden">
                    {/* صورة الخلفية مع تغطية */}
                    <div className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('/images/pic6.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.4)'
                        }}>
                    </div>

                    {/* المحتوى */}
                    <div className="relative z-20 max-w-5xl mx-auto px-4 py-20 text-center text-white">
                        <h1 className="text-5xl font-extrabold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                                برنامج الاصطياف العائلي
                            </span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                            تضع مؤسسة النهوض بالأعمال الاجتماعية رهن إشارتكم إقامات ومجمعات سياحية راقية لصيف 2025
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <a href="#destinations" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg">
                                مشاهدة الوجهات
                            </a>
                            <a href="#registration" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100">
                                التسجيل في القرعة
                            </a>
                        </div>
                    </div>
                </section>

                {/* قسم معلومات البرنامج */}
                <section className="py-16 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                <span className="border-b-4 border-blue-500 pb-2">برنامج الاصطياف العائلي - صيف 2025</span>
                            </h2>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                في إطار التزامها بتحسين جودة العروض الصيفية، <strong>تضع مؤسسة النهوض بالأعمال الاجتماعية لفائدة موظفي وأعوان القطاع الوزاري المكلف بالصيد البحري</strong> رهن إشارتكم لصيف 2025 مجموعة من الشقق في العديد من الإقامات والمجمعات السياحية الراقية، موزعة في مختلف مدن المملكة. وتأتي هذه العروض الجديدة لتضاف إلى مراكز العطل التي تديرها المؤسسة.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                يسرنا أن نعلن لجميع المنخرطات والمنخرطين عن <strong>إطلاق حملة التسجيل والحجز</strong> للاستفادة من <strong>برنامج الاصطياف العائلي لصيف 2025</strong> :
                            </p>
                            <ul className="list-disc pr-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>مراكز العطل "نرجس" في كابو نيجرو و"أيور" في سيدي إفني</strong> : متاحة من <strong>30 يونيو إلى 14 شتنبر 2025</strong>.</li>
                                <li><strong>وجهات صيفية أخرى</strong> في مختلف المدن : متاحة من <strong>14 يوليوز إلى 31 غشت 2025</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="destinations" className="py-16 bg-gray-100 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                <span className="border-b-4 border-blue-500 pb-2">وجهاتنا الصيفية</span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                اكتشف إقاماتنا ومجمعاتنا السياحية لعطلة صيفية 2025
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

                                            {/* معلومات الموقع */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 text-blue-600 ml-1"
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
                                                        {destination.ville}، {destination.region || 'الجهة'}
                                                    </span>
                                                </div>

                                                {destination.coordonnees && (
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 text-blue-600 ml-1"
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
                                                            الإحداثيات: {destination.coordonnees}
                                                        </span>
                                                    </div>
                                                )}

                                                {destination.distance && (
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 text-blue-600 ml-1"
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
                                                            المسافة: {destination.distance} كم
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-gray-700 dark:text-gray-400 mb-4 line-clamp-2">
                                                {destination.description || "وجهة استثنائية لعطلتك الصيفية."}
                                            </div>

                                            <Link
                                                href={route('destinations.show', destination.id)}
                                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
                                            >
                                                اكتشف
                                            </Link>

                                            {/* رابط إلى خرائط جوجل */}
                                            {destination.adresse && (
                                                <a
                                                    href={`https://maps.google.com/?q=${encodeURIComponent(destination.adresse)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg mt-2"
                                                >
                                                    <i className="fas fa-map-marked-alt me-1"></i> عرض على الخريطة
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">لم يتم العثور على أي وجهة.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* قسم التواريخ المهمة */}
                <section id="dates" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-semibold">
                التقويم
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                فترات فتح المراكز
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                { nom: 'Période 1', debut: '2025-06-30', fin: '2025-07-06' },
                { nom: 'Période 2', debut: '2025-07-07', fin: '2025-07-13' },
                { nom: 'Période 3', debut: '2025-07-14', fin: '2025-07-20' },
                { nom: 'Période 4', debut: '2025-07-21', fin: '2025-07-27' },
                { nom: 'Période 5', debut: '2025-07-28', fin: '2025-08-03' },
                { nom: 'Période 6', debut: '2025-08-04', fin: '2025-08-10' },
                { nom: 'Période 7', debut: '2025-08-11', fin: '2025-08-17' },
                { nom: 'Période 8', debut: '2025-08-18', fin: '2025-08-24' },
                { nom: 'Période 9', debut: '2025-08-25', fin: '2025-08-31' },
                { nom: 'Période 10', debut: '2025-09-01', fin: '2025-09-07' },
                { nom: 'Période 11', debut: '2025-09-08', fin: '2025-09-14' }
            ].map((periode, index) => (
                <div key={index} className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                        {periode.nom}
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        {periode.debut} - {periode.fin}
                    </p>
                </div>
            ))}
        </div>
    </div>
</section>

{/* Section des périodes d'estivage */}
{/* قسم تواريخ الإصطياف */}
<section id="periods" className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-semibold">
                التقويم
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
                جدول فترات الإصطياف لسنة 2025
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                اكتشف تواريخ فترات الإصطياف المختلفة لتنظيم عطلتك بشكل جيد
            </p>
        </div>

       
    </div>
</section>

                {/* قسم المزايا */}
<section id="advantages" className="py-16 bg-gray-100 dark:bg-gray-800">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-semibold">
        المزايا
      </span>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
        مزايا برنامج الاصطياف العائلي
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
          {/* أيقونة */}
          <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">إقامات ذات جودة</h3>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          مجمعات سياحية عالية الجودة لإقامة عائلية مريحة.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">أسعار تفضيلية</h3>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          أسعار مناسبة مخصصة لمنخرطي المؤسسة.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">وجهات متعددة</h3>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          وجهات متنوعة في مختلف مدن المملكة لتجارب مختلفة.
        </p>
      </div>
    </div>
  </div>
</section>

{/* قسم CTA */}
<section id="registration" className="relative py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-right">
  <div className="max-w-5xl mx-auto px-4 text-white">
    <h2 className="text-3xl font-bold mb-4">هل أنتم مستعدون للمشاركة في القرعة لصيف 2025؟</h2>
    <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
      سجلوا الآن للاستفادة من برنامج الاصطياف العائلي
    </p>
    <Link href={route('register')}
      className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 shadow-md">
      التسجيل في القرعة
    </Link>
  </div>
</section>

{/* التذييل */}
<footer className="bg-gray-900 text-white pt-12 pb-6 text-right">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-1 bg-blue-600 rounded-lg">
            <span className="text-lg font-bold text-white">FP</span>
          </div>
          <span className="text-lg font-bold">مؤسسة الأعمال الاجتماعية</span>
        </div>
        <p className="text-gray-400 text-sm">
          المنصة الرسمية لبرنامج الاصطياف العائلي - صيف 2025.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">روابط سريعة</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white">من نحن</a></li>
          <li><a href="#destinations" className="text-gray-400 hover:text-white">الوجهات</a></li>
          <li><a href="#advantages" className="text-gray-400 hover:text-white">المزايا</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">تواصل معنا</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white">اتصل بنا</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">الدعم</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">الإشعارات القانونية</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
      <div className="text-sm text-gray-500">
        © {new Date().getFullYear()} وزارة الصيد البحري
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