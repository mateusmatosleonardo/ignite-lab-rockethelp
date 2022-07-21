import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { Header } from '../../components/Header/Header';
import { RouteParams, OrderDetails } from './types';
import { OrderFirestoreDTO } from '../../DTOs/OrderDTO';

export function Details() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [solution, setSolution] = useState<string>('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const { description, patrimony, created_at, closed_at, status, solution } = doc.data();
      })
  }, []);

  return (
    <VStack
      flex={1}
      bg="gray.700"
    >
      <Header title='solicitação' />
      <Text color="white">{orderId}</Text>
    </VStack>
  );
}