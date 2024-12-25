import React, { useEffect, useLayoutEffect, useState, useCallback } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  SectionList,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { getDatabase, ref, child, get } from "firebase/database";
import app from "../../../firebase";
import { Ionicons } from "@expo/vector-icons";

const db = getDatabase(app);
const dbRef = ref(db);

export default function HomeScreen(props) {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const debounceTimeoutRef = React.useRef(null);
  console.log(favorites);


  async function getData() {
    try {
      const snapshot = await get(child(dbRef, `fastfood`));
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : {});
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
    getData();
  }, []);

  const saveFavorites = useCallback((updatedFavorites) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
    }, 300);
  }, []);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (updatedFavorites[item.recipeId]) {
        delete updatedFavorites[item.recipeId]; // Remove from favorites
      } else {
        updatedFavorites[item.recipeId] = true; // Add to favorites
      }
      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="white" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons
            name={favorites[item.recipeId] ? "heart" : "heart-outline"}
            size={24}
            color={favorites[item.recipeId] ? "red" : "gray"}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderSectionItem = ({ item }) => (
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={{ width: 70, height: 50, borderRadius: 4 }} source={{ uri: item.img }} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{item.description}</Text>
        <Text>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Ionicons
          name={favorites[item.recipeId] ? "heart" : "heart-outline"}
          size={24}
          color={favorites[item.recipeId] ? "red" : "gray"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  

  return (
    <ImageBackground
      source={require("../../../assets/wallpaper-1.png")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <SectionList
          sections={[{ title: "Section", data: data }]}
          renderItem={renderSectionItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
              {title}
            </Text>
          )}
          keyExtractor={(item) => `${item.recipeId}`}
        />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </View>
    </ImageBackground>
  );
}
