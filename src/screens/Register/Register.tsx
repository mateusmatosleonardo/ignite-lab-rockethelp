import { VStack } from 'native-base';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';

export function Register() {
  return (
    <VStack flex={1} p={1} bg="gray.600">
      <Header title='Nova solicitação' />
      <Input
        placeholder='Número do patrimônio'
        mt={4}
      />
      <Input
        placeholder='Descrição do problema'
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
      />
      <Button
        title='Cadastrar'
        mt={5}
      />
    </VStack>
  );
}