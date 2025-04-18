import React, { useState } from 'react';

import { usePage } from '@inertiajs/inertia-react';

export default function SelectDestination() {
  const { destinations } = usePage().props;  // Récupère les données des destinations du contrôleur
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Fonction pour gérer la sélection d'une destination
  const handleSelect = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div>
      <h1>Choisissez une destination</h1>

      <div className="destinations-list">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => handleSelect(destination)}
          >
            <h2>{destination.nom}</h2>
            <img src={`/storage/${destination.image}`} alt={destination.nom} />
            <p>{destination.ville}</p>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="selected-destination">
          <h2>Périodes pour {selectedDestination.nom}</h2>
          <ul>
            {selectedDestination.periodes.map((periode) => (
              <li key={periode.id}>
                {periode.nom} - {periode.type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
