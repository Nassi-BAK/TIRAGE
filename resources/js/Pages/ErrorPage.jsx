import React from 'react'
import { Link } from '@inertiajs/react'

export default function ErrorPage({ error }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-700 p-6">
      <h1 className="text-3xl font-bold mb-4">Erreur</h1>
      <p className="mb-6">{error || "Une erreur s'est produite."}</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  )
}
