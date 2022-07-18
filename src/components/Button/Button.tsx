import {
  Button as ButtonNativeBase,
  Heading
} from 'native-base';
import { ButtonProps } from './types';

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      bg="green.700"
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="xl">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}