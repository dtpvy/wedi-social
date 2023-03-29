import { ReactNode } from "react";

export type Tab = {
  name: string;
  title?: string;
  url: string;
  icon?: ReactNode;
};
