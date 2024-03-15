import { useEffect, useState } from "react";
import { Course } from "./data";
import CourseList from "./CourseList";
import CourseBoard from "./CourseBoard";
import { Header } from "./Header";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (newCourse: Course) => {
    setCourses([...courses!, newCourse]);
  };

  const deleteCourse = (id: number) => {
    const coursesUpdated = courses.filter((course) => course.id !== id);
    setCourses(coursesUpdated);
  };

  useEffect(() => {
    const userCourses = localStorage.getItem("userCourses");
    if (userCourses) {
      const parsedCourses = JSON.parse(userCourses);
      if (JSON.stringify(parsedCourses) !== JSON.stringify(courses)) {
        setCourses(parsedCourses);
      }
    }
  }, []);

  useEffect(() => {
    if (courses !== null) {
      localStorage.setItem("userCourses", JSON.stringify(courses));
    }
  }, [courses]);

  return (
    <>
      <Header />
      <main className="justify-center flex-row flex mx-5 min-w-[800px] align-middle mt-[80px]">
        <CourseBoard courses={courses} />
          <div className="min-w-[400px]">
            <CourseList
              courses={courses}
              addCourse={addCourse}
              deleteCourse={deleteCourse}
            />
          </div>
      </main>
    </>
  );
}

export default App;
