import React from "react";
import SleepTracker from "../components/SleepTracker";
import AlarmClock from "../components/AlarmClock";
import SoundPlayer from "../components/SoundPlayer";

const RelaxationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
            Entspannungsseite
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-indigo-50 rounded-xl shadow-md">
              <SleepTracker />
            </div>
            <div className="p-6 bg-purple-50 rounded-xl shadow-md">
              <AlarmClock />
            </div>
            <div className="col-span-2 p-6 bg-blue-50 rounded-xl shadow-md">
              <SoundPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaxationPage;