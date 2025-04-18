import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView,
  Dimensions, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/cartReducer';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [like, setLike] = useState(false)
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const itemInCart = cartItems.find(i => i.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handlelike = () => {
    setLike(!like)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/Beetroot.webp')} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>{product.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹ 60</Text>
        <Text style={styles.preprice}>₹ 100</Text>
      </View>

      <Text style={styles.description}>
        {product.productDescription || 'No description available.'}
      </Text>

      <View style={styles.buttonRow}>
        {itemInCart ? (
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={() => dispatch(decrementQuantity(product.id))} style={styles.counterBtn}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{itemInCart.quantity}</Text>
            <TouchableOpacity onPress={() => dispatch(incrementQuantity(product.id))} style={styles.counterBtn}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.wishlistBtn,    { backgroundColor: like ? 'green' : 'lightgray' },]} onPress={handlelike}>
          {
            like ?
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
              }}>Added to Wishlist</Text> :
              <Text style={styles.btnText}>Add to Wishlist</Text>
          }

        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: width * 0.9,
    height: width * 0.51,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    // backgroundColor:'red'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginVertical: '2%',
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  preprice: {
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: '2%',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  cartBtn: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  wishlistBtn: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'green'
  },
  counterBtn: {
    padding: 10,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'white'
  },
});

export default ProductDetailScreen;
