import { SetStateAction, useState } from "react";
import { Course } from "./data.ts";
import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Radio,
  useDisclosure,
  Modal,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { Material } from "@uiw/react-color";
import { generateId, generateRandomColor } from "./utils.ts";
import { Plus } from "react-feather";
import { CourseCard } from "./CourseCard.tsx";

export default function CourseList({
  courses,
  addCourse,
  deleteCourse,
}: {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (id: number) => void;
}) {
  // TODO: useRef instead of useState to improve performance.
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [changed, setChanged] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseInformation, setCourseInformation] = useState("");
  const [courseColor, setCourseColor] = useState(generateRandomColor());

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCourseName(e.target.value);
    if (!changed) {
      setChanged(true);
    }
  };

  return (
    <Card className="max-w-[450px]">
      <CardHeader>
        <h2 className="mt-4 ml-8 text-3xl">课程</h2>
      </CardHeader>
      <div className="mb-3 flex flex-col items-center mx-0">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} deleteCourse={deleteCourse} />
        ))}
        <Button className="mt-2" onPress={onOpen} color="primary">
          <Plus />
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {/* TODO: Refactor this using useRef() and form submission. */}
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  添加课程
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-row gap-3">
                    <Input
                      className="min-w-[275px]"
                      label="课程名称"
                      variant="bordered"
                      value={courseName}
                      isInvalid={changed && courseName.length === 0}
                      maxLength={7}
                      onChange={handleInputChange}
                      isRequired
                    />
                    <RadioGroup
                      onValueChange={(value) => setCourseLevel(value)}
                    >
                      <Radio value="HL">HL</Radio>
                      <Radio value="SL">SL</Radio>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-row gap-7 it·······ems-center">
                    <Input
                      label="其它信息"
                      value={courseInformation}
                      onChange={(e) => setCourseInformation(e.target.value)}
                      maxLength={40}
                      className="max-w-[300px]"
                    />
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button
                          className="h-[50px] w-[50px]"
                          style={{ backgroundColor: courseColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <Material
                          style={{
                            width: 150,
                          }}
                          color={courseColor}
                          onChange={(color) => setCourseColor(color.hex)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={() => {
                      setChanged(false);
                      onClose();
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      if (!courseName) {
                        alert("请输入课程名");
                        return;
                      }

                      const newCourse: Course = {
                        id: generateId(),
                        name: courseName,
                        level: courseLevel,
                        info: courseInformation,
                        color: courseColor,
                      };
                      addCourse(newCourse);

                      setCourseName("");
                      setCourseLevel("");
                      setCourseInformation("");
                      setCourseColor(generateRandomColor());
                      setChanged(false);
                      onClose();
                    }}
                  >
                    提交
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Card>
  );
}
