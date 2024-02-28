import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <View style={styles.container} >
      <Stack.Screen options={{ title: 'Sign In' }} />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={(setEmail)} inputMode='email' keyboardType='email-address' textContentType='emailAddress' placeholder='example@gmail.com' style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput secureTextEntry={true} value={password} onChangeText={(setPassword)} style={styles.input} />
      <Button style={styles.button} onPress={() => { }} text='Sign In' />
      <Link style={styles.textButton} href={'/(auth)/sign-up'}>Create account</Link>
    </View>
  )
}

export default SignIn


const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  button: {
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  }
})