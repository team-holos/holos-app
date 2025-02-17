import useSound from "use-sound";
import softPiano from "/sounds/soft-piano.mp3";

const SoundForm = () => {
  const [playSound, { stop }] = useSound(softPiano, { loop: true });

  return (
    // <div className="flex flex-col items-center text-xs">
      <div style={{ textAlign: "center" }}>
      <p className="mb-2 text-xs">Falls gewünscht, kannst Du Dir hier entspannte Piano Musik zu Deiner Meditation anmachen:</p>
      <button onClick={playSound} className="p-2 border mr-2 text-xs rounded cursor-pointer  bg-[#2D336B] text-[#FFF2F2]">Play Sound</button>
      <button onClick={() => stop()} className="p-2 border text-xs rounded cursor-pointer  bg-[#2D336B] text-[#FFF2F2]">Stop Sound</button>
    </div>
  );
};

export default SoundForm;