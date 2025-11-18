import CardGeneral from "./CardGeneral";
import CardEducation from "./CardEducation";
import CardExperience from "./CardExperience";
import CardSkill from "./CardSkill";

type CardRenderProps = {
  activeCard: string;
};

function CardRender({ activeCard }: CardRenderProps) {
  const cardPosi = "w-full max-w-2xl mx-auto";
  function renderCard() {
    switch (activeCard) {
      case "General":
        return <CardGeneral cardPosi={cardPosi} />;
      case "Education":
        return <CardEducation cardPosi={cardPosi} />;
      case "Experience":
        return <CardExperience cardPosi={cardPosi} />;
      case "Skills":
        return <CardSkill cardPosi={cardPosi} />;
    }
  }
  return (
    <>
      <div>{renderCard()}</div>
    </>
  );
}

export default CardRender;
