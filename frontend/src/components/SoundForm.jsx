import useSound from "use-sound";
import softPiano from "/sounds/soft-piano.mp3";

const SoundForm = () => {
  const [playSound] = useSound(softPiano);

  return (
    <div>
      <button onClick={playSound} className="border rounded p-2">Play Sound</button>
    </div>
  );
};

export default SoundForm;