import { useState } from "react";
import { Course, testData } from "./data";
import CourseList from "./CourseList";
import CourseBoard from "./CourseBoard";
import { Header } from "./Header";

function App() {
  const [courses, setCourses] = useState<Course[]>(testData);

  const addCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (id: number) => {
    const coursesUpdated = courses.filter(course => course.id !== id);
    setCourses(coursesUpdated);
  }

  return (
    <>
      <Header />
      <main className="justify-center flex-row flex mx-5 min-w-[800px] align-middle mt-[80px]">
        <CourseBoard courses={courses} />
        <div className="min-w-[400px]">
          <CourseList courses={courses} addCourse={addCourse} deleteCourse={deleteCourse}/>
        </div>
      </main>
    </>
  );
}

export default App;
