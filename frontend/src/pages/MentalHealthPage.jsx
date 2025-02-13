import MentalHealthForm from "../components/MentalHealthForm";
import MyTimer from "../components/MyTimer";

function MentalHealthPage() {
  return (
    <div className="text-[#2D336B] p-4 my-4">
      <h1 className="text-2xl mb-4">Mentale Gesundheit</h1>
     <div>
        <h3 className="mb-2 font-semibold">Journaling</h3>
        <MentalHealthForm />
     </div>
        <h3 className="mt-2 font-semibold">Meditations-Bereich</h3>
      <MyTimer />
    </div>
  );
}

export default MentalHealthPage;
