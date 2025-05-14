// resources/js/Pages/Auth/Login.jsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    numero_adhesion: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('numero_adhesion');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center py-12">
      <Head title={t('login_title')} />

      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Image section */}
        <div className="w-full md:w-1/2 bg-blue-800 relative h-64 md:h-auto">
          <img
            src="/images/pic7.jpg"
            alt={t('login_image_alt')}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-2">
            {t('login_heading')}
          </h2>

          {status && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              {status}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
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
                isFocused
                onChange={(e) => setData('email', e.target.value)}
              />
              <InputError message={errors.email} className="mt-1 text-sm" />
            </div>

            {/* Numéro d’adhésion */}
            <div>
              <InputLabel
                htmlFor="numero_adhesion"
                value={t('adhesion_label')}
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="text-blue-700 focus:ring-blue-500"
                />
                <span className="ms-2 text-sm text-gray-700">
                  {t('remember_me')}
                </span>
              </label>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {t('forgot_password')}
                </Link>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-blue-100">
              <PrimaryButton
                className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-md flex justify-center"
                disabled={processing}
              >
                {t('login_button')}
              </PrimaryButton>
            </div>

            {/* Register link */}
            <div className="text-center mt-6">
              <Link
                href={route('register')}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {t('no_account_text')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
