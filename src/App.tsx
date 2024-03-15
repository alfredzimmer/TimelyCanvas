import { useEffect, useState } from "react";
import { Course } from "./data";
import CourseList from "./CourseList";
import CourseBoard from "./CourseBoard";
import { Header } from "./Header";

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (newCourse: Course) => {
    const coursesUpdated = [...courses, newCourse];
    localStorage.setItem("userCourses", JSON.stringify(coursesUpdated));
    setCourses(coursesUpdated);
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
