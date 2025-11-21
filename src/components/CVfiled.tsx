import type { EducationData, SkillData, ExperiencenData, GeneralData } from "./CardRender";
import { BriefcaseBusiness, HandCoins, GraduationCap } from "lucide-react";

type CVPropData = {
  educatioData: EducationData[];
  SkillData: SkillData[];
  experienceData: ExperiencenData[];
  generalData: GeneralData;
};

function CVfiled({ educatioData, SkillData, experienceData, generalData }: CVPropData) {
  return (
    <div className="bg-gray-100 w-[60vh] h-[84vh] border flex flex-row text-black">
      {/* side bar */}
      <div className="flex flex-col bg-lime-200 h-[calc(100%+2px)] w-1/3 items-center justify-start -m-px">
        {generalData.photo && (
          <img src={generalData.photo} alt="Profile" className="w-48 h-48 object-cover rounded-full p-5" />
        )}
        <div className="px-3 pb-3 text-left flex flex-col justify-start">
          <h2 className="text-2xl font-bold mb-2 ">
            {generalData.firstName} {generalData.lastName}
          </h2>
          <p className=" mb-4">{generalData.email && `Email: ${generalData.email}`}</p>
          <p className="mb-4">{generalData.phone && `Phone: ${generalData.phone}`}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {/* job experience */}
        <div className="flex flex-col p-3">
          {experienceData.length > 0 && (
            <div className="flex items-center flex-row gap-1">
              <BriefcaseBusiness />
              <h3 className="p-2 text-lg font-bold">Job Experience</h3>
            </div>
          )}
          {experienceData.map((exp) => (
            <div key={exp.id} className="p-2 border-b">
              <h3 className="text-lg font-semibold">
                {exp.positionTitle}- {exp.startDate} - {exp.endDate}
              </h3>
              <p>{exp.companyName}</p>
              <p>{exp.responsibilities}</p>
            </div>
          ))}
        </div>
        {/* education */}
        <div className="flex flex-col p-3">
          {educatioData.length > 0 && (
            <div className="flex items-center flex-row gap-1">
              <GraduationCap />
              <h3 className="p-2 text-lg font-bold">Education</h3>
            </div>
          )}
          {educatioData.map((edu) => (
            <div key={edu.id} className="p-2 border-b">
              <h3 className="text-lg font-semibold">
                {edu.schoolName} - {edu.endDate}
              </h3>
              <p>{edu.title}</p>
            </div>
          ))}
        </div>
        {/* skills */}
        <div className="flex flex-col p-3">
          {SkillData.length > 0 && (
            <div className="flex items-center flex-row gap-1">
              <HandCoins />
              <h3 className="p-2 text-lg font-bold">Skills</h3>
            </div>
          )}
          {SkillData.map((skill) => (
            <div key={skill.id} className="p-2 border-b">
              <h3 className="text-lg font-semibold">{skill.skillName}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CVfiled;
