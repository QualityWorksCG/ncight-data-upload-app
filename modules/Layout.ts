import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type PageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactNode;
};
