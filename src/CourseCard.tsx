import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Trash2 } from "react-feather";

type CourseCardProps = {
  id: number;
  name: string;
  info?: string;
  color: string;
  deleteCourse: (id: number) => void;
};

export function CourseCard({
  name,
  info,
  color,
  id,
  deleteCourse,
}: CourseCardProps) {
  return (
    <Card className="w-[350px] mt-2" radius="sm">
      <CardHeader className="pb-0">
        <div
          className="mx-1 h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <p className="mx-1 text-2xl font-bold">{name}</p>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row">
          {info && (
            <p className="ml-2 text-default-500 text-md text-left">{info}</p>
          )}
          <Button
            className="ml-auto"
            color="danger"
            isIconOnly
            onClick={() => deleteCourse(id)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
