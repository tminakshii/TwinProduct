import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from '../screens/LoginScreen'
import ProductListScreen from '../screens/ProductListScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import CartScreen from '../screens/CartScreen'
const Stack = createNativeStackNavigator()

export default function AppNavigator(){
  return(
    
      <Stack.Navigator screenOptions={{headerShown:true}}>
        
        <Stack.Screen name="Products" component={ProductListScreen}   options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name='Cart' component={CartScreen}/>
      </Stack.Navigator>
   
  );
}

