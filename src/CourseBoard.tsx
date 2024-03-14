import { useState } from "react";
import { Course } from "./data";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface CoursesProps {
  courses: Course[];
}
export function CourseEvent({ courses }: CoursesProps) {
  const [color, setColor] = useState<string>("#B4B4B8");
  const [bgColor, setBgColor] = useState<string>("#C7C8CC");
  const [eventName, setEventName] = useState<string>();
  function hexToRgbA(hex: string, percent: string) {
    /* Magic stuff from Stack Overflow */
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        percent +
        ")"
      );
    }
    throw new Error("Bad Hex");
  }
  const handleSelect = (key: number) => {
    console.log(key);
    setEventName(courses[key].name);
    const color = courses[key].color;
    setBgColor(hexToRgbA(color, "25%"));
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
            <p>{eventName ? eventName : ""}</p>
          </Card>
        </DropdownTrigger>
        <DropdownMenu onAction={(key) => handleSelect(key)}>
          {courses.map((course) => (
            <DropdownItem key={course.id}>
              <div className="flex flex-row">
                <div
                  className="mr-2 h-5 w-5 rounded-xl"
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
    <div className="flex flex-col mr-10">
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
