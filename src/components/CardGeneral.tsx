import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function CardGeneral({ cardPosi }: { cardPosi: string }) {
  return (
    <>
      <Card className={cardPosi}>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label>First name</Label>
                <Input></Input>
              </div>
              <div className="grid gap-2">
                <Label>Last name</Label>
                <Input></Input>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="name@example.com"></Input>
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  placeholder="+420 777 123 456"
                  onChange={(e) => {
                    let cleaned = e.target.value;
                    cleaned = cleaned.replace(/[^0-9+]/g, "");
                    cleaned = cleaned.replace(/(?!^)\+/g, "");
                    e.target.value = cleaned;
                  }}
                ></Input>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
