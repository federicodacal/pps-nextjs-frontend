import { Audio } from "../../types/audio"

interface AudioItemProps {
    items: Audio[];
}

const PurchaseResume: React.FC<AudioItemProps> = ({ items }) => {

    return (
        <>
            {items.map((audio) => (
                <div key={audio.ID}>
                    <p>Nombre: {audio.audio_name}</p>
                    <p>Price: {audio.price}</p>
                </div>
            ))}
        </>
    );
};

export default PurchaseResume;