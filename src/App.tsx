import { useState } from "react";
import Header from "./components/Header";
import CVfiled from "./components/CVfiled";
import NavigationButtons from "./components/NavigationButtons";
import CardRender from "./components/CardRender";

function App() {
  const [activeCard, setActiveCard] = useState("General");
  return (
    <>
      <Header />
      <div className="flex flex-row justify-center gap-10 mt-10">
        <div className="flex flex-col w-[48%] gap-3 ">
          <div className="flex justify-center">
            <NavigationButtons activeButton={activeCard} onButtonChange={setActiveCard} />
          </div>
          <CardRender activeCard={activeCard} />
        </div>
        <CVfiled />
      </div>
    </>
  );
}

export default App;
