import {
  Button,
  Card,
  CardHeader
} from "@nextui-org/react";
import { Trash2 } from "react-feather";

type CourseCardProps = {
  id: number;
  name: string;
  info?: string;
  color: string;
  deleteCourse: (id: number) => void;
};

export function CourseCard({ name, info, color, id, deleteCourse }: CourseCardProps) {
  if (info && info.length >= 8) info = info.substring(0, 8) + "...";
  return (
    <Card className="min-w-[300px] mt-2" radius="sm">
      <CardHeader>
        <div className="mx-2 h-5 w-5" style={{ backgroundColor: color }}></div>
        <p className="mx-1 text-xl">{name}</p>
        {info && (
          <p className="text-default-500 w-[100px] text-left pl-1">{info}</p>
        )}
        <Button
          className="ml-auto"
          color="danger"
          isIconOnly
          onClick={() => deleteCourse(id)}
        >
          <Trash2 />
        </Button>
      </CardHeader>
    </Card>
  );
}
