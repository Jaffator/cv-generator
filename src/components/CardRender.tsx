import CardGeneral from "./CardGeneral";
import CardExperience from "./CardExperience";
import CardSkill from "./CardSkill";
import CardEducation from "./CardEducation";

export type CardRenderProps = {
  activeCard: string;
  educationData: EducationData[];
  experienceData: ExperiencenData[];
  skillData: SkillData[];
  generalData: GeneralData;
  onEducationChange: (updated: EducationData[]) => void;
  onExperienceChange: (updated: ExperiencenData[]) => void;
  onSkillChange: (updated: SkillData[]) => void;
  onGeneralChange: (updated: GeneralData) => void;
};

export type GeneralData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photo: string;
};

export type EducationData = {
  schoolName: string;
  title: string;
  endDate: string;
  id: string;
};

export type ExperiencenData = {
  companyName: string;
  positionTitle: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
  id: string;
};

export type SkillData = {
  skillName: string;
  id: string;
};

function CardRender({
  activeCard,
  educationData,
  experienceData,
  skillData,
  generalData,
  onEducationChange,
  onExperienceChange,
  onSkillChange,
  onGeneralChange,
}: CardRenderProps) {
  function renderCard() {
    switch (activeCard) {
      case "General":
        return <CardGeneral generalData={generalData} dataOnChange={onGeneralChange} />;
      case "Education":
        return <CardEducation educationData={educationData} dataOnChange={onEducationChange} />;
      case "Experience":
        return <CardExperience experienceData={experienceData} dataOnChange={onExperienceChange} />;
      case "Skill":
        return <CardSkill skillData={skillData} dataOnChange={onSkillChange} />;
    }
  }
  return (
    <>
      <div>{renderCard()}</div>
    </>
  );
}

export default CardRender;
