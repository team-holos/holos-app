import MentalHealthForm from "../components/MentalHealthForm";
import MyTimer from "../components/MyTimer";
import SoundForm from "../components/SoundForm";

function MentalHealthPage() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); //10 minutes timer
  
  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Mentale Gesundheit</h1>
     <div>
        <h3 className="mb-2 font-semibold">Journaling</h3>
        <MentalHealthForm />
     </div>
        <h3 className="mt-2 font-semibold">Meditations-Bereich</h3>
      <MyTimer expiryTimestamp={time} />
      <SoundForm />
    </div>
  );
}

export default MentalHealthPage;
