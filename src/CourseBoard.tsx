import { useEffect, useState } from "react";
import { Course, freePeriod } from "./data";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import hexToRgba from "hex-to-rgba";

type CourseEventProps = {
  courses: Course[];
  day: number;
  period: number;
  selectedCourse: Course;
  handleSelect: (day: number, period: number, key: number) => void;
};

function CourseEvent({
  day,
  period,
  courses,
  selectedCourse,
  handleSelect,
}: CourseEventProps) {
  return (
    <div className="mx-1">
      <Dropdown>
        <DropdownTrigger>
          <Card
            as="button"
            style={{
              backgroundColor: hexToRgba(selectedCourse.color, 0.25),
              color: selectedCourse.color,
              borderLeftWidth: "3px",
              borderColor: selectedCourse.color,
            }}
            shadow="none"
            className="min-h-[50px] w-[150px] p-2 justify-center align-middle border-zinc-500"
            radius="sm"
          >
            <p className="font-bold">
              {selectedCourse.name === "空课" ? "" : selectedCourse.name}
            </p>
          </Card>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => handleSelect(day, period, Number(key))}
        >
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

export default function CourseBoard({ courses }: { courses: Course[] }) {
  const [selectedCourses, setSelectedCourses] = useState<Course[][]>(
    Array.from({ length: 5 }, () => Array(10).fill(freePeriod)),
  );

  function handleSelect(day: number, period: number, key: number) {
    const targetCourse = courses.find((course) => course.id === key)!;

    // If I continue to write code like this I'll murder myself someday.
    setSelectedCourses((prevCourses) => {
      const newSelectedCourses = [...prevCourses];
      newSelectedCourses[day] = [...newSelectedCourses[day]];
      newSelectedCourses[day][period] = targetCourse;
      localStorage.setItem(
        "selectedCourses",
        JSON.stringify(newSelectedCourses),
      );
      return newSelectedCourses;
    });
  }

  useEffect(() => {
    const userSelectedCourses = localStorage.getItem("selectedCourses");
    if (userSelectedCourses) {
      setSelectedCourses(JSON.parse(userSelectedCourses));
    }
  }, []);

  return (
    <div className="flex flex-row mr-20 h-[600px]">
      {[...Array(5)].map((_, i) => (
        <div className="justify-around flex flex-col ml-2" key={i}>
          {[...Array(10)].map((_, j) => (
            <div className={"mt-2"} key={i * 10 + j}>
              <CourseEvent
                key={j}
                day={i}
                period={j}
                selectedCourse={selectedCourses[i][j]}
                courses={courses}
                handleSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
