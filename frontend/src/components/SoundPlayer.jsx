import React from "react";
import useSound from "use-sound";

const SoundPlayer = () => {
  const sounds = [
    { id: 1, name: "Daytime Forrest Bonfire", url: "/audio/DaytimeForrestBonfire.mp3" },
    { id: 2, name: "Thunder with Birds and Flies", url: "/audio/ThunderwithBirdsandFlies.mp3" },
    { id: 3, name: "Water Lapping Wind", url: "/audio/WaterLappingWind (1).mp3" },
    { id: 4, name: "Water Running By", url: "/audio/WaterRunningBy.mp3" },
    { id: 5, name: "Wind Quiet Creaks", url: "/audio/Wind Quiet Creaks.mp3" },
  ];

  const [playSound, { stop }] = useSound(null);

  const handlePlaySound = (url) => {
    stop(); // Aktuellen Sound stoppen, falls vorhanden
    playSound(url);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Beruhigende Klänge</h2>
      <div className="flex flex-wrap">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            className="bg-[#7886C7] text-white py-2 px-4 rounded m-2"
            onClick={() => handlePlaySound(sound.url)}
          >
            {sound.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundPlayer;