import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { router } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function StepperForm({ destinations, periodes }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState([
    { destination_id: '', periode_id: '' },
    { destination_id: '', periode_id: '' },
    { destination_id: '', periode_id: '' }
  ])
  const [currentPeriodes, setCurrentPeriodes] = useState([])

  const fetchPeriodesByDestination = (destinationId, index) => {
    if (destinationId) {
      axios.get(`/get-periodes-by-destination/${destinationId}`)
        .then(response => {
          const updated = [...currentPeriodes]
          updated[index] = response.data
          setCurrentPeriodes(updated)
        })
        .catch(error => console.log(error))
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...formData]
    updated[index][field] = value
    setFormData(updated)

    if (field === 'destination_id') {
      fetchPeriodesByDestination(value, index)
    }
  }

  const handleSubmit = () => {
    router.post('/store-chiox', { destinations: formData })
  }
  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    
    <div className="p-6 space-y-10">
       <div className="flex justify-end mb-4">
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Déconnexion
        </button>
      </div>
      {/* Section 1 : Affichage des destinations avec image et description */}
      <section className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nos Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map(dest => (
            <div key={dest.id} className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition">
           <img
  src={`/storage/${dest.image}`}
  alt={dest.nom}
  className="w-full h-48 object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/images/default-destination.jpg'; // Provide a default image
    console.log(`Failed to load image for ${dest.nom}`);
  }}
/>
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-700">{dest.nom}</h3>
                <p className="text-sm text-gray-600 mt-2">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 : Formulaire Stepper */}
      <section className="bg-white p-6 rounded shadow max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Étape {step}</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Destination:</label>
          <select
            value={formData[step - 1].destination_id}
            onChange={(e) => handleChange(step - 1, 'destination_id', e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">-- Choisir --</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.nom}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Période:</label>
          <select
            value={formData[step - 1].periode_id}
            onChange={(e) => handleChange(step - 1, 'periode_id', e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">-- Choisir --</option>
            {currentPeriodes[step - 1]?.map(p => (
              <option key={p.id} value={p.id}>{p.nom}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-4 justify-between">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="bg-gray-200 px-4 py-2 rounded">
              Précédent
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Suivant
            </button>
          ) : (
            <button onClick={handleSubmit} href={route('logout')} className="bg-green-600 text-white px-4 py-2 rounded">
              Envoyer
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
