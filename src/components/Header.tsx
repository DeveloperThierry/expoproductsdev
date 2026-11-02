import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons"
const Header = ({user, logout}:{user:{username:string, password:string}, logout:()=>void}) => {
  return (
    <View style={{flexDirection:"row", justifyContent:"space-between", padding:10}}>
        <View>

     {/* <Ionicons name="person" size={24}/> */}
     <Text>Welcome, {user.username}</Text>
        </View>
        <View>
            <Button title="logout" color="red" onPress={logout} />
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})