// resources/js/Components/StepperForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function StepperForm({ destinations, periodes, formulaireActif }) {
  const { t } = useTranslation();
  if (formulaireActif == 1) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 mx-auto mt-20 max-w-md">
         <button
      type="button"
      onClick={() => window.history.back()}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
    >
      {t('back')}
    </button>
        <div className="w-full p-6 bg-red-50 border-2 border-red-300 rounded-lg shadow-lg text-center dark:bg-gray-800 dark:border-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-red-700 mb-2 dark:text-red-400">
            {t('form_unavailable_title')}
          </h2>
          <p className="text-red-600 font-medium dark:text-red-300">
            {t('form_unavailable_message')}
          </p>
        </div>
      </div>
    );
  }

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState([
    { destination_id: '', periode_id: '' },
    { destination_id: '', periode_id: '' },
    { destination_id: '', periode_id: '' },
  ]);
  const [currentPeriodes, setCurrentPeriodes] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [theme, setTheme] = useState('light');

  const stepColors = {
    1: { primary: 'bg-blue-600', secondary: 'bg-blue-100', hover: 'hover:bg-blue-700', text: 'text-blue-700', border: 'border-blue-300' },
    2: { primary: 'bg-purple-600', secondary: 'bg-purple-100', hover: 'hover:bg-purple-700', text: 'text-purple-700', border: 'border-purple-300' },
    3: { primary: 'bg-green-600', secondary: 'bg-green-100', hover: 'hover:bg-green-700', text: 'text-green-700', border: 'border-green-300' },
  };

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const fetchPeriodesByDestination = (destinationId, index) => {
    if (!destinationId) return;
    axios.get(`/get-periodes-by-destination/${destinationId}`)
      .then(({ data }) => {
        const updated = [...currentPeriodes];
        updated[index] = data;
        setCurrentPeriodes(updated);
      })
      .catch(console.error);
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
    if (field === 'destination_id') {
      fetchPeriodesByDestination(value, index);
    }
  };

  const handleSubmit = () => {
    router.post('/store-chiox', { destinations: formData }, {
      onSuccess: () => {
        setSuccessMessage(t('success_message'));
        setTimeout(() => setSuccessMessage(''), 4000);
      },
    });
  };

  const handleLogout = () => router.post(route('logout'));

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Sélecteur de thème */}
      <div className="flex justify-end">
      <button
      type="button"
      onClick={() => window.history.back()}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
    >
      {t('back')}
    </button>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg"
        >
          <option value="light">{t('theme_light')}</option>
          <option value="dark">{t('theme_dark')}</option>
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('planner_title')}
        </h1>
        
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {t('logout_button')}
        </button>

      </div>

      {/* Progress Steps */}
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
              <span className={`text-sm font-medium ${
                step >= num ? stepColors[num].text : 'text-gray-500 dark:text-gray-400'
              }`}>
                {t(`step${num}_label`)}
              </span>
            </div>
          ))}
        </div>
        <div className="relative w-full max-w-xl mx-auto h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-300 ${stepColors[step].primary}`}
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Stepper Form Section */}
      <section className={`p-6 rounded-lg shadow-md max-w-xl mx-auto ${stepColors[step].secondary} border ${stepColors[step].border}`}>
        <h2 className={`text-xl font-bold mb-4 ${stepColors[step].text}`}>
          {t('step')} {step}: {t(`step${step}_label`)}
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">{t('destination_label')}</label>
          <select
            value={formData[step - 1].destination_id}
            onChange={(e) => handleChange(step - 1, 'destination_id', e.target.value)}
            className={`border ${stepColors[step].border} p-3 w-full rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${stepColors[step].text} focus:border-transparent`}
          >
            <option value="">{t('select_destination_placeholder')}</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.nom}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">{t('period_label')}</label>
          <select
            value={formData[step - 1].periode_id}
            onChange={(e) => handleChange(step - 1, 'periode_id', e.target.value)}
            className={`border ${stepColors[step].border} p-3 w-full rounded-lg focus:ring-2 focus:ring-opacity-50 focus:${stepColors[step].text} focus:border-transparent`}
            disabled={!formData[step - 1].destination_id}
          >
            <option value="">{t('select_period_placeholder')}</option>
            {currentPeriodes[step - 1]?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} — {p.date_debut} - {p.date_fin}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-6 justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition flex items-center"
            >
              {t('button_previous')}
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className={`${stepColors[step].primary} ${stepColors[step].hover} text-white px-5 py-2 rounded-lg transition`}
              disabled={!formData[step - 1].destination_id || !formData[step - 1].periode_id}
            >
              {t('button_next')}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`${stepColors[step].primary} ${stepColors[step].hover} text-white px-5 py-2 rounded-lg transition`}
              disabled={!formData[step - 1].destination_id || !formData[step - 1].periode_id}
            >
              {t('button_submit')}
            </button>
          )}
        </div>

        <a
          href="/download-pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block text-center text-blue-700 hover:underline"
        >
          {t('download_pdf_link')}
        </a>
      </section>

      {/* Destinations Grid */}
      <section className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {t('destinations_grid_title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:bg-gray-700 dark:border-gray-700">
              <img
                src={`/storage/${dest.image}`}
                alt={dest.nom}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{dest.nom}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
