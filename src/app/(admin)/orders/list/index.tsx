import { ActivityIndicator, FlatList, Text } from 'react-native';
import OrderListItem from '../../../../components/OrderListItem';
import { useADminOrderList } from '@/api/orders';

export default function OrdersScreen() {
  const { data: orders, error, isLoading } = useADminOrderList({ archived: false })

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch data</Text>
  }

  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}