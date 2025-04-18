import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Adjust the import as per your file structure
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux';
const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector(state => state.cart.items); 

  // Calculate the total number of items in the cart, including quantity
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const requestBody = {
      page: 1,
      pageSize: 10,
      storeLocationId: 'rlc_40', // Include the storeLocationId as needed
    };

    try {
      const response = await axios.post(
        'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/product/v2/filter/product',
        requestBody, // Axios automatically converts this to JSON
        {
          headers: {
            'Content-Type': 'application/json', // Specifies the content type of the request body
          },
        }
      );
      console.log('Fetched products:=====', response.data.data.data); // Log the correct data
      setProducts(response.data?.data.data || []); // Access the 'data' key where products are stored
    } catch (error) {
      console.error('Error fetching products:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Display a loading spinner while fetching products
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
        <Text style={styles.header}>Farm-Fresh Veggies</Text>
       <View style={styles.cartContainer}>
       <View style={styles.cartCountContainer}>
      <Text style={styles.cartCountText}>{totalItems}</Text> {/* Display cart items count */}
    </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{marginLeft:'2%'}}>
          <Entypo name="shopping-cart" size={20} color="black" style={styles.cartIcon} />
        </TouchableOpacity>
        
       </View>

      </View>
      <FlatList
        data={products} // Use the dynamic list of products
        numColumns={2} // Display in two columns
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
        keyExtractor={item => item.productId.toString()} // Ensure 'productId' is used as the key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'darkgreen',
    marginLeft: '2%'
  },
  cartContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCountContainer: {
    position: 'absolute',
    top: -14, // Adjusts the vertical position of the count bubble
    right: -8, // Adjusts the horizontal position relative to the cart icon
    backgroundColor: 'red', // Bubble color
    width: 20, // Width of the bubble
    height: 20, // Height of the bubble
    borderRadius: 10, // Make it round
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf:'center'

  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListScreen;
