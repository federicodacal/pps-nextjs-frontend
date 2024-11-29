import { AudioDB } from "../../types/audio"

interface AudioItemProps {
    items: AudioDB[];
}

const PurchaseResume: React.FC<AudioItemProps> = ({ items }) => {

    const removeItem = (index:number) => {

    }

    return (
        <div className="min-h-screen bg-black text-violet-200 flex flex-col items-center w-full">
            {items.map((audio, index) => (
                <div key={index} className="bg-purple-800 p-6 mb-5  shadow-md w-full max-w-md">
                    <p>Nombre: {audio.audio_name}</p>
                    <p>Categoría: {audio.category}</p>
                    <p>Genero: {audio.genre}</p>
                    <p>Price: {audio.item.price}</p>

                    <button
                        onClick={() => removeItem(index)}
                        className="underline mt-3 max-h-12 bg-yellow-600 hover:bg-yellow-400 text-black py-2 px-6 "
                    >
                        Remover
                    </button>
                </div>
            ))}
        </div>

    );
};

export default PurchaseResume;