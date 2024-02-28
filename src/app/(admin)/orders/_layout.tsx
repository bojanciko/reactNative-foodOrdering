import React from 'react'
import { Stack } from 'expo-router'

const OrdersLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Orders', headerTitleAlign: 'center' }} />
    </Stack>
  )
}

export default OrdersLayout