import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect, useRouter } from 'expo-router'
import { useAuth } from '@/auth/AuthContext'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { Ionicons } from '@expo/vector-icons'
import { useCartStore } from '@/store/useCartStore'
import { SafeAreaView } from 'react-native-safe-area-context'
interface IProduct {
  id:string,
  title:string,
  description:string,
  category:string,
  price:number
}
const HomeScreen = () => {
  const {user, logout} = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<IProduct[]>([])
  const {addToCart} = useCartStore()
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fooapi.com/api/products")
      const jsonValue = await res.json()
      const data = jsonValue.data
      setProducts(data)
      // console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(()=> {
    if(user == null) return router.replace("/(auth)/sign-up")
      fetchProducts()
  }, [user])

  if(!user) return null

  return (
    <SafeAreaView style={{paddingVertical:10, backgroundColor:"white"}}>
      <Header user={user} logout={logout}/>
      <View style={{flexDirection:"row", justifyContent:"space-between", padding:10}}>
        <Text>Products</Text>
        <Pressable onPress={() => router.push("/cart")}>
      <Ionicons name="cart" size={24}/>
        </Pressable>
      </View>
      <FlatList
      data={products}
      contentContainerStyle={{gap:3, padding:4}}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <ProductCard product={item} addToCart={addToCart}/>
      )}
      />      
      </SafeAreaView>
  )
}

export default HomeScreen