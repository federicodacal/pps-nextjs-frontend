'use client'

import { useRouter } from 'next/navigation';
import SubscriptionPlans from '../../components/subscription-plans/SubscriptionPlans';

export default function SelectPlanPage() {
  const router = useRouter();

  return (
    <main className="bg-gradient-to-b from-blue-500 to-blue-800 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Selección de Plan</h1>
        <SubscriptionPlans />
        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Regresar
          </button>
          <button
            onClick={() => router.push('/thank-you')}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Continuar
          </button>
        </div>
      </div>
    </main>
  );
}