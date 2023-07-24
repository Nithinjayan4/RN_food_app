import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../api'
import { urlFor } from '../sanity'

export default function Categories() {
    const [activeCategory,setActiveCategory] = useState(null)
    let [categories,setCategories] = useState([])

    // useEffect(()=>{
    //     getCategories().then(data=>{
    //         console.log('get it',data)
    //     })

    // },[])
     useEffect(() => {
        getCategories().then(data=>{
            // console.log('got data', data[0]);
            setCategories(data);
        })
      }, [])

  return (
    <View className=" mt-4" >
        <ScrollView  
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
            paddingHorizontal:15
        }}
        >
            {
                categories.map((categories,index)=>{
                    let isActive= categories._id==activeCategory;
                    let btnClass = isActive? 'btn-gray-600' : 'btn-gray-200';
                    let  textClass = isActive? 'font-semibold text-gray-800' : 'text-gray-500';
                    return(
                        <View key={index} className="flex justify-center items-center mr-6" >

                            <TouchableOpacity
                             onPress={()=>setActiveCategory(categories._id)}
                            className={"p-1 rounded-full shadow bg-gray-200"+btnClass}
                           
                            >
                                
                                <Image style={{width:45,height:45}} 
                                source={{uri:urlFor(categories.image).url()}}
                                />

                            </TouchableOpacity>
                            <Text className={"text-sm"+textClass}>{categories.name}</Text>


                        </View>
                    )
                })
            }

        </ScrollView>
   
    </View>
  )
}