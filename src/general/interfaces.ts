import { ReactNode } from "react";

export interface coords {
  x: number;
  y: number;
}
export interface INodeWithId {
  node: ReactNode;
  id: number;
}

export interface IProjectData {
  
  name: string;
  type: string;
  description: string;
  iconName: string;
  link: string;
  date: string;
}
