import React, { useState, useMemo } from 'react';

export default function Index({ chiox }) {
  const [selectedPeriode, setSelectedPeriode] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedOrdre, setSelectedOrdre] = useState('');

  // Extraire toutes les périodes et destinations uniques
  const periodes = [...new Set(chiox.map(item => item.periode.nom))];
  const destinations = [...new Set(chiox.map(item => item.destination.nom))];
  const ordres = [1, 2, 3];

  // Appliquer le filtrage
  const filteredChiox = useMemo(() => {
    return chiox.filter(item => {
      return (
        (selectedPeriode === '' || item.periode.nom === selectedPeriode) &&
        (selectedDestination === '' || item.destination.nom === selectedDestination) &&
        (selectedOrdre === '' || item.ordre == selectedOrdre)
      );
    });
  }, [chiox, selectedPeriode, selectedDestination, selectedOrdre]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Tableau des Choix</h1>

      {/* Filtres */}
      <div className="flex gap-4 flex-wrap mb-6">
        <select
          value={selectedPeriode}
          onChange={(e) => setSelectedPeriode(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Toutes les périodes</option>
          {periodes.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Toutes les destinations</option>
          {destinations.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={selectedOrdre}
          onChange={(e) => setSelectedOrdre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tous les ordres</option>
          {ordres.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Ordre</th>
              <th className="p-2 border">Période</th>
              <th className="p-2 border">Destination</th>
            </tr>
          </thead>
          <tbody>
            {filteredChiox.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">Aucun résultat trouvé</td>
              </tr>
            ) : (
              filteredChiox.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.user.name}</td>
                  <td className="p-2 border">{item.user.email}</td>
                  <td className="p-2 border">{item.ordre}</td>
                  <td className="p-2 border">{item.periode.nom}</td>
                  <td className="p-2 border">{item.destination.nom}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
