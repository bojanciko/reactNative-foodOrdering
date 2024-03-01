import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/api/products';
import Colors from '@/constants/Colors';


export default function TabOneScreen() {
  const { error, data: products, isLoading } = useProductList()


  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch data</Text>
  }

  if (!products || products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: Colors.light.text, alignSelf: 'center' }}>No products found</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}