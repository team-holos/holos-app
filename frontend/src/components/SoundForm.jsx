import useSound from "use-sound";
import softPiano from "/sounds/soft-piano.mp3";

const SoundForm = () => {
  const [playSound, { stop }] = useSound(softPiano, { loop: true });

  return (
    <div>
      <p>Falls gewünscht, kannst Du Dir hier entspannte Piano Musik zu Deiner Meditation anmachen:</p>
      <button onClick={playSound} className="border rounded p-2">Play Sound</button>
      <button onClick={() => stop()} className="border rounded p-2">Stop Sound</button>
    </div>
  );
};

export default SoundForm;