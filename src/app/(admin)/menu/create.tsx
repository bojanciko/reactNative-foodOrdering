import { View, Text, StyleSheet, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [id, setId] = useState<number>(-10)
  const [deleting, setDeleting] = useState(false)


  const { id: idString } = useLocalSearchParams()

  if (idString) {
    setId(parseInt(typeof idString === 'string' ? idString : idString[0]))

  }
  const { mutate: insertProduct } = useInsertProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const { data: updatingProduct } = useProduct(id)
  const { mutate: deleteProduct } = useDeleteProduct()


  const router = useRouter()

  const isUpdating = !!id && id > 0
  console.log(id)


  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  }, [updatingProduct])

  const onDelete = () => {
    if (!id) return
    setDeleting(true)
    console.warn('Deleting product...')
    deleteProduct(id, {
      onSuccess: () => {
        router.replace('/(admin)/')
      }
    })

  }

  const confirmDelete = () => {
    Alert.alert("Confirm", 'Are you sure you want to delete this product?', [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete
      }
    ])
  }

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const validateInput = () => {
    setErrors('')
    if (!name) {
      setErrors('Name is required')
      return false
    }
    if (!price) {
      setErrors('Price is required')
      return false
    }
    if (isNaN(Number(price))) {
      setErrors('Price must be a number')
      return false
    }
    return true
  }

  const onCreate = () => {
    if (!validateInput()) return

    console.warn('Createing product...')

    insertProduct({
      name,
      price: parseFloat(price),
      image
    },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        }
      })

  }

  const onUpdate = () => {
    if (!validateInput()) return

    updateProduct({
      id,
      name,
      price: parseFloat(price),
      image
    },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        }
      })



    resetFields()
  }

  const onSubmit = () => {
    if (isUpdating) {
      // onUpdate()
    } else {
      onCreate()
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (deleting) {
    return (
      <View style={[styles.container, { alignItems: 'center', height: '100%' }]}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={{ alignSelf: 'center', fontSize: 18 }}>Deleting {name}...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create product', headerTitleAlign: 'center' }} />
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={(setName)} placeholder='name' style={styles.input} />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder='9.99' style={styles.input} keyboardType='numeric' />
      <Text style={{ color: 'red' }}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
      {isUpdating && <Text style={styles.deleteTextButton} onPress={confirmDelete}>Delete</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  label: {
    color: 'gray',
    fontSize: 18,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 20
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center'
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  deleteTextButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
    fontSize: 18,
  }
})

export default CreateProductScreen