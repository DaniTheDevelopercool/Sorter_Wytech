import { Product } from "../Products";

export type OrderProduct = {
  id: string;
  product: Product;
  quantity: number;
  pickedQuantity: number;
};

export type Order = {
  id: string;
  status: 0 | 1 | 2 | 3;
  wave: string;
  location: string;
  currentProductEAN?: string;
  currentProductQuantity?: number;
  orderProducts: OrderProduct[];
};

export enum ORDER_STATUS {
  UNASSIGNED,
  ASSIGNED,
  IN_PROGRESS,
  COMPLETED,
}

export const ORDER_STATUS_LABELS: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.UNASSIGNED]: "Sin asignar",
  [ORDER_STATUS.ASSIGNED]: "Asignado",
  [ORDER_STATUS.IN_PROGRESS]: "En proceso",
  [ORDER_STATUS.COMPLETED]: "Completado",
};

export const COLOR_BY_STATUS = {
  0: {
    backgroundColor: "#FB4347",
    color: "#FFFFFF",
    borderColor: "#FF0000",
  },
  1: {
    backgroundColor: "#FFA500",
    color: "#FFFFFF",
    borderColor: "#FF8C00",
  },
  2: {
    backgroundColor: "#1DBAB5",
    color: "#FFFFFF",
    borderColor: "#008080",
  },
  3: {
    backgroundColor: "#25B277",
    color: "#FFFFFF",
    borderColor: "#008000",
  },
};
