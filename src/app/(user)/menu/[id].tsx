import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { id } = useLocalSearchParams()
  const { addItem } = useCart()
  const router = useRouter()

  const product = products.find(product => product.id.toString() === id)

  const addToCart = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (!product) {
    return <Text>Product not found!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name, headerTitleAlign: 'center' }} />
      <Image source={{ uri: product?.image || defaultPizzaImage }} style={{ width: '100%', aspectRatio: 1 }} />
      <Text>Select size</Text>
      <Text></Text>
      <View style={styles.sizes}>
        {sizes.map(size => (
          <Pressable onPress={() => setSelectedSize(size)} style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]} key={size}>
            <Text style={[styles.text, { color: selectedSize === size ? 'black' : 'gray' }]}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={{ fontSize: 20 }}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  )
}



export default ProductDetailsScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  text: {

  }
})