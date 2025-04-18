import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nom_complet: '',
        numero_identification: '',
        numero_adhesion: '',
        lieu_travail: '',
        numero_telephone: '',
        vacances_l_annee_dernier: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center py-12">
            <Head title="Register" />
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                {/* Image section - left half on desktop, top half on mobile */}
                <div className="w-full md:w-1/2 bg-blue-800 relative h-64 md:h-auto">
                    <img 
                        src="/images/pic2.jpeg" 
                        alt="Marine theme" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-transparent flex flex-col justify-center p-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Rejoignez-nous</h1>
                        <p className="text-blue-100">Créez votre compte pour accéder à nos services exclusifs.</p>
                    </div>
                </div>
                
                {/* Form section - right half on desktop, bottom half on mobile */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-2">Inscription</h2>
                    
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-blue-800 font-medium" />
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
                            
                            {/* Nom Complet */}
                            <div>
                                <InputLabel htmlFor="nom_complet" value="Nom Complet" className="text-blue-800 font-medium" />
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <InputLabel htmlFor="password" value="Mot de passe" className="text-blue-800 font-medium" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-1 text-sm" />
                            </div>
                            
                            {/* Confirm Password */}
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" className="text-blue-800 font-medium" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-1 text-sm" />
                            </div>
                        </div>

                        <div className="border-t border-blue-100 my-6 pt-4">
                            <h3 className="text-lg font-medium text-blue-800 mb-3">Informations complémentaires</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           
                            
                            {/* Numéro d'Adhésion */}
                            <div>
                                <InputLabel htmlFor="numero_adhesion" value="Numéro d'Adhésion" className="text-blue-800 font-medium" />
                                <TextInput
                                    id="numero_adhesion"
                                    name="numero_adhesion"
                                    value={data.numero_adhesion}
                                    className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    onChange={(e) => setData('numero_adhesion', e.target.value)}
                                />
                                <InputError message={errors.numero_adhesion} className="mt-1 text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Lieu de Travail */}
                            <div>
                                <InputLabel htmlFor="lieu_travail" value="Lieu de Travail" className="text-blue-800 font-medium" />
                                <TextInput
                                    id="lieu_travail"
                                    name="lieu_travail"
                                    value={data.lieu_travail}
                                    className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    onChange={(e) => setData('lieu_travail', e.target.value)}
                                />
                                <InputError message={errors.lieu_travail} className="mt-1 text-sm" />
                            </div>
                            
                            {/* Numéro de Téléphone */}
                            <div>
                                <InputLabel htmlFor="numero_telephone" value="Numéro de Téléphone" className="text-blue-800 font-medium" />
                                <TextInput
                                    id="numero_telephone"
                                    name="numero_telephone"
                                    value={data.numero_telephone}
                                    className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    onChange={(e) => setData('numero_telephone', e.target.value)}
                                />
                                <InputError message={errors.numero_telephone} className="mt-1 text-sm" />
                            </div>
                        </div>

                        {/* Vacances */}
                        <div>
                            <InputLabel htmlFor="vacances_l_annee_dernier" value="Avez-vous bénéficié des vacances l'année dernière ?" className="text-blue-800 font-medium" />
                            <select
                                id="vacances_l_annee_dernier"
                                name="vacances_l_annee_dernier"
                                value={data.vacances_l_annee_dernier}
                                className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                onChange={(e) => setData('vacances_l_annee_dernier', e.target.value)}
                            >
                                <option value="">Sélectionnez</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                            <InputError message={errors.vacances_l_annee_dernier} className="mt-1 text-sm" />
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-blue-100">
                            <Link
                                href={route('login')}
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Déjà inscrit ?
                            </Link>

                            <PrimaryButton 
                                className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                                disabled={processing}
                            >
                                S'inscrire
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}