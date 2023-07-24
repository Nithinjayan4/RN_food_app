import { View, Text, Touchable, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { featured } from '../constants'
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../sllices/restaurantSlice';
import { RemoveFromCart, selectCartItems, selectCartTotal } from '../sllices/cartSlice';

export default function CartScreen() {

  const restaurant =useSelector(selectRestaurant);
  const navigation =useNavigation()
  const cartItems=useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const deliveryFee=2
  const [groupedItems, setGroupedItems]= useState({})

  useEffect(()=>{
    const items = cartItems.reduce((group,item)=>{
      if(group[item.id]){
        group[item.id].push(item);
      }else{
        group[item.id] = [item];
      }
      return group;
    },{})
    setGroupedItems(items)

  },[cartItems])
  return (
    <View ClassName="bg-white flex-1">
      <View ClassName="relative py-4 shadow-sm">
        {/* <TouchableOpacity  style={{backgroundColor:themeColors.bgColor(1)}}
        ClassName="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >

          <Icon.ArrowLeft strokeWidth={3} stroke="white"/>


        </TouchableOpacity> */}

<TouchableOpacity
          onPress={()=> navigation.goBack()}
       
         className="absolute z-10 top-5 left-2 bg-gray-50 p-2 rounded-full shadow"
        style={{backgroundColor:themeColors.bgColor(1)}}
       
        >
          <Icon.ArrowLeft strokeWidth={3} stroke='white'/>

        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your Cart</Text>
          <Text className="text-center text-gray-500" >{restaurant.name}</Text>
        </View>

      </View>
      <View style={{backgroundColor:themeColors.bgColor(0.2)}} 
      className="flex-row p-4 items-center"
      >  
      <Image source={require('../assets/images/bikeGuy.png')} className=" w-20 h-20 rounded-full"/>
        <Text className="flex-1 pl-4">Deliver in 20-40 minutes</Text>
        <TouchableOpacity>
          <Text className="font-bold "style={{color:themeColors.text}}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom:50
      }}
      className="bg-white pt-5"
      >
        {
          Object.entries(groupedItems).map(([key,items])=>{
            let dish =items[0]
            return(
              <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
              >
                <Text className="font-bold" style={{color:themeColors.text}} >
                  {items.length} x
                </Text>
                <Image className="h-14 w-14 rounded-full"
                source={dish.image}/>
                <Text className="flex-1 font-bold text-gray-700" >{dish.name}</Text>
                <Text className="font-semibold text-base"> ₹  {dish.price}</Text>
                <TouchableOpacity 
                className="p-1 rounded-full"
                onPress={()=>dispatch(RemoveFromCart({id:dish.id}))}
                style={{backgroundColor:themeColors.bgColor(1)}}
                >
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke='white'/>

                </TouchableOpacity>

              </View>
            )
          })
        }
      </ScrollView>
      <View className="p-6 px-8 rounded-t-3xl space-y-4" style={{backgroundColor:themeColors.bgColor(0.2)}}>

        <View className="flex-row justify-between" >
          <Text className="text-gray-700" >
            Subtotal

          </Text>
          <Text className="text-gray-700" >
          ₹ {cartTotal}
           

          </Text>

        </View>

        <View className="flex-row justify-between" >
          <Text className="text-gray-700" >
          Delivey Fee

          </Text>
          <Text className="text-gray-700" >
          ₹ {deliveryFee}
           

          </Text>

        </View>
        <View className="flex-row justify-between" >
          <Text className="text-gray-700 font-extrabold"  >
            Order Total

          </Text>
          <Text className="text-gray-700 font-extrabold" >
          ₹ {deliveryFee+cartTotal}
           
          </Text>

        </View>
        <View>
          <TouchableOpacity style={{backgroundColor:themeColors.bgColor(1)}}
          className="p-3 rounded-full" 
          onPress={()=>navigation.navigate('OrderPreparing')} 
          >
            <Text className="text-white text-center font-bold text-lg" >
              Place Order

            </Text>
          </TouchableOpacity>
        </View>




      </View>
    </View>
  )
}