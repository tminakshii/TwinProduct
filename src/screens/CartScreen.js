import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { incrementQuantity,decrementQuantity } from '../redux/cartReducer'
import { useSelector,useDispatch } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo';
const{width,height}=Dimensions.get('window')
const CartScreen = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart Items</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <View style={styles.item}>
             <Image source={item.image} style={styles.itemImage} /> 
            <Text style={styles.title}>{item.name}</Text>
            <Text>₹ {item.price} x {item.quantity} = ₹ {(item.price * item.quantity).toFixed(2)}</Text>
            <View style={styles.actions}>
              <Entypo name="minus" onPress={() => dispatch(decrementQuantity(item.productId))} size={20} />
              <Text>{item.quantity}</Text>
              <Entypo name="plus" onPress={() => dispatch(incrementQuantity(item.productId))} size={20} />
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ₹ {totalAmount.toFixed(2)}</Text>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 6,
    borderColor: '#ccc',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 10 },
  itemImage: {
    width: width * 0.75,
    height: width * 0.3,
    borderRadius: 10,
  },
})