import { IPressableProps } from "native-base";

export type OrderProps = {
  id: string,
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
}

export type Props = IPressableProps & {
  data: OrderProps
}