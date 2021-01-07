import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import PropTypes from "prop-types";

export default function SpringSwitch({
  value,
  onChange,
  size,
  activeColor,
  inActiveColor,
}) {
  const backgroundColor = "#fff";
  const translateX = useRef(new Animated.Value(0)).current;
  const SIZE = size;
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? SIZE * 1.2 : 0,
      bounciness: 15,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const styles = {
    container: {
      width: SIZE * 1,
      backgroundColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      justifyContent: "center",
      alignItems: "flex-start",
      padding: SIZE * 0.05,
    },
    knobLayer: {
      alignSelf: "center",
      width: size - size * 0.3,
      backgroundColor: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [activeColor, inActiveColor],
      }),
      position: "absolute",
      height: SIZE * 0.08,
      borderRadius: SIZE * 0.05,
    },
    knob: {
      transform: [
        {
          translateX: translateX.interpolate({
            inputRange: [0, SIZE * 0.9],
            outputRange: [0, SIZE * 0.4],
          }),
        },
        {
          scaleX: translateX.interpolate({
            inputRange: [0, SIZE * 0.5, SIZE * 1.05],
            outputRange: [1, 1.4, 1],
          }),
        },
        { rotate: "-45deg" },
      ],
      justifyContent: "center",
      alignItems: "center",
      width: SIZE * 0.3,
      height: SIZE * 0.3,
      backgroundColor: translateX.interpolate({
        inputRange: [0, SIZE * 0.9],
        outputRange: [activeColor, inActiveColor],
      }),
      borderRadius: SIZE * 0.15,
      borderBottomRightRadius: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [SIZE * 0.03, SIZE * 0.15],
      }),
      borderTopLeftRadius: translateX.interpolate({
        inputRange: [0, SIZE * 1.05],
        outputRange: [SIZE * 0.15, SIZE * 0.03],
      }),
    },
  };
  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.container}>
          <Animated.View style={styles.knobLayer} />
          <Animated.View style={styles.knob} />
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

SpringSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  inActiveColor: PropTypes.string,
};

SpringSwitch.defaultProps = {
  size: 100,
  value: false,
  knobColor: "orange",
  borderColor: "orange",
  activeColor: "white",
  inActiveColor: "#11998e",
  borderWidth: 2,
  animationSpeed: "fast",
  elevation: 10,
};
