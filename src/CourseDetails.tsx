import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  Modal,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useState } from "react";
import { generateId, generateRandomColor } from "./utils.ts";
import { Course } from "./data.ts";
import { Material } from "@uiw/react-color";

type CourseDetailsProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  addCourse: (newCourse: Course) => void;
};

export default function CourseDetails({
  isOpen,
  onOpenChange,
  addCourse,
}: CourseDetailsProps) {
  const [course, setCourse] = useState<Course>({
    id: generateId(),
    name: "",
    color: generateRandomColor(),
  });
  function handleSubmit() {
    addCourse(course);
    setCourse({ id: generateId(), name: "", color: generateRandomColor() });
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">添加课程</ModalHeader>
            <ModalBody>
              <div className="flex flex-row gap-3">
                <Input
                  className="min-w-[275px]"
                  label="课程名称"
                  variant="flat"
                  isInvalid={
                    course.name.length === 0 || course.name.length === 8
                  }
                  maxLength={8}
                  onChange={(e) => {
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      name: e.target.value,
                    }));
                  }}
                  isRequired
                />
                <RadioGroup
                  onValueChange={(value) => {
                    course.level = value;
                  }}
                >
                  <Radio value="HL">HL</Radio>
                  <Radio value="SL">SL</Radio>
                </RadioGroup>
              </div>
              <div className="flex flex-row gap-7">
                <Input
                  label="其它信息"
                  onChange={(e) => {
                    course.info = e.target.value;
                  }}
                  maxLength={40}
                  className="max-w-[300px]"
                />
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button
                      className="h-[50px] w-[50px]"
                      style={{ backgroundColor: course.color }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Material
                      style={{
                        width: 150,
                      }}
                      color={course.color}
                      onChange={(color) => {
                        setCourse((prevCourse) => ({
                          ...prevCourse,
                          color: color.hex,
                        }));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                取消
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onClose();
                  handleSubmit();
                }}
              >
                提交
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
