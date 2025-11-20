import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
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
import { Calendar22 } from "./Calendar";
import { Plus, BriefcaseBusiness } from "lucide-react";
import type { ExperiencenData } from "./CardRender";
import ItemButtons from "./ItemButtons";

type CardExperienceProps = {
  experienceData: ExperiencenData[];
  dataOnChange: (updated: ExperiencenData[]) => void;
};

export default function CardExperience({ experienceData, dataOnChange }: CardExperienceProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setEditingData] = useState<ExperiencenData | null>(null);
  const [editData, setEditData] = useState(false);

  function toDateFromString(str: string | undefined): Date | undefined {
    if (!str) return undefined;
    const [day, month, year] = str.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newformData = new FormData(event.target as HTMLFormElement);

    // edit data
    if (editData) {
      const updateItem: ExperiencenData = {
        ...formData!,
        companyName: newformData.get("companyName")?.toString() || "",
        positionTitle: newformData.get("positionTitle")?.toString() || "",
        responsibilities: newformData.get("responsibilities")?.toString() || "",
        startDate: newformData.get("startDate")?.toString() || "",
        endDate: newformData.get("endDate")?.toString() || "",
      };
      const updatedData = experienceData.map((item) => (item.id === updateItem.id ? updateItem : item));
      dataOnChange(updatedData);
      setEditData(false);
      // new data
    } else {
      const newExperience: ExperiencenData = {
        companyName: newformData.get("companyName")?.toString() || "",
        positionTitle: newformData.get("positionTitle")?.toString() || "",
        responsibilities: newformData.get("responsibilities")?.toString() || "",
        startDate: newformData.get("startDate")?.toString() || "",
        endDate: newformData.get("endDate")?.toString() || "",
        id: crypto.randomUUID(),
      };
      dataOnChange([...experienceData, newExperience]);
    }
    setIsDialogOpen(false);
  }

  function editItemClick(id: string) {
    setEditData(true);
    const foundData = experienceData.find((data) => data.id === id);
    if (foundData) {
      setEditingData(foundData);
      setIsDialogOpen(true);
    }
  }
  function deleteItemClick(id: string) {
    const deleteData = experienceData.filter((data) => data.id !== id);
    dataOnChange(deleteData);
  }
  return (
    <>
      <Card className="w-full max-w-2xl mx-auto animate-in fade-in duration-300">
        <CardContent>
          {/* list of items */}

          <div className="flex flex-col gap-2 text-gray-300">
            {experienceData.map((data) => (
              <div className="flex items-center justify-between border p-1 rounded-lg">
                <div key={data.id} className="flex items-center flex-row gap-4 rounded-lg p-3">
                  <BriefcaseBusiness className="w-5 h-5" />
                  <span>{data.companyName + " "}</span>
                  <span>{data.positionTitle}</span>
                </div>
                <ItemButtons
                  editOnChange={() => editItemClick(data.id)}
                  deleteOnChange={() => deleteItemClick(data.id)}
                ></ItemButtons>
              </div>
            ))}
          </div>
          <div className={`flex justify-center items-center gap-2 ${experienceData.length > 0 ? "hidden" : ""}`}>
            <BriefcaseBusiness size={18} className="text-gray-600" />

            <p className=" text-gray-600">No experience yet</p>
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
                    <BriefcaseBusiness className="-mt-1" />
                    Fill in your experience details
                  </DialogTitle>
                </DialogHeader>
                {/* ---- Dialog content ---- */}
                <div className="flex flex-col space-y-4 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company name</Label>
                    <DialogDescription></DialogDescription>
                    <Input name="companyName" defaultValue={formData?.companyName}></Input>
                  </div>
                  <div className="grid gap-2">
                    <Label>Position title</Label>
                    <Input name="positionTitle" defaultValue={formData?.positionTitle}></Input>
                  </div>
                  <div className="grid gap-2">
                    <Label>Main resposibilities</Label>
                    <Textarea name="responsibilities" defaultValue={formData?.responsibilities}></Textarea>
                  </div>
                  <div className="grid gap-2">
                    <Calendar22 dateProp={toDateFromString(formData?.startDate)} label={"from"} name="startDate" />
                    <Calendar22 dateProp={toDateFromString(formData?.endDate)} label={"to"} name="endDate" />
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
