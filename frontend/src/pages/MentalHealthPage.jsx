import MentalHealthForm from "../components/MentalHealthForm";
import MyTimer from "../components/MyTimer";
import SoundForm from "../components/SoundForm";

function MentalHealthPage() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); //10 minutes timer
  // time.setSeconds(time.getSeconds() + 3); //3 seconds timer to try sound effect
  
  return (
    <div style={{ textAlign: "center" }} className="text-[#2D336B]">
      <h1 className="text-2xl font-bold mb-2">Mentale Gesundheit</h1>
     <div className="text-left mx-2">
        <h3 className="mb-2 font-semibold">Journaling</h3>
        <p className="text-xs">Hier hast Du die Möglichkeit Deine Gedanken festzuhalten oder ein Dankbarkeitstagebuch zu führen:</p>
        <MentalHealthForm />
     </div>
        <h3 className="mt-2 font-semibold text-2xl text-center">Meditations-Bereich</h3>
      <MyTimer expiryTimestamp={time} />
      <SoundForm />
    </div>
  );
}

export default MentalHealthPage;
