import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { GeneralData } from "./CardRender";
import { PhotoDropzone } from "./PhotoDropZone";

type CardGeneralProps = {
  generalData: GeneralData;
  dataOnChange: (updated: GeneralData) => void;
};

export default function CardGeneral({ generalData, dataOnChange }: CardGeneralProps) {
  return (
    <>
      <Card className="w-full max-w-2xl mx-auto animate-in fade-in duration-300">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label>First name</Label>
                <Input
                  value={generalData.firstName}
                  onChange={(e) => dataOnChange({ ...generalData, firstName: e.target.value })}
                ></Input>
              </div>
              <div className="grid gap-2">
                <Label>Last name</Label>
                <Input
                  value={generalData.lastName}
                  onChange={(e) => dataOnChange({ ...generalData, lastName: e.target.value })}
                ></Input>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={generalData.email}
                  onChange={(e) => dataOnChange({ ...generalData, email: e.target.value })}
                  placeholder="name@example.com"
                ></Input>
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  value={generalData.phone}
                  type="text"
                  placeholder="+420 777 123 456"
                  onChange={(e) => {
                    let cleaned = e.target.value;
                    cleaned = cleaned.replace(/[^0-9+]/g, "");
                    cleaned = cleaned.replace(/(?!^)\+/g, "");
                    dataOnChange({ ...generalData, phone: cleaned });
                  }}
                ></Input>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col justify-center">
            <Label className="mb-2">Profile Photo</Label>
            <PhotoDropzone onChange={(img) => dataOnChange({ ...generalData, photo: img })} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
