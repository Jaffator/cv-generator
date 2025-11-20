import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardFooter, CardContent } from "./ui/card";
import { Plus, HandCoins } from "lucide-react";
import type { SkillData } from "./CardRender";
import ItemButtons from "./ItemButtons";

type CardSkillProps = {
  skillData: SkillData[];
  dataOnChange: (updated: SkillData[]) => void;
};

export default function CardSkill({ skillData, dataOnChange }: CardSkillProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setEditingData] = useState<SkillData | null>(null);
  const [editData, setEditData] = useState(false);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newformData = new FormData(event.target as HTMLFormElement);

    // edit data
    if (editData) {
      const updateItem: SkillData = {
        ...formData!,
        skillName: newformData.get("skillName")?.toString() || "",
      };
      const updatedData = skillData.map((item) => (item.id === updateItem.id ? updateItem : item));
      dataOnChange(updatedData);
      setEditData(false);
      // new data
    } else {
      const newSkill: SkillData = {
        skillName: newformData.get("skillName")?.toString() || "",
        id: crypto.randomUUID(),
      };
      dataOnChange([...skillData, newSkill]);
    }
    setIsDialogOpen(false);
  }

  function editItemClick(id: string) {
    setEditData(true);
    const foundData = skillData.find((data) => data.id === id);
    if (foundData) {
      setEditingData(foundData);
      setIsDialogOpen(true);
    }
  }

  function deleteItemClick(id: string) {
    const deleteData = skillData.filter((data) => data.id !== id);
    dataOnChange(deleteData);
  }
  return (
    <>
      <Card className="w-full max-w-2xl mx-auto animate-in fade-in duration-300">
        <CardContent>
          {/* list of items */}

          <div className="flex flex-col gap-2 text-gray-300">
            {skillData.map((data) => (
              <div className="flex items-center justify-between border p-1 rounded-lg">
                <div key={data.id} className="flex items-center flex-row gap-4 rounded-lg p-3">
                  <HandCoins className="w-5 h-5" />
                  <span>{data.skillName + " "}</span>
                </div>
                <ItemButtons
                  editOnChange={() => editItemClick(data.id)}
                  deleteOnChange={() => deleteItemClick(data.id)}
                ></ItemButtons>
              </div>
            ))}
          </div>
          <div className={`flex justify-center items-center gap-2 ${skillData.length > 0 ? "hidden" : ""}`}>
            <HandCoins size={18} className="text-gray-600" />
            <p className=" text-gray-600">No skill yet</p>
          </div>

          {/* list of items */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingData(null)} variant={"secondary"}>
                <Plus />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-card">
              <form onSubmit={handleFormSubmit}>
                <DialogHeader>
                  <DialogTitle className="flex flex-row gap-3 mb-5">
                    <HandCoins className="-mt-1" />
                    Fill in your skill details
                  </DialogTitle>
                </DialogHeader>

                {/* ---- Dialog content ---- */}
                <div className="flex flex-col space-y-4 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="skillName">Skill name</Label>
                    <DialogDescription></DialogDescription>
                    <Input name="skillName" defaultValue={formData?.skillName}></Input>
                  </div>
                </div>

                {/* ---- Dialog content ---- */}

                <CardFooter className="flex justify-end -mr-7 mt-5">
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </CardFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
