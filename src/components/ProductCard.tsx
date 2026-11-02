import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
interface IProduct {
    id:string,
    title:string,
    description:string,
    category:string,
    price:number,
  }

  interface ICartItem extends IProduct {
    quantity?:number
  }
const ProductCard = ({product, addToCart, removeFromCart}:{product:ICartItem, addToCart?:(item:IProduct) => void, removeFromCart?:(id:number) => void
}) => {
  return (
    <View style={{width:"100%", height:100, backgroundColor:"#fff", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <View style={{flexDirection:"column", paddingLeft:10}}>
      <Text>{product.title}</Text>
      <Text>{product.category}</Text>
      <Text>${product.price}</Text>
      {product.quantity && <Text>Quantity: {product.quantity}</Text>}
        </View>
        {addToCart && <View style={{padding:10}}>
            <Pressable onPress={() => addToCart(product)}>

            <Ionicons name="add" size={24}/>
            </Pressable>
        </View>}
        {removeFromCart && <View style={{padding:10}}>
            <Pressable onPress={() => removeFromCart(Number(product.id))}>

            <Ionicons name="remove" size={24}/>
            </Pressable>
        </View>}
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({})