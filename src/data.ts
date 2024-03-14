export type Course = {
  id: number;
  name: string;
  level?: string;
  info?: string;
  color: string;
};

export const testData: Course[] = [
  {
    id: 0,
    name: "文学",
    level: "SL",
    info: "214",
    color: "#001F5B",
  },
  {
    id: 1,
    name: "EB",
    level: "HL",
    info: "307",
    color: "#800020",
  },
];
