import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movie-slice";

const DetailScreen = ({ route }) => {
  const { width, height } = Dimensions.get("window");

  const { movie } = route.params;

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(fetchMovies());
    startAnimation();
  }, []);

  // Create animated values for rotation and scale
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.1)).current;

  // Define the animation sequence
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolations for rotation
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderItem = ({ item }) => (
    <View>
      <Animated.Image
        source={{ uri: "https://image.tmdb.org/t/p/w500" + item?.poster_path }}
        style={[
          {
            transform: [{ rotate }, { scale: scaleAnim }],
            width: width * 0.6,
            height: height * 0.4,
          },
        ]}
        className="rounded-md ml-5"
      />
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: "https://image.tmdb.org/t/p/w500" + movie?.poster_path }}
      className="relative h-full backdrop-blur-lg bg-slate-300"
    >
      <View className="absolute z-0 bg-black w-full h-full opacity-50"></View>
      <View className="mb-10 p-4 mt-10 w-1/2 text-center">
        <Text className="text-2xl font-bold uppercase text-white">
          {movie?.title}
        </Text>
        <Text className="text-2xl font-bold">{movie?.language}</Text>
      </View>

      <Text className="text-2xl p-4 font-bold uppercase text-white w-full">
        Similar Movies
      </Text>
      <FlatList
        data={movies?.data?.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  animatedImage: {
    width: "100%",
    height: 200,
    alignSelf: "center",
  },
  carousel: {
    paddingHorizontal: 10,
  },
});

export default DetailScreen;
