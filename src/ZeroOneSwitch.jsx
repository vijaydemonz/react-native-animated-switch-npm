import React, { useEffect, useRef } from "react";
import { Easing, View, Animated } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import PropTypes from "prop-types";

export default function ZeroOneSwitch({
  value,
  onChange,
  size,
  borderColor,
  borderWidth,
  knobColor,
  animationSpeed,
  elevation,
  indicatorColor = "white",
  backgroundColor = "white",
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
      borderColor,
      borderWidth,
    },
    moonLayer: {
      transform: [
        { translateX: translateX },
        {
          rotate: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: ["0deg", "-45deg"],
          }),
        },
      ],
      opacity: translateX.interpolate({
        inputRange: [SIZE * 0.4, SIZE * 0.5, SIZE * 0.7],
        outputRange: [0, 0, 1],
      }),
      width: SIZE * 0.4,
      height: SIZE * 0.25,
      backgroundColor,
      borderBottomLeftRadius: SIZE * 0.2,
      borderBottomRightRadius: SIZE * 0.2,
      borderTopRightRadius: SIZE * 0.05,
      zIndex: 10,
      top: SIZE * 0.09,
      marginLeft: SIZE * -0.45,
      position: "absolute",
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
      backgroundColor: knobColor,
      borderRadius: SIZE * 0.2,
    },
    indicator: {
      width: translateX.interpolate({
        inputRange: [0, SIZE * 0.9],
        outputRange: [SIZE * 0.22, 0],
        extrapolate: "clamp",
      }),
      height: SIZE * 0.22,
      borderRadius: (SIZE * 0.9) / 2,
      borderWidth: SIZE * 0.03,
      borderColor: indicatorColor,
    },
  };
  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.container}>
          <Animated.View style={styles.knob}>
            <Animated.View style={styles.indicator} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

ZeroOneSwitch.propTypes = {
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

ZeroOneSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  activeColor: "white",
  darkModeBg: "black",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};
