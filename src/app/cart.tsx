import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  const { items, total } = useCart()


  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {items.length > 0 && <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>Total: ${total}</Text>}
      {items.length > 0 && <Button text='Checkout' />}
    </View>
  )
}

export default CartScreen
