export type Course = {
  id: number;
  name: string;
  level?: string;
  info?: string;
  color: string;
};

export const freePeriod: Course = {
  id: 0,
  name: "空课",
  color: "#B4B4B8",
};

export const isValidCourse = (course: Course) => {
  /**
   * @param course
   *
   * Return true if the course is valid.
   */
  return course.name.length <= 8 && course.name.length > 0;
};
