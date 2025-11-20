import { useState } from "react";
import Header from "./components/Header";
import CVfiled from "./components/CVfiled";
import NavigationButtons from "./components/NavigationButtons";
import CardRender from "./components/CardRender";
import type { EducationData, SkillData, ExperiencenData, GeneralData } from "./components/CardRender";

function App() {
  const [activeCard, setActiveCard] = useState("General");

  // State pro všechny data - přesunutý z CardRender
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [experienceData, setExperienceData] = useState<ExperiencenData[]>([]);
  const [skillData, setSkillData] = useState<SkillData[]>([]);
  const [generalData, setGeneralData] = useState<GeneralData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    photo: "",
  });

  function handleEducationChange(updated: EducationData[]) {
    setEducationData(updated);
  }

  function handleExperienceChange(updated: ExperiencenData[]) {
    setExperienceData(updated);
  }

  function handleSkillChange(updated: SkillData[]) {
    setSkillData(updated);
  }

  function handleGeneralChange(updated: GeneralData) {
    setGeneralData(updated);
  }

  return (
    <>
      <Header />
      <div className="flex flex-row justify-center gap-10 mt-10">
        <div className="flex flex-col w-[48%] gap-3 ">
          <div className="flex justify-center">
            <NavigationButtons activeButton={activeCard} onButtonChange={setActiveCard} />
          </div>
          <CardRender
            activeCard={activeCard}
            educationData={educationData}
            experienceData={experienceData}
            skillData={skillData}
            generalData={generalData}
            onEducationChange={handleEducationChange}
            onExperienceChange={handleExperienceChange}
            onSkillChange={handleSkillChange}
            onGeneralChange={handleGeneralChange}
          />
        </div>
        <CVfiled
          educatioData={educationData}
          SkillData={skillData}
          experienceData={experienceData}
          generalData={generalData}
        />
      </div>
    </>
  );
}

export default App;
