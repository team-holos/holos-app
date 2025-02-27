import useSound from "use-sound";
import softPiano from "/sounds/soft-piano.mp3";

const SoundForm = () => {
  const [playSound, { stop }] = useSound(softPiano, { loop: true });

  return (
    // <div className="flex flex-col items-center text-xs">
      <div style={{ textAlign: "center" }}>
      <p className="mb-2 text-xs">Falls gewünscht, kannst Du Dir hier entspannte Piano Musik zu Deiner Meditation anmachen:</p>
      <button onClick={playSound} className="p-2 border mr-2 text-xs rounded cursor-pointer  text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]">Play Sound</button>
      <button onClick={() => stop()} className="p-2 border text-xs rounded cursor-pointer   text-white bg-[#7886C7] hover:bg-[#6875B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7886C7]">Stop Sound</button>
    </div>
  );
};

export default SoundForm;