import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        nom_complet: '',
        numero_adhesion: '',
        cin: '',
        lieu_travail: '',
        numero_telephone: '',
        vacances_l_annee_dernier: '',
         // Added CIN field
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center py-12">
            <Head title="Register" />
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                {/* Image section */}
                <div className="w-full md:w-1/2 bg-blue-800 relative h-64 md:h-auto">
                    <img 
                        src="/images/pic6.png" 
                        alt="Marine theme" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-transparent flex flex-col justify-center p-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Rejoignez-nous</h1>
                        <p className="text-blue-100">Créez votre compte pour accéder à nos services exclusifs.</p>
                    </div>
                </div>
                
                {/* Form section */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-2">Inscription</h2>
                    
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="البريد الإلكتروني / Email" className="text-blue-800 font-medium" />
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
                                <InputLabel htmlFor="nom_complet" value="الاسم الكامل / Nom Complet" className="text-blue-800 font-medium" />
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
                            <h3 className="text-lg font-medium text-blue-800 mb-3">Informations complémentaires</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* CIN - New field */}
                           
                            
                            {/* Numéro d'Adhésion */}
                            <div>
                                <InputLabel htmlFor="numero_adhesion" value="رقم الانخراط / Numéro d'Adhésion" className="text-blue-800 font-medium" />
                                <TextInput
                                    id="numero_adhesion"
                                    name="numero_adhesion"
                                    value={data.numero_adhesion}
                                    className="mt-1 block w-full border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    onChange={(e) => setData('numero_adhesion', e.target.value)}
                                />
                                <InputError message={errors.numero_adhesion} className="mt-1 text-sm" />
                            </div>
                             <div>
                                <InputLabel htmlFor="cin" value="رقم البطاقة الوطنية / CIN" className="text-blue-800 font-medium" />
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
                            {/* Lieu de Travail */}
                            <div>
                                <InputLabel htmlFor="lieu_travail" value="مكان العمل / Lieu de Travail" className="text-blue-800 font-medium" />
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
                                <InputLabel htmlFor="numero_telephone" value="رقم الهاتف / Numéro de Téléphone" className="text-blue-800 font-medium" />
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
                            <InputLabel htmlFor="vacances_l_annee_dernier" value="هل استفدت من برنامج الاصطياف العائلي 2024؟/ Avez-vous bénéficié des vacances l'année dernière ?" className="text-blue-800 font-medium" />
                            <select
                                id="vacances_l_annee_dernier"
                                name="vacances_l_annee_dernier"
                                value={data.vacances_l_annee_dernier}
                                className="mt-1 block w-full border-blue-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                onChange={(e) => setData('vacances_l_annee_dernier', e.target.value)}
                            >
                                <option value="">إختار / Sélectionnez</option>
                                <option value="oui">نعم / Oui</option>
                                <option value="non">لا / Non</option>
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