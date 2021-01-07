import React, { useEffect, useRef } from "react";
import { Easing, View, Animated } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function YesNoSwitch({
  value,
  onChange,
  size,
  animationSpeed,
  elevation,
  activeColor,
  inActiveColor = "white",
  backgroundColor = "white",
  iconSize,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const SIZE = size;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? SIZE * 1.05 : 0,
      duration:
        animationSpeed === "fast"
          ? 100
          : animationSpeed === "medium"
          ? 200
          : 500,
      useNativeDriver: false,
      easing: Easing.in,
    }).start();
  }, [value]);

  const styles = {
    container: {
      width: SIZE * 1,
      backgroundColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: SIZE * 0.05,
    },
    knob: {
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: [0, SIZE * 0.4],
          }),
        },
      ],
      justifyContent: "center",
      alignItems: "center",
      width: SIZE * 0.4,
      height: SIZE * 0.4,
      backgroundColor: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [inActiveColor, activeColor],
      }),
      borderRadius: SIZE * 0.2,
    },
    close: {
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [1, 0],
      }),
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    knobRotation: {
      width: SIZE * 0.22,
      height: SIZE * 0.22,
      borderRadius: SIZE * 0.1,
      justifyContent: "center",
      alignItems: "center",
      transform: [
        {
          rotate: translateX.interpolate({
            inputRange: [0, SIZE * 1.05],
            outputRange: ["0deg", "360deg"],
          }),
        },
      ],
    },
    tick: {
      position: "absolute",
      opacity: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [0, 1],
      }),
    },
  };
  return (
    <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
      <Animated.View style={styles.container}>
        <Animated.View style={styles.knob}>
          <Animated.View style={styles.knobRotation}>
            <Animated.View style={styles.tick}>
              <Feather name={"check"} size={size * 0.24} color="white" />
            </Animated.View>
            <Animated.View style={styles.close}>
              <Ionicons name={"close"} size={size * 0.24} color={"white"} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
}

YesNoSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  knobColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderWidth: PropTypes.number,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
};

YesNoSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  lightModeBg: "white",
  darkModeBg: "black",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};
