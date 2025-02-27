import React from 'react';
import SleepTracker from '../components/SleepTracker';
import AlarmClock from '../components/AlarmClock';
import SoundPlayer from '../components/SoundPlayer';

const RelaxationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Entspannungsseite</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SleepTracker />
        <AlarmClock />
        <SoundPlayer />
      </div>
    </div>
  );
};

export default RelaxationPage;