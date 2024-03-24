import { createEvent, EventAttributes } from "ics";
import { Course } from "./data.ts";

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateId = () => {
  return Math.floor(Math.random() * 1e8);
};

export async function handleDownload(event: EventAttributes) {
  const fileName = "tc.ics";
  const file = await new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
      }
      resolve(new File([value], fileName, { type: "text/calendar" }));
    });
  });

  // @ts-ignore
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

export const isValidCourse = (course: Course) => {
  /**
   * @param course
   *
   * Return true if the course is valid.
   */
  return course.name.length <= 8 && course.name.length > 0;
};
