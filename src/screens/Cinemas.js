import React, { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Context } from "../context/CinemaContext";
import { View, Text, FlatList, Image } from "react-native";
import { SharedElement } from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import styles from "../styles/CinemasStyles"
import SearchFilterFunction from "../components/shared/SearchFilterFunction";

const Cinemas = () => {
  const navigation = useNavigation(); 
  const { state } = useContext(Context)
  const [cinemas, setCinemas] = useState(state.cinemas)

  function Item(item) {
    
    return (
      <TouchableScale
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver 
        style={styles.cinemaOverview} 
        onPress={() => navigation.navigate("Cinema", { item })}
      >
        <SharedElement id={item.imageUrl}>
          <Image style={styles.cinemaImage} source={{ uri: item.imageUrl }}></Image>
        </SharedElement>  

       
        <SharedElement id={item.name} style={styles.cinemaTitleContainer}>
          <Text style={styles.cinemaTitle}>{item.name}</Text>
        </SharedElement>

         
        <Text style={styles.cinemaDistance}>{item.distance ? `${item.distance.toFixed(1)} km` : ''}</Text>
         
          
        
      </TouchableScale>
    )
  }
 
  return (
    <View style={styles.container}>
      <SearchFilterFunction
        data={cinemas}
        filteredData={setCinemas}
        filterValue="name"
      />
      <FlatList
        keyboardShouldPersistTaps="always"
        data={cinemas}
        numColumns={1}
        keyExtractor={(item) => item.id.toString() }
        renderItem={({ item }) => Item(item)}
      />
    </View>
  )
}

export default Cinemas;