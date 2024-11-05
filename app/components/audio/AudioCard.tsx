import { Audio } from '../../types/audio';

interface AudioCardProps {
    audio: Audio;
}

const AudioCard: React.FC<AudioCardProps> = ({ audio }) => {
    return (
        <div className="bg-gradient-to-br from-cardGradientStart to-cardGradientEnd rounded-lg p-4 text-white">
            <h2 className="text-lg font-semibold">{audio.name}</h2>
            <p>{audio.description}</p>
            <p><strong>Tonalidad:</strong> {audio.tone}</p>
            <p><strong>BPM:</strong> {audio.bpm}</p>
            <p><strong>Género:</strong> {audio.genre}</p>
            <p><strong>Categoría:</strong> {audio.category}</p>
        </div>
    );
};

export default AudioCard;