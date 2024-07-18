import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movie-slice";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const movies = useSelector((state) => state.counter);
  const titleAnimation = useRef(new Animated.Value(width)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const [currentMovieTitle, setCurrentMovieTitle] = useState("");
  const [previousIndex, setPreviousIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  useEffect(() => {
    const direction = previousIndex < currentIndex ? 1 : -1;
    const animationStartValue = direction === 1 ? width * 0.2 : -width * 0.2;

    titleAnimation.setValue(animationStartValue);
    titleOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(titleAnimation, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentMovieTitle]);

  const animation = useRef(new Animated.Value(0)).current;
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePress = (movie) => {
    setSelectedMovie(movie);
    Animated.timing(animation, {
      toValue: 1,
      duration: 6,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate("Detail", { movie });
      animation.setValue(0);
      setSelectedMovie(null);
    });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePress(item)}>
      <Animated.View
        style={[
          styles.movieContainer,
          selectedMovie === item && {
            width: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [width * 0.8, width],
            }),
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [height * 0.6, height],
            }),
          },
        ]}
      >
        <Image
          source={
            item?.poster_path
              ? {
                  uri: "https://image.tmdb.org/t/p/w500" + item?.poster_path,
                }
              : require("../../assets/images/avatar.png")
          }
          style={{
            width: width * 0.8,
            height: height * 0.6,
          }}
          className="rounded-md  "
        />

        <Animated.Text
          style={[
            styles.titleContainer,
            {
              transform: [{ translateX: titleAnimation }],
              opacity: titleOpacity,
            },
          ]}
          className={`${
            currentMovieTitle !== item?.title
              ? "hidden"
              : "uppercase text-2xl text-white font-bold absolute m-3 p-1 z-10"
          } `}
        >
          {item?.title}
        </Animated.Text>

        <View
          className="absolute z-0  bg-slate-800 w-full h-1/4 opacity-50 "
          style={{}}
        ></View>
      </Animated.View>
    </Pressable>
  );

  return (
    <View>
      <View className="mt-10 flex flex-row justify-between p-4 space-x-2 items-center text-center">
        <View className="border-2 border-white rounded-full overflow-hidden">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{
              width: 45,
              height: 45,
            }}
            resizeMode="cover"
          />
        </View>

        <View className="flex flex-row space-x-2">
          <Text>
            <Ionicons name="notifications-outline" size={32} color="black" />
          </Text>
          <Text>
            <Feather className="" name="search" size={32} color="black" />{" "}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-bold text-3xl p-2">Trending Movies</Text>
        <Carousel
          data={movies?.data?.results}
          renderItem={renderItem}
          firstItem={1}
          inactiveSlideScale={0.86}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.8}
          slideStyle={{ display: "flex", alignItems: "center" }}
          onSnapToItem={(index) => {
            setPreviousIndex(currentIndex);
            setCurrentIndex(index);
            setCurrentMovieTitle(movies?.data?.results[index]?.title);
          }}
        />
        <View className=" p-10 flex flex-row justify-between items-center space-x-2 w-full">
          <TouchableOpacity>
            <AntDesign name="infocirlce" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text className=" text-black ">{currentMovieTitle}</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="heart" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  movieTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
