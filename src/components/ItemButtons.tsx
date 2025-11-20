import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

type buttonOnChange = {
  editOnChange: () => void;
  deleteOnChange: () => void;
};

function ItemButtons({ editOnChange, deleteOnChange }: buttonOnChange) {
  return (
    <>
      <div className="flex flex-row gap-2 justify-end p-1">
        <Button className="cursor-pointer" variant={"secondary"} onClick={editOnChange}>
          <Pencil />
        </Button>
        <Button className="cursor-pointer" variant={"destructive"} onClick={deleteOnChange}>
          <Trash />
        </Button>
      </div>
    </>
  );
}

export default ItemButtons;
