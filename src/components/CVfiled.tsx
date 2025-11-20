import type { EducationData, SkillData, ExperiencenData, GeneralData } from "./CardRender";

type CVPropData = {
  educatioData: EducationData[];
  SkillData: SkillData[];
  experienceData: ExperiencenData[];
  generalData: GeneralData;
};

function CVfiled({ educatioData, SkillData, experienceData, generalData }: CVPropData) {
  return (
    <div className="bg-gray-100 w-[60vh] h-[84vh] border flex flex-row">
      {/* side bar */}
      <div className="flex flex-col bg-lime-200 h-[calc(100%+2px)] w-1/3 items-center justify-start -m-px">
        <img src={generalData.photo} alt="Profile" className="w-48 h-48 object-cover rounded-full p-5" />
        <div className="px-3 pb-3 text-left flex flex-col justify-start">
          <h2 className="text-gray-600 text-2xl font-bold mb-2 ">
            {generalData.firstName} {generalData.lastName}
          </h2>
          <p className="text-gray-600 mb-4">Email: {generalData.email}</p>
          <p className="text-gray-600 mb-4">Phone: {generalData.phone}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {/* job experience */}
        <div className="flex flex-col p-3">
          <h3 className="text-gray-800 p-2 text-lg font-bold">Job Experience</h3>
          {experienceData.map((exp) => (
            <div key={exp.id} className="p-2 border-b">
              <h3 className="text-gray-800 text-lg font-semibold">
                {exp.positionTitle}- {exp.startDate} - {exp.endDate}
              </h3>
              <p className="text-gray-800">{exp.companyName}</p>
              <p className="text-gray-800">{exp.responsibilities}</p>
            </div>
          ))}
        </div>
        {/* education */}
        <div className="flex flex-col p-3">
          <h3 className="text-gray-800 p-2 text-lg font-bold">Education</h3>
          {educatioData.map((edu) => (
            <div key={edu.id} className="p-2 border-b">
              <h3 className="text-gray-800 text-lg font-semibold">
                {edu.title} - {edu.endDate}
              </h3>
              <p className="text-gray-800">{edu.schoolName}</p>
            </div>
          ))}
        </div>
        {/* skills */}
        <div className="flex flex-col p-3">
          <h3 className="text-gray-800 p-2 text-lg font-bold">Skills</h3>
          {SkillData.map((skill) => (
            <div key={skill.id} className="p-2 border-b">
              <h3 className="text-gray-800 text-lg font-semibold">{skill.skillName}</h3>
              <p className="text-gray-800">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CVfiled;
