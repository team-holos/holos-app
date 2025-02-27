import React from "react";
import useSound from "use-sound";
const SoundPlayer = () => {
  const sounds = [
    { id: 1, name: "Daytime Forrest Bonfire", url: "/sounds/DaytimeForrestBonfire.mp3" },
    { id: 2, name: "Thunder with Birds and Flies", url: "/sounds/ThunderwithBirdsandFlies.mp3" },
    { id: 3, name: "Water Lapping Wind", url: "/sounds/WaterLappingWind (1).mp3" },
    { id: 4, name: "Water Running By", url: "/sounds/WaterRunningBy.mp3" },
    { id: 5, name: "Wind Quiet Creaks", url: "/sounds/Wind Quiet Creaks.mp3" },
  ];
  const [playDaytimeForrestBonfire, { stop: stopDaytimeForrestBonfire }] = useSound("/sounds/DaytimeForrestBonfire.mp3");
  const [playThunderwithBirdsandFlies, { stop: stopThunderwithBirdsandFlies }] = useSound("/sounds/ThunderwithBirdsandFlies.mp3");
  const [playWaterLappingWind, { stop: stopWaterLappingWind }] = useSound("/sounds/WaterLappingWind (1).mp3");
  const [playWaterRunningBy, { stop: stopWaterRunningBy }] = useSound("/sounds/WaterRunningBy.mp3");
  const [playWindQuietCreaks, { stop: stopWindQuietCreaks }] = useSound("/sounds/Wind Quiet Creaks.mp3");
  const handlePlaySound = (playSound, stopSound) => {
    stopSound();
    playSound();
  };
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-4">Beruhigende Klänge</h2>
      <div className="flex flex-wrap">
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded m-2"
          onClick={() => handlePlaySound(playDaytimeForrestBonfire, stopDaytimeForrestBonfire)}
        >
          Daytime Forrest Bonfire
        </button>
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded m-2"
          onClick={() => handlePlaySound(playThunderwithBirdsandFlies, stopThunderwithBirdsandFlies)}
        >
          Thunder with Birds and Flies
        </button>
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded m-2"
          onClick={() => handlePlaySound(playWaterLappingWind, stopWaterLappingWind)}
        >
          Water Lapping Wind
        </button>
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded m-2"
          onClick={() => handlePlaySound(playWaterRunningBy, stopWaterRunningBy)}
        >
          Water Running By
        </button>
        <button
          className="bg-[#7886C7] text-white py-2 px-4 rounded m-2"
          onClick={() => handlePlaySound(playWindQuietCreaks, stopWindQuietCreaks)}
        >
          Wind Quiet Creaks
        </button>
      </div>
    </div>
  );
};
export default SoundPlayer;