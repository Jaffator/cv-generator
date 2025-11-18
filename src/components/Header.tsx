import DarkModeButton from "./DarkModeButton";
export default function Header() {
  return (
    <>
      <div className="relative w-full h-15 border-b flex items-center">
        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">CV Generator</div>
        <div className="ml-auto pr-6">
          <DarkModeButton />
        </div>
      </div>
    </>
  );
}
