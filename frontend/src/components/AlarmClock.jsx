import React, { useState, useEffect } from "react";
import useSound from "use-sound";

const AlarmClock = () => {
    const [alarmTime, setAlarmTime] = useState("");
    const [alarmActive, setAlarmActive] = useState(false);
    const [alarmInterval, setAlarmInterval] = useState(null);
    const [selectedSound, setSelectedSound] = useState(null);
    const [playAlarmSound, setPlayAlarmSound] = useState(null);
    const [stopAlarmSound, setStopAlarmSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [playDaytimeForrestBonfire, { stop: stopDaytimeForrestBonfire }] = useSound("./sounds/DaytimeForrestBonfire.mp3");
    const [playThunderwithBirdsandFlies, { stop: stopThunderwithBirdsandFlies }] = useSound("./sounds/ThunderwithBirdsandFlies.mp3");
    const [playWaterLappingWind, { stop: stopWaterLappingWind }] = useSound("./sounds/WaterLappingWind (1).mp3");
    const [playWaterRunningBy, { stop: stopWaterRunningBy }] = useSound("./sounds/WaterRunningBy.mp3");
    const [playWindQuietCreaks, { stop: stopWindQuietCreaks }] = useSound("./sounds/WindQuietCreaks.mp3");

    const sounds = [
        { id: 1, name: "Daytime Forrest Bonfire", play: playDaytimeForrestBonfire, stop: stopDaytimeForrestBonfire },
        { id: 2, name: "Thunder with Birds and Flies", play: playThunderwithBirdsandFlies, stop: stopThunderwithBirdsandFlies },
        { id: 3, name: "Water Lapping Wind", play: playWaterLappingWind, stop: stopWaterLappingWind },
        { id: 4, name: "Water Running By", play: playWaterRunningBy, stop: stopWaterRunningBy },
        { id: 5, name: "Wind Quiet Creaks", play: playWindQuietCreaks, stop: stopWindQuietCreaks },
    ];

    const handleAlarmTimeChange = (event) => {
        setAlarmTime(event.target.value);
    };

    const handleSetAlarm = () => {
        if (!alarmTime || !playAlarmSound) {
            alert("Bitte stelle eine Zeit und einen Sound ein.");
            return;
        }

        console.log("PlayAlarmSound in handleSetAlarm:", playAlarmSound);
        const now = new Date();
        const alarm = new Date(now.toDateString() + " " + alarmTime);

        if (alarm > now) {
            setAlarmActive(true);
            const timeUntilAlarm = alarm - now;

            setAlarmInterval(
                setTimeout(() => {
                    if (playAlarmSound) {
                        alert("Wecker!");
                        playAlarmSound();
                        setIsPlaying(true);
                    }
                    setAlarmActive(false);
                }, timeUntilAlarm)
            );
        } else {
            alert("Bitte stelle deinen Wecker.");
        }
    };

    const handleCancelAlarm = () => {
        if (alarmInterval) {
            clearTimeout(alarmInterval);
            setAlarmActive(false);
            if (stopAlarmSound) {
                stopAlarmSound();
                setIsPlaying(false);
            }
        }
    };

    const handleSoundSelected = (sound) => {
        setSelectedSound(sound);
        setPlayAlarmSound(() => sound.play);
        setStopAlarmSound(() => sound.stop);
        setIsPlaying(false);
    };

    const handlePlaySound = (sound) => {
        if (isPlaying) {
            stopAlarmSound();
        }
        sound.play();
        setIsPlaying(true);
    };

    const handleStopSound = () => {
        if (stopAlarmSound) {
            stopAlarmSound();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            if (alarmInterval) {
                clearTimeout(alarmInterval);
            }
            if (stopAlarmSound) {
                stopAlarmSound();
                setIsPlaying(false);
            }
        };
    }, [alarmInterval, stopAlarmSound]);

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold mb-4">Wecker</h2>
            <div className="flex flex-col">
                <input
                    type="time"
                    value={alarmTime}
                    onChange={handleAlarmTimeChange}
                    className="border rounded p-2 mb-2"
                />
                <div className="p-4 border rounded">
                    <h2 className="text-lg font-semibold mb-4">Alarmton auswählen</h2>
                    <div className="flex flex-wrap">
                        {sounds.map((sound) => (
                            <button
                                key={sound.id}
                                className="bg-[#7886C7] text-white py-2 px-4 rounded m-2 hover:bg-[#5A69A7] transition duration-300"
                                onClick={() => handleSoundSelected(sound)}
                            >
                                {sound.name}
                            </button>
                        ))}
                    </div>
                </div>
                {isPlaying && (
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded mt-2"
                        onClick={handleStopSound}
                    >
                        Stop
                    </button>
                )}
                {alarmActive ? (
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded mt-2"
                        onClick={handleCancelAlarm}
                    >
                        Alarm abbrechen
                    </button>
                ) : (
                    <button
                        className="bg-[#7886C7] text-white py-2 px-4 rounded mt-2"
                        onClick={handleSetAlarm}
                    >
                        Alarm stellen
                    </button>
                )}
            </div>
        </div>
    );
};

export default AlarmClock;