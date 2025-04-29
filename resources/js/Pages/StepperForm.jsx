import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { router } from '@inertiajs/react'

export default function StepperForm({ destinations, periodes }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState([
    { destination_id: '', periode_id: '' },
    { destination_id: '', periode_id: '' },
    { destination_id: '', periode_id: '' }
  ])
  const [currentPeriodes, setCurrentPeriodes] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [theme, setTheme] = useState('light') // État pour le thème

  const stepColors = {
    1: {
      primary: 'bg-blue-600',
      secondary: 'bg-blue-100',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-700',
      border: 'border-blue-300'
    },
    2: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-100',
      hover: 'hover:bg-purple-700',
      text: 'text-purple-700',
      border: 'border-purple-300'
    },
    3: {
      primary: 'bg-green-600',
      secondary: 'bg-green-100',
      hover: 'hover:bg-green-700',
      text: 'text-green-700',
      border: 'border-green-300'
    }
  }

  useEffect(() => {
    // Applique la classe 'dark' à l'élément body ou html pour activer le mode sombre
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

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
    router.post('/store-chiox', { destinations: formData }, {
      onSuccess: () => {
        setSuccessMessage('Vos choix ont été envoyés avec succès 🎉');
        setTimeout(() => setSuccessMessage(''), 4000); // Le message disparaît après 4 secondes
      }
    })
  }

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Sélecteur de thème */}
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

      {/* Notification */}
      {successMessage && (
        <div className="max-w-xl mx-auto bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-md text-center">
          {successMessage}
        </div>
      )}

      {/* Header with logout button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Planifiez Votre Voyage</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>

      {/* Progress Steps Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center w-full max-w-xl mx-auto mb-2">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-2 transition-all ${
                  step >= num ? stepColors[num].primary : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                {num}
              </div>
              <span className={`text-sm font-medium ${step >= num ? stepColors[num].text : 'text-gray-500 dark:text-gray-400'}`}>
                {num === 1 ? 'Première' : num === 2 ? 'Deuxième' : 'Troisième'} destination
              </span>
            </div>
          ))}
        </div>
        <div className="relative w-full max-w-xl mx-auto h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-300 ${stepColors[step].primary}`} 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Stepper Form Section */}
      <section className={`p-6 rounded-lg shadow-md max-w-xl mx-auto ${stepColors[step].secondary} border ${stepColors[step].border}`}>
        <h2 className={`text-xl font-bold mb-4 ${stepColors[step].text}`}>
          Étape {step}: {step === 1 ? 'Première destination' : step === 2 ? 'Deuxième destination' : 'Troisième destination'}
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Destination:</label>
          <select
            value={formData[step - 1].destination_id}
            onChange={(e) => handleChange(step - 1, 'destination_id', e.target.value)}
            className={`border ${stepColors[step].border} p-3 w-full rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${stepColors[step].text} focus:border-transparent`}
          >
            <option value="">-- Choisir une destination --</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.nom}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Période:</label>
          <select
            value={formData[step - 1].periode_id}
            onChange={(e) => handleChange(step - 1, 'periode_id', e.target.value)}
            className={`border ${stepColors[step].border} p-3 w-full rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${stepColors[step].text} focus:border-transparent`}
            disabled={!formData[step - 1].destination_id}
          >
            <option value="">-- Choisir une période --</option>
            {currentPeriodes[step - 1]?.map(p => (
              <option key={p.id} value={p.id}>
                {p.nom} -- {p.date_debut} - {p.date_fin}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-6 justify-between">
          {step > 1 ? (
            <button 
              onClick={() => setStep(step - 1)} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Précédent
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)} 
              className={`${stepColors[step].primary} ${stepColors[step].hover} text-white px-5 py-2 rounded-lg transition flex items-center`}
              disabled={!formData[step - 1].destination_id || !formData[step - 1].periode_id}
            >
              Suivant
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              className={`${stepColors[step].primary} ${stepColors[step].hover} text-white px-5 py-2 rounded-lg transition flex items-center`}
              disabled={!formData[step - 1].destination_id || !formData[step - 1].periode_id}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Envoyer
            </button>
          )}
        </div>
        
<div class="alert alert-success">
    Tes choix ont été enregistrés ! Un email de confirmation a été envoyé.
</div>

<a href="/download-pdf" target="_blank" rel="noopener noreferrer">Télécharger le PDF</a>

      </section>

      {/* Destinations Grid */}
      <section className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Nos Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map(dest => (
            <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:bg-gray-700 dark:border-gray-700">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`/storage/${dest.image}`}
                  alt={dest.nom}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{dest.nom}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}