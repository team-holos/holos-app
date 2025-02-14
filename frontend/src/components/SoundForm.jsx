import useSound from "use-sound";
import piano from "../sounds/soft-piano.mp3";


const SoundForm = () => {
  const [playSound] = useSound({piano});

  return (
    <div>
      <button onClick={playSound}>Play Sound</button>
    </div>
  );
};

export default SoundForm;