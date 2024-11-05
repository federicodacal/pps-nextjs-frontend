import { useRouter } from 'next/navigation'

export default function SubscriptionPlans() {
  const router = useRouter()

  return (
    <div className="grid gap-4">
      {['Plan 1', 'Plan 2', 'Plan 3'].map((plan, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold">{plan}</h3>
          <button className="bg-blue-500 text-white mt-4 py-1 px-4 rounded-md hover:bg-blue-600">
            Seleccionar
          </button>
        </div>
      ))}
    </div>
  );
}