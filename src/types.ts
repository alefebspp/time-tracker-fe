export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Record {
  id: string;
  type: "start" | "end";
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
