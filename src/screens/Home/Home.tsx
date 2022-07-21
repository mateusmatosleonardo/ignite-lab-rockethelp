import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center
} from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import Logo from '../../assets/logo_secondary.svg';
import { Button } from '../../components/Button/Button';
import { Filter } from '../../components/Filter/Filter';
import { Order } from '../../components/Order/Order';
import { OrderProps } from '../../components/Order/types';
import { dateFormat } from '../../utils/firestoreDateFormat';
import { Loading } from '../../components/Loading/Loading';

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusSelected, setStatusSelected] =
    useState<'open' | 'closed'>('open');
  const [orders, setOrders] =
    useState<OrderProps[]>([]);

  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('New');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('Details', { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possível sair')
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          }
        });
        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;

  }, [statusSelected]);

  return (
    <VStack
      flex={1}
      pb={6}
      bg="gray.700"
    >
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type='open'
            title='em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type='closed'
            title='finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        {isLoading
          ?
          <Loading />
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'}
                  solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizados'}
                </Text>
              </Center>
            )}
          />}

        <Button
          title="Nova solicitação"
          onPress={handleNewOrder}
        />
      </VStack>
    </VStack>
  );
}