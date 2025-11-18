import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CardGeneral({ cardPosi }: { cardPosi: string }) {
  return (
    <>
      <Card className={cardPosi}>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
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
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
