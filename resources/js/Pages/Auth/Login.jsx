import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
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
            <Head title="Connexion - Pêche Maritime" />
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 bg-blue-800 relative h-64 md:h-auto">
                    <img 
                        src="/images/pic7.jpg" 
                        alt="Marine theme" 
                        className="w-full h-full object-cover opacity-80"
                    />
                  
                </div>
                
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-2">Connexion Administration</h2>
                    
                    {status && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                            {status}
                        </div>
                    )}
                    
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Adresse e-mail / البريد الإلكتروني" className="text-blue-800 font-medium" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-1 text-sm" />
                        </div>

                        <div>
                            <InputLabel htmlFor="numero_adhesion" value="Numéro d'adhésion / رقم الانخراط" className="text-blue-800 font-medium" />
                            <TextInput
                                id="numero_adhesion"
                                type="text"
                                name="numero_adhesion"
                                value={data.numero_adhesion}
                                className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                autoComplete="current-password"
                                onChange={(e) => setData('numero_adhesion', e.target.value)}
                            />
                            <InputError message={errors.numero_adhesion} className="mt-1 text-sm" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="text-blue-700 focus:ring-blue-500"
                                />
                                <span className="ms-2 text-sm text-gray-700">Se souvenir de moi / تذكرني</span>
                            </label>
                            
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Mot de passe oublié ? / هل نسيت كلمة المرور؟
                                </Link>
                            )}
                        </div>

                        <div className="pt-4 border-t border-blue-100">
                            <PrimaryButton 
                                className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-md flex justify-center"
                                disabled={processing}
                            >
                                Se connecter / تسجيل الدخول
                            </PrimaryButton>
                        </div>
                        
                        <div className="text-center mt-6">
                            <Link
                                href={route('register')}
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Pas encore de compte ? Inscrivez-vous / ليس لديك حساب؟ سجل الآن
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
