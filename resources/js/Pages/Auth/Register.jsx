// resources/js/Pages/Auth/Register.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Register() {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    nom_complet: '',
    numero_adhesion: '',
    cin: '',
    lieu_travail: '',
    numero_telephone: '',
    vacances_l_annee_dernier: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center py-12">
      <Head title={t('register_title')} />

      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Image section */}
        <div className="w-full md:w-1/2 bg-blue-800 relative h-64 md:h-auto">
          <img
            src="/images/pic6.png"
            alt={t('register_image_alt')}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-transparent flex flex-col justify-center p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('register_join_us')}
            </h1>
            <p className="text-blue-100">{t('register_image_desc')}</p>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-2">
            {t('register_heading')}
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <InputLabel
                  htmlFor="email"
                  value={t('email_label')}
                  className="text-blue-800 font-medium"
                />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  autoComplete="username"
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-1 text-sm" />
              </div>

              {/* Nom complet */}
              <div>
                <InputLabel
                  htmlFor="nom_complet"
                  value={t('full_name_label')}
                  className="text-blue-800 font-medium"
                />
                <TextInput
                  id="nom_complet"
                  name="nom_complet"
                  value={data.nom_complet}
                  className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  onChange={(e) => setData('nom_complet', e.target.value)}
                />
                <InputError message={errors.nom_complet} className="mt-1 text-sm" />
              </div>
            </div>

            <div className="border-t border-blue-100 my-6 pt-4">
              <h3 className="text-lg font-medium text-blue-800 mb-3">
                {t('additional_info')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Numéro d'adhésion */}
              <div>
                <InputLabel
                  htmlFor="numero_adhesion"
                  value={t('membership_number_label')}
                  className="text-blue-800 font-medium"
                />
                <TextInput
                  id="numero_adhesion"
                  name="numero_adhesion"
                  value={data.numero_adhesion}
                  className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  onChange={(e) => setData('numero_adhesion', e.target.value)}
                />
                <InputError
                  message={errors.numero_adhesion}
                  className="mt-1 text-sm"
                />
              </div>

              {/* CIN */}
              <div>
                <InputLabel
                  htmlFor="cin"
                  value={t('cin_label')}
                  className="text-blue-800 font-medium"
                />
                <TextInput
                  id="cin"
                  name="cin"
                  value={data.cin}
                  className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  onChange={(e) => setData('cin', e.target.value)}
                />
                <InputError message={errors.cin} className="mt-1 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lieu de travail */}
              <div>
                <InputLabel
                  htmlFor="lieu_travail"
                  value={t('work_place_label')}
                  className="text-blue-800 font-medium"
                />
                <TextInput
                  id="lieu_travail"
                  name="lieu_travail"
                  value={data.lieu_travail}
                  className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  onChange={(e) => setData('lieu_travail', e.target.value)}
                />
                <InputError message={errors.lieu_travail} className="mt-1 text-sm" />
              </div>

              {/* Numéro de téléphone */}
              <div>
                <InputLabel
                  htmlFor="numero_telephone"
                  value={t('phone_label')}
                  className="text-blue-800 font-medium"
                />
                <TextInput
                  id="numero_telephone"
                  name="numero_telephone"
                  value={data.numero_telephone}
                  className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  onChange={(e) => setData('numero_telephone', e.target.value)}
                />
                <InputError
                  message={errors.numero_telephone}
                  className="mt-1 text-sm"
                />
              </div>
            </div>

            {/* Vacances dernière année */}
            <div>
              <InputLabel
                htmlFor="vacances_l_annee_dernier"
                value={t('last_year_vacation_label')}
                className="text-blue-800 font-medium"
              />
              <select
                id="vacances_l_annee_dernier"
                name="vacances_l_annee_dernier"
                value={data.vacances_l_annee_dernier}
                className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                onChange={(e) => setData('vacances_l_annee_dernier', e.target.value)}
              >
                <option value="">{t('select_option')}</option>
                <option value="oui">{t('yes')}</option>
                <option value="non">{t('no')}</option>
              </select>
              <InputError
                message={errors.vacances_l_annee_dernier}
                className="mt-1 text-sm"
              />
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-blue-100">
              <Link
                href={route('login')}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {t('already_registered')}
              </Link>

              <PrimaryButton
                className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                disabled={processing}
              >
                {t('register_button')}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
