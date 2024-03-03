import { ActivityIndicator, FlatList } from 'react-native';
import orders from '../../../../../assets/data/orders';
import OrderListItem from '../../../../components/OrderListItem';
import { Stack } from 'expo-router';
import { useADminOrderList } from '@/api/orders';
import { Text } from 'react-native-elements';

export default function OrdersScreen() {
  const { data: orders, error, isLoading } = useADminOrderList({ archived: true })

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch data</Text>
  }


  return (
    <>
      <Stack.Screen options={{ title: 'Archive' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}