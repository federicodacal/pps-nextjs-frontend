import { AudioDB } from "../../types/audio"
import {
    BsTrash2,
    BsTrash3,
    BsTrash3Fill
} from "react-icons/bs";

interface AudioItemProps {
    items: AudioDB[];
}

const PurchaseResume: React.FC<AudioItemProps> = ({ items }) => {

    const removeItem = (index: number) => {

    }

    return (
        <div className="h-full text-violet-200 flex flex-col items-center w-full mt-10 ">
            {items.map((audio, index) => (
                <div key={index} className="bg-purple-800">
                    <div key={index} className=" p-4 mb-2 shadow-md w-full max-w-4xl flex rounded-md  flex gap-20">
                        <div className="w-full">
                            <p>Nombre: {audio.audio_name}</p>
                            <p>Categoría: {audio.category}</p>
                        </div>
                        <div className="w-full">
                            <p>Genero: {audio.genre}</p>
                            <p>Valor: ${audio.item.price}</p>
                        </div>

                    </div>
                    <button
                        onClick={() => removeItem(index)}
                        className="flex place-items-center m-5 max-h-10 rounded bg-rose-400 hover:bg-rose-200 text-slate-800 px-5 py-5 "
                    >
                        <BsTrash3 />
                    </button>
                </div>

            ))}
        </div>

    );
};

export default PurchaseResume;