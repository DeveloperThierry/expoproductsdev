import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@/store/useCartStore'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ProductCard from '@/components/ProductCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const CartScreen = () => {
    const {cart, removeFromCart, clearCart} = useCartStore()
    const router = useRouter()
    const handleProceedToCheckout = () => {
        Alert.alert("Are you ready to buy?", "Continue to purchase items in cart", [
            {text:"Confirm", onPress:() => {
                clearCart()
                router.back()
            }},
            {
                text:"Cancel", style:"cancel"
            }
        ])
    }
  return (
    <SafeAreaView>
        
        <View>

        <Pressable style={{padding:10}} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} />
        </Pressable>
        <View style={{padding:10}}>

        {cart.length === 0 ? (
            <Text>No items in Cart</Text>
        ) : (<View>
             <FlatList
      data={cart}
      contentContainerStyle={{gap:3, padding:4}}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
          <ProductCard product={item} removeFromCart={removeFromCart}/>
        )}
        /> 
    <View>
        <Pressable onPress={handleProceedToCheckout} style={{backgroundColor:"black", margin:10, padding:10}}>
            <Text style={{color:"white"}}>PROCEED TO CHECKOUT</Text>
        </Pressable>
    </View>
        </View>
    )}
            </View>

    </View>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})