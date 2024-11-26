import { Audio } from "../../types/audio"

interface AudioItemProps {
    items: Audio[];
}

const PurchaseResume: React.FC<AudioItemProps> = ({ items }) => {

    return (
        <div className="min-h-screen bg-black text-violet-200 flex flex-col items-center w-full">
            {items.map((audio, index) => (
                <div key={index} className="bg-purple-800 p-6 m-5  shadow-md w-full max-w-md">
                    <p>Nombre: {audio.audio_name}</p>
                    <p>Categoría: {audio.category}</p>
                    <p>Genero: {audio.genre}</p>
                    <p>Price: {audio.price}</p>
                </div>
            ))}
        </div>

    );
};

export default PurchaseResume;