import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import { COLORS, FONTS, SIZES} from "../../constants/theme"

const MovieCast = ({ movie, active, primaryFontColor, secondaryFontColor }) => {
  
  const Item = (item) => {
    return (

      <View style={styles.itemContainer}>
        <Image
          style={styles.img}
          source={ 
            !item.photo.includes("user-default") ? 
              {
                uri: item.photo,
              } :
              require('./user-default.jpg')
          }
      />
        <Text style={[styles.name, { color: secondaryFontColor}]}>{item.first_name} {item.last_name}</Text>
      </View>
     
    );
  }
  
  return (
    
    <View style={[ styles.container, { display: active }]}>
      
      <Text style={[styles.headline, { color: primaryFontColor}]}>{movie.directors.length === 0 ? "Ingen Instruktør at vise" : "Intruktører" }</Text>
      <FlatList 
        data={movie.directors}
        renderItem={({ item }) => Item(item)}
        keyExtractor={(item) => item.id}
        listKey={(item) => item.id}
      />

      <Text style={[styles.headline, { color: primaryFontColor}]}>{movie.actors.length === 0 ? "Ingen skuespillere at vise" : "Skuespillere" }</Text>
        <FlatList 
          data={movie.actors}
          renderItem={({ item }) => Item(item)}
          keyExtractor={(item) => item.id}
          listKey={(item) => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: "4%",
    marginBottom: 40
  },
  headline: {
    marginTop: 5,
    marginBottom: 20,
    ...FONTS.h2
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 25
  },
  name: {
    marginTop: 10,
    ...FONTS.h3
  }, 
  img: {
    height: 90,
    width: 90,
    marginRight: 20,
    borderRadius: 7
  }
})

export default MovieCast;