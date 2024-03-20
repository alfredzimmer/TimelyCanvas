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
