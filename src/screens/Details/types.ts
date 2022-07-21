import { OrderProps } from "../../components/Order/types";

export type RouteParams = {
  orderId: string;
}

export type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}