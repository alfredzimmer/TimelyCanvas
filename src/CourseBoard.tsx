import { useState } from "react";
import { Course, freePeriod } from "./data";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import hexToRgba from "hex-to-rgba";

type CoursesProps = {
  courses: Course[];
};

export function CourseEvent({ courses }: CoursesProps) {
  const { color: color, name } = freePeriod;
  const [prColor, setPrColor] = useState<string>(color);
  const [bgColor, setBgColor] = useState<string>(hexToRgba(color, 0.25));
  const [eventName, setEventName] = useState<string>(name);

  const handleSelect = (key: number) => {
    const selectedCourse = courses.find((course) => course.id === key);
    setEventName(selectedCourse!.name);
    const color = selectedCourse!.color;
    setBgColor(hexToRgba(color, 0.25));
    setPrColor(color);
  };
  return (
    <div className="mx-1">
      <Dropdown>
        <DropdownTrigger>
          <Card
            as="button"
            style={{
              backgroundColor: bgColor,
              color: prColor,
              borderLeftWidth: "3px",
              borderColor: prColor,
            }}
            shadow="none"
            className="min-h-[50px] w-[150px] p-2 justify-center align-middle border-zinc-500"
            radius="sm"
          >
            <p className="font-bold">{eventName === "空课" ? "" : eventName}</p>
          </Card>
        </DropdownTrigger>
        <DropdownMenu onAction={(key) => handleSelect(Number(key))}>
          {courses.map((course) => (
            <DropdownItem key={course.id}>
              <div className="flex flex-row">
                <div
                  className="mr-3 h-5 w-5 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                <p>{course.name}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default function CourseBoard({ courses }: CoursesProps) {
  return (
    <div className="flex flex-col mr-20">
      {[...Array(10)].map((_, i) => (
        <div className="justify-around flex flex-row mt-2" key={i}>
          {[...Array(5)].map((_, j) => (
            <CourseEvent key={j} courses={courses} />
          ))}
        </div>
      ))}
    </div>
  );
}
