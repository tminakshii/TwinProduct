import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo' 
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/cartReducer';// or use react-native-vector-icons

const { height, width } = Dimensions.get('window');

const ProductCard = ({ item, onPress }) => {
  const [liked, setLiked] = useState(false);
  // const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.items.find(product => product.productId === item.productId)
  );

  const toggleLike = () => setLiked(!liked);
  const staticPrice = 60; // Static price for the product
  const quantity = cartItem?.quantity || 0;
  const staticImage = require('../assets/Beetroot.webp'); // Static image path
  const increment = () => {
    if (quantity === 0) {
      // Add to cart with the static price
      dispatch(addToCart({
        ...item,
        price: staticPrice,
        image:  staticImage
      }));
    } else {
      // Increment quantity without changing the price (price is already set when item was added)
      dispatch(incrementQuantity(item.productId));
    }
  };
  
  const decrement = () => {
    if (quantity > 1) {
      // Decrement quantity, still keep the price intact
      dispatch(decrementQuantity(item.productId));
    } else if (quantity === 1) {
      // If quantity is 1, remove the item from the cart
      dispatch(decrementQuantity(item.productId));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Beetroot.webp')}
          style={styles.icon}
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>21% off</Text>
        </View>
        <TouchableOpacity onPress={toggleLike} style={styles.heartIcon}>
          <AntDesign
            name={liked ? 'heart' : 'hearto'}
            size={18}
            color={liked ? 'red' : 'red'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.fresh}>TL Fresh</Text>
      <Text style={styles.productTitle} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.price}>₹ 60</Text>
        <Text style={styles.preprice}>100</Text>
      </View>

      <Text style={styles.productPrice}>1 Piece</Text>

      {quantity === 0 ? (
        <TouchableOpacity onPress={increment} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={decrement}>
            <Entypo name="minus" size={18} color="white" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={increment}>
            <Entypo name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 7,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: width * 0.42,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  icon: {
    width: width * 0.35,
    height: width * 0.3,
    borderRadius: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#d1e7dd',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  discountText: {
    fontSize: 10,
    color: '#0f5132',
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  fresh: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
    marginTop: '3%',
  },
  productTitle: {
    fontSize: 12,
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 12,
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  preprice: {
    fontSize: 12,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginLeft: '5%',
  },
  productPrice: {
    fontSize: 10,
    color: 'gray',
    marginTop: '2%',
  },
  addButton: {
    backgroundColor: 'darkgreen',
    paddingVertical: 4,
    marginTop: 6,
    borderRadius: 5,
    paddingHorizontal:'6%',
    position:"absolute",
    top:height*0.13,
    right:width*0.04
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 6,
    borderWidth: 1,
    borderColor: 'darkgreen',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    paddingHorizontal:'6%',
    position:"absolute",
    top:height*0.13,
    right:width*0.04,
    backgroundColor:"darkgreen"
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
