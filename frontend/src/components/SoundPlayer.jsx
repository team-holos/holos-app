import React from "react";
import useSound from "use-sound";

const SoundPlayer = ({ onSoundSelected }) => {
    const [playDaytimeForrestBonfire, { stop: stopDaytimeForrestBonfire }] = useSound("./sounds/DaytimeForrestBonfire.mp3");
    const [playThunderwithBirdsandFlies, { stop: stopThunderwithBirdsandFlies }] = useSound("./sounds/ThunderwithBirdsandFlies.mp3");
    const [playWaterLappingWind, { stop: stopWaterLappingWind }] = useSound("./sounds/WaterLappingWind (1).mp3");
    const [playWaterRunningBy, { stop: stopWaterRunningBy }] = useSound("./sounds/WaterRunningBy.mp3");
    const [playWindQuietCreaks, { stop: stopWindQuietCreaks }] = useSound("./sounds/Wind Quiet Creaks.mp3");

    const handlePlaySound = (playSound, stopSound) => {
        console.log("Sound ausgewählt:", playSound, stopSound);
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-4">Alarmton auswählen</h2>
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