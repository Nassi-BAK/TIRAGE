import React, { useState, useMemo, useEffect } from 'react';

export default function Index({ chiox: initialChiox }) {
  const [selectedPeriode, setSelectedPeriode] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedOrdre, setSelectedOrdre] = useState('');
  const [selectedVacances, setSelectedVacances] = useState('');
  const [randomUser, setRandomUser] = useState(null);
  const [gagnantChiox, setGagnantChiox] = useState([]);
  const [chiox, setChiox] = useState(initialChiox || []);
  const [showConfetti, setShowConfetti] = useState(false);

  const periodes = [...new Set(chiox.map(item => item.periode?.nom).filter(Boolean))];
  const destinations = [...new Set(chiox.map(item => item.destination?.nom).filter(Boolean))];
  const ordres = [1, 2, 3];

  const filteredChiox = useMemo(() => {
    return chiox.filter(item => {
      const matchPeriode = selectedPeriode === '' || (item.periode && item.periode.nom === selectedPeriode);
      const matchDestination = selectedDestination === '' || (item.destination && item.destination.nom === selectedDestination);
      const matchOrdre = selectedOrdre === '' || item.ordre == selectedOrdre;
      const matchVacances = selectedVacances === '' || (item.user && item.user.vacances_l_annee_dernier === selectedVacances);
      return matchPeriode && matchDestination && matchOrdre && matchVacances;
    });
  }, [chiox, selectedPeriode, selectedDestination, selectedOrdre, selectedVacances]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  
  const handleTirage = () => {
    if (filteredChiox.length === 0) {
      alert("Aucun choix disponible pour le tirage avec les filtres actuels.");
      return;
    }

    // Animation de tirage
    setRandomUser(null);
    setGagnantChiox([]);
    
    // Simuler un délai pour l'effet de tirage
    setTimeout(() => {
      // Sélectionner un chiox aléatoire parmi les résultats filtrés
      const randomIndex = Math.floor(Math.random() * filteredChiox.length);
      const selectedChiox = filteredChiox[randomIndex];
      
      // Récupérer l'utilisateur associé à ce choix
      const user = selectedChiox.user;
      setRandomUser(user);
      
      // Récupérer tous les choix de cet utilisateur parmi les résultats filtrés
      const userChoices = filteredChiox.filter(item => 
        item.user && user && item.user.id === user.id
      );
      
      setGagnantChiox(userChoices);
      setShowConfetti(true);
    }, 1000);
  };

  const resetTirage = () => {
    setRandomUser(null);
    setGagnantChiox([]);
  };

  // Style des boutons de filtre
  const buttonStyle = "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  
  // Style des éléments sélectionnés
  const selectedItemStyle = "bg-indigo-100 border-indigo-300";

  return (

    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex">
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 10 + 5;
            const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            const left = `${Math.random() * 100}%`;
            const animationDuration = `${Math.random() * 3 + 2}s`;
            const delay = `${Math.random() * 0.5}s`;
            
            return (
              <div 
                key={i}
                className="absolute top-0 animate-fall"
                style={{
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  borderRadius: '50%',
                  animationDuration,
                  animationDelay: delay,
                }}
              />
            );
          })}
        </div>
      )}
      <button
      type="button"
      onClick={() => window.history.back()}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
    >
      Back
    </button>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-indigo-800 flex items-center">
          <span className="mr-2">🎯</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
            Tableau des Choix
          </span>
        </h1>
        
        <button
          onClick={handleTirage}
          className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 font-semibold flex items-center"
        >
          <span className="mr-2 text-xl">🎲</span>
          Lancer le tirage
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filtres</h2>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-sm text-gray-600 mb-1">Période</label>
            <select 
              value={selectedPeriode} 
              onChange={(e) => setSelectedPeriode(e.target.value)} 
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Toutes les périodes</option>
              {periodes.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-sm text-gray-600 mb-1">Destination</label>
            <select 
              value={selectedDestination} 
              onChange={(e) => setSelectedDestination(e.target.value)} 
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Toutes les destinations</option>
              {destinations.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-sm text-gray-600 mb-1">Ordre</label>
            <select 
              value={selectedOrdre} 
              onChange={(e) => setSelectedOrdre(e.target.value)} 
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tous les ordres</option>
              {ordres.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-sm text-gray-600 mb-1">Participation</label>
            <select 
              value={selectedVacances} 
              onChange={(e) => setSelectedVacances(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Toutes les participations</option>
              <option value="non">Non participé</option>
              <option value="oui">A déjà participé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau principal */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Ordre</th>
                <th className="py-3 px-4 text-left">Période</th>
                <th className="py-3 px-4 text-left">Destination</th>
                <th className="py-3 px-4 text-center">Participation 2024</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredChiox.length > 0 ? (
                filteredChiox.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.user?.nom_complet || item.user?.name || '—'}</td>
                    <td className="py-3 px-4 text-gray-600">{item.user?.email || '—'}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                        {item.ordre}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.periode?.nom || '—'}</td>
                    <td className="py-3 px-4">{item.destination?.nom || '—'}</td>
                    <td className="py-3 px-4 text-center">
                      {item.user?.vacances_l_annee_dernier === 'oui' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Oui</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Non</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center text-gray-500">Aucune donnée à afficher</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Résultat du tirage avec animation */}
      {randomUser && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-green-800 flex items-center">
              <span className="mr-2">🎉</span> Gagnant du tirage
            </h2>
            <button 
              onClick={resetTirage} 
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                {(randomUser.nom_complet || randomUser.name || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{randomUser.nom_complet || randomUser.name}</h3>
                <p className="text-gray-600">{randomUser.email}</p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-green-700 mb-3">Choix sélectionnés</h3>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full">
              <thead className="bg-green-100">
                <tr>
                  <th className="py-3 px-4 text-center text-green-800">Ordre</th>
                  <th className="py-3 px-4 text-left text-green-800">Période</th>
                  <th className="py-3 px-4 text-left text-green-800">Destination</th>
                  <th className="py-3 px-4 text-left text-green-800">Participation 2024</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gagnantChiox.length > 0 ? (
                  gagnantChiox.map((item, index) => (
                    <tr key={index} className="hover:bg-green-50 transition">
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                          item.ordre === 1 ? 'bg-yellow-100 text-yellow-800' : 
                          item.ordre === 2 ? 'bg-gray-100 text-gray-800' : 
                          'bg-amber-100 text-amber-800'
                        } font-medium text-lg`}>
                          {item.ordre}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{item.periode?.nom || '—'}</td>
                      <td className="py-3 px-4 font-medium">{item.destination?.nom || '—'}</td>
                      <td className="py-3 px-4 text-center">
                      {item.user?.vacances_l_annee_dernier === 'oui' ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Oui</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Non</span>
                      )}
                    </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 px-4 text-center text-gray-500">Aucun choix trouvé pour le gagnant</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total des choix</h3>
          <p className="text-3xl font-bold text-indigo-600">{chiox.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Choix filtrés</h3>
          <p className="text-3xl font-bold text-purple-600">{filteredChiox.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Utilisateurs</h3>
          <p className="text-3xl font-bold text-green-600">
            {new Set(chiox.map(item => item.user?.id).filter(Boolean)).size}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: ease-in;
          animation-iteration-count: 1;
          animation-fill-mode: both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}