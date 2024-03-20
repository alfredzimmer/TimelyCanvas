import { Course } from "./data.ts";
import { Button, Card, CardHeader, useDisclosure } from "@nextui-org/react";
import { Plus } from "react-feather";
import { CourseCard } from "./CourseCard.tsx";
import NewCourseModal from "./NewCourseModal.tsx";

type CourseListProps = {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (id: number) => void;
  editCourse: (course: Course, id: number) => void;
};

export default function CourseList({
  courses,
  addCourse,
  deleteCourse,
  editCourse,
}: CourseListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="max-w-[450px]">
      <CardHeader>
        <h2 className="mt-4 ml-8 text-3xl">课程</h2>
      </CardHeader>
      <div className="mb-3 flex flex-col items-center mx-0">
        {courses
          .filter((course) => course.id !== 0) // Don't show free period in CourseList
          .map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              deleteCourse={deleteCourse}
              editCourse={editCourse}
            />
          ))}
        <Button className="mt-2" onPress={onOpen} color="primary">
          <Plus />
        </Button>
        <NewCourseModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          addCourse={addCourse}
        ></NewCourseModal>
      </div>
    </Card>
  );
}
