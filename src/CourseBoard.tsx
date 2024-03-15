import { useState } from "react";
import { Course } from "./data";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import hexToRgba from "hex-to-rgba";

interface CoursesProps {
  courses: Course[];
}
export function CourseEvent({ courses }: CoursesProps) {
  const [color, setColor] = useState<string>("#B4B4B8");
  const [bgColor, setBgColor] = useState<string>("#D7D8DC");
  const [eventName, setEventName] = useState<string>();

  const handleSelect = (key: number) => {
    const selectedCourse = courses.find((course) => course.id === key);
    setEventName(selectedCourse!.name);
    const color = selectedCourse!.color;
    setBgColor(hexToRgba(color, 0.25));
    setColor(color);
  };
  return (
    <div className="mx-1">
      <Dropdown>
        <DropdownTrigger>
          <Card
            as="button"
            style={{
              backgroundColor: bgColor,
              color: color,
              borderLeftWidth: "3px",
              borderColor: color,
            }}
            shadow="none"
            className="min-h-[50px] w-[150px] p-2 justify-center align-middle border-zinc-500"
            radius="sm"
          >
            <p className="font-bold">{eventName ? eventName : ""}</p>
          </Card>
        </DropdownTrigger>
        <DropdownMenu onAction={(key) => handleSelect(Number(key))}>
          {courses.map((course) => (
            <DropdownItem key={course.id}>
              <div className="flex flex-row">
                <div
                  className="mr-2 h-5 w-5 rounded-full"
                  style={{ backgroundColor: course.color }}
                ></div>
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
