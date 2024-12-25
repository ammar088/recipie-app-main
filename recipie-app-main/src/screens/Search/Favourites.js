import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { recipes } from "../../data/dataArrays"; // Ensure this contains all your recipe data
import { getCategoryName } from "../../data/MockDataAPI";

export default function FavoritesScreen({ navigation }) {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : {};

      const favoriteList = recipes.filter((item) =>
        favoriteIds[item.recipeId]
      );
      setFavoriteItems(favoriteList);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  const toggleFavorite = async (item) => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : {};

      if (favoriteIds[item.recipeId]) {
        delete favoriteIds[item.recipeId];
      } else {
        favoriteIds[item.recipeId] = true;
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteIds));
      loadFavorites(); // Refresh the favorites list
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const renderFavoriteItem = ({ item }) => (
    <View style={localStyles.itemContainer}>
      <Image style={styles.photo} source={{ uri: item.photo_url }} />
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 10 }}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name="heart"
          size={24}
          color="red"
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {favoriteItems.length === 0 ? (
        <Text style={localStyles.emptyMessage}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favoriteItems}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => `${item.recipeId}`}
          numColumns={2} // This prop ensures two items per row
          columnWrapperStyle={localStyles.columnWrapper}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  columnWrapper: {
    justifyContent: "space-between", // Space between items
  },
});
