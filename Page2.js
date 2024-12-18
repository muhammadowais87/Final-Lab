import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';

function Page2({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params?.product;
  const cart = useSelector(state => state.cart); // Access the cart state

  if (!product) {
    return <Text style={tw`text-center mt-10 text-lg`}>No product selected.</Text>;
  }

  // Check if the product is already in the cart
  const isInCart = cart.some(item => item.id === product.id);

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch({ type: 'cart/removeFromCart', payload: product });
    } else {
      dispatch({ type: 'cart/addToCart', payload: product });
    }
  };

  return (
    <View style={tw`flex-1 bg-emerald-900`}>
      <View style={tw`flex-1`}>
        <Image
          source={{ uri: `https://abuntzklefmatwofckrx.supabase.co/storage/v1/object/public/images/${product.image}` }}
          style={tw`w-full h-80 mr-4`}
          resizeMode="cover"
        />
        <View style={tw`flex-1 ml-5 mt-5`}>
          <Text style={tw`text-lg font-bold mt-2 text-2xl text-orange-600`}>{product.name}</Text>
          <Text style={tw`text-sm text-gray-600 mt-2 text-slate-50`}>{product.description}</Text>
          <Text style={tw`text-lg font-semibold text-orange-500 mt-2`}>{product.Icecream}</Text>
          <Text style={tw`text-lg font-semibold text-orange-500 mt-2`}>Rs.{product.price}</Text>
        </View>
        <View style={tw`flex-1 ml-5 mr-5`}>
          <TouchableOpacity
            style={tw`${isInCart ? 'bg-green-600' : 'bg-red-600'} p-3 rounded-md shadow-md`}
            onPress={handleCartToggle}
          >
            <Text style={tw`text-lg font-bold text-white text-center`}>
              {isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Page2;
