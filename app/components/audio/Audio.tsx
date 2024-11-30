import { Audio } from '../../types/audio';

interface AudioCardProps {
  audio: Audio;
}

const AudioCard = ({ audio }: AudioCardProps) => (
  <div className="w-full p-4 rounded-lg bg-violet-900 text-violet-200 border border-violet-700">
    <h2 className="text-lg font-semibold mb-2">{audio.audio_name}</h2>
    <p className="text-sm">Creador: {audio.creator_ID}</p>
    <p className="text-sm">BPM: {audio.BPM}</p>
    <p className="text-sm">Tonalidad: {audio.tone}</p>
    <p className="text-sm">Duración: {audio.length}</p>
    <p className="text-sm">Género: {audio.genre}</p>
    <p className="text-sm">Categoría: {audio.category}</p>
  </div>
);

export default AudioCard;