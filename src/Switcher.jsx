import React, { useEffect, useRef } from "react";
import { Easing, View, Animated } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import MaskedView from "@react-native-community/masked-view";

export default function Switcher({
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
      toValue: value ? 0 : -SIZE * 1,
      duration:
        animationSpeed === "fast"
          ? 200
          : animationSpeed === "medium"
          ? 300
          : 400,
      useNativeDriver: false,
      easing: Easing.in,
    }).start();
  }, [value]);

  const styles = {
    wrapper: {
      width: SIZE * 1,
      backgroundColor: inActiveColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "row",
      transform: [
        {
          scale: translateX.interpolate({
            inputRange: [-SIZE * 1, -SIZE * 0.5, 0],
            outputRange: [1, 1.11, 1],
          }),
        },
      ],
    },
    container: {
      width: SIZE * 1,
      backgroundColor: inActiveColor,
      height: SIZE * 0.5,
      borderRadius: SIZE * 0.25,
      elevation: elevation ? elevation : null,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: SIZE * 0.05,
    },
    darkKnob: {
      width: SIZE * 0.34,
      height: SIZE * 0.34,
      backgroundColor: inActiveColor,
      borderRadius: SIZE * 0.17,
    },
    lightKnob: {
      width: SIZE * 0.34,
      height: SIZE * 0.34,
      backgroundColor: activeColor,
      borderRadius: SIZE * 0.17,
    },
    maskedLayer: {
      transform: [
        {
          translateX,
        },
      ],
      position: "absolute",
      width: SIZE * 1,
      backgroundColor: activeColor,
      height: SIZE * 0.6,
      top: -(SIZE * 0.05),
      borderRadius: SIZE * 0.5,
    },
  };
  return (
    <>
      <TapGestureHandler onHandlerStateChange={(e) => onChange()}>
        <Animated.View style={styles.wrapper}>
          <MaskedView maskElement={<Animated.View style={styles.container} />}>
            <View style={styles.container}>
              <Animated.View style={styles.lightKnob} />
              <Animated.View style={styles.maskedLayer} />
              <Animated.View style={styles.darkKnob} />
            </View>
          </MaskedView>
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

Switcher.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  animationSpeed: PropTypes.string,
  elevation: PropTypes.number,
  inActiveColor: PropTypes.string,
  activeColor: PropTypes.string,
};

Switcher.defaultProps = {
  value: false,
  onChange: () => {
    console.log("Please provide onChange prop");
  },
  size: 100,
  animationSpeed: "fast",
  elevation: 5,
  inActiveColor: "white",
  activeColor: "black",
};
