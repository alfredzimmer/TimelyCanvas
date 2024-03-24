import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { Edit, Trash2 } from "react-feather";
import { Material } from "@uiw/react-color";
import { Course } from "./data.ts";
import { useState } from "react";
import { isValidCourse } from "./utils.ts";

type CourseCardProps = {
  course: Course;
  editCourse: (course: Course, id: number) => void;
  deleteCourse: (id: number) => void;
};

export function CourseCard({
  course,
  editCourse,
  deleteCourse,
}: CourseCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editedCourse, setEditedCourse] = useState<Course>(course);

  function handleSubmit() {
    editCourse(editedCourse, course.id);
  }

  return (
    <Card
      className="w-[350px] mt-2 border-1 border-[#D7D8DC] rounded-lg"
      shadow={"none"}
    >
      <CardHeader className="pb-0">
        <div
          className="mx-1 h-4 w-4 rounded-full"
          style={{ backgroundColor: course.color }}
        ></div>
        <p className="mx-1 text-2xl font-bold">{course.name}</p>
        <Button
          className="ml-auto border-1 border-[#D7D8DC] rounded-lg"
          color={"primary"}
          isIconOnly
          onClick={onOpen}
        >
          <Edit />
        </Button>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row h-6">
          {course.info && (
            <p className="ml-2 text-default-500 text-md text-left">
              {course.info}
            </p>
          )}
        </div>
      </CardBody>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                修改课程
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-3">
                  <Input
                    className="min-w-[275px]"
                    label="课程名称"
                    variant="bordered"
                    value={editedCourse.name}
                    isInvalid={!isValidCourse(editedCourse)}
                    maxLength={12}
                    onValueChange={(value) => {
                      setEditedCourse({ ...editedCourse, name: value });
                    }}
                    isRequired
                  />
                  <RadioGroup
                    value={editedCourse.level}
                    onValueChange={(value) => {
                      setEditedCourse({ ...editedCourse, level: value });
                    }}
                  >
                    <Radio value="HL">HL</Radio>
                    <Radio value="SL">SL</Radio>
                  </RadioGroup>
                </div>
                <div className="flex flex-row gap-7">
                  <Input
                    label="其它信息"
                    value={editedCourse.info}
                    variant={"bordered"}
                    onValueChange={(value) => {
                      setEditedCourse({ ...editedCourse, info: value });
                    }}
                    maxLength={40}
                    className="max-w-[300px]"
                  />
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button
                        className="h-[50px] w-[50px]"
                        style={{ backgroundColor: editedCourse.color }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <Material
                        style={{
                          width: 150,
                        }}
                        color={editedCourse.color}
                        onChange={(color) => {
                          setEditedCourse({
                            ...editedCourse,
                            color: color.hex,
                          });
                        }}
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
                    onClose();
                    deleteCourse(course.id);
                  }}
                  isIconOnly
                >
                  <Trash2 />
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isValidCourse(editedCourse)}
                  onClick={() => {
                    onClose();
                    handleSubmit();
                  }}
                >
                  保存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
