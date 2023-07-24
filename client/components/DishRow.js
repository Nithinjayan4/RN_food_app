import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { themeColors } from '../theme'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromCart, addToCart, selectedCartItemsById } from '../sllices/cartSlice';
import { urlFor } from '../sanity';

export default function DishRow({item}) {
  const totalitems = useSelector(state=>selectedCartItemsById(state,item._id))
  const  dispatch = useDispatch();


  const handelIncrease=()=>{
    dispatch(addToCart({...item}))
  }


  const handelDecrease=()=>{
    dispatch(RemoveFromCart({id:item._id}))
  }


  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image className="rounded-3xl " style={{height:100, width:100}}
        source={{uri:urlFor(item.image).url()}}
        />
        <View className="flex flex-1 space-y-3">
            <View className="pl-3">
                <Text className="text-xl" >{item.name}</Text>
                <Text className="text-gray-700" >{item.description}</Text>

            </View>
            <View className="flex-row justify-between pl-3 item-center">
                <Text className="text-gray-700 text-lg font-bold">
                ₹{item.price}
                </Text>
                <View className="flex-row items-center"
               
                >

                  <TouchableOpacity
                  onPress={handelDecrease}
                  disabled={!totalitems.length}
                  className="p-1 rounded-full"
                  style={{backgroundColor:themeColors.bgColor(1)}}
                  >
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'}/>
                  </TouchableOpacity>

                  <Text className="px-3">{totalitems.length}</Text>

                  <TouchableOpacity
                  onPress={handelIncrease}
                  className="p-1 rounded-full"
                  style={{backgroundColor:themeColors.bgColor(1)}}
                  >
                  <Icon.Plus strokeWidth={2} height={20} width={20} stroke={'white'}/>
                  </TouchableOpacity>
                </View>

            </View>
        </View>
     
    </View>
  )
}