import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
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
import { GraduationCap, Plus } from "lucide-react";
import type { EducationData } from "./CardRender";
import ItemButtons from "./ItemButtons";

function toDateFromString(str: string | undefined): Date | undefined {
  if (!str) return undefined;
  const [day, month, year] = str.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

type CardEducationProps = {
  educationData: EducationData[];
  dataOnChange: (updated: EducationData[]) => void;
};

export default function CardEducation({ educationData, dataOnChange }: CardEducationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setEditingData] = useState<EducationData | null>(null);
  const [editData, setEditData] = useState(false);

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newformData = new FormData(event.target as HTMLFormElement);

    // edit data
    if (editData) {
      const updateItem: EducationData = {
        ...formData!,
        schoolName: newformData.get("schoolName")?.toString() || "",
        title: newformData.get("title")?.toString() || "",
        endDate: newformData.get("endDate")?.toString() || "",
      };
      const updatedData = educationData.map((item) => (item.id === updateItem.id ? updateItem : item));
      dataOnChange(updatedData);
      setEditData(false);
      // new data
    } else {
      const newEducation: EducationData = {
        schoolName: newformData.get("schoolName")?.toString() || "",
        title: newformData.get("title")?.toString() || "",
        endDate: newformData.get("endDate")?.toString() || "",
        id: crypto.randomUUID(),
      };
      dataOnChange([...educationData, newEducation]);
    }
    setIsDialogOpen(false);
  }

  function editItemClick(id: string) {
    setEditData(true);
    const foundData = educationData.find((data) => data.id === id);
    if (foundData) {
      setEditingData(foundData);
      setIsDialogOpen(true);
    }
  }
  function deleteItemClick(id: string) {
    const deleteData = educationData.filter((data) => data.id !== id);
    dataOnChange(deleteData);
  }
  return (
    <>
      <Card className="w-full max-w-2xl mx-auto animate-in fade-in duration-300">
        <CardContent>
          {/* list of items */}

          <div className="flex flex-col gap-2 text-gray-300">
            {educationData.map((data) => (
              <div className="flex items-center justify-between border p-1 rounded-lg">
                <div key={data.id} className="flex items-center flex-row gap-4 rounded-lg p-3">
                  <GraduationCap className="w-5 h-5" />
                  <span>{data.schoolName + " "}</span>
                  <span>{data.endDate}</span>
                </div>
                <ItemButtons
                  editOnChange={() => editItemClick(data.id)}
                  deleteOnChange={() => deleteItemClick(data.id)}
                ></ItemButtons>
              </div>
            ))}
          </div>
          <div className={`flex justify-center items-center gap-2 ${educationData.length > 0 ? "hidden" : ""}`}>
            <GraduationCap size={18} className="text-gray-600" />

            <p className=" text-gray-600">No education yet</p>
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
                    <GraduationCap className="-mt-1" />
                    Fill in your education details
                  </DialogTitle>
                </DialogHeader>
                {/* ---- Dialog content ---- */}
                <div className="flex flex-col space-y-4 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="schoolName">School name</Label>
                    <DialogDescription></DialogDescription>
                    <Input name="schoolName" defaultValue={formData?.schoolName}></Input>
                  </div>
                  <div className="grid gap-2 mb-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Select name="title" defaultValue={formData?.title}>
                      <SelectTrigger id="title" className="w-[180px]">
                        <SelectValue placeholder="Select a title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>title</SelectLabel>
                          <SelectItem value="Ing">Ing</SelectItem>
                          <SelectItem value="Bc">Bc</SelectItem>
                          <SelectItem value="Dis">Dis</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Calendar22 dateProp={toDateFromString(formData?.endDate)} label={"end of study"} name="endDate" />
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
