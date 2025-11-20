import { ButtonGroup } from "../components/ui/button-group";
import { Button } from "../components/ui/button";

type NavigationButtonProps = {
  activeButton: string;
  onButtonChange: (button: string) => void;
};

function NavigationButtons({ activeButton, onButtonChange }: NavigationButtonProps) {
  const buttons = ["General", "Education", "Experience", "Skill"];
  return (
    <div>
      <ButtonGroup>
        {buttons.map((button) => (
          <Button
            key={button}
            variant={activeButton === button ? undefined : "outline"}
            className="cursor-pointer"
            onClick={() => onButtonChange(button)}
          >
            {button}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default NavigationButtons;
