import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movie-slice";

const Saved = () => {
  const { width, height } = Dimensions.get("window");

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const renderItem = ({ item }) => (
    <View className="m-2">
      <Image
        source={
          item?.poster_path
            ? {
                uri: "https://image.tmdb.org/t/p/w500" + item?.poster_path,
              }
            : require("../../assets/images/avatar.png")
        }
        style={{
          width: width * 0.46,
          height: height * 0.3,
        }}
        className="rounded-md "
      />
    </View>
  );
  return (
    <View className="w-full">
      <View className="flex flex-row justify-between mt-10 p-2 items-center">
        <Text className="text-3xl font-bold">Saved Movies</Text>
        <TouchableOpacity className="bg-indigo-500 p-2 rounded-md">
          <Text className="text-xl text-white">Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies?.data?.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        className
      />
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({});
