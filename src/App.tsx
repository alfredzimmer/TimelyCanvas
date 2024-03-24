import { useEffect, useState } from "react";
import { Course, freePeriod } from "./data";
import CourseList from "./CourseList";
import CourseBoard from "./CourseBoard";
import { Header } from "./Header";
import { Card } from "@nextui-org/react";

export default function App() {
  // TODO: Refactor using useReducer.
  const [courses, setCourses] = useState<Course[]>([freePeriod]);

  const addCourse = (newCourse: Course) => {
    const coursesUpdated = [...courses, newCourse];
    localStorage.setItem("userCourses", JSON.stringify(coursesUpdated));
    setCourses(coursesUpdated);
  };

  const editCourse = (course: Course, id: number) => {
    const index = courses.findIndex((c: Course) => c.id === id);
    if (index !== -1) {
      const coursesUpdated = [
        ...courses.slice(0, index),
        course,
        ...courses.slice(index + 1),
      ];
      localStorage.setItem("userCourses", JSON.stringify(coursesUpdated));
      setCourses(coursesUpdated);
    } else {
      console.error(`Course with id ${id} not found`);
    }
  };

  const deleteCourse = (id: number) => {
    const coursesUpdated = courses.filter((course) => course.id !== id);
    localStorage.setItem("userCourses", JSON.stringify(coursesUpdated));
    setCourses(coursesUpdated);
  };

  useEffect(() => {
    const userCourses = localStorage.getItem("userCourses");
    if (userCourses) {
      setCourses(JSON.parse(userCourses));
    }
  }, []);

  return (
    <>
      <Header />
      <Card className="justify-center flex-row flex mx-32 min-w-[800px] align-middle my-[80px] p-10">
        <CourseBoard courses={courses} />
        <div className="min-w-[400px]">
          <CourseList
            courses={courses}
            addCourse={addCourse}
            deleteCourse={deleteCourse}
            editCourse={editCourse}
          />
        </div>
      </Card>
    </>
  );
}
