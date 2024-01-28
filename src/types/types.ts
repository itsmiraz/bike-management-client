import { ReactNode } from "react";

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[] | undefined;
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TItemsProps = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItemsProps[];
};

type TUSER = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export type UserInitState = {
  user: null | TUSER;
  token: null | string;
};

export type LoginFormFieldType = {
  id?: string;
  password?: string;
};

export type TBike = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  model: string;
  type: string;
  size: number;
  color: string;
  releaseDate: string;
};

export type TBikeInitState = {
  bikes: TBike[] | null;
};
// export const ErrorType =

export type TSaleCard = {
  buyerName: string;
  productId: TBike;
  date: Date;
  quantity: number;
};
