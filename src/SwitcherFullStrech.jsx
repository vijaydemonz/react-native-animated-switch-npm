import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { Easing, View, Animated } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
export default function SwitcherFullStrech({
  value,
  onChange,
  size,
  animationSpeed,
  elevation,
  inActiveColor,
  activeColor,
}) {
  const translateX = useRef(new Animated.Value(0)).current;

  const SIZE = size;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? SIZE * 1 : 0,
      duration:
        animationSpeed === "fast"
          ? 150
          : animationSpeed === "medium"
          ? 300
          : 400,
      useNativeDriver: false,
      easing: Easing.in,
    }).start();
  }, [value]);

  const styles = {
    container: {
      width: SIZE * 1,
      backgroundColor: activeColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "row",
      transform: [
        {
          scale: translateX.interpolate({
            inputRange: [0, SIZE * 0.5, SIZE * 1],
            outputRange: [1, 1.11, 1],
          }),
        },
      ],
    },
    absoluteLayer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      width: SIZE * 1,
      height: (SIZE * 1) / 2,
      paddingHorizontal: SIZE * 0.2,
    },
    smallZero: {
      width: SIZE * 0.1,
      height: SIZE * 0.1,
      borderRadius: SIZE * 0.05,
      backgroundColor: inActiveColor,
    },
    smallOne: {
      width: SIZE * 0.05,
      height: SIZE * 0.15,
      borderRadius: SIZE * 0.05,
      backgroundColor: inActiveColor,
    },
    overLay: [
      {
        height: SIZE * 0.5,
        backgroundColor: inActiveColor,
        borderRadius: SIZE * 0.25,
        justifyContent: "center",
        alignItems: "center",
      },
      {
        width: translateX.interpolate({
          inputRange: [0, SIZE * 0.5, SIZE * 1],
          outputRange: [SIZE * 0.5, SIZE * 1, SIZE * 0.5],
        }),
        transform: [
          {
            translateX: translateX.interpolate({
              inputRange: [0, SIZE * 0.5, SIZE * 1],
              outputRange: [0, 0, SIZE * 0.5],
            }),
          },
        ],
      },
    ],
    overLayOne: {
      width: SIZE * 0.05,
      height: SIZE * 0.15,
      borderRadius: SIZE * 0.5,
      position: "absolute",
      backgroundColor: activeColor,
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 0.5, SIZE * 1],
        outputRange: [0, 0, 1],
      }),
    },
    overLayZero: {
      width: SIZE * 0.1,
      height: SIZE * 0.1,
      borderRadius: SIZE * 0.05,
      backgroundColor: activeColor,
      position: "absolute",
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 0.5, SIZE * 1],
        outputRange: [1, 0, 0],
      }),
    },
  };

  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.container}>
          <View style={styles.absoluteLayer}>
            <Animated.View style={styles.smallZero} />
            <Animated.View style={styles.smallOne} />
          </View>
          <Animated.View style={styles.overLay}>
            <Animated.View style={styles.overLayOne} />
            <Animated.View style={styles.overLayZero} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

SwitcherFullStrech.propTypes = {
  activeColor: PropTypes.string,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
  inActiveColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.bool.isRequired,
};
SwitcherFullStrech.defaultProps = {
  size: 100,
  value: false,
  inActiveColor: "white",
  activeColor: "black",
  animationSpeed: "fast",
  elevation: 10,
};
